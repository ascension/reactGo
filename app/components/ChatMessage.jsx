import React from 'react';
import moment from 'moment';
import styles from '../css/components/chat-message.scss';
import CSSModules from 'react-css-modules';

function ChatMessage(props) {
  const { message, setMessageRef } = props;
  function renderMessageText(message) {
    const messageText = message.text;
    var replace = messageText.replace(`@${message.User.username}`, `<span><a href='/user/${message.User.username}'>@${message.User.username}</a></span>`);
    return (
      <p styleName={'chat-mention'} dangerouslySetInnerHTML={{__html: replace}}/>
    );
  }

  function isMod() {
    return message.User.isMod ? 'is-mod' : '';
  }

  function isAdmin() {
    return message.User.isAdmin ? 'is-admin' : '';
  }

  function getStyleNames() {
    return 'chat-message ' + isMod() + isAdmin();
  }

  return (
      <li
        ref={(input) => { setMessageRef(input); }}
        styleName={getStyleNames()}
      >
        <h3>{message.User.username}</h3>
        <span styleName={'timestamp'}>{moment(message.createdAt).format('HH:mm')}</span>

        {renderMessageText(message)}
      </li>
  )
}

export default CSSModules(ChatMessage, styles, { allowMultiple: true });