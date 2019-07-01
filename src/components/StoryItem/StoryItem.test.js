import React from 'react';
import ReactDOM from 'react-dom';
import StoryItem from './index';

it('renders without crashing', () => {
  const story = {
    id: 1,
    url: 'www.google.com',
    title: 'Google.com',
    by: 'Test',
    time: Math.round(new Date().getTime() / 1000), // unix
  }
  const div = document.createElement('div');
  ReactDOM.render(<StoryItem story={story}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
