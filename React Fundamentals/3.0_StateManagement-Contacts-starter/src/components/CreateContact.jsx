import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';

const CreateContact = () => {
  return (
    <div>
      <div>Create Contact</div>

      <Link to="/" className="close-create-contact">
        Close
      </Link>
      <form className="create-contact-form">
        <ImageInput className="create-contact-avatar-input" name="avatarURL" id="avatarURL" maxHeight={64} />
        <div className="create-contact-details">
          <input type="text" name="name" id="name" placeholder="Name" aria-label="Name" />
          <input type="text" name="handle" id="handle" placeholder="Handle" aria-label="Handle" />
          <button type="button" title="Add Contact">
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
