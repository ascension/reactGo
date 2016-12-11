import React, { PropTypes } from 'react';
import Navigation from 'containers/Navigation';
import Message from 'containers/Message';
import AppContainer from '../containers/AppContainer';
import CSSModules from 'react-css-modules';
import styles from '../css/app.scss';

const App = ({children}) => {
  return (
    <div styleName={'app'}>
      <div styleName={'appContainer'}>
        <Navigation />
        <AppContainer>
          <Message />
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
