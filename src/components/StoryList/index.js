import React from 'react';
import PropTypes from 'prop-types';
import './StoryList.css';
import StoryItem from '../StoryItem';
import InfiniteScroll from 'react-infinite-scroll-component';

function StoryList({stories, onNextData}) {
  const storyItems = stories.map(story => {
    return <StoryItem key={story.id} story={story} />;
  });

  return (
    <InfiniteScroll
      dataLength={stories.length}
      next={onNextData}
      hasMore={stories[stories.length - 1] !== 1}
      loader={<h4>Loading more stories...</h4>}
      endMessage={
        <p style={{textAlign: 'center'}}>
          <b>You've reached the end of the internet. Congratulations.</b>
        </p>
      }>
      <ul>
        {storyItems}
      </ul>
    </InfiniteScroll>
  );
}

StoryList.displayName = 'StoryList';

StoryList.defaultProps = {
  stories: [],
};

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  onNextData: PropTypes.func.isRequired,
};

export default StoryList;
