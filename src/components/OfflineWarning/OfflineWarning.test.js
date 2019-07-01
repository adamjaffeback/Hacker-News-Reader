import React from 'react';
import ReactDOM from 'react-dom';
import OfflineWarning from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OfflineWarning />, div);
  ReactDOM.unmountComponentAtNode(div);
});
