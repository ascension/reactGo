import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div style={{ padding: '20px' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Dashboard;
