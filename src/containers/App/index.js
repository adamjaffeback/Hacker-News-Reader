import React, {useState} from 'react';
import './App.css';
import StoryItem from '../../components/StoryItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import logo from '../../assets/doist-logo.svg';

function App() {
  const initialState = [];

  for (let i = 0; i < 30; i++) {
    initialState.push(
      {id: i.toString(), url: 'www.google.com', title: `Test ${i}`, by: 'Adam', time: new Date().toString()}
    );
  }
  const [stories, updateStories] = useState(initialState);

  function fetchMoreStories () {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    const moreStories = [];
    const currentStoryCount = stories.length;
    for (let i = currentStoryCount; i < currentStoryCount + 20; i++) {
      moreStories.push({id: i.toString(), url: 'www.google.com', title: `Test ${i}`, by: 'Adam', time: new Date().toString()});
    }

    setTimeout(() => {
      updateStories([...stories, ...moreStories]);
    }, 1500);
  };

  return (
    <div className="App">
      <header className="App-header">
       <h3 style={{alignSelf: 'center'}}>Hacker News Reader</h3>
      </header>

      <main className='App-main'>
        <InfiniteScroll
          dataLength={stories.length}
          next={fetchMoreStories}
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
