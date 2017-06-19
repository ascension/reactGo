import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageInner from '../../components/Layout/PageInner';
import CSSModules from 'react-css-modules';
import styles from '../../css/pages/Deposit.scss'

@CSSModules(styles)
class Deposit extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
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
    const { user: { bitcoinAddress, ethereumAddress } } = this.props;
    return (
      <div>
      <PageInner>
        <form styleName="depositForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="amount">Bitcoin Address</label>
            <input
              id="amount"
              ref="amount"
              title="Withdrawal Address"
              type="text"
              value={bitcoinAddress}
              onChange={this.handleAmountChange} disabled={true}
            />
          </div>
          <div styleName="qrCodeContainer">
            <img
              className="show-for-medium-up qr"
              src={`https://blockchain.info/qr?data=${bitcoinAddress}&size=150`}/>
            <a styleName="bitcoinLink" href={`bitcoin:${bitcoinAddress}`}>Bitcoin Link</a>
          </div>
        </form>
      </PageInner>
        <PageInner>
          <form styleName="depositForm" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="amount">Ethereum Address</label>
              <input
                id="amount"
                ref="amount"
                title="Withdrawal Address"
                type="text"
                value={ethereumAddress}
                onChange={this.handleAmountChange} disabled={true}
              />
            </div>
            <div styleName="qrCodeContainer">
              <img
                className="show-for-medium-up qr"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ethereumAddress}`}/>
              <a styleName="bitcoinLink" href={`bitcoin:${ethereumAddress}`}>Ethereum Link</a>
            </div>
          </form>
        </PageInner>
        <PageInner>
          <h1>Deposit History</h1>
        </PageInner>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, {})(Deposit);