import PropTypes from 'prop-types';

const ListItem = ({ item }) => {
  return <li>{item}</li>;
};

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
};

export default ListItem;
