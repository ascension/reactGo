import React, { Component } from 'react';
import PageInner from '../../components/Layout/PageInner';
import Table from '../../components/common/Table';
import CSSModules from 'react-css-modules';
import styles from '../../css/pages/Withdraw.scss';
import { connect } from 'react-redux';

import { withdraw } from '../../actions/users';

@CSSModules(styles)
class Withdraw extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { withdrawAction } = this.props;
    event.preventDefault();
    withdrawAction({
      amount: this.refs.amount.value,
      password: this.refs.password.value,
      withdrawalAddress: this.refs.address.value
    });
    // TODO - Call Action here.
  }

  render() {
    return (
      <div>
        <PageInner>
          <h3>Request Withdrawal</h3>
          <form styleName="withdrawForm" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="amount">Amount</label>
              <input id="amount" ref="amount" title="Withdrawal Amount" type="number"/>
            </div>
            <div>
              <label htmlFor="address">Withdrawal Address</label>
              <input id="address" ref="address" title="Withdrawal Address" type="text"/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" ref="password" title="Withdrawal Address" type="password"/>
            </div>
            <div>
              <button type="submit">Withdraw</button>
            </div>
          </form>
        </PageInner>
        <PageInner>
          <h3>Withdraw History</h3>
          <Table>
            <div>Row 1</div>
            <div>Row 2</div>
            <div>Row 3</div>
          </Table>
        </PageInner>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { withdrawAction: withdraw })(Withdraw);