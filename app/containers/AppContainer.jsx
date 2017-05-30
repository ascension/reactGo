import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigation from 'containers/Navigation';
import Message from 'containers/Message';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game-container.scss';
import { Circle } from 'rc-progress';
import ChatBox from './Chat';
import ChatSidebar from '../components/Chat/ChatSidebar';

@CSSModules(styles, { allowMultiple: true })
class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };

    this.toggleChat = this.toggleChat.bind(this);
  }

  toggleChat() {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen
      }
    });
  }

  render() {
    const { hasSidebar } = this.props;
    const { isOpen } = this.state;

    const styleName = 'appContainer' + hasSidebar ? ' hasSidebar' : '';

    let sidebarStyle = 'sidebarWrapper';
    sidebarStyle += isOpen ? '' : ' chatClosed';

    return (
      <div styleName='flex'>
        <div styleName={sidebarStyle}>
          <ChatBox isOpen={isOpen} toggleChat={this.toggleChat}/>
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
