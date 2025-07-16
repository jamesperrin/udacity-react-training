import ListItem from './ListItem';
import PropTypes from 'prop-types';

const ShoppingList = ({ items }) => {
  return (
    <div>
      <p className="items">Items</p>
      <ol className="item-list">
        {items.map((item, idx) => (
          <ListItem key={idx} item={item} />
        ))}
      </ol>
    </div>
  );
};

ShoppingList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ShoppingList;
