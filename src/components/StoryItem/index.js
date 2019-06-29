import React from 'react';
import PropTypes from 'prop-types';
import './StoryItem.css';
import moment from 'moment';

function StoryItem({story}) {
  const localizedDate = moment(story.time).format('lll');

  return (
    <li>
      <b><a href={story.url}
         target="_blank"
         rel="noopener noreferrer"
         className="StoryItem">
        {story.title}
      </a></b> by {story.by} on {localizedDate}
    </li>
  );
}

StoryItem.displayName = 'StoryItem';

StoryItem.propTypes = {
  story: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    by: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
};

export default StoryItem;
