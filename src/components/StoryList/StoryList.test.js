import React from 'react';
import ReactDOM from 'react-dom';
import StoryList from './index';

it('renders without crashing', () => {
  const mockHandleNext = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(<StoryList onNextData={mockHandleNext}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
