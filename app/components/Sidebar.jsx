import React from 'react';
import styles from '../css/components/sidebar.scss';
import CSSModules from 'react-css-modules';


import { Link } from 'react-router';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'SidebarContainer'}>
        <div>
          <Link to="/account/withdraw">
            <div className={'SidebarItemContainer'}>
              <div className={'SidebarTitle'}>Withdraw</div>
            </div>
          </Link>
          <Link to="/account/deposit">
            <div className={'SidebarItemContainer'}>
              <div className={'SidebarTitle'}>Deposit</div>
            </div>
          </Link>
          <Link to="/account/settings">
            <div className={'SidebarItemContainer'}>
              <div className={'SidebarTitle'}>Settings</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Sidebar;
