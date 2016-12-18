import CSSModules from 'react-css-modules';
import styles from '../css/components/JoinGameBtn.scss';

function JoinGameBtn(props) {
  const { user, joinGame, gamePlays } = props;

  const userHasAlreadyJoined = game.GamePlays.find((gamePlayId) => {
    const gamePlay = gamePlays[gamePlayId];
    return gamePlay.userId === user.id;
  });

  const loggedInText = userHasAlreadyJoined ? 'Already Joined' : 'Join Game';

  return (
    <button
      styleName={'game-btn'}
      onClick={() => {joinGame(game.id)}}
    >
      {
        user.authenticated ? loggedInText : 'Login to Play'
      }
    </button>
  );
}

export default CSSModules(JoinGameBtn, styles);