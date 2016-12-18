import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/components/page-inners.scss'

function PageInner(props) {
  return (
    <div styleName={'pageInner'}>
      {props.children}
    </div>
  );
}

export default CSSModules(PageInner, styles);