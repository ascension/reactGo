import classNames from 'classnames/bind';
import styles from 'css/components/game';
import { browserHistory } from 'react-router';

const cx = classNames.bind(styles);

function ViewGame(props) {

  function onClick() {
    const { gameId } = props;
    browserHistory.push(`/game/${gameId}`)
  }

  return (
    <div>
      <button
        onClick={onClick}
        className={cx('game-btn')}
      >VIEW GAME</button>
    </div>
  );
}

export default ViewGame;