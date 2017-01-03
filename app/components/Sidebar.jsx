import React from 'react';
import styles from '../css/components/sidebar.scss';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logOut } from '../actions/users';


/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
@CSSModules(styles)
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    this.props.logOut()
  }

  render() {
    return (
      <div styleName={'SidebarContainer'}>
        <Link to="/account/withdraw" activeClassName="active">
          <div styleName={'SidebarItemContainer'}>
            <div styleName={'SidebarTitle'}>Withdraw</div>
          </div>
        </Link>
        <Link to="/account/deposit" activeClassName="active">
          <div styleName={'SidebarItemContainer'}>
            <div styleName={'SidebarTitle'}>Deposit</div>
          </div>
        </Link>
        <Link to="/account/settings" activeClassName="active">
          <div styleName={'SidebarItemContainer'}>
            <div styleName={'SidebarTitle'}>Settings</div>
          </div>
        </Link>
        <Link onClick={this.handleLogoutClick} to="/">
          <div styleName={'SidebarItemContainer'}>
            <div styleName={'SidebarTitle'}>Logout</div>
          </div>
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { logOut })(Sidebar);
