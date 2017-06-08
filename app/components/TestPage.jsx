import React, { Component } from 'react';
import TextAreaBox from './common/TypeAheadTextBox';
import FlippingCoin from './Coin';
import TotalSummary from './Summary/TotalSummary';
import Chance from 'chance';

const chance = new Chance();

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: 0,
      totalActiveBetsUSD: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    const deg = chance.natural({min: 1, max: 20}) * 180;
    console.log('Flipping: ', deg);
    this.setState({
      degree: this.state.degree + deg,
      totalActiveBetsUSD: deg
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Flip</button>
        <FlippingCoin transform={this.state.degree} front="ascension" back="someguy" showBack={true}/>
        <TotalSummary totalActiveBetsUSD={this.state.totalActiveBetsUSD}/>
      </div>
    )
  }
}

export default TestPage;