import { useState, useEffect } from 'react';
import './App.css';
import ListContacts from './components/ListContacts';
import ContactsAPI from './utils/ContactsAPI';

const App = () => {
  const [contacts, setContacts] = useState([]);

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
      <ListContacts contacts={contacts} onDeleteContact={removeContact} />
    </div>
  );
};

export default App;
