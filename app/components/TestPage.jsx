import React, { Component } from 'react';
import TextAreaBox from './common/TypeAheadTextBox';

class TestPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
        <TextAreaBox/>
      </div>
    )
  }
}

export default TestPage;