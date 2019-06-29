import React, {useState} from 'react';
import './App.css';
import StoryList from '../../components/StoryList';
import logo from '../../assets/doist-logo.svg';

function App() {
  const [stories, updateStories] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        Hacker News Reader
      </header>

      <main className='App-main'>
        <StoryList stories={stories} />
      </main>

      <footer className='App-footer'>
        <img src={logo} className="App-doist-logo" alt="Doist logo" />
        </footer>
    </div>
  );
}

export default App;
