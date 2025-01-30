import { describe, it, expect } from 'vitest';

import { render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';

import App from '../../src/components/App';
import { path } from '../../src/helpers/constants';

const mockStore = configureStore();

describe('App', () => {
  it('expects to render the Landing component for unauthenticated users', () => {
    const initialState = { auth: { token: null } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // should render the Navigation component for an unauthenticated user
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(within(nav).getByText('Register')).toBeInTheDocument();
    expect(within(nav).getByText('Login')).toBeInTheDocument();

    // should render the Landing component on initial load
    expect(screen.getByTestId('landing')).toBeInTheDocument();
    expect(screen.getByText('Make Something Wonderful!')).toBeInTheDocument();;
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('expects to render the Home component for authenticated users', () => {
    const initialState = { 
      auth: { token: 'valid-token' },
      doodle: { doodles: [{ id: 'doodle-id', name: 'Doodle 1' }] },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // should render the Navigation component for an authenticated user
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(within(nav).getByText("Back to Home")).toBeInTheDocument();
    expect(within(nav).getByText("New Doodle")).toBeInTheDocument();
    expect(within(nav).getByText("Logout")).toBeInTheDocument();

    // should render the Home component on initial load
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  it('expects to redirect to Login component if unauthenicated users tries accessing protected route', () => {
    const initialState = { auth: { token: null } };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path.designer]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('expects to render the Designer component for authenticated users', () => {
    const initialState = { 
      auth: { token: 'valid-token' },
      canvas: { data: null }
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path.designer]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('designer')).toBeInTheDocument();
  });

  it('expects to render NotFound component for unknown routes', () => {
    const initialState = { auth: { token: null } };
    const store = mockStore(initialState);
  
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  
    expect(screen.getByTestId('notFound')).toBeInTheDocument();
  });
});
