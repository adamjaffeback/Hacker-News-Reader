import React from 'react';
import PropTypes from 'prop-types';
import './StoryItem.css';
import moment from 'moment';

function StoryItem({story}) {
  const localizedDate = moment.unix(story.time).format('lll');

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
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
};

// When the StoryList is passed new props,
// only rerender StoryItems which are brand new
export default React.memo(StoryItem, (prevProps, nextProps) => {
  return prevProps.story.id === nextProps.story.id;
});
