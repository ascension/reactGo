import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Loader.scss';

const propTypes = {
  isLoading: PropTypes.bool.isRequired
};

function Loader(props) {
  const { isLoading } = props;
  return (
    <div styleName="loading-wrapper">
      <div styleName="loading-container">
        <h2>Loading...</h2>
      </div>
    </div>
  );
}

export default CSSModules(Loader, styles);
