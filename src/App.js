import React, { useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import Auth from "./pages/Auth";
import Console from "./pages/Console";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";

function App() {
    const [loggedIn, hasLoggedIn] = useState(true);
    const [user, setUser] = useState({});

    const appProps = { loggedIn, hasLoggedIn, user, setUser };
    return (
        <div className="App">
            <Switch>
                <Route 
                    path="/auth" 
                    render={ props => 
                        <Auth {...props} {...appProps} /> 
                    }
                />
                <Route 
                    path="/editor" 
                    render={ props => 
                        loggedIn
                            ? <Editor {...props} {...appProps} />
                            : <Redirect to="/auth" />
                    }
                />
                <Route 
                    path="/console" 
                    render={ props => 
                        loggedIn
                            ? <Console {...props} {...appProps} />
                            : <Redirect to="/auth" />
                    }
                />
                <Route 
                    path="/" 
                    render={ props => 
                        loggedIn
                            ? <Redirect to="/editor" />
                            : <Redirect to="/auth" />
                    }
                />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
