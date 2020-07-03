import React, { Component } from 'react';
import Salespage from './Layouts/Salespage'

import { BrowserRouter, Route } from 'react-router-dom';
import { goToRoomInput } from './components/goToRoomInput';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
       <React.Fragment>
          <Route path="/" exact component={goToRoomInput}/>
          <Route path="/:roomid" exact component={Salespage}/>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App;
