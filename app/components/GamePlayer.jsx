import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/game-player';
const cx = classNames.bind(styles);

class GamePlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, betAmount, chance } = this.props;
    return (
      <span className={cx('wrapper')}>
          <div className={cx('avatar')}>Avatar</div>
          <div className={cx('username')}>{username}</div>
          <div className={cx('chance')}>{betAmount} - {chance}%</div>
      </span>
    );
  }
}

export default GamePlayer;