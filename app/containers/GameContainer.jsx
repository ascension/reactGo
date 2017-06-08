import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game-container.scss';
import { Circle } from 'rc-progress';
import { GAME_STATES } from '../../server/config/constants';
import GamePlayer from '../components/GamePlayer';
import styled from 'styled-components';
import FlippingCoin from '../components/Coin';

const GameBoard = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 25px;
`;

const WaitingForPlayer = styled.div`
  height: 100%;
  margin: auto;
  flex: 1;
`;

const CoinWrapper = styled.div`
  flex: 2;
  height: 100%;
`;
let tm;

@CSSModules(styles, { allowMultiple: true })
class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: GAME_STATES.WAITING,
      percent: 100,
      timeRemaining: 5.0,
      isFlipping: false,
      gameEnded: false,
      games: props.games,
      gamePlays: props.gamePlays
    };

    this.getStrokeColor = this.getStrokeColor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { games, gamePlays } = nextProps;

    const gameId = this.props.params.id;

    this.setState({
      gameStatus: games[gameId].status,
      games,
      gamePlays,
      timeRemaining: games[gameId].timeRemaining,
      isFlipping: games[gameId].status === GAME_STATES.COMPLETE
    });
  }

  componentDidMount() {
    // TODO - Fetch Game by id.
  }

  getStrokeColor() {
    return '#19FF65';
  }

  gameExists() {
    const { games, params } = this.props;
    return games[params.id];
  }

  renderCoin(playerOne, playerTwo) {
    const { params } = this.props;

    const { games } = this.state;

    const game = games[params.id];

    const percent = game.status === GAME_STATES.STARTING
      ? parseInt(this.state.timeRemaining) / 5000 * 100
      : game.GamePlays.length / game.maxPlayers * 100;
    const gameIsFull = game.GamePlays.length === game.maxPlayers;

    // If Current user is undefined it means they are an observer.
    // let playerOne = {};
    // let playerTwo = {};
    //
    // if(playerOne) {
    //   playerOne = {...playerOne};
    //   playerTwo = {...playerTwo[0]}
    // } else if(playerTwo[0] && playerTwo[1]) {
    //   playerOne = {...playerTwo[0]};
    //   playerTwo = {...playerTwo[1]};
    // }

    let coinStyle = 'card';
    // coinStyle += this.state.isFlipping ? ' flipped' : '';
    let rotate = '0';
    debugger;
    if (game.status === GAME_STATES.COMPLETE && game.winningUserId === playerOne.userId) {
      rotate = -1080;
      // rotate = 2 * -180 * 10;
    } else if (game.status === GAME_STATES.COMPLETE && game.winningUserId === playerTwo.userId) {
      rotate = -1260;
      // rotate = 2 * -180 * 10 + 180;
    }

    console.log('rotating: ', rotate);
    return (
      <FlippingCoin transform={rotate} front={playerOne.username} back={playerTwo ? playerTwo.username : ''} showBack={false}/>
      // <div>
      //   <div>
      //     <div styleName={'flip'}>
      //       <div styleName={coinStyle} style={{ transform: `rotatex(${rotate}deg)` }}>
      //         <div styleName={'face front'}>{playerOne && playerOne.username}</div>
      //         <div styleName={'face back'}>{playerTwo && playerTwo.username}</div>
      //       </div>
      //       <Circle
      //         style={{ width: '200px', margin: '0 auto', position: 'absolute', top: '0', left: '0' }}
      //         percent={percent}
      //         strokeWidth="4"
      //         strokeColor={this.getStrokeColor()}
      //       />
      //     </div>
      //   </div>
      // </div>
    );
  }

  usersChance(totalBets, betAmount) {
    const result = parseFloat(Math.round(betAmount / totalBets * 100) / 100).toFixed(4) * 100;
    return result;
  }

  renderGame() {
    const { user, games, params, gamePlays } = this.props;

    const game = games[params.id];

    let totalBets = 0;

    game.GamePlays.forEach(gamePlayId => {
      const gamePlay = gamePlays[gamePlayId];
      totalBets += parseInt(gamePlay.betAmount);
    });

    const usersInGame = game.GamePlays.map(gamePlayId => {
      const gamePlay = gamePlays[gamePlayId];
      const chance = this.usersChance(totalBets, gamePlay.betAmount);
      return { userId: gamePlay.userId, username: gamePlay.User.username, betAmount: gamePlay.betAmount, chance };
    });

    //If current user isnt in the game this means they are an observer.
    let playerOne, playerTwo;
    if (usersInGame[0]) {
      playerOne = usersInGame[0];
    }
    if (usersInGame[1]) {
      playerTwo = usersInGame[1];
    }

    const others = usersInGame.filter(gamePlay => {
      return gamePlay.userId !== user.id;
    });

    return (
      <GameBoard>
        {playerOne &&
          <GamePlayer
            key={playerOne.userId}
            username={playerOne.username}
            chance={playerOne.chance}
            userId={playerOne.userId}
            betAmount={playerOne.betAmount}
            winningUserId={game.winningUserId}
          />}
        <CoinWrapper>
          {game.GamePlays.length > 0
            ? this.renderCoin(playerOne, playerTwo)
            : <span>Waiting for Players to Join...</span>}
        </CoinWrapper>
        {playerTwo
          ? <GamePlayer
              username={playerTwo.username}
              chance={playerTwo.chance}
              userId={playerTwo.userId}
              key={playerTwo.userId}
              betAmount={playerTwo.betAmount}
              winningUserId={game.winningUserId}
            />
          : <WaitingForPlayer> Waiting for player to join...</WaitingForPlayer>}
      </GameBoard>
    );
  }

  render() {
    return (
      <div styleName={'players'}>
        {this.gameExists() ? this.renderGame() : <div><h1>Loading...</h1></div>}
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
    gamePlays: state.gamePlay.gamePlays,
    user: state.user,
    isLoading: state.isFetching
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(GameContainer);
