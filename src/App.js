import React from 'react';
import Registeration from "./pages/Registeration"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Home from "./pages/Home"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';


function App() {
 return (
    <Router>
      <div className="App">
        <Switch>
           <Route exact path="/" component={Registeration} />
           <Route exact path="/home" component={Home}/>
           <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;