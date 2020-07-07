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
        <div style={{width:"100%"}}>
        <Route  path='/login' component={Login} />
         

         <Router path='/signup' component={Signup} />

         <Route  path='/dashboard' component={Dashboard} />

         <Route  path='/projects' component={Projects} />

        </div>
       {/* <React.Fragment>
          <Route path="/" exact component={goToRoomInput}/>
          <Route path="/:roomid" exact component={Salespage}/>
        </React.Fragment> */}

       
</Switch>
        </Router>
     
      
    )
  }
}

export default App;
