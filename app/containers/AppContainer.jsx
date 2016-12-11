import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from 'containers/Navigation';
import Message from 'containers/Message';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game-container.scss';
import { Circle } from 'rc-progress';
import ChatBox from './Chat';

@CSSModules(styles)
class GameContainer extends Component {
  render() {
    const { hasSidebar } = this.props;
    const styleName = 'appContainer' + hasSidebar ? ' hasSidebar' : '';
    return (
      <div styleName='flex'>
        <div styleName="sidebarWrapper">
          <ChatBox/>
        </div>
        <div styleName={'contentWrapper'}>
          <Navigation />
          <Message />
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
