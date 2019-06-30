import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import StoryList from '../../components/StoryList';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Footer} from '../../components/Layout';
import logo from '../../assets/doist-logo.svg';

function App() {
  const fetchingCache = useRef([]);
  const storyIds = useRef([]);
  const [stories, updateStories] = useState([]);

  async function populateFetchingCache () {
    fetchingCache.current = storyIds.current.slice(0, 20);
    storyIds.current = storyIds.current.slice(20);
    getNextStory();
  }

  async function getFiveHundredNewStoryIds () {
    const url = `https://hacker-news.firebaseio.com/v0/newstories.json`;
    const response = await fetch(url);
    const ids = await response.json();
    storyIds.current = ids;
    populateFetchingCache();
  }

  useEffect(() => {
    getFiveHundredNewStoryIds();
  }, []);

  async function getNextStory (retryDelay = 1000) {
    const nextItemId = fetchingCache.current[0];
    const url = `https://hacker-news.firebaseio.com/v0/item/${nextItemId}.json`;

    try {
      const response = await fetch(url);
      const story = await response.json();
      updateStories(strs => strs.concat(story));
      // story was fetched, get rid of it
      fetchingCache.current.shift();
      if (fetchingCache.current.length) {
        getNextStory();
      }
    } catch (e) {
      setTimeout(() => {
        // if the delay has reached 10s, just keep polling at that rate
        // otherwise, work your way up to 10s in 1s increments
        let nextDelay = retryDelay > 10000 ? retryDelay : retryDelay + 1000;
        getNextStory(nextDelay);
      }, retryDelay);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
       <h3 style={{alignSelf: 'center'}}>Hacker News Reader</h3>
      </header>

      <main className='App-main'>
        <InfiniteScroll
          dataLength={stories.length}
          next={populateFetchingCache}
          hasMore={true}>
          <StoryList stories={stories} />
        </InfiniteScroll>
      </main>

      <Footer />
    </div>
  );
}

export default App;
