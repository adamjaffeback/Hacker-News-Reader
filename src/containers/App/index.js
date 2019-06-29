import React from 'react';
import './App.css';
import logo from '../../assets/doist-logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hacker News Reader
      </header>

      <footer className='App-footer'><img src={logo} className="App-doist-logo" /></footer>
    </div>
  );
}

export default App;
