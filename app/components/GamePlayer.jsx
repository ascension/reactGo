import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game-player.scss';

import styled, { css } from 'styled-components';

const isWinner = css`
  border: 1px solid 
`;

const PlayerWrapper = styled.div`
  flex: 1;
  width: 150px;
  height: 100%;
  margin: auto;
  @media (max-width: 768px) {
    width: 100px;
  }
  border: 2px solid ${props => props.isWinner ? '#4aed78' : 'transparent'};
  border-radius: 10px;
  padding: 50px 0;
`;

const AvatarImage = styled.div`
  background-image: url('http://prod.static.broncos.clubs.nfl.com/nfl-assets/img/gbl-ico-team/DEN/logos/home/large.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
`;

class GamePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winningUserId: props.winningUserId
    };
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    const { winningUserId, userId } = nextProps;

    if (nextProps.winningUserId !== this.state.winningUserId) {
      if (winningUserId === userId) {

        if (!this.delayWinner) {
          this.delayWinner = setTimeout(() => {
            this.setState({
              winningUserId
            });
          }, 5000)
        }
      }
    }
  }

  render() {
    const { username, betAmount, chance, winningUserId, userId } = this.props;
    let userIsWinner = false;

    if (winningUserId !== null) {
      userIsWinner = userId === winningUserId;
    }

    return (
      <PlayerWrapper isWinner={this.state.winningUserId === userId}>
        <AvatarImage styleName={'avatar'}/>
        <div styleName={'username'}>{username}</div>
        <div styleName={'chance'}>{betAmount} - {chance}%</div>
      </PlayerWrapper>
    );
  }
}

export default CSSModules(GamePlayer, styles);