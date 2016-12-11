import React from 'react';
import Sidebar from '../components/Sidebar';

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
      <div className={'Flex'}>
        <Sidebar />
        <div className={'ContentContainer'}>
          <div className={'Flex'}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;
