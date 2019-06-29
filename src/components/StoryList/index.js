import React from 'react';
import PropTypes from 'prop-types';
import './StoryList.css';
import StoryItem from '../StoryItem';

function StoryList({stories}) {
  const storyItems = stories.map(story => {
    return <StoryItem key={story.id} story={story} />;
  });

  return (
    <>
      {storyItems}
    </>
  );
}

StoryList.displayName = 'StoryList';

StoryList.defaultProps = {
  stories: [],
};

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
};

export default StoryList;
