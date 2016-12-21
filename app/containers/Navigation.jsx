import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';
import CSSModules from 'react-css-modules';
import styles from '../css/components/navigation.scss';

@CSSModules(styles)
class Navigation extends Component {
  componentWillReceiveProps(nextProps) {
    debugger;
    console.log('nextProps: ', nextProps);
  }

  isCurrentPath(path) {
    if (this.props.routing.locationBeforeTransitions) {
      const currentPath = this.props.routing.locationBeforeTransitions.pathname;
      return path === currentPath;
    } else {
      return false;
    }
  }

  getClassName(path) {
    return this.isCurrentPath(path) ? 'navLink active' : 'navLink';
  }

  render() {
    return (
      <nav styleName={'navigation'} role="navigation">
        <IndexLink to="/" className='item logo'>CryptoDuel</IndexLink>
        <Link className="navLink" activeClassName="active" to="/games">Games</Link>
        <Link className="navLink"  activeClassName="active" to="/account">Account</Link>
        { this.props.user.authenticated ? (
          <Link onClick={logOut} to="/">Logout</Link>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </nav>
    );
  }
}

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    routing: state.routing
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
