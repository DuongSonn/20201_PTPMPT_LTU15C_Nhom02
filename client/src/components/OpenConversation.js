import React, { useCallback, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {
    const [text, setText] = useState('');
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({smooth: true})
        }
    }, []);
    const { sendMessage, selectedConversation } = useConversations();

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id), text);
        setText('');
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.lenght -1 === index;

                        return (
                            <div 
                                key={index} 
                                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-item-end' : 'align-item-start'}`} 
                                ref={lastMessage ? setRef : null}
                            >
                                <div className={`rounded px-2 p-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div >
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}> 
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control 
                            as="textarea" 
                            value={text}
                            required 
                            onChange={e => setText(e.target.value)}
                            style={{ height: '75px', resize: 'none' }}
                        ></Form.Control>
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}
