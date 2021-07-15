import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './app.scss';

import { Home, Detail } from "./pages"

const App: React.FC = () => {
  return (
   <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/student/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
