import React, { PropTypes } from 'react';

import CSSModules from 'react-css-modules';
import styles from '../css/components/layout/flex.scss';

const propTypes = {
  flexDirection: PropTypes.string
};

@CSSModules(styles, { allowMultiple: true })
function Flex(props) {
  const styleName = 'Flex__container' + flexDirection === 'row' ? ' row' : ' column';
  return (
    <div styleName={styleName}>
      {props.children]]}
    </div>
  );
}

Flex.propTypes = propTypes;

export default Flex;