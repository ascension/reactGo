import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game-player.scss';

class GamePlayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, betAmount, chance } = this.props;
    return (
      <span styleName={'wrapper'}>
          <div styleName={'avatar'}>Avatar</div>
          <div styleName={'username'}>{username}</div>
          <div styleName={'chance'}>{betAmount} - {chance}%</div>
      </span>
    );
  }
}

export default CSSModules(GamePlayer, styles);