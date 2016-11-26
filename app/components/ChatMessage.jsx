import React from 'react';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from 'css/components/chat-message';

const cx = classNames.bind(styles);

export default function ChatMessage(props) {
  const { message, setMessageRef } = props;
  function renderMessageText(message) {
    const messageText = message.text;
    var replace = messageText.replace(`@${message.User.username}`, `<span><a href='/user/${message.User.username}'>@${message.User.username}</a></span>`);
    return (
      <p className={cx('chat-mention')} dangerouslySetInnerHTML={{__html: replace}}/>
    );
  }

  return (
      <li
        ref={(input) => { setMessageRef(input); }}
        className={cx('chat-message', {'is-mod': message.User.isMod, 'is-admin': message.User.isAdmin})}
      >
        <h3>{message.User.username}</h3>
        <span className={cx('timestamp')}>{moment(message.createdAt).format('HH:mm')}</span>

        {renderMessageText(message)}
      </li>
  )
}