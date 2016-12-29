import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Chance from 'chance';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { signUp } from 'actions/users';
import styles from '../css/components/login.scss';

@CSSModules(styles)
class Register extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    const randPassword = Chance().string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    });

    this.state = {
      passwordValue: randPassword
    }
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    const email = ReactDOM.findDOMNode(this.refs.email).value;
    signUp({ username, password, email });
  }

  handlePasswordChange(event) {
    this.setState({
      passwordValue: event.target.value
    })
  }

  renderHeader() {
    return (
      <div className={'header'}>
        <h1 className={'heading'}>Register</h1>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className={'login-footer'}>
        <div className={'alternative'}>
          <Link className={'alternative-link'}
             to="login">Already have an account?</Link>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;
    return (
      <div className={'login'}>
        <div className={'container'}>
          <div className={'email-container'}>
            { this.renderHeader() }
            <form onSubmit={this.handleOnSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input className={'input'}
                  type="text"
                  ref="username"
                  id="username"
                />
              </div>
                <div>
                  <label htmlFor="email">*Recovery Email</label>
                  <input className={'input'}
                         type="email"
                         ref="email"
                         id="email"
                  />
                  <small className="input-error">
                    Entering your e-mail is optional, but if you lose your password, you will lose your account.
                  </small>
                </div>
              <div>
                <label htmlFor="password">Password</label>
                <input className={'input'}
                  type="text"
                  ref="password"
                  id="password"
                  onChange={this.handlePasswordChange}
                  value={this.state.passwordValue}
                  disabled={!isLogin}
                />
                  <small className="input-error">
                    For your own security, we picked this strong and unique password for you. Write it down!
                  </small>
              </div>
              <div className={'hint'}>
              </div>
              <p className={'message' + message && message.length > 0 ? ' message-show' : ''}>{message}</p>
              <input className={'button'}
                type="submit"
                value={'Register'} />
            </form>
            { this.renderFooter() }
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object,
  signUp: PropTypes.func.isRequired
};

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { signUp })(Register);

