import React, { Component } from 'react';
import Video from '../Tools/Guest/video'


class SalespageClient extends Component {
  render() {
    return (
     <Video pid={this.props.match.params.pid} roomId={this.props.match.params.roomid}/>
    
    )
  }
}

export default SalespageClient;
