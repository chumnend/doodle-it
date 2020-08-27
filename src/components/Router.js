import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from '../views/Auth';
import Editor from '../views/Editor';
import Home from '../views/Home';
import NotFound from '../views/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/editor" component={Editor} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
