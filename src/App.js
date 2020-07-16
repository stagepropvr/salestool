import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Salespage from './Layouts/Salespage'
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Createroom from "./components/Createroom";
import Joinroom from "./components/Joinroom";
import MapModal from "./components/Mapmodal"


import { goToRoomInput } from './components/goToRoomInput';
class App extends Component {

  
constructor(){
  super();
  this.state = {show:true}
}

  toggleModal = () => {
    this.setState(prevState => ({ show: !prevState.show }));
  }
  
  render() {
    return (
      
       
        <div style={{width:"100%",background:'#fff'}}>
{/*           
      <Router >
       <Switch> 
        <Route  path='/login' component={Login} />
       

         <Route path='/signup' component={Signup} />

         <Route  path='/dashboard' component={Dashboard} />

         <Route  path='/projects' component={Projects} />

         <Route  path='/joinroom/:uid/:pid/:rid' component={Joinroom} />

         <Route path='/createroom/:pid' component={Createroom} />
         <Route path='/room/:pid/:roomid' component={Salespage} />
         </Switch>
         </Router>          */}

         <MapModal
        show={this.state.show}
        onHide={() => this.toggleModal()}
      />
  </div>
 
      
     
      
    )
  }
}

export default App;
