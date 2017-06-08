import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';
import { createGame } from '../actions/game';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      betAmount: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange(event) {
    const newValue = event.target.value;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, newValue);
    }

    this.setState({
      betAmount: parseInt(newValue)
    });
  }

  handleSubmit() {
    this.props.createGame(this.state.betAmount);
  }

  handleCheckboxChange(event) {
    const newValue = event.target.checked;

    if (typeof this.props.onCheckboxChange === 'function') {
      this.props.onCheckboxChange(event, newValue);
    }

    this.setState({
      allowLowerBet: newValue
    });
  }

  render() {
    return(
      <div style={{visibility: this.props.show ? 'visible' : 'hidden'}}>
        <label>
          Bet Amount
          <input type="number" className="input" onChange={this.handleChange} value={this.state.betAmount}/>
        </label>
        <label>
          Allow Lower Bets
          <input
            type="checkbox"
            value={this.state.allowLowerBet}
            onChange={this.handleCheckboxChange}
            checked={this.state.allowLowerBet}
          />
        </label>
        <button type="submit" className="game-btn" onClick={this.handleSubmit}>Create Game</button>
      </div>
    );
  }
}

CreateGame.propTypes = {
  onChange: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  betAmount: PropTypes.number,
  allowLowerBet: PropTypes.bool,
  show: PropTypes.bool
};

export default CSSModules(CreateGame, styles);
