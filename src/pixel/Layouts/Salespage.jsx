import React, { Component } from 'react';
import Video from '../Tools/Host/video'

class Salespage extends Component {
  render() {
    return (
     <Video roomId={this.props.match.params.roomid}/>
    )
  }
}

export default Salespage;
