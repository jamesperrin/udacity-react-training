import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateNewItem from './components/CreateNewItem';
import DeleteLastItem from './components/DeleteLastItem';
import ShoppingList from './components/ShoppingList';

const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleDeleteLastItem = (event) => {
    setItems(items.slice(0, -1));
  };

  const noItemsFound = () => !(Array.isArray(items) && items.length);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
      <h2>Shopping List</h2>
      <CreateNewItem onAddItem={handleAddItem} />
      <DeleteLastItem onDeleteLastItem={handleDeleteLastItem} buttonDisabled={() => noItemsFound()} />
      <ShoppingList items={items} />
    </div>
  );
};

export default App;
