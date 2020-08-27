import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../views/Auth';
import Console from '../views/Console';
import Editor from '../views/Editor';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

function Router({ appProps }) {
  return (
    <Switch>
      <Route
        exact
        path="/auth"
        render={(props) =>
          !appProps.loggedIn ? (
            <Auth {...props} {...appProps} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/editor"
        render={(props) =>
          appProps.loggedIn ? (
            <Editor {...props} {...appProps} />
          ) : (
            <Redirect to="/auth" />
          )
        }
      />
      <Route
        exact
        path="/"
        render={(props) =>
          appProps.loggedIn ? (
            <Console {...props} {...appProps} />
          ) : (
            <Home {...props} {...appProps} />
          )
        }
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Router;
