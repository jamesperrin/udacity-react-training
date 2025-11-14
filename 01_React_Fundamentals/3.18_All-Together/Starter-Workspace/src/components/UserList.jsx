import { useState } from 'react';
import UserDetails from './UserDetails';
import PropTypes from 'prop-types';

const UserList = ({ users }) => {
  const [showGamesPlayed, setShowGamesPlayed] = useState(true);

  const toggleShowGames = () => {
    setShowGamesPlayed(!showGamesPlayed);
  };

  const showGamesButtonText = showGamesPlayed ? `Hide the Number of Games Played` : `Show the Number of Games Played`;

  return (
    <section className="list-container">
      <h1>User List</h1>
      <div>
        <button type="button" onClick={toggleShowGames} style={{ marginBottom: '5px' }}>
          {showGamesButtonText}
        </button>
      </div>
      <div>
        <ol className="users-list">
          {users.map((user) => (
            <UserDetails key={user.Username} user={user} showGamesPlayed={showGamesPlayed} />
          ))}
        </ol>
      </div>
    </section>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
