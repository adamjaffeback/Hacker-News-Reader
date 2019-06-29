import React from 'react';
import ReactDOM from 'react-dom';
import StoryList from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StoryList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
