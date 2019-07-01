/** @module AppHelpers */

/**
 * A resource (item) fetched from the Hacker News API. May be a story, comment,
 * poll, etc. Must be checked with .type to see if it's a story.
 * @see {@link https://github.com/HackerNews/API#items|Item}
 * @see {HackerNewsStory}
 * @typedef {HackerNewsItem}
 */

/**
 * Fetch an item using its ID from the Hacker News API.
 * @example
 * const item = await fetchItem(1);
 * item.type; // 'story' or 'comment', etc.
 * @param {number} id
 * @returns {Promise<HackerNewsItem|HackerNewsStory>}
 */
export async function fetchItem (id) {
  const makeUrl = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  /** @type {Blob} */
  const response = await fetch(makeUrl(id));
  return await response.json();
}

/**
 * When we have story IDs in the cache, fetch them until the cache is empty.
 * @param {number[]} cache - IDs we know will fetch stories.
 * @param {function} updateStories - Callback to update stories in state.
 * @param {number} [retryDelay=1000] - Delay before trying again after fetch fail.
 * @returns {undefined} - Adds fetches HackerNewsStory to list.
 */
export async function getNextStoryFromCache (cache, updateStories, retryDelay = 1000) {
  const nextItemId = cache.current[0];

  try {
    /** @type {HackerNewsStory} */
    const story = await fetchItem(nextItemId);
    updateStories(strs => strs.concat(story));
    // story was fetched, get rid of it
    cache.current.shift();
    // more IDs in cache
    if (cache.current.length) {
      getNextStoryFromCache(cache, updateStories);
    }
  } catch (e) {
    // if fetched failed, try again in a bit with the same ID
    setTimeout(() => {
      // if the delay has reached 10s, just keep polling at that rate
      // otherwise, work your way up to 10s in 1s increments
      let nextDelay = retryDelay > 10000 ? retryDelay : retryDelay + 1000;
      getNextStoryFromCache(cache, updateStories, nextDelay);
    }, retryDelay);
  }
}

/**
 * Walk by from the last known story ID to discover more stories.
 * @param {number} nextId - Next ID we should check for a story from.
 * @param {function} updateStories - Callback to update stories in state.
 * @param {boolean} isFetching - Prevent duplicate fetches from infinite scroll.
 * @returns {undefined} - Get more Hacker News Stories
 */
export async function walkIdsToLoadStories (nextId, updateStories, isFetching) {
  isFetching.current = true;

  let itemsChecked = 0;
  let newStoriesFound = 0;

  while(newStoriesFound < 20) {
    try {
      /** @type {HackerNewsItem} */
      const item = await fetchItem(nextId.current - itemsChecked);
      itemsChecked++;

      if (item && item.type === 'story') {
        updateStories(strs => strs.concat(item));
        newStoriesFound++;
      }
    } catch (e) {
      console.error(`Error fetching item with ID ${nextId.current - itemsChecked}:`, e);
    }
  }

  nextId.current = nextId.current - itemsChecked;
  isFetching.current = false;
}
