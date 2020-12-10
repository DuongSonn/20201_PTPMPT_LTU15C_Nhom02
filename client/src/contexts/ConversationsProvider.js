import React, { useCallback, useContext, useEffect, useState } from 'react';
import useLocalStorgae from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvier';
import axios from 'axios';

const ConversationContext = React.createContext();

export function useConversations() {
    return useContext(ConversationContext)
}

export function ConversationsProvider({ id, children }) {
    const [conversations, setConversations] = useLocalStorgae('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const { contacts } = useContacts();
    const socket = useSocket();

    function createConversation(recipients) {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: []}]
        })
    }

    const  addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        setConversations(prevConversations => {
            let madeChange = false;
            const newMessage = {sender, text};
            const newConversation = prevConversations.map(conversation => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return {...conversation, messages: [...conversation.messages, newMessage]}
                }
                return conversation;
            })

            if (madeChange) {
                return newConversation
            } else {
                return [...prevConversations, {recipients, messages: [newMessage]}]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if (socket == null) return
        socket.on('receive-message', addMessageToConversation)
        
        return () => socket.off('receive-message')
    }, [socket, addMessageToConversation])

    function sendMessage(recipients, text) {
        socket.emit('send-message', {recipients, text})
        addMessageToConversation({recipients, text, sender: id})
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/conversations`, {
            headers: {
                id: id,
            }
        }).then(function (response) {
            const conversations = response.data.conversations;
            console.log(response);
            conversations.forEach(conversation => {
                const index = conversation.recipients.indexOf(id);
                if (index > -1) {
                    conversation.recipients.splice(index, 1);
                }
                createConversation(conversation.recipients);
                if (conversation.messages) {
                    conversation.messages.forEach(message => {
                        addMessageToConversation({ 
                            recipients: conversation.recipients, 
                            text: message.text, 
                            sender: message.sender 
                        })
                    });
                }
            });
        })
    }, [id])

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.id === recipient
            })
            const name = (contact&& contact.name) || recipient

            return {id: recipient, name}
        })
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact&& contact.name) || message.sender
            const fromMe = id === message.sender

            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex

        return { ...conversation, messages, recipients, selected}
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage
    }

    return (
        <ConversationContext.Provider value={value}>
            {children}
        </ConversationContext.Provider>
    )
}

function arrayEquality(a, b) {
    if (a.length !== b.length) return false
    a.sort();
    b.sort();

    return a.every((element, index) => {
        return element === b[index];
    })
}
