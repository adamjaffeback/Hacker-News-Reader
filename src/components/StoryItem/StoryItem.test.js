import React from 'react';
import ReactDOM from 'react-dom';
import StoryItem from './index';

it('renders without crashing', () => {
  const story = {
    url: 'www.google.com',
    title: 'Google.com',
    by: 'Test',
    time: new Date().toString(),
  }
  const div = document.createElement('div');
  ReactDOM.render(<StoryItem story={story}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
