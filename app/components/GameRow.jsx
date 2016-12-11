import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';
import moment from 'moment';

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
    <div styleName={'game-row'} key={game.id}>
      <div>{game.id}</div>
      <div>{calculateGamePot()} bits</div>
      <div>{game.GamePlays.length} / {game.maxPlayers}</div>
      <div>{moment(game.createdAt).format('MM-DD-YYYY')}</div>
      <NavigationButton buttonText="VIEW GAME" link={`/game/${game.id}`} styleName="game-btn"/>
      <div>
        {
          this.renderButton(game)
        }
      </div>
    </div>
  );
}

GameRow.propTypes = propTypes;

export default CSSModules(GameRow, styles);