import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from 'css/components/chat-box';
import { createMessage, fetchMessagesRequest } from '../actions/chat';
import Message from '../components/ChatMessage';

const cx = classNames.bind(styles);
const initialChannel = 'Lobby';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.setMessageRef = this.setMessageRef.bind(this);
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
    const { user, messages } = this.props;
    return (
      <div>
        <h2 className={cx('chat-header')}>Chat</h2>
        <div className={cx('chat-window')}>
          <ul className="chat-messages">
            {
              messages.map((message) => {
                return <Message key={message.id} message={message} setMessageRef={this.setMessageRef}/>
              })
            }
          </ul>
        </div>
        <div className={cx('chat-type')}>
          {
            user.authenticated
              ? <textarea onKeyPress={this.handleKeyPress} placeholder="Type To Chat" className={cx('chat-box')}/>
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
