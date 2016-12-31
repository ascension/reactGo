import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange(event) {
    const newValue = event.target.value;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, newValue);
    }
  }

  handleSubmit(event) {
    const { onSubmit, allowLowerBet, betAmount } = this.props;
    onSubmit(betAmount, allowLowerBet);
  }

  handleCheckboxChange(event) {
    const newValue = event.target.checked;

    if (typeof this.props.onCheckboxChange === 'function') {
      this.props.onCheckboxChange(event, newValue);
    }
  }

  render() {
    return(
      <div style={{visibility: this.props.show ? 'visible' : 'hidden'}}>
        <label>
          Bet Amount
          <input type="number" className={'input'} onChange={this.handleChange} value={this.props.betAmount}/>
        </label>
        <label>
          Allow Lower Bets
          <input
            type="checkbox"
            value={this.props.allowLowerBet}
            onChange={this.handleCheckboxChange}
            checked={this.props.allowLowerBet}
          />
        </label>
        <button type="submit" className={'game-btn'} onClick={this.handleSubmit}>Create Game</button>
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
