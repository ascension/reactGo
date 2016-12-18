import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGame, joinGame } from '../actions/game';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';
import CreateGame from '../components/CreateGame';
import Loader from '../components/Loader';

import GameRow from '../components/GameRow';

@CSSModules(styles)
class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      betAmount: 0
    };

    this.betAmountOnChange = this.betAmountOnChange.bind(this);
    this.closeCreateGameForm = this.closeCreateGameForm.bind(this);
    this.onSubmitCreateGame = this.onSubmitCreateGame.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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

  calculateGamePot(gamePlays) {
    let totalBets = 0;

    gamePlays.forEach((gp) => {
      totalBets += gp.betAmount;
    });

    return totalBets;
  }

  renderGamesTable() {
    const { games } = this.props;

    return (
      <div styleName='table'>
        <div styleName={'game-row'}>
          <div>Pot</div>
          <div>Players</div>
          <div>Created By</div>
          <div>Action</div>
        </div>
        {
            Object.keys(games).map((gameId) => {
              const game = games[gameId];
              const { gamePlays, joinGame, user } = this.props;
              return(
                <GameRow key={game.id} game={game} user={user} gamePlays={gamePlays} joinGame={joinGame}/>
              )
            })
        }
      </div>
    );
  }

  render() {
    const { games, createGame, gamePlays } = this.props;
    return (
      <div styleName={'gameTable'}>
        <div>
          <CreateGame
            onSubmit={createGame}
            onChange={this.betAmountOnChange}
            show={true}
            betAmount={this.state.betAmount}
          />
        </div>
        <div style={{height: '100%', marginBottom:'2em'}}>
          {
            Object.keys(games).length > 0 ?
              this.renderGamesTable()
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
    gamePlays: state.gamePlay.gamePlays,
    user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createGame, joinGame })(Games);
