import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { dismissMessage } from 'actions/messages';
import CSSModules from 'react-css-modules';
import styles from '../css/components/message.scss';

const Message = ({message, type, dismissMessage}) => {

  let className = message && message.length > 0 ? ' show' : '';
  className += type === 'SUCCESS' ? ' success' : '';
  className += type === 'ERROR' ? ' error' : '';

  return (
    <div className={className} onClick={dismissMessage}>{message}</div>
  );
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default CSSModules(connect(mapStateToProps, { dismissMessage })(Message), styles);
