import CSSModules from 'react-css-modules';
import styles from 'css/components/game';
import { browserHistory } from 'react-router';



function ViewGame(props) {

  function onClick() {
    const { gameId } = props;
    browserHistory.push(`/game/${gameId}`)
  }

  return (
    <div>
      <button
        onClick={onClick}
        className={game-btn'}
      >VIEW GAME</button>
    </div>
  );
}

export default ViewGame;