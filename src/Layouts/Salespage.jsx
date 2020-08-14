import React, { Component } from 'react';
import Video from '../Tools/Host/video'

class Salespage extends Component {
  render() {
    return (
     <Video pid={this.props.match.params.pid} uid={this.props.match.params.uid} roomId={this.props.match.params.roomid}/>
    
    )
  }
}

export default Salespage;
