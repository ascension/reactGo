import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from 'css/components/chat-box';
import { createMessage } from '../actions/chat';
import moment from 'moment';
const cx = classNames.bind(styles);

const initialChannel = 'main';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
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
      user: user.username,
      channel: activeChannel,
      createdAt: Date.now()
    });
  }

  componentDidMount() {
    // Fetch the chat messages here.

    // Scroll to the bottom on initialization
    if (this.lastMessage) {
      this.lastMessage.scrollIntoView();
    }
  }

  componentDidUpdate() {
    // Scroll as new elements come along
    if (this.lastMessage) {
      this.lastMessage.scrollIntoView();
    }
  }

  renderMessageText(message) {
    const { user } = this.props;
    var replace = message.replace(`@${user.username}`, `<span>@${user.username}</span>`);
    return (
      <p className={cx('chat-mention')} dangerouslySetInnerHTML={{__html: replace}}/>
    );
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
                return (
                  <li
                    ref={(input) => { this.lastMessage = input; }}
                    key={message.id}
                    className={cx('chat-message', {'is-mod': message.user.isMod, 'is-admin': message.user.isAdmin})}
                  >
                    <h3>{message.user} <small>{moment(message.createdAt).format('HH:mm')}</small></h3>
                    {this.renderMessageText(message.text)}
                  </li>
                );
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
  // typers: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages.data,
    channels: state.channels.data,
    activeChannel: state.activeChannel.name,
    user: state.user
    // typers: state.typers,
  }
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createMessage })(ChatBox);
