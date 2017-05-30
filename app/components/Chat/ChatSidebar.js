import React, { Compoent, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/components/Chat/Chat-Sidebar.scss';

function ChatSidebar(props) {
  return(
    <div styleName="wrapper">
      <div styleName="logo">
          CD
      </div>
      <div styleName="item">
        <i className="fa fa-comments" aria-hidden="true"/>
      </div>
      <div styleName="item">
        <i className="fa fa-comments" aria-hidden="true"/>
      </div>
      <div styleName="item">
        <i className="fa fa-comments" aria-hidden="true"/>
      </div>
      <div styleName="item">
        <i className="fa fa-comments" aria-hidden="true"/>
      </div>
      <div styleName="item">
        <i className="fa fa-comments" aria-hidden="true"/>
      </div>
    </div>
  )
}

export default CSSModules(ChatSidebar, styles);