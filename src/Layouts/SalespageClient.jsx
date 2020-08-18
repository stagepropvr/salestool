import React, { Component } from 'react';
import Video from '../Tools/Guest/video'
//import Access from './Access'

class SalespageClient extends Component {
  constructor(props){
    super(props);
    this.state={
      grant:true,
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
     <></>
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
