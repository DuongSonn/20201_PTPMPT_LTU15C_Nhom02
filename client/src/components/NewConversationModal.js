import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';
import axios from 'axios';

export default function NewConversationModal({ closeModal, id }) {
    const { contacts } = useContacts();
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { createConversation } = useConversations();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/conversations`, {
            recipients: selectedContactIds,
            id: id,
        }).then(function (response) {
            createConversation(selectedContactIds);
            closeModal();
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId];
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact.id} key={contact.id}>
                            <Form.Check type="checkbox"
                                value={selectedContactIds.includes(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            ></Form.Check>
                        </Form.Group>
                    ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
