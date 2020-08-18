import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import Salespage from './Layouts/Salespage'
import Login from "./components/Login";
import Signup from "./components/Signup";
import Projects from "./components/Projects";
import Createroom from "./components/Createroom";
import Joinroom from "./components/Joinroom";
import EndSession from "./components/EndSession"
// imsport JoiningRoom from "./components/JoiningRoom"
import Tools from './components/Tools';
import SalespageClient from './Layouts/SalespageClient';
import Pixel from './pixel/pixel'

class App extends Component {

  
  render() {
    return (
      
       
        <div style={{width:"100%",background:'#fff'}}>
          
      <Router >
       <Switch> 
    
        <Route  path='/salestool/login' component={Login} />
      
         <Route path='/salestool/signup' component={Signup} />

         <Route  path='/salestool/projects' component={Projects} />

         <Route  path='/salestool/tools' component={Tools} />

         <Route  path='/salestool/joinroom/:uid/:pid/:rid' component={Joinroom} />

         <Route path='/salestool/createroom/:pid' component={Createroom} />
         
         <Route path='/salestool/room/:pid/:roomid' component={Salespage} />
         
         <Route path='/salestool/guest/room/:uid/:pid/:roomid' component={SalespageClient} />

         <Route  path='/salestool/feedback' component={EndSession} />

         {/* <Route  path='/salestool/joining' component={JoiningRoom} /> */}

         <Route  path='/salestool/pixel' component={Pixel} />

         </Switch>
         </Router>         

       
  </div>
 
      
     
      
    )
  }
}

export default App;
