import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import styles from '../css/components/login.scss';
import hourGlassSvg from 'images/hourglass.svg';



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
    const { user: { isLogin } , toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className={'header'}>
          <h1 className={'heading'}>Login</h1>
          <div className={'alternative'}>
            Not what you want?
            <a className={'alternative-link'}
              onClick={toggleLoginMode}> Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className={'header'}>
      <h1 className={'heading'}>Register</h1>
        <div className={'alternative'}>
          Already have an account?
          <a className={'alternative-link'}
            onClick={toggleLoginMode}> Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div className={'login' + isWaiting ? ' waiting' : ''}>
        <div className={'container'}>
          { this.renderHeader() }
          <img className={'loading'} src={hourGlassSvg} />
          <div className={'email-container'}>
            <form onSubmit={this.handleOnSubmit}>
              <input className={'input'}
              type="username"
              ref="username"
              placeholder="username" />
              <input className={'input'}
              type="password"
              ref="password"
              placeholder="password" />
              <div className={'hint'}>
              </div>
              <p className={'message' + message && message.length > 0 ? ' message-show' : ''}>{message}</p>
              <input className={'button'}
                type="submit"
                value={isLogin ? 'Login' : 'Register'} />
            </form>
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

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default CSSModules(connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister), styles);

