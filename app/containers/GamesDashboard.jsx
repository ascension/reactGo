import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGame, joinGame } from '../actions/game';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';

import CreateGame from '../components/CreateGame';

@CSSModules(styles)
function GamesDashboard(props) {
  return (
    <div styleName="container">
      <CreateGame
    </div>
  );
}

GamesDashboard.propTypes = {
  games: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    games: state.game.games,
    gamePlays: state.gamePlay.gamePlays,
    user: state.user
  };
}

export default connect(mapStateToProps, { joinGame })(GamesDashboard);