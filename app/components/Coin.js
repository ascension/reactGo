import styled from 'styled-components';
import React, { PropTypes } from 'react';

export const CoinWrapper = styled.div`
  -webkit-perspective: 800;
  width: 200px;
  height: 200px;
  position: relative;
  margin: 50px auto;

  .flip .hidden {
    display: none;
  }

  /*this specifies the transition effects*/
  .flip .card.flipped {
    -webkit-transform-origin: 50% 50%;
    -webkit-transform: rotatex(-0deg);
    -moz-transform: rotatex(-0deg);
    -o-transform: rotatex(-0deg);
    transform: rotatex(-0deg);
    transition: all 5s ease 0s;
  }
  
  .flip .card.dim {
    opacity: .25;
    transition: all .25s ease 0s;
  }
  .flip .card {
    width: 100%;
    height: 100%;
    -webkit-transform: rotatex(0deg);
    -moz-transform: rotatex(0deg);
    -o-transform: rotatex(0deg);
    transform: rotatex(0deg);
    -webkit-transform-style: preserve-3d;
    -webkit-transition: 5s;
  }
  .flip .card .face {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-backface-visibility: hidden;
    z-index: 2;
    font-family: Georgia;
    font-size: 3em;
    text-align: center;
    line-height: 200px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
  }
  .flip .card .front {
    position: absolute;
    z-index: 1;
    background: $colorNeonGreen;
    color: white;
    cursor: pointer;
  }
  .flip .card .back {
    -webkit-transform: rotatex(180deg);
    background: #FF9900;
    color: black;
    cursor: pointer;
  }
`;


const Coin = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transform: rotatex(${props => props.transform}deg);
    transform-style: preserve-3d;
    transition: 5s;
`;

const CoinFace = styled.div`
  margin: 0;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 100px;
  border: 5px solid orange;
`;

const CoinFront = styled(CoinFace)`
    background: green;
    height: 100%;
    backface-visibility: hidden;
`;
const CoinBack = styled(CoinFace)`
    background: red;
    height: 100%;
    transform: rotatex(180deg);
    backface-visibility: hidden;
`;

const propTypes = {};
const defaultProps = {};

const FlippingCoin = (props) => {
    const { transform, front, back, showBack } = props;

    return (
      <CoinWrapper>
          <Coin transform={transform}>
            <CoinFront>
                <div style={{lineHeight: '200px', textAlign: 'center'}}>
                    {showBack ? back : front}
                </div>
            </CoinFront>
            <CoinBack showBack={showBack}>
                <div style={{lineHeight: '200px', textAlign: 'center'}}>
                  {showBack ? front : back}
                </div>
            </CoinBack>
          </Coin>
      </CoinWrapper>
    );
};

FlippingCoin.propTypes = propTypes;
FlippingCoin.defaultProps = defaultProps;

export default FlippingCoin;

