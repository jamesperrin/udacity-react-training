import { useState, useEffect } from 'react';
import './App.css';
import ListContacts from './components/ListContacts';
import CreateContact from './components/CreateContact';
import ContactsAPI from './utils/ContactsAPI';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [screen, setScreen] = useState('list');

  useEffect(() => {
    let isMounted = true;

    const getContacts = async () => {
      try {
        const res = await ContactsAPI.getAllAsync();

        if (isMounted) {
          setContacts(res || []);
        }
      } catch (error) {
        if (isMounted) {
          setContacts([]);
        }

        console.error('-- Failed to fetch contacts:');
        console.error(error);
      }
    };

    getContacts();

    return () => {
      isMounted = false;
    };
  }, []);

  const removeContact = (contact) => {
    // ContactsAPI.remove(contact);
    // ContactsAPI.removeById(contact.id);
    ContactsAPI.removeByIdAsync(contact.id);
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  return (
    <div>
      {screen === 'list' && (
        <ListContacts
          contacts={contacts}
          onDeleteContact={removeContact}
          onNavigate={() => {
            setScreen('create');
          }}
        />
      )}
      {screen === 'create' && <CreateContact />}
    </div>
  );
};

export default App;
