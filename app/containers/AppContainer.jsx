import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game-container.scss';
import { Circle } from 'rc-progress';
import ChatBox from './Chat';

class GameContainer extends Component {
  render() {
    return (
      <div className={'wrapper has-sidebar'}>
        <div className={'sidebar'}>
          <ChatBox className={'sidebar'}/>
        </div>
        <div className={'players'}>
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
export default CSSModules(connect(mapStateToProps, {})(GameContainer), styles);
