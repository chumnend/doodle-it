import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './store';
import { render } from '@testing-library/react';
import App from './App';

const store = configureStore();

describe('<App>', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );
  });
});
