import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../css/components/game.scss';
import { browserHistory } from 'react-router';

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  className: PropTypes.any
};

function NavigationButton(props) {
  const { link, className, buttonText } = props;
  function onClick() {
    browserHistory.push(link)
  }

  return (
    <div>
      <button
        onClick={onClick}
        className={className}
      >
        {buttonText}
      </button>
    </div>
  );
}

NavigationButton.propTypes = propTypes;

export default CSSModules(NavigationButton, styles);