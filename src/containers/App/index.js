import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import StoryList from '../../components/StoryList';
import {Header, Footer} from '../../components/Layout';
import {populateFetchingCache} from './helpers';

function App() {
  const fetchingCache = useRef([]);
  const storyIds = useRef([]);
  const [stories, updateStories] = useState([]);

  useEffect(() => {
    async function getFiveHundredNewStoryIds () {
      const url = `https://hacker-news.firebaseio.com/v0/newstories.json`;
      const response = await fetch(url);
      const ids = await response.json();
      storyIds.current = ids;
      populateFetchingCache(fetchingCache, storyIds, updateStories);
    }

    getFiveHundredNewStoryIds();
  }, []);

  return (
    <div className="App">
      <Header />
      <main className='App-main'>
        <StoryList
          stories={stories}
          onNextData={populateFetchingCache.bind(null, fetchingCache, storyIds, updateStories)} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
