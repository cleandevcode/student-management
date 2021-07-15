import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

function App() {
  return (
   <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/student/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
