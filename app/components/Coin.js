import styled from 'styled-components';

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
    -webkit-transform: rotatex(${prop => props.degree}deg);
    background: #FF9900;
    color: black;
    cursor: pointer;
  }
`;