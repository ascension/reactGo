import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/game-container';
const cx = classNames.bind(styles);
import { Circle } from 'rc-progress';
import ChatBox from './Chat';

import GamePlayer from '../components/GamePlayer';

let tm;

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    // this.props.params.gameId

  }

  getStrokeColor() {
    if (this.state.percent > 75) {
      return '#19FF65';
    } else if(this.state.percent > 50) {
      return '#FF9900';
    } else {
      return '#db4437';
    }
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

  render() {
    const degreeFlipped = 3600;
    const { user } = this.props;
    return (
      <div className={cx('wrapper','has-sidebar')}>
        <div className={cx('sidebar')}>
          <ChatBox className={cx('sidebar')}/>
        </div>
        <div className={cx('players')}>
          <GamePlayer/>
          <span className={cx('ticker')}>
            <div className={cx('flip')}>
                <div className={cx('card', {flipped: this.state.isFlipping, gameEnded: this.state.gameEnded})}>
                    <div className={cx('face', 'front')}>Heads</div>
                    <div className={cx('face', 'back')}>Tails</div>
                </div>
            </div>
            <Circle style={{width: '205px', margin: '0 auto', position: 'absolute', top: '50px', left: '480px'}} percent={this.state.percent} strokeWidth="4" strokeColor={this.getStrokeColor()} />
            Flipping in....
            <br/>
            {this.state.timeRemaining.toFixed(2)} sec
            <br/>
            <button onClick={this.handleClick} disabled={this.state.disable}>Flip</button>
          </span>
          <GamePlayer/>
        </div>
      </div>
    );
  }
}

GameContainer.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(GameContainer);
