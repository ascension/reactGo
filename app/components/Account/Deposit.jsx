import React, { Component } from 'react';
import PageInner from '../../components/Layout/PageInner';
import CSSModules from 'react-css-modules';
import styles from '../../css/pages/Deposit.scss'

class Deposit extends Component {

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
      <PageInner>
        <form styleName="depositForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="amount">Bitcoin Address</label>
            <input id="amount" ref="amount" title="Withdrawal Address" type="number" onChange={this.handleAmountChange} disabled={true}/>
            <a href="bitcoin:1MCyfDp3AhbXQC3XjLwcmSp6wozTSPbYEJ">Bitcoin Link</a>
          </div>
          <div>
            <img
              className="show-for-medium-up qr"
              src="https://blockchain.info/qr?data=1MCyfDp3AhbXQC3XjLwcmSp6wozTSPbYEJ&amp;size=150"/>
          </div>
        </form>
      </PageInner>
    );
  }
}

export default CSSModules(Deposit, styles);