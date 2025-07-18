import PropTypes from 'prop-types';

const UserDetails = ({ user, showGamesPlayed }) => {
  const { Username, GamesPlayed } = user;

  const displayData = showGamesPlayed ? `${Username} played ${GamesPlayed} games` : `${Username} played * games`;

  return <li>{displayData}</li>;
};

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  showGamesPlayed: PropTypes.bool.isRequired,
};

export default UserDetails;
