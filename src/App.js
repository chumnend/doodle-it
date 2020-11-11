import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
