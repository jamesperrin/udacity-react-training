import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateNewItem = ({ onAddItem }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem(value);
    setValue('');
  };

  const inputIsEmpty = () => value === '';

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter New Item" value={value} onChange={handleChange} />
        <button disabled={inputIsEmpty()}>Add</button>
      </form>
    </div>
  );
};

CreateNewItem.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

export default CreateNewItem;
