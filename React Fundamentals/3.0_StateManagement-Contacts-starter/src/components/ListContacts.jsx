import PropTypes from 'prop-types';
import { useState } from 'react';
import Contact from './Contact';

const ListContacts = ({ contacts, onDeleteContact, onNavigate }) => {
  const [query, setQuery] = useState('');

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  const showingContacts =
    query === '' ? contacts : contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const clearQuery = () => {
    updateQuery('');
  };

  return (
    <div className="list-contacts">
      <div className="list-contacts-top">
        <input
          type="text"
          className="search-contacts"
          placeholder="Search Contacts"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
        <a href="#create" onClick={onNavigate} className="add-contact">
          Add Contact
        </a>
      </div>

      {showingContacts.length !== contacts.length && (
        <div className="showing-contacts">
          <span>
            Now showing {showingContacts.length} of {contacts.length}
          </span>
          <button type="button" onClick={() => clearQuery()}>
            Show all
          </button>
        </div>
      )}

      <ol className="contact-list">
        {showingContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} onDeleteContact={onDeleteContact} />
        ))}
      </ol>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default ListContacts;
