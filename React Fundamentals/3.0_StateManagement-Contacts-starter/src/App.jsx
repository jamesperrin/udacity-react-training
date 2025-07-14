import { useState } from 'react';
import config from './config/config';
import './App.css';
import ListContacts from './components/ListContacts';

const contactsData = [
  {
    id: 'karen',
    name: 'Karen Isgrigg',
    handle: 'karen_isgrigg',
    avatarURL: `${config.apiURL}/karen.jpg`,
  },
  {
    id: 'richard',
    name: 'Richard Kalehoff',
    handle: 'richardkalehoff',
    avatarURL: `${config.apiURL}/richard.jpg`,
  },
  {
    id: 'tyler',
    name: 'Tyler McGinnis',
    handle: 'tylermcginnis',
    avatarURL: `${config.apiURL}/tyler.jpg`,
  },
];

const App = () => {
  const [contacts, setContacts] = useState(contactsData);

  const removeContact = (contact) => {
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  return (
    <div>
      <ListContacts contacts={contacts} onDeleteContact={removeContact} />
    </div>
  );
};

export default App;
