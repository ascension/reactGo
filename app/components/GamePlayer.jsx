import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/game-player';
const cx = classNames.bind(styles);

class GamePlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className={cx('wrapper')}>
          <div className={cx('avatar')}>Avatar</div>
          <div className={cx('username')}>Username</div>
          <div className={cx('chance')}>$100 - 50.55%</div>
      </span>
    );
  }
}

export default GamePlayer;