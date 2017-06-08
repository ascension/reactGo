import React from 'react';
import AnimatedNumber from 'react-animated-number';
import CreateGame from '../CreateGame';
import { createGame } from '../../actions/game';

import { SummaryBlock, SummaryRow, SummaryItem } from '../Summary';

const UserSummary = (props) => {
  const { totalActiveBetsUSD = 0, createGame } = props;

  return (
    <SummaryBlock>
      <SummaryRow>
        <SummaryItem>
          <AnimatedNumber component="text" value={totalActiveBetsUSD} stepPrecision="2" style={{
            transition: '0.8s ease-out',
            fontSize: 48,
            display: 'block',
            textAlign: 'center',
            transitionProperty:
              'background-color, color, opacity'
          }}/>
          <h5>TOTAL AMOUNT</h5>
        </SummaryItem>
        <SummaryItem>
          <AnimatedNumber component="text" value={totalActiveBetsUSD} stepPrecision="2" style={{
            transition: '0.8s ease-out',
            fontSize: 48,
            display: 'block',
            textAlign: 'center',
            transitionProperty:
              'background-color, color, opacity'
          }}/>
          <h5>JOINABLE GAMES</h5>
        </SummaryItem>
        <SummaryItem>
          <CreateGame
            createGame={createGame}
            show={true}
          />
        </SummaryItem>
      </SummaryRow>
    </SummaryBlock>
  );
};

export default UserSummary;
