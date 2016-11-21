import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { createGame, joinGame } from '../actions/game';
import styles from 'css/components/game';
import autoBind from 'react-autobind';
import CreateGame from '../components/CreateGame';
import moment from 'moment';


const cx = classNames.bind(styles);

class Games extends Component {
  constructor(props) {
    super(props);

    this.state = {
      betAmount: 0
    };
    autoBind(this,
      'betAmountOnChange',
      'closeCreateGameForm',
      'onSubmitCreateGame');
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

  render() {
    const { newGame, games, createGame, joinGame } = this.props;
    return (
      <div className={cx('gameTable')}>
        <div>
          <CreateGame
            onSubmit={createGame}
            onChange={this.betAmountOnChange}
            show={true}
            betAmount={this.state.betAmount}
          />
        </div>
        <div>
          <div className={cx('game-row')}>
            <div>Game ID</div>
            <div>Pot</div>
            <div>Players</div>
            <div>Created By</div>
            <div>Action</div>
          </div>
          {
            games.map((game) => {
             return(
             <div className={cx('game-row')} key={game.id}>
               <div>{game.id}</div>
               <div>{this.state.betAmount}</div>
               <div>{game.GamePlays.length} / {game.maxPlayers}</div>
               <div>{moment(game.createdAt).format('MM-DD-YYYY')}</div>
               <div>
                 <button
                   className={cx('game-btn')}
                   onClick={() => {joinGame(game.id)}}
                 >Join Game</button>
               </div>
             </div>
             )
            })
          }
        </div>
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired,
  createGame: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    games: state.game.games
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createGame, joinGame })(Games);
