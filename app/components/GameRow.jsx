import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';
import moment from 'moment';

import NavigationButton from '../components/NavigationButton';

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

  function renderButton(game) {
    const { user, joinGame } = props;

    const userHasAlreadyJoined = game.GamePlays.find((gamePlay) => {
      return gamePlay.userId === user.id;
    });

    const loggedInText = userHasAlreadyJoined ? 'Already Joined' : 'Join Game';

    return (
      <button
        className={'game-btn'}
        onClick={() => {joinGame(game.id)}}
      >
        {
          user.authenticated ? loggedInText : 'Login to Play'
        }
      </button>
    );
  }


  return (
    <div styleName={'game-row'} key={game.id}>
      <div>{game.id}</div>
      <div>{game.GamePlays ? calculateGamePot() : '0'} bits</div>
      <div>{game.GamePlays.length} / {game.maxPlayers}</div>
      <div>{moment(game.createdAt).format('MM-DD-YYYY')}</div>
      <NavigationButton buttonText="VIEW GAME" link={`/game/${game.id}`} styleName="game-btn"/>
      <div>
        {
          renderButton(game)
        }
      </div>
    </div>
  );
}

GameRow.propTypes = propTypes;

export default CSSModules(GameRow, styles);