const makeUrl = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

export async function getNextStory (cache, updateStories, retryDelay = 1000) {
  const nextItemId = cache.current[0];

  try {
    const response = await fetch(makeUrl(nextItemId));
    const story = await response.json();
    updateStories(strs => strs.concat(story));
    // story was fetched, get rid of it
    cache.current.shift();
    if (cache.current.length) {
      getNextStory(cache, updateStories);
    }
  } catch (e) {
    setTimeout(() => {
      // if the delay has reached 10s, just keep polling at that rate
      // otherwise, work your way up to 10s in 1s increments
      let nextDelay = retryDelay > 10000 ? retryDelay : retryDelay + 1000;
      getNextStory(cache, updateStories, nextDelay);
    }, retryDelay);
  }
}

export async function incrementallyLoadMoreStories (nextId, updateStories, isFetching) {
  isFetching.current = true;

  async function fetchOneStory (id) {
    try {
      const response = await fetch(makeUrl(id));
      const item = await response.json();

      if (item.type === 'story') {
        updateStories(strs => strs.concat(item));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(`Error fetching item with ID ${id}:`, e);
    }
  }

  let itemsChecked = 0;
  let newStoriesFound = 0;

  while(newStoriesFound < 20) {
    const wasStory = await fetchOneStory(nextId.current - itemsChecked);
    itemsChecked++;
    if (wasStory) {
      newStoriesFound++;
    }
  }

  nextId.current = nextId.current - itemsChecked;
  isFetching.current = false;
}

export async function populateFetchingCache (cache, storyIds, nextId, isFetching, updateStories) {
  if (storyIds.current.length > 0) {
    cache.current = storyIds.current.slice(0, 20);
    storyIds.current = storyIds.current.slice(20);
    getNextStory(cache, updateStories);
  } else if (isFetching.current === false) {
    incrementallyLoadMoreStories(nextId, updateStories, isFetching);
  }
}
