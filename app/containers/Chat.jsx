import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from '../css/components/chat-box.scss';
import { createMessage, fetchMessagesRequest } from '../actions/chat';
import Message from '../components/ChatMessage';

const initialChannel = 'Lobby';

@CSSModules(styles, { allowMultiple: true })
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.setMessageRef = this.setMessageRef.bind(this);

    this.state = {
      isOpen: props.isOpen
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;
    console.log('newProps: ', nextProps);
    this.setState({
      isOpen
    });
  }

  handleKeyPress(event) {
    if (event.charCode === 13 && !event.shiftKey) {
      // Dispatch Submit Message Action
      this.submitMessage(event.target.value);
      event.preventDefault();
      event.target.value = '';
    }
  }

  submitMessage(message) {
    const { user, activeChannel } = this.props;
    this.props.createMessage({
      id: Date.now(),
      text: message,
      User: { username: user.username },
      channel: activeChannel,
      createdAt: Date.now()
    });
  }

  componentDidMount() {
    this.props.fetchMessagesRequest(initialChannel);

    if (this.lastMessage) {
      this.lastMessage.scrollIntoView();
    }
  }

  componentDidUpdate() {
    if (this.lastMessage) {
      this.lastMessage.scrollIntoView();
    }
  }

  setMessageRef(ref) {
    this.lastMessage = ref;
  }

  render() {
    const { user, messages, toggleChat } = this.props;
    const { isOpen } = this.state;
    console.log('isOpen: ', isOpen);
    const chatContainerStyle = ['chatContainer'];

    if (!isOpen) chatContainerStyle.push('closed');

    return (
      <div styleName={chatContainerStyle.join(' ')}>
            <div>
              <div styleName='chat-header'>
                <div style={{flex: '1'}}>
                  <i className="fa fa-users" aria-hidden="true"/>
                </div>
                <div style={{flex: '1'}}>
                  <h2 >Chat</h2>
                </div>
                <div style={{flex: '1', justifyContent: 'flex-end'}}>
                  {
                    isOpen ? <div styleName="cross-icon" onClick={toggleChat}/> :
                      <div styleName="chat-icon" onClick={toggleChat}/>
                  }
                </div>
              </div>
            </div>
        <div styleName='chat-window'>
          <ul className="chat-messages">
            {
              messages.map((message) => {
                return <Message key={message.id} message={message} setMessageRef={this.setMessageRef}/>
              })
            }
          </ul>
        </div>
        <div styleName={'chat-type'}>
          {
            user.authenticated
              ? <textarea onKeyPress={this.handleKeyPress} placeholder="Type To Chat" styleName={'chat-box'}/>
              : <h3><a href="/login">Please Login</a> to chat.</h3>
          }

        </div>
      </div>
    );
  }
}

ChatBox.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  channels: PropTypes.array.isRequired,
  activeChannel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleChat: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages.data,
    channels: state.channels.data,
    activeChannel: state.activeChannel.name,
    user: state.user
  }
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createMessage, fetchMessagesRequest })(ChatBox);
