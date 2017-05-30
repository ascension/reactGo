import React, { PropTypes } from 'react';
import TopicItem from 'components/TopicItem';
import CSSModules from 'react-css-modules';
import styles from '../css/components/main-section.scss';

const MainSection = ({ topics, onIncrement, onDecrement, onDestroy }) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <TopicItem
        index={key}
        id={topic.id}
        key={key}
        text={topic.text}
        incrementCount={onIncrement}
        decrementCount={onDecrement}
        destroyTopic={onDestroy} />);
  });

  return (
    <div className={'main-section'}>
      <h3 className={'header'}>Vote for your favorite hack day idea</h3>
      <ul className={'list'}>{topicItems}</ul>
    </div>
  );
};

MainSection.propTypes = {
  topics: PropTypes.array.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default CSSModules(MainSection, styles);
