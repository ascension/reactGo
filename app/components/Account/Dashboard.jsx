import React, { Component } from 'react';
import Deposit from '../../components/Account/Deposit';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Deposit/>
    )
  }
}

export default Dashboard;
