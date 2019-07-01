const makeUrl = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

async function fetchItem (id) {
  const response = await fetch(makeUrl(id));
  return await response.json();
}

export async function getNextStoryFromCache (cache, updateStories, retryDelay = 1000) {
  const nextItemId = cache.current[0];

  try {
    const story = await fetchItem(nextItemId);
    updateStories(strs => strs.concat(story));
    // story was fetched, get rid of it
    cache.current.shift();
    if (cache.current.length) {
      getNextStoryFromCache(cache, updateStories);
    }
  } catch (e) {
    setTimeout(() => {
      // if the delay has reached 10s, just keep polling at that rate
      // otherwise, work your way up to 10s in 1s increments
      let nextDelay = retryDelay > 10000 ? retryDelay : retryDelay + 1000;
      getNextStoryFromCache(cache, updateStories, nextDelay);
    }, retryDelay);
  }
}

export async function walkIdsToLoadStories (nextId, updateStories, isFetching) {
  isFetching.current = true;

  let itemsChecked = 0;
  let newStoriesFound = 0;

  while(newStoriesFound < 20) {
    try {
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
