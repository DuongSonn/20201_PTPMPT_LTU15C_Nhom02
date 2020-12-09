import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Contacts from './Contacts';
import Conversations from './Conversations';
import NewConversationModal from './NewConversationModal';
import NewContactModal from './NewContactModal';

const CONVERSATION_KEY = 'conversations';
const CONTACT_KEY = 'contacts';

export default function Sidebar({ id }) {
    const [activeKey, setActiveKey] = useState(CONVERSATION_KEY);
    const conversationOpen = activeKey === CONVERSATION_KEY;
    const [modalOpen, setModalOpen] = useState(false);

    function closeModal() {
        setModalOpen(false);
    }

    return (
        <div style={{ width: '250px' }} className='d-flex flex-column'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATION_KEY}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATION_KEY}>
                        <Conversations id={id}></Conversations>
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contacts></Contacts>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Id: <span className="text-muted">{id}</span>
                </div>
                <Button className="rounded-0" onClick={() => setModalOpen(true)}>
                    New {conversationOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {
                    conversationOpen ? 
                        <NewConversationModal closeModal={closeModal} id={id}></NewConversationModal> 
                        : <NewContactModal closeModal={closeModal}></NewContactModal>
                }
            </Modal>
        </div>
    )
}
