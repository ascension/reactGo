import React, { Component } from 'react';
import PageInner from '../../components/Layout/PageInner';
import Table from '../../components/common/Table';
import CSSModules from 'react-css-modules';
import styles from '../../css/pages/Withdraw.scss'

class Withdraw extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    debugger;
    event.preventDefault();
    console.log('amount', this.refs.amount.value, this.refs.password.value);
    // TODO - Call Action here.
  }
  
  handleAmountChange(event) {
    this.setState((prevState) => {
      return {
        withdrawalAmount: event.target.value
      }
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div>
        <PageInner>
          <h3>Request Withdrawal</h3>
          <form styleName="withdrawForm" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="amount">Amount</label>
              <input id="amount" ref="amount" title="Withdrawal Amount" type="number" onChange={this.handleAmountChange}/>
            </div>
            <div>
              <label htmlFor="address">Withdrawal Address</label>
              <input id="address" ref="address" title="Withdrawal Address" type="text" onChange={this.handleAmountChange}/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" ref="password" title="Withdrawal Address" type="password" onChange={this.handlePasswordChange}/>
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

export default CSSModules(Withdraw, styles);