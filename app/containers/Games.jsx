import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createGame, joinGame } from '../actions/game';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';
import Loader from '../components/Loader';
import TotalSummary from '../components/Summary/TotalSummary';
import UserSummary from '../components/Summary/UserSummary';
import { SummaryContainer } from '../components/Summary';

import GameRow from '../components/GameRow';

@CSSModules(styles)
class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      betAmount: 0,
      allowLowerBet: false
    };

    this.closeCreateGameForm = this.closeCreateGameForm.bind(this);
    this.onSubmitCreateGame = this.onSubmitCreateGame.bind(this);
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

    gamePlays.forEach(gp => {
      totalBets += gp.betAmount;
    });

    return totalBets;
  }

  renderGamesTable() {
    const { games } = this.props;

    return (
      <div styleName="table">
        <div styleName={'game-row'}>
          <div>Created At</div>
          <div>Pot</div>
          <div>Players</div>
          <div />
        </div>
        {games.map(game => {
          const { gamePlays, joinGame, user } = this.props;
          return <GameRow key={game.id} game={game} user={user} gamePlays={gamePlays} joinGame={joinGame} />;
        })}
      </div>
    );
  }

  render() {
    const { games, createGame, gamePlays, isLoading } = this.props;
    return (
      <div styleName={'gameTable'}>
        <SummaryContainer>
          <TotalSummary />
          <UserSummary createGame={createGame} />
        </SummaryContainer>
        <div style={{ height: '100%', marginBottom: '2em' }}>
          {isLoading ? <Loader isLoading={true} /> : this.renderGamesTable()}
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
  const games = Object.values(state.game.games).filter(game => {
    return game.status !== 'COMPLETE';
  });
  return {
    gameIds: games,
    games: games,
    gamePlays: state.gamePlay.gamePlays,
    user: state.user,
    isLoading: state.isFetching
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createGame, joinGame })(Games);
