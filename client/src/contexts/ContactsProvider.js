import React, { useCallback, useContext, useEffect } from 'react';
import useLocalStorgae from '../hooks/useLocalStorage';
import axios from 'axios';
import { useSocket } from './SocketProvier';

const ContactsContext = React.createContext();

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children, id }) {
    const [contacts, setContacts] = useLocalStorgae('contacts', []);
    const socket = useSocket();

    function createContact(id, name) {
        setContacts(prevContacts => {
            return [...prevContacts, {id,name}]
        })
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/users`).then(function (response) {
        const users = response.data.users;
        users.forEach(user => {
            if (user._id !== id) {
                createContact(user._id, user.name);
            }
        });
    }).catch(function (error) {
            console.log(error);
        });
    }, [id]);

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
            {children}
        </ContactsContext.Provider>
    )
}
