import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import StoryList from '../../components/StoryList';
import {Header, Footer} from '../../components/Layout';
import {getNextStoryFromCache, walkIdsToLoadStories} from './helpers';

function App() {
  const fetchingCache = useRef([]);
  const storyIds = useRef([]);
  const nextId = useRef(0);
  const isFetching = useRef(false);
  const [stories, updateStories] = useState([]);

  async function getMoreStories() {
    if (storyIds.current.length > 0) {
      fetchingCache.current = storyIds.current.slice(0, 20);
      storyIds.current = storyIds.current.slice(20);
      getNextStoryFromCache(fetchingCache, updateStories);
    } else if (isFetching.current === false) {
      walkIdsToLoadStories(nextId, updateStories, isFetching);
    }
  }

  useEffect(() => {
    async function getFiveHundredNewStoryIds () {
      const url = `https://hacker-news.firebaseio.com/v0/newstories.json`;
      const response = await fetch(url);
      const ids = await response.json();
      storyIds.current = ids;
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

export default App;
