import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const newValue = event.target.value;

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, newValue);
    }
  }

  handleSubmit(event) {
    const { onSubmit } = this.props;
    console.log('handleSubmit', event.target.value);
    onSubmit(event.target.value);
  }

  render() {
    return(
      <div style={{visibility: this.props.show ? 'visible' : 'hidden'}}>
        <label>
          Bet Amount
          <input type="number" className={'input'} onChange={this.handleChange} value={this.props.betAmount}/>
        </label>
        <button type="submit" className={'game-btn'} onClick={this.handleSubmit}>Create Game</button>
      </div>
    );
  }
}

CreateGame.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  betAmount: PropTypes.number,
  show: PropTypes.bool
};

export default CSSModules(CreateGame, styles);
