import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game-player.scss';

class GamePlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, betAmount, chance, gameOutcome, userId } = this.props;
    let userIsWinner = false;
    let outcomeIsSet = false;

    if (gameOutcome !== null) {
      debugger;
      outcomeIsSet = outcomeIsSet !== null;
      userIsWinner = userId == gameOutcome;
    }
    return (
      <span styleName={'wrapper'}>
          <div styleName={'avatar'}>Avatar</div>
          <div styleName={'username'}>{username}</div>
          <div styleName={'chance'}>{betAmount} - {chance}%</div>
          {
            outcomeIsSet && userIsWinner &&
            <h3>Winner</h3>
          }
      </span>
    );
  }
}

export default CSSModules(GamePlayer, styles);