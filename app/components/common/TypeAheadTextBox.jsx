import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindClassMethods } from '../../util/commonUtil';
import CSSModules from 'react-css-modules';
import styles from '../../css/components/typeAhead.scss';

const mockUsers = {
  5: {
    username: 'jerroddb'
  },
  6: {
    username: 'ascension'
  },
  7: {
    username: 'whitetuxpeng'
  },
  8: {
    username: 'whale'
  },
  9: {
    username: 'who'
  }
};

@CSSModules(styles)
class TypeAheadTextBox extends Component {
  constructor(props) {
    super(props);

    bindClassMethods.call(
      this,
      'handleOnChange',
      'handleKeyPress',
      'inputChange',
      'handleKeyDown',
      'handleUserClicked'
    );

    this.state = {
      isOpen: false,
      filteredUsers: mockUsers,
      focusedOption: null
    }
  }

  handleKeyPress(event) {
    console.log('event: ', event.key);
    if (event.key == "@") {
      this.setState({
        isOpen: true
      }, () => {
        this.refs.users.focus();
      });
    }
  }

  handleOnChange(event) {

  }

  inputChange(event) {
    const filteredUsers = {};
    Object.keys(mockUsers).forEach((userId) => {
      const user = mockUsers[userId];
      if(user.username.includes(event.target.value)) {
        filteredUsers[userId] = user;
      }
    });

    this.setState({
      filteredUsers
    });
  }

  focusPreviousOption() {
    const { filteredUsers, focusedOption } = this.state;

    const userIds = Object.keys(filteredUsers);

    if (focusedOption === null)  {
      this.setState({
        focusedOption: userIds[0]
      })
    }

    const currentIndex = userIds.indexOf(focusedOption);
    const newIndex = currentIndex - 1;
    if(userIds[newIndex]) {
      this.setState({
        focusedOption: userIds[newIndex]
      });
    }
  }

  focusNextOption() {
    const { filteredUsers, focusedOption } = this.state;

    const userIds = Object.keys(filteredUsers);

    if (focusedOption === null)  {
      this.setState({
        focusedOption: userIds[0]
      })
    }

    const currentIndex = userIds.indexOf(focusedOption);
    const newIndex = currentIndex + 1;
    if(userIds[newIndex]) {
      this.setState({
        focusedOption: userIds[newIndex]
      });
    }
  }

  selectFocusedOption() {

  }

  // pulled from https://github.com/JedWatson/react-select/blob/master/src/Select.js
  handleKeyDown (event) {
    console.log('handleKeyDown: ', event.keyCode);

    var src = event.target.value;
    var text = src.replace(/a/g,'');
    var caret = event.target.selectionStart - (src.length-text.length);
    this.refs.users.setSelectionRange(caret,caret);

    switch (event.keyCode) {
      case 38: // up
        this.focusPreviousOption();
        break;
      case 40: // down
        this.focusNextOption();
        break;
      case 13: // enter
        if (!this.state.isOpen) return;
        event.stopPropagation();
        this.selectFocusedOption();
        break;
      default: return;
    }
    event.preventDefault();
  }

  handleUserClicked(userId) {
    console.log('handleUserClick: ', userId);
    this.setState({
      focusedOption: userId
    })
  }

  render() {

    const userListStyle = {visibility: this.state.isOpen ? 'visible' : 'hidden'};

    return (
      <div>
          <textarea onKeyPress={this.handleKeyPress} onChange={this.handleOnChange}/>
          <div>
          <div style={userListStyle}>
            <input ref="users" onChange={this.inputChange} onKeyDown={this.handleKeyDown}/>
            <ul style={userListStyle} styleName="list">
              {
                Object.keys(this.state.filteredUsers).map((userId) => {
                  const user = mockUsers[userId];
                  debugger;
                  const listStyle = { backgroundColor: this.state.focusedOption == userId ? 'grey' : '' };
                  return (
                    <li
                      styleName="option"
                      style={listStyle}
                      key={userId}
                      tabIndex={userId}
                      onClick={() => {this.handleUserClicked(userId)}}
                      onFocus={() => {this.handleUserClicked(userId)}}
                    >
                      @{user.username}
                    </li>
                  );
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TypeAheadTextBox;