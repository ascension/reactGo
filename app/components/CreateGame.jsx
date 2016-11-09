import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames/bind';
import styles from 'css/components/game';

const cx = classNames.bind(styles);

class CreateGame extends Component {
  constructor(props) {
    super(props);

    autoBind(this, 'handleChange', 'handleSubmit');
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
          <input type="number" className={cx('input')} onChange={this.handleChange} value={this.props.betAmount}/>
        </label>
        <button type="submit" className={cx('game-btn')} onClick={this.handleSubmit}>Create Game</button>
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

export default CreateGame;
