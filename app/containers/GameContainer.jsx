import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/game-container';
const cx = classNames.bind(styles);
import { Circle } from 'rc-progress';

import GamePlayer from '../components/GamePlayer';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: '100'
    }
  }

  componentDidMount() {
    // TODO - Fetch Game by id.
    // this.props.params.gameId
    setInterval(() => {
      console.log('blah');
      this.setState({
        percent: this.state.percent - 10
      });
    }, 1000);
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
            <Circle style={{width: '100px', margin: '0 auto'}} percent={this.state.percent} strokeWidth="4" strokeColor="#D3D3D3" />
            Flipping in....
            <br/>
            7.8sec
          </span>
          <GamePlayer/>
        </div>
      </div>
    );
  }
}

export default GameContainer;