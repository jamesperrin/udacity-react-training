import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Contact from './Contact';

const ListContacts = ({ contacts, onDeleteContact }) => {
  const [query, setQuery] = useState('');

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  const clearQuery = () => {
    updateQuery('');
  };

  const showingContacts =
    query === '' ? contacts : contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

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
        <Link to="create" relative="path" className="add-contact">
          Add Contact
        </Link>
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
};

export default ListContacts;
