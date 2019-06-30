import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import StoryList from '../../components/StoryList';
import InfiniteScroll from 'react-infinite-scroll-component';
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

  async function getNextStory () {
    const nextItemId = fetchingCache.current.shift();
    const url = `https://hacker-news.firebaseio.com/v0/item/${nextItemId}.json`;
    const response = await fetch(url);
    const story = await response.json();

    updateStories(strs => strs.concat(story));

    if (fetchingCache.current.length) {
      getNextStory();
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

      <footer className='App-footer'>
        <img src={logo} className="App-doist-logo" alt="Doist logo" />
      </footer>
    </div>
  );
}

export default App;
