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
          <Link to="dashboard">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Dashboard</div>
            </div>
          </Link>
          <Link to="dashboard">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Buy</div>
            </div>
          </Link>
          <Link to="dashboard">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Sell</div>
            </div>
          </Link>
          <Link to="dashboard">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Account</div>
            </div>
          </Link>
          <Link to="dashboard">
            <div className={cx('SidebarItemContainer')}>
              <div className={cx('SidebarTitle')}>Tools</div>
            </div>
          </Link>
          <Link to="dashboard">
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
