import React from 'react';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvier } from '../contexts/SocketProvier';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Login from "./Login";
import { useBeforeunload } from 'react-beforeunload'; 

function App() {
  const [id, setId] = useLocalStorage('id');
  const items = [
    'PTPMPT-contacts',
    'PTPMPT-conversations',
  ];
  const dashboard = (
    <SocketProvier id={id}>
      <ContactsProvider id={id}>
        <ConversationsProvider id={id}>
          <Dashboard id={id}></Dashboard>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvier>
  )
  
  useBeforeunload(() => {
    items.forEach(item => {
      localStorage.removeItem(item)
    });
  });

  return (
    <>
    {id ? dashboard : <Login onIdSubmit={setId}></Login>}
    </>
  );
}

export default App;
