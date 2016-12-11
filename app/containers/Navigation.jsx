import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import CSSModules from 'react-css-modules';
import styles from '../css/components/navigation.scss';

const Navigation = ({ user, logOut }) => {
    return (
      <nav className={'navigation'} role="navigation">
        <Link to="/"
          styleName={'item logo'}
          activeClassName={'active'}>CryptoDuel</Link>
          <Link to="/about" styleName={'item'} activeClassName={'active'}>About</Link>
          <Link styleName={'item'} to="/games">Games</Link>
          <Link styleName={'item'} to="/account">Account</Link>
          { user.authenticated ? (
            <Link onClick={logOut}
                  styleName={'item'} to="/">Logout</Link>
          ) : (
            <Link styleName={'item'} to="/login">Log in</Link>
          )}
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default CSSModules(connect(mapStateToProps, { logOut })(Navigation), styles);
