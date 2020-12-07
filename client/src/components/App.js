import React from 'react';
import { ContactsProvider } from '../contexts/ContactsProvider';
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvier } from '../contexts/SocketProvier';
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard';
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorage('id');
  const dashboard = (
    <SocketProvier id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id}></Dashboard>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvier>
  )

  return (
    <>
    {id ? dashboard : <Login onIdSubmit={setId}></Login>}
    </>
  );
}

export default App;
