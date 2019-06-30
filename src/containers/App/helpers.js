export async function getNextStory (cache, updateStories, retryDelay = 1000) {
  const nextItemId = cache.current[0];
  const url = `https://hacker-news.firebaseio.com/v0/item/${nextItemId}.json`;

  try {
    const response = await fetch(url);
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

export async function populateFetchingCache (cache, storyIds, updateStories) {
  cache.current = storyIds.current.slice(0, 20);
  storyIds.current = storyIds.current.slice(20);
  getNextStory(cache, updateStories);
}
