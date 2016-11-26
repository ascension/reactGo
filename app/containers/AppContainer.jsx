import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames/bind';
import styles from 'css/components/game-container';
const cx = classNames.bind(styles);
import { Circle } from 'rc-progress';
import ChatBox from './Chat';

import GamePlayer from '../components/GamePlayer';

class GameContainer extends Component {
  render() {
    return (
      <div className={cx('wrapper','has-sidebar')}>
        <div className={cx('sidebar')}>
          <ChatBox className={cx('sidebar')}/>
        </div>
        <div className={cx('players')}>
          {this.props.children}
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
