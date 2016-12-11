import React, { PropTypes } from 'react';

import AppContainer from '../containers/AppContainer';
import CSSModules from 'react-css-modules';
import styles from '../css/app.scss';

const App = ({children}) => {
  return (
    <div styleName={'app'}>
      <div styleName={'appContainer'}>
        <AppContainer>
          {children}
        </AppContainer>
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default CSSModules(App, styles);
