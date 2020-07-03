import React, { Component } from 'react';
import Video from '../components/video'

import { BrowserRouter, Route } from 'react-router-dom';

class Salespage extends Component {
  render() {
    return (
     <Video roomId={this.props.match.params.roomid}/>
    
    )
  }
}

export default Salespage;
