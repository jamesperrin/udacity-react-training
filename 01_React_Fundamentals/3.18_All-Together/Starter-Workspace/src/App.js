import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import AddUser from './components/AddUser';

const initialUserData = [
  {
    'FirstName': 'John',
    'LastName': 'Doe',
    'Username': 'johndoe',
    'GamesPlayed': 1,
  },
  {
    'FirstName': 'Jane',
    'LastName': 'Doe',
    'Username': 'janedoe',
    'GamesPlayed': 2,
  },
];

const App = () => {
  const [users, setUsers] = useState(initialUserData);

  const handleAddUser = (user) => {
    // When the user is added, the number of games that he/she has played defaults to 0.
    user = { ...user, 'GamesPlayed': 0 };
    // setUsers((prevData) => [...prevData, user]);
    setUsers([...users, user]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice - All Together</h1>
      </header>
      <AddUser users={users} onUserAdd={handleAddUser} />
      <UserList users={users} />
    </div>
  );
};

export default App;
