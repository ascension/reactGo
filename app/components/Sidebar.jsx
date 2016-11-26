import React from 'react';
import styles from 'css/components/sidebar';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
      <div className={cx('SidebarContainer')}>
        <div>
          <Link to="/account/withdraw">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Withdraw</div>
            </div>
          </Link>
          <Link to="/account/deposit">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Deposit</div>
            </div>
          </Link>
          <Link to="/account/settings">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Settings</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Sidebar;
