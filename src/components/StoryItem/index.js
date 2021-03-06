import React from 'react';
import PropTypes from 'prop-types';
import './StoryItem.css';
import moment from 'moment';

/**
 * Metadata about a story on Hacker News.
 * @see {@link https://github.com/HackerNews/API#items|Item}
 * @typedef {Object} HackerNewsStory
 */

/**
 * Display the title, author, and date posted for a Hacker News Story.
 * Title is clickable if a URL is given.
 */
function StoryItem({story}) {
  /** @type {string} */
  const localizedDate = moment.unix(story.time).format('lll');

  return (
    <li className="StoryItem">
      <a href={story.url}
         target="_blank"
         rel="noopener noreferrer">
        {story.title}
      </a> <span>by {story.by} on {localizedDate}</span>
    </li>
  );
}

StoryItem.displayName = 'StoryItem';

StoryItem.propTypes = {
  /** @type {HackerNewsStory} */
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // Ask HN items are "stories" without a url,
    // but this component *should* require one.
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
