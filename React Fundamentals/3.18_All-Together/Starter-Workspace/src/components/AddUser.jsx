import { useState } from 'react';
import PropTypes from 'prop-types';

const initialFormData = {
  'FirstName': '',
  'LastName': '',
  'Username': '',
};

const AddUser = ({ users, onUserAdd }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  const userExists = (user) => {
    // If calling a remote web serivce, validating a response.
    // const userFound = users.filter((u) => u.Username.toLowerCase() === user.Username.toLowerCase());
    // return Array.isArray(userFound) && !!userFound.length;

    // If checking against an array
    return users.some((u) => u.Username.toLowerCase() === user.Username.toLowerCase());
  };

  const handleAddUserButton = () => {
    setShowForm(true);
    setShowAddButton(false);
  };

  const handleFormValid = () => {
    const isValid = !(formData.FirstName === '' || formData.LastName === '' || formData.Username === '');
    setIsFormValid(isValid);
    setAddButtonDisabled(!isValid);
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    handleFormValid();
    setError('');
  };

  const handleFormCancel = () => {
    setFormData(initialFormData);
    setError('');
    setShowForm(false);
    setAddButtonDisabled(true);
    setShowAddButton(true);
  };

  const hanldeSubmit = (e) => {
    e.preventDefault();
    handleFormValid();

    if (!isFormValid) {
      return;
    }

    const user_exists = userExists(formData);

    if (user_exists) {
      setError('Username already exists. Please choose a different username.');
      return;
    }

    if (isFormValid && !error) {
      onUserAdd(formData);
      setFormData(initialFormData);
      setError('');
      setShowForm(false);
      setShowAddButton(true);
      setAddButtonDisabled(true);
    }
  };

  const formClass = showForm ? 'show' : 'hide';
  const addButtonClass = showAddButton ? 'show' : 'hide';

  return (
    <div className="form-container">
      <div className="form-button-adduser">
        <button type="button" onClick={handleAddUserButton} className={`${addButtonClass}`}>
          Add New User
        </button>
      </div>

      <div className={`form-wrapper ${formClass}`} aria-live="polite">
        <fieldset>
          <h2>Add User</h2>

          {error ? (
            <div className="form-error" aria-live="polite">
              <div>{error}</div>
            </div>
          ) : (
            ''
          )}

          <form onSubmit={hanldeSubmit}>
            <div>
              <label htmlFor="FirstName">First Name: </label>
              <input
                type="text"
                id="FirstName"
                name="FirstName"
                required
                value={formData.FirstName}
                onPointerEnter={handleFormValid}
                onPointerLeave={handleFormValid}
                onBlur={handleFormValid}
                onFocus={handleFormValid}
                onChange={(e) => handleChange('FirstName', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="LastName">Last Name: </label>
              <input
                type="text"
                id="LastName"
                name="LastName"
                required
                value={formData.LastName}
                onPointerEnter={handleFormValid}
                onPointerLeave={handleFormValid}
                onBlur={handleFormValid}
                onFocus={handleFormValid}
                onChange={(e) => handleChange('LastName', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="Username">Username: </label>
              <input
                type="text"
                id="Username"
                name="Username"
                required
                value={formData.Username}
                onPointerEnter={handleFormValid}
                onPointerLeave={handleFormValid}
                onBlur={handleFormValid}
                onFocus={handleFormValid}
                onChange={(e) => handleChange('Username', e.target.value)}
              />
            </div>
            <div style={{ marginTop: '5px' }}>
              <input type="submit" value="Add User" disabled={addButtonDisabled} />
              <button type="button" onClick={handleFormCancel}>
                Cancel
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

AddUser.propTypes = {
  users: PropTypes.array.isRequired,
  onUserAdd: PropTypes.func.isRequired,
};

export default AddUser;
