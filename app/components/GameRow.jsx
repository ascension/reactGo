import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/game';
import moment from 'moment';

const cx = classNames.bind(styles);

const propTypes = {
  game: PropTypes.object.isRequired,
  gamePlays: PropTypes.object.isRequired
};

function GameRow(props) {
  const { game, gamePlays } = props;

  function calculateGamePot() {
    let gamePot = 0;
    game.GamePlays.map((gamePlayId) => {
      const gamePlay = gamePlays[gamePlayId];
      gamePot += gamePlay.betAmount;
      return gamePlay;
    });

    return gamePot;
  }
  debugger;
  return (
    <div className={cx('game-row')} key={game.id}>
      <div>{game.id}</div>
      <div>{calculateGamePot()} bits</div>
      <div>{game.GamePlays.length} / {game.maxPlayers}</div>
      <div>{moment(game.createdAt).format('MM-DD-YYYY')}</div>
      <NavigationButton buttonText="VIEW GAME" link={`/game/${game.id}`} className="game-btn"/>
      <div>
        {
          this.renderButton(game)
        }
      </div>
    </div>
  );
}

GameRow.propTypes = propTypes;

export default GameRow;