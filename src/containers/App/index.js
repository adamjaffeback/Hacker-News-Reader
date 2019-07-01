import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import StoryList from '../../components/StoryList';
import {Header, Footer} from '../../components/Layout';
import {getNextStoryFromCache, walkIdsToLoadStories} from './helpers';

/**
 * Main container/page for the SPA. With only one feature, the HN Reader,
 * there's no need for App to route, etc.
 */
function App() {
  /**
   * Collection of 20 story IDs to be immediately fetched. We know these IDs are
   * stories, because we got them from hnapi/newstories.json.
   * @type {number[]}
   */
  const fetchingCache = useRef([]);
  /**
   * Collection of up to 500 story IDs from hnapi/newstories.json.
   * @type {number[]}
   */
  const storyIds = useRef([]);
  /**
   * When 500 story IDs from hnapi/newstories.json are exhausted we have to walk
   * over the nextId sequentially to filter through comments, polls, etc., to
   * find stories.
   * @type {number}
   */
  const nextId = useRef(0);
  /**
   * When the infinite scroller is fetching new data, give walkIdsToLoadStories
   * a chance to work without kicking it off again. This avoids fetching
   * duplicate items.
   * @type {boolean}
   */
  const isFetching = useRef(false);
  /**
   * Collection of fetched stories from the HN API.
   * @type {object[]}
   */
  const [stories, updateStories] = useState([]);

  /**
   * Handler for inifinite scroller to get more data.
   * @returns {undefined}
   */
  async function getMoreStories() {
    // still IDs from the initial fetch of 500 stories
    if (storyIds.current.length > 0) {
      // process 20 of those stories
      fetchingCache.current = storyIds.current.slice(0, 20);
      storyIds.current = storyIds.current.slice(20);
      getNextStoryFromCache(fetchingCache, updateStories);
    // no IDs are left from the initial fetch
    } else if (isFetching.current === false) {
      // walk back from nextId to discover more stories
      walkIdsToLoadStories(nextId, updateStories, isFetching);
    }
  }

  /**
   * On initial App render, get the 500 newest story IDs.
   */
  useEffect(() => {
    /**
     * To make the application super fast, get the 500 newest story IDs so we
     * don't have to "discover" new stories by walking the maxId backwards.
     * @returns {undefined} - Start rendering stories on the page
     */
    async function getFiveHundredNewStoryIds () {
      const url = `https://hacker-news.firebaseio.com/v0/newstories.json`;
      const response = await fetch(url);
      const ids = await response.json();
      storyIds.current = ids;
      // this is the last known ID we *know* is a story, so in the future,
      // we'll walk back from here
      nextId.current = ids[ids.length - 1] - 1;
      getMoreStories();
    }

    getFiveHundredNewStoryIds();
  }, []);

  return (
    <div className="App">
      <Header />
      <main className='App-main'>
        <StoryList
          stories={stories}
          onNextData={getMoreStories} />
      </main>
      <Footer />
    </div>
  );
}

App.displayName = 'App';

export default App;
