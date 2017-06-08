import React, { PropTypes } from 'react';
import AnimatedNumber from 'react-animated-number';
import { SummaryBlock, SummaryRow, SummaryItem } from '../Summary';

const propTypes = {};
const defaultProps = {};

const TotalSummary = (props) => {
    const { totalActiveBetsUSD = 0 } = props;

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
            <AnimatedNumber component="text" value={totalActiveBetsUSD} stepPrecision="2" style={{
              transition: '0.8s ease-out',
              fontSize: 48,
              display: 'block',
              textAlign: 'center',
              transitionProperty:
                'background-color, color, opacity'
            }}/>
            <h5>Total Active Games</h5>
          </SummaryItem>
        </SummaryRow>
      </SummaryBlock>
    );
};

TotalSummary.propTypes = propTypes;
TotalSummary.defaultProps = defaultProps;

export default TotalSummary;

