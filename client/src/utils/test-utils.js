import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configureStore } from '../store';

const store = configureStore();

const Wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
