import React, { Component } from 'react';
import Video from '../components/video'


class Salespage extends Component {
  render() {
    return (
     <Video pid={this.props.match.params.pid} roomId={this.props.match.params.roomid}/>
    
    )
  }
}

export default Salespage;
