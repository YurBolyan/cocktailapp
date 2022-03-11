import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Registeration from "./components/Registeration"
import Login from './components/Login';
import Home from "./components/Home"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';


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