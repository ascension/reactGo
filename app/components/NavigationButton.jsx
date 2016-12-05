import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/game';
import { browserHistory } from 'react-router';

const cx = classNames.bind(styles);

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
        className={cx(className)}
      >
        {buttonText}
      </button>
    </div>
  );
}

NavigationButton.propTypes = propTypes;

export default NavigationButton;