import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Console from '../views/Console';
import Editor from '../views/Editor';
import Home from '../views/Home';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Register from '../views/Register';

function Router({ appProps }) {
  return (
    <Switch>
      <Route
        exact
        path="/login"
        render={(props) =>
          !appProps.loggedIn ? (
            <Login {...props} {...appProps} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route
        exact
        path="/register"
        render={(props) =>
          !appProps.loggedIn ? (
            <Register {...props} {...appProps} />
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
            <Redirect to="/login" />
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
