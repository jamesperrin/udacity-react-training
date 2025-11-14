import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ListContacts from './components/ListContacts';
import CreateContact from './components/CreateContact';
import ContactsAPI from './utils/ContactsAPI';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

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

  const createContact = (contact) => {
    const addContact = async () => {
      // const res = await ContactsAPI.create(contact);
      const res = await ContactsAPI.createAsync(contact);

      // setContacts(contacts.concat(res));
      setContacts([...contacts, res]);
    };

    addContact();
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" exact element={<ListContacts contacts={contacts} onDeleteContact={removeContact} />} />
      <Route path="/create" element={<CreateContact onCreateContact={createContact} />} />
    </Routes>
  );
};

export default App;
