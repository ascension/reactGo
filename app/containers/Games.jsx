import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGame, joinGame } from '../actions/game';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';
import autoBind from 'react-autobind';
import CreateGame from '../components/CreateGame';
import Loader from '../components/Loader';

import GameRow from '../components/GameRow';


class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      betAmount: 0
    };
    autoBind(this,
      'betAmountOnChange',
      'closeCreateGameForm',
      'onSubmitCreateGame',
      'renderButton');
  }

  betAmountOnChange(event, newValue) {
    this.setState({
      betAmount: parseInt(newValue)
    })
  }

  onSubmitCreateGame(event) {
    createGame(this.state.betAmount);
  }

  closeCreateGameForm() {
    this.setState({
      showCreateGameForm: false
    });
  }

  renderButton(game) {
    const { user, joinGame } = this.props;

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
          this.props.user.authenticated ? loggedInText : 'Login to Play'
        }
      </button>
    );
  }

  calculateGamePot(gamePlays) {
    let totalBets = 0;

    gamePlays.forEach((gp) => {
      totalBets += gp.betAmount;
    });

    return totalBets;
  }

  render() {
    const { games, createGame, gamePlays } = this.props;
    debugger;
    return (
      <div className={'gameTable'}>
        <div>
          <CreateGame
            onSubmit={createGame}
            onChange={this.betAmountOnChange}
            show={true}
            betAmount={this.state.betAmount}
          />
        </div>
        <div>
          <div className={'game-row'}>
            <div>Game ID</div>
            <div>Pot</div>
            <div>Players</div>
            <div>Created By</div>
            <div>Action</div>
          </div>
          {
            games && typeof gamePlays !== 'undefined' ?
            Object.keys(games).map((gameId) => {
              const game = games[gameId];
              const { gamePlays } = this.props;
              debugger;
             return(
               <GameRow key={game.id} game={game} gamePlays={gamePlays}/>
             )
            })
              :
              <Loader isLoading={true}/>
          }
        </div>
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.object.isRequired,
  createGame: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    games: state.game.games,
    gamePlays: state.game.gamePlays,
    user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default CSSModules(connect(mapStateToProps, { createGame, joinGame })(Games), styles);
