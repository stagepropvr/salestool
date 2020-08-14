import React, { Component } from 'react';
import Video from '../Tools/Guest/video'
import Access from './Access'

class SalespageClient extends Component {
  constructor(props){
    super(props);
    this.state={
      grant:false,
      audio:true,
      video:true
    }
   this.joinroom=this.joinroom.bind(this);
  }
  joinroom(audio,video){
    this.setState({
      grant:true,
      audio:audio,
      video:video
    })

  }
  render() {
    if(!this.state.grant){
      return(
        <Access
        uid={this.props.match.params.uid}
        pid={this.props.match.params.pid}
        rid={this.props.match.params.roomId}
        join={this.joinroom} />
      )
    }else{
    if(localStorage.getItem("rid")===null){
      window.location="/invalidinvitation"
    }else{
    return (
     <Video  video={this.state.video} audio={this.state.audio} uid={this.props.match.params.uid} pid={this.props.match.params.pid} roomId={this.props.match.params.roomid}/>
    
    )}}
  }
}

export default SalespageClient;
