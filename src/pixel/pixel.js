import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Createroom from "./components/Createroom";
import Joinroom from "./components/Joinroom";
import Salespage from './Layouts/Salespage'
import SalespageClient from './Layouts/SalespageClient';
import EndSession from "./components/EndSession"

class Pixel extends Component {

  render() {
    return (  
      <div style={{width:"100%",background:'#fff'}}>
      <Router >
        <Switch> 
          <Route path='/salestool/pixel/createroom' component={Createroom} />    
          <Route path='/salestool/pixel/room/:roomid' component={Salespage} />
          <Route  path='/salestool/pixel/joinroom/:rid' component={Joinroom} />
          <Route path='/salestool/pixel/guest/room/:roomid' component={SalespageClient} />
          <Route  path='/salestool/pixel/feedback' component={EndSession} />
        </Switch>
      </Router>         
  </div>
 
    )
  }
}

export default Pixel;