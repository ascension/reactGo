import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import styles from '../css/components/login.scss';

@CSSModules(styles)
class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      manualLogin({ username, password });
    } else {
      signUp({ username, password });
    }
  }

  renderHeader() {
    const { user: { isLogin } } = this.props;
    if (isLogin) {
      return (
        <div className={'header'}>
          <h1 className={'heading'}>Login</h1>
        </div>
      );
    }

    return (
      <div className={'header'}>
        <h1 className={'heading'}>Register</h1>
      </div>
    );
  }

  renderFooter() {
    const { user: { isLogin } , toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className={'login-footer'}>
          <div className={'alternative'}>
            <a className={'alternative-link'}
               onClick={toggleLoginMode}>Need an account?</a>
          </div>
        </div>
      );
    }

    return (
      <div className={'login-footer'}>
        <div className={'alternative'}>
          <a className={'alternative-link'}
             onClick={toggleLoginMode}>Already have an account?</a>
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
                <label htmlFor="password">Password</label>
                <input className={'input'}
                  type="password"
                  ref="password"
                  id="password"
                />
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

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister);

