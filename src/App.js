import React from 'react';
import { Switch, Route } from "react-router-dom";
import "./App.scss"

import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={Editor} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
