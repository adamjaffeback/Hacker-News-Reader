import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import StoryItem from '../../components/StoryItem';
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

  async function getTopFiveHundredStoryIds () {
    return new Promise(resolve => {
      const url = `https://hacker-news.firebaseio.com/v0/topstories.json`;
      const request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          resolve(JSON.parse(request.responseText));
        }
      }

      request.open('GET', url, true);
      request.send(null);
    })
    .then(ids => {
      storyIds.current = ids;
      populateFetchingCache();
    });
  }

  useEffect(() => {
    getTopFiveHundredStoryIds();
  }, []);

  async function getNextStory () {
    return new Promise(resolve => {
      const nextItemId = fetchingCache.current.shift();

      const url = `https://hacker-news.firebaseio.com/v0/item/${nextItemId}.json`;
      const request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          updateStories(strs => strs.concat(JSON.parse(request.responseText)));

          if (fetchingCache.current.length) {
            getNextStory();
          }
        }
      }

      request.open('GET', url, true);
      request.send(null);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
       <h3 style={{alignSelf: 'center'}}>Hacker News Reader</h3>
      </header>

      <main className='App-main'>
        {stories.length}
        <InfiniteScroll
          dataLength={stories.length}
          next={populateFetchingCache}
          hasMore={true}>
          {stories.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </InfiniteScroll>
      </main>

      <footer className='App-footer'>
        <img src={logo} className="App-doist-logo" alt="Doist logo" />
      </footer>
    </div>
  );
}

export default App;
