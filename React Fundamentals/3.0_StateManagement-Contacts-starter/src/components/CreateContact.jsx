import { Link, useNavigate } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';
import PropTypes from 'prop-types';

const CreateContact = ({ onCreateContact }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true });

    if (onCreateContact) {
      onCreateContact(values);
    }
  };

  return (
    <div>
      <h1>Create Contact</h1>

      <Link to="/" className="close-create-contact">
        Close
      </Link>
      <form className="create-contact-form" onSubmit={handleSubmit}>
        <ImageInput className="create-contact-avatar-input" name="avatarURL" id="avatarURL" maxHeight={64} />
        <div className="create-contact-details">
          <input type="text" name="name" id="name" placeholder="Name" aria-label="Name" />
          <input type="text" name="handle" id="handle" placeholder="Handle" aria-label="Handle" />
          <button
            type="submit"
            className="create-contact-details-btn create-contact-details-btn__add"
            title="Add Contact">
            Add Contact
          </button>
          <button
            type="button"
            className="create-contact-details-btn create-contact-details-btn__cancel"
            onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

CreateContact.propTypes = {
  onCreateContact: PropTypes.func.isRequired,
};

export default CreateContact;
