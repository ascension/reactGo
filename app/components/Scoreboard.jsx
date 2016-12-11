import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from 'css/components/scoreboard';



const Scoreboard = ({topics}) => {
  const topicListItems = topics.map((topic, key) => {
    return (
    <li className={'item'} key={key}>
      <span className={'topic'}>{topic.text}</span>
      <span className={'count'}>{topic.count}</span>
    </li>);
  });
  return (
    <div className={'scoreboard'}>
      <h3 className={'header'}>Vote count</h3>
      <ul className={'list'}>
        {topicListItems}
      </ul>
    </div>
  );
};

Scoreboard.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Scoreboard;
