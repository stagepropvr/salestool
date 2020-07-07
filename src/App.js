import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Salespage from './Layouts/Salespage'
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";

import { goToRoomInput } from './components/goToRoomInput';
class App extends Component {
  render() {
    return (
      
      <Router >
       <Switch> 
        <Route  path='/login' component={Login} />
         

         <Route path='/signup' component={Signup} />

         <Route  path='/dashboard' component={Dashboard} />

         <Route  path='/projects' component={Projects} />
         </Switch>
     
 

       

        </Router>
    )
  }
}

export default App;
