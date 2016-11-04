import React from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router';


/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

class Dashboard extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div className={cx('Flex')}>
        <Sidebar />
        <div className={cx('ContentContainer')}>
          <div className={cx('Flex')}>
            Testing
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
