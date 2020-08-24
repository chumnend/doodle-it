import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from './pages/Auth';
import Console from './pages/Console';
import Editor from './pages/Editor';
import NotFound from './pages/NotFound';

function Router({ appProps }) {
  const { loggedIn } = appProps;

  return (
    <Switch>
      <Route
        path="/auth"
        render={(props) => <Auth {...props} {...appProps} />}
      />
      <Route
        path="/editor"
        render={(props) =>
          loggedIn ? (
            <Editor {...props} {...appProps} />
          ) : (
            <Redirect to="/auth" />
          )
        }
      />
      <Route
        path="/console"
        render={(props) =>
          loggedIn ? (
            <Console {...props} {...appProps} />
          ) : (
            <Redirect to="/auth" />
          )
        }
      />
      <Route
        path="/"
        render={(props) =>
          loggedIn ? <Redirect to="/console" /> : <Redirect to="/auth" />
        }
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Router;
