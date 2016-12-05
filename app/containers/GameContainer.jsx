import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/game-container';
const cx = classNames.bind(styles);
import { Circle } from 'rc-progress';
import { GAME_STATES } from '../../server/config/constants';
import GamePlayer from '../components/GamePlayer';

let tm;

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: GAME_STATES.WAITING,
      percent: 100,
      timeRemaining: 5.0,
      isFlipping: false,
      gameEnded: false,
    };

    this.getStrokeColor = this.getStrokeColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.startCountDown = this.startCountDown.bind(this);
  }

  componentDidMount() {
    // TODO - Fetch Game by id.
    // fetchGame(this.props.params.gameId)
    //   .then((game) => {
    //     console.log('game: ', game);
    //   })
  }

  getStrokeColor() {
    // if (this.state.percent > 75) {
    // } else if(this.state.percent > 50) {
    //   return '#FF9900';
    // } else {
    //   return '#db4437';
    // }
    return '#19FF65';
  }

  startCountDown() {
    tm = setInterval(() => {
      if (this.state.timeRemaining <= 0) {
        clearInterval(tm);
        this.setState({
          isFlipping: true,
          percent: 0,
          timeRemaining: 0,
        }, () => setTimeout(() => {
          this.setState({
            isFlipping: false,
            gameEnded: true
          })
        }, 5000));
      } else {

        const tick = this.state.timeRemaining - 0.2;

        this.setState({
          isFlipping: false,
          percent: tick > 0 ? tick * 20 : 0,
          timeRemaining: tick
        });
      }
    }, 200);
  }

  startGame() {
    this.setState({
      percent: 100,
      timeRemaining: 5.0,
      isFlipping: false,
      gameEnded: false
    }, this.startCountDown());
  }

  handleClick() {
    this.startGame()
  }

  getGameFromStore() {

  }

  gameExists() {
    const { games, params } = this.props;

    const gameExists = games.find((game) => {
      return game.id === parseInt(params.id);
    });
    return gameExists;
  }

  renderCoin() {
    const { games, params } = this.props;
    const game = games.find((game) => {
      return game.id === parseInt(params.id);
    });
    const percent = (game.GamePlays.length / game.maxPlayers) * 100;
    return (
      <div>
      {
        this.state.gameStatus === GAME_STATES.WAITING ?
        <div>
          <span><h2>Waiting for player to join</h2></span>
          <Circle style={{width: '200px', margin: '0 auto', position: 'absolute', top: '0', left: '0'}}
                  percent={percent}
                  strokeWidth="4"
                  strokeColor={this.getStrokeColor()}
          />
        </div>:
        <div>
          <div className={cx('card', {flipped: this.state.isFlipping, gameEnded: this.state.gameEnded})}>
            <div className={cx('face', 'front')}>Heads</div>
            <div className={cx('face', 'back')}>Tails</div>
          </div>
          <Circle style={{width: '200px', margin: '0 auto', position: 'absolute', top: '0', left: '0'}}
          percent={percent}
          strokeWidth="4"
          strokeColor={this.getStrokeColor()}
          />
        </div>
      }
      </div>
    )
  }

  renderGame() {
    const degreeFlipped = 3600;
    const { user, games, params } = this.props;
    const game = games.find((game) => {
      return game.id === parseInt(params.id);
    });

    let totalBets = 0;

    game.GamePlays.forEach((gamePlay) => {
      totalBets += gamePlay.betAmount;
    });

    const usersInGame = game.GamePlays.map((gamePlay) => {
      const chance = parseFloat(Math.round((gamePlay.betAmount / 2250000) * 100) / 100).toFixed(4) * 100;
      return { userId: gamePlay.userId, username: gamePlay.User.username, betAmount: gamePlay.betAmount, chance }
    });

    //If current user isnt in the game this means they are an observer.
    const userIsInGame = usersInGame.find((gamePlay) => {
      return gamePlay.userId === user.id;
    });

    const others = usersInGame.filter((gamePlay) => {
      return gamePlay.userId !== user.id;
    });

    return (
      <div>
        {
          userIsInGame &&
          <GamePlayer
            username={userIsInGame.username}
            chance={userIsInGame.chance}
            betAmount={userIsInGame.betAmount}
          />
        }
        <span className={cx('ticker')}>
            <div className={cx('flip')}>
              {
                this.renderCoin()
              }
            </div>
            Flipping in....
            <br/>
          {game.remainingWaitTime} sec
            <br/>
          {
            usersInGame.length < game.maxPlayers ? <span><h2>Waiting for player to join</h2></span> : ''
          }
          <button onClick={this.handleClick} disabled={this.state.disable}>Flip</button>
          </span>
        {
          others.map((user) => <GamePlayer username={user.username}
                                           chance={user.chance}
                                           betAmount={user.betAmount} />)
        }
      </div>
    );
  }

  render() {
    return (
      <div className={cx('players')}>
        {
          this.gameExists() ? this.renderGame() : <div><h1>Loading...</h1></div>
        }
      </div>
    );
  }
}

GameContainer.propTypes = {
  games: PropTypes.array.isRequired,
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    games: state.game.games,
    user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(GameContainer);
