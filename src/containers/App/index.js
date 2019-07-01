import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import StoryList from '../../components/StoryList';
import {Header, Footer} from '../../components/Layout';
import {getMoreStories} from './helpers';

function App() {
  const fetchingCache = useRef([]);
  const storyIds = useRef([]);
  const nextId = useRef(0);
  const isFetching = useRef(false);
  const [stories, updateStories] = useState([]);

  useEffect(() => {
    async function getFiveHundredNewStoryIds () {
      const url = `https://hacker-news.firebaseio.com/v0/newstories.json`;
      const response = await fetch(url);
      const ids = await response.json();
      storyIds.current = ids;
      nextId.current = ids[ids.length - 1] - 1;
      getMoreStories(fetchingCache, storyIds, nextId, isFetching, updateStories);
    }

    getFiveHundredNewStoryIds();
  }, []);

  return (
    <div className="App">
      <Header />
      <main className='App-main'>
        <StoryList
          stories={stories}
          onNextData={getMoreStories.bind(null, fetchingCache, storyIds, nextId, isFetching, updateStories)} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
