import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Salespage from './Layouts/Salespage'
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Createroom from "./components/Createroom";
import Joinroom from "./components/Joinroom";

import MapModal from "./components/MAPFP"
import Tools from './components/Tools';


import { goToRoomInput } from './components/goToRoomInput';
class App extends Component {

  
  render() {
    return (
      
       
        <div style={{width:"100%",background:'#fff'}}>
          
      <Router >
       <Switch> 
        <Route  path='/login' component={Login} />
        <Route  path='/' exact component={MapModal} />

         <Route path='/signup' component={Signup} />

         <Route  path='/dashboard' component={Dashboard} />

         <Route  path='/projects' component={Projects} />

         <Route  path='/tools' component={Tools} />

         <Route  path='/joinroom/:uid/:pid/:rid' component={Joinroom} />

         <Route path='/createroom/:pid' component={Createroom} />
         <Route path='/room/:pid/:roomid' component={Salespage} />
         </Switch>
         </Router>         

       
  </div>
 
      
     
      
    )
  }
}

export default App;
