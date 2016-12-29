import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Chance from 'chance';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import styles from '../css/components/login.scss';

@CSSModules(styles)
class Login extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      passwordValue: ''
    }
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin } = this.props;
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    manualLogin({ username, password });
  }

  handlePasswordChange(event) {
    this.setState({
      passwordValue: event.target.value
    })
  }

  renderHeader() {
    return (
      <div className={'header'}>
        <h1 className={'heading'}>Login</h1>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className={'login-footer'}>
        <div className={'alternative'}>
          <Link className={'alternative-link'}
             to="register">Need an account?</Link>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;
    const randPassword = Chance().string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
    const passwordValue = isLogin ? this.state.passwordValue : randPassword;
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
              {
                !isLogin &&
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
              }
              <div>
                <label htmlFor="password">Password</label>
                <input className={'input'}
                  type={isLogin ? "password" : "text"}
                  ref="password"
                  id="password"
                  onChange={this.handlePasswordChange}
                  value={passwordValue}
                  disabled={!isLogin}
                />
                {
                  !isLogin &&
                  <small className="input-error">
                    For your own security, we picked this strong and unique password for you. Write it down!
                  </small>
                }
              </div>
              <div className={'hint'}>
              </div>
              <p className={'message' + message && message.length > 0 ? ' message-show' : ''}>{message}</p>
              <input className={'button'}
                type="submit"
                value={isLogin ? 'Login' : 'Register'} />
            </form>
            { this.renderFooter() }
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin, toggleLoginMode })(Login);

