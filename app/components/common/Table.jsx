import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../css/common/table.scss'

@CSSModules(styles)
class Table extends Component {
  render() {
    return (
      <div styleName="wrapper">
        {this.props.children}
      </div>
    );
  }
}

export default Table;