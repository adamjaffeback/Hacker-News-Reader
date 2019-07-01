import React from 'react';
import PropTypes from 'prop-types';
import './StoryList.css';
import StoryItem from '../StoryItem';
import InfiniteScroll from 'react-infinite-scroll-component';

/**
 * Infinite scroll of Hack News stories (StoryItem).
 */
function StoryList({stories, onNextData}) {
  const storyItems = stories.map(story => {
    return <StoryItem key={story.id} story={story} />;
  });

  return (
    <InfiniteScroll
      dataLength={stories.length}
      next={onNextData}
      hasMore={stories[stories.length - 1] !== 1}
      loader={<h4 className="StoryList-scrollMessage">Loading more stories...</h4>}
      endMessage={
        <p className="StoryList-scrollMessage">
          You've reached the end of the internet. Congratulations.
        </p>
      }>
      <ul className="StoryList-ul">
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
  /** @type {HackerNewsStory[]} */
  stories: PropTypes.array.isRequired,
  onNextData: PropTypes.func.isRequired,
};

export default StoryList;
