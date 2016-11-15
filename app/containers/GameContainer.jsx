import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/game-container';
const cx = classNames.bind(styles);
import { Circle } from 'rc-progress';

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
      isFlipping: false
    }, this.startCountDown());
  }

  handleClick() {
    this.startGame()
  }

  render() {
    return (
      <div className={cx('wrapper','has-sidebar')}>
        <div className={cx('sidebar')}>
          <h2 className={cx('chat-header')}>Chat</h2>
          <div className={cx('chat-window')}>
            <ul className="chat-messages">
              <li className={cx('chat-message')}>
                <h3>Tim</h3>
                <p>Testing</p>
              </li>
              <li className={cx('chat-message', {'is-mod': true})}>
                <h3>Tim</h3>
                <p>Testing</p>
              </li>
              <li className={cx('chat-message',{'is-admin': true})}>
                <h3>Tim</h3>
                <p>Testing</p>
              </li>
            </ul>
          </div>
          <div className={cx('chat-type')}>
            <h3><a href="/login">Please Login</a> to chat.</h3>
          </div>
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

export default GameContainer;