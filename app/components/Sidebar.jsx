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
      <div styleName={'SidebarContainer'}>
        <div>
          <Link to="/account/withdraw">
            <div styleName={'SidebarItemContainer'}>
              <div styleName={'SidebarTitle'}>Withdraw</div>
            </div>
          </Link>
          <Link to="/account/deposit">
            <div styleName={'SidebarItemContainer'}>
              <div styleName={'SidebarTitle'}>Deposit</div>
            </div>
          </Link>
          <Link to="/account/settings">
            <div styleName={'SidebarItemContainer'}>
              <div styleName={'SidebarTitle'}>Settings</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default CSSModules(Sidebar, styles);
