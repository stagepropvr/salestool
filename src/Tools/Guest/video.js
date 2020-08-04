import React from 'react';
import { Redirect } from "react-router-dom";
import VideoCall from '../helpers/simple-peer';
import '../../styles/video.css';
import io from 'socket.io-client';
import Peer from 'simple-peer'
import VideoItem from "../ToolComponents/videoItem";
import Scene from "./Scene";
import Firebase from "../../config/Firebase";
import SceneControls from "./SceneControls.js";
import * as RTCMultiConnection from 'rtcmulticonnection';

let userId = null

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: {},
      remoteStreamUrl: '',
      streamUrl: '',
      initiator: false,
      peer: {},
      connecting: false,
      waiting: true,
      micState: true,
      camState: true,
      peers: {},
      floorplandata:"false",
      pdfdata:"false",
      mapdata:"",
      streams: {},
      current_image: "",
      
      host: true,
      apiload: true,
      images:"",
      user_id:'',
      camera:"user",
      data:'',
      messages:[],
      messagetext:"",
      init:true,
      clientimage:"",
      loader:true,
      videoinput:"default",
      audioinput:"default",
      clientimageid:"",
      members:[],
      closeRoom:false,
      name:localStorage.getItem("name"),
      hostaudioctrl:false,
      Switchstatus:false,
      messagescount:0,
      connection : new RTCMultiConnection(),
      rtcstreams:[]
        };
   
    this.Sidenav = React.createRef();
    this.bottom = React.createRef();
    this.togglenav=this.togglenav.bind(this); 
    this.sendmessage=this.sendmessage.bind(this);
    this.loader=this.loader.bind(this);
this.changedevice=this.changedevice.bind(this);
    this.messagearea=React.createRef();
    this.audioctrl=React.createRef();
    this.localvideo=React.createRef();
    this.inputFileRef = React.createRef();
    this.onBtnClick = this.handleBtnClick.bind(this);

    this.start = 0;	
    this.analytics = [];

  }
  videoCall = new VideoCall();

  switch = () => {this.setState({Switchstatus:true})}

  getImageName = (id) => {
      for (var x in this.state.images)
      {
        if(id === x)
        {
          return(this.state.images[x].name)
        }
      }
  }



  componentDidMount() {

    this.start = new Date;

    this.setState({
      pid:this.props.pid
    })
    var promise = new Promise( (resolve, reject) => {
    

    
      
       
        this.setState({
          host:false
        })
      
        Firebase.database().ref("roomsession/"+this.props.roomId+"/currentimage").on("value",(snap)=>{
          this.setState({
            clientimage:snap.val().currentimage,
            clientimageid:snap.val().imageid,
            clientimageName:snap.val().currentimageName,
            apiload:false,
            init:false,
           
            loader:true
          });
        })
    
      
        resolve("Promise resolved successfully");
     
 
    
  });


    promise.then( result => {
    
    


  

    
      this.state.connection.socketURL = 'https://propvrrtc.propvr.tech/';
  


      this.state.connection.session = {
          audio: true,
          video: true,
          data:true
      };
      this.state.connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
      };
      var bitrates = 512;



var  videoConstraints = {
  width: 191,
  height: 113,
  frameRate: 30,
  deviceId:this.state.videoinput
};





// var CodecsHandler = this.state.connection.CodecsHandler;
// var resolutions = 'HD';
// this.state.connection.processSdp = (sdp)=> {
//     var codecs = 'vp8';
    
//     if (codecs.length) {
//         sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
//     }

//     if (resolutions == 'HD') {
//         sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
//             audio: 128,
//             video: bitrates,
//             screen: bitrates
//         });

//         sdp = CodecsHandler.setVideoBitrates(sdp, {
//             min: bitrates * 8 * 1024,
//             max: bitrates * 8 * 1024,
//         });
//     }

//     if (resolutions == 'Ultra-HD') {
//         sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
//             audio: 128,
//             video: bitrates,
//             screen: bitrates
//         });

//         sdp = CodecsHandler.setVideoBitrates(sdp, {
//             min: bitrates * 8 * 1024,
//             max: bitrates * 8 * 1024,
//         });
//     }

//     return sdp;
// };







this.state.connection.iceServers = [{
  'urls': [
     'stun:stun.l.google.com:19302',
'stun:stun1.l.google.com:19302',  
'stun:stun2.l.google.com:19302',
'stun:stun3.l.google.com:19302',
'stun:stun4.l.google.com:19302',
  ]
},
{
  'urls': 'turn:52.15.126.155:3478',
  'credential': 'revsmart123',
  'username': 'propvr'
  }

];
this.state.connection.userId=localStorage.getItem("guestkey");
this.state.connection.extra={
  name:localStorage.getItem("name")
}
this.state.connection.mediaConstraints = {
video: videoConstraints,
audio:{echoCancellation: true,
  deviceId:this.state.audioinput}
};
this.state.connection.onstream = event => {
console.log( event.stream.streamid );
this.setState(ele => ({
  rtcstreams: [...ele.rtcstreams, event]
}))

console.log(this.state.rtcstreams);
if(event.type==="local"){
  this.setState({
    localStream:event
  })
console.log(this.state.connection)
if(!this.props.video){

  this.state.localStream.stream.mute("video");
  this.setState({
    camState: false
  })
}
if(!this.props.audio){

  this.state.localStream.stream.mute("audio");
  this.setState({
    micState: false
  })
}else{
  this.state.localStream.stream.unmute("audio");
}
}
};
this.state.connection.userid=localStorage.getItem("guestkey");
 this.state.connection.onmessage = (event)=> {
   if(event.data.actiontype==="chat"){
     
  if(!document.getElementById('chat_tab').getAttribute("class").includes("active show")){
    this.setState({
    messagescount:this.state.messagescount+1
    })
  }
    this.setState(ele => ({
      messages: [...ele.messages, event.data]
    }))
  }

  if(event.data.actiontype==="floorplan"){

    this.setState({
      floorplandata:event.data
    })
  }
  if(event.data.actiontype==="pdf"){
    console.log(event.data);

    this.setState({
      pdfdata:event.data.data
    })
  }
  if(event.data.actiontype==="map"){
    console.log(event.data);

    this.setState({
      mapdata:event.data.data
    })
  }

  if(event.data.actiontype==="muteall"){
    if(event.data.data.ctrl){
     
          this.state.localStream.stream.mute("audio");
          this.setState({
            micState: false,
            hostaudioctrl:true
          })
      }else{
            this.state.localStream.stream.unmute("audio");
        
        this.setState({
          micState: true,
          hostaudioctrl:false
        })
      }
     
    }
    if(event.data.actiontype==="mute"){
      if(event.data.user===this.state.connection.userid){
      if(!event.data.status){
       
            this.state.localStream.stream.mute("audio");
            this.setState({
              micState: false,
              hostaudioctrl:true
            })
        }else{
              this.state.localStream.stream.unmute("audio");
          
          this.setState({
            micState: true,
            hostaudioctrl:false
          })
        }
      }
      }
  }
  this.state.connection.openOrJoin(this.props.roomId);

 


  this.state.connection.onmute = (e)=> {
    const temp=this.state.connection;
    this.setState({
      connection:temp,
      micState:!this.state.localStream.isAudioMuted
    });
    

  };
  
  this.state.connection.onunmute = (e)=> {
    const temp=this.state.connection;
    this.setState({
      connection:temp,
      micState:!this.state.localStream.isAudioMuted
    });
  
  };
  



});
    



}

  componentDidUpdate(prevProps, prevState) {

      if(prevState.clientimageName){
        if (prevState.clientimageName !== this.state.clientimageName) {  
          
          let end = new Date;
          let diffrence = Math.floor((Math.abs(end - this.start)/1000));
          this.start = new Date;
  
          //Visited Place
          if(this.analytics.filter(a=>a.name === prevState.clientimageName).length === 1)
          {
            var place = this.analytics.filter(a=>a.name === prevState.clientimageName);
            place[0].duration += diffrence
  
            Firebase.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.pid+"/rooms/"+this.props.roomId+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+prevState.clientimageName)
            .update({duration:place[0].duration})
          }
  
          // New Place
          if(this.analytics.filter(a=>a.name === prevState.clientimageName).length === 0)
          {
            this.analytics.push({name:prevState.clientimageName,duration:diffrence})
          
            Firebase.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.pid+"/rooms/"+this.props.roomId+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+prevState.clientimageName)
            .update({duration:diffrence})
          }      
        }
      }
  }


 
 
  setAudioLocal() {
    

  
    console.log(this.state.localStream)
    if (this.state.localStream.stream.getAudioTracks().length > 0) {
      this.state.localStream.stream.getAudioTracks().forEach(track => {
        if(track.enabled){
          this.state.localStream.stream.mute("audio");
          this.setState({
            micState: false
          })
        }
        else{
          this.state.localStream.stream.unmute("audio");
          this.setState({
            micState: true
          })
        }
      });
    }
  
  
  }
  setVideoLocal() {

    if (this.state.localStream.stream.getVideoTracks().length > 0) {
      this.state.localStream.stream.getVideoTracks().forEach(track => {
        if(track.enabled){
          this.state.localStream.stream.mute("video");
          this.setState({
            camState: false
          })
        }
        else{
          this.state.localStream.stream.unmute("video");
          this.setState({
            camState: true
          })
        }
      });
    }
    
  }

  async changedevice(videoinput,audioinput) {
    this.setState({
    videoinput:videoinput,
    audioinput:audioinput
    });
  


  
      }
  

  changeImage = (str) => {
    Firebase.database().ref("roomsession/"+this.props.roomId+"/currentimage").set({
      currentimage:this.state.images[str].url,
      currentimageName:this.state.images[str].name,
      imageid:str
    })
    this.setState({ current_image: str })
    if(document.getElementById(str+"_thumb")){
      var a = document.querySelectorAll('.item_active');
      [].forEach.call(a, function(el) {
                el.classList.remove("item_active");
      });
      document.getElementById(str+"_thumb").classList.add('item_active');
    }
  }

  change = (str) => {
    for (var key in this.state.images){
      if (this.state.images[key].url === str) { 
       
        this.changeImage(key) }
    }
  }
 
  togglenav(e)
  {
    var a = document.querySelectorAll('.nav-link.active');
    [].forEach.call(a, function(el) {
      el.classList.remove("active");
      el.classList.remove("show");
    });

    var a = document.querySelectorAll('.tab-pane.active');
    [].forEach.call(a, function(el) {
      el.classList.remove("active");
      el.classList.remove("show");
    });

    if(e.target.getAttribute('datasrc')==="user_icon"){
      document.getElementById('members_tab').classList.add('active');
      document.getElementById('members_tab').classList.add('show');
      document.getElementById('members').classList.add('active');
      document.getElementById('members').classList.add('show');
    }else if(e.target.getAttribute('datasrc')==="chat_icon"){
      document.getElementById('chat_tab').classList.add('active');
      document.getElementById('chat_tab').classList.add('show');
      this.setState({
        messagescount:0
        })
      document.getElementById('chat').classList.add('active');
      document.getElementById('chat').classList.add('show');
    }else if(e.target.getAttribute('datasrc')==="close_icon"){
      document.getElementById('members_tab').classList.add('active');
      document.getElementById('members_tab').classList.add('show');
      document.getElementById('members').classList.add('active');
      document.getElementById('members').classList.add('show');
    }

    if(this.Sidenav.current.style.width==="320px"){
      this.Sidenav.current.style.width="0px";
          this.bottom.current.style.width="100%";
         this.localvideo.current.classList.add('relative-localvideo');
    }
    else{
      this.Sidenav.current.style.width="320px";
      this.localvideo.current.classList.remove('relative-localvideo');
      this.bottom.current.style.width=this.bottom.current.offsetWidth-259+"px";
    }
  }
  sendmessage(e){
    e.preventDefault();
    const temp=this.state.connection;
    this.setState({
      connection:temp
    });
    const message = {
      actiontype:"chat",
      room: this.props.roomId,
      user: this.state.connection.userid,
      message: this.messagearea.current.value,
      name:localStorage.getItem("name"),
      type:"message"
    };
    this.state.connection.send(message);
    this.setState(ele => ({
      messages: [...ele.messages, message]
    }))
    this.messagearea.current.value="";
  }
loader(){
  this.setState({
    loader:false
  })
}


handleBtnClick() {
  /*Collecting node-element and performing click*/
  this.inputFileRef.current.click();
}
fileupload = (event)=>{
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    const message = {
      actiontype:"chat",
      room: this.props.roomId,
      user: this.state.connection.userid,
      message:"",
      name:localStorage.getItem("name"),
      type:"file",
      filename:file.name,
      filedata:reader.result
    };
    this.setState(ele => ({
      messages: [...ele.messages, message]
    }))
    this.state.connection.send(message)

    
  };
}
getstreamstatus(stream){
  const track=stream.getAudioTracks();

 return track[0].enabled;
  
}


destruct = () => {


  let end = new Date;
  let diffrence = Math.floor((Math.abs(end - this.start)/1000));
     // New Place
     if(this.analytics.filter(a=>a.name === this.state.clientimageName).length === 0)
     {
       Firebase.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.pid+"/rooms/"+this.props.roomId+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+this.state.clientimageName)
       .update({duration:diffrence})
     }  
     
     //Visited Place
     if(this.analytics.filter(a=>a.name === this.state.clientimageName).length === 1)
     {
       var place = this.analytics.filter(a=>a.name === this.state.clientimageName);
       place[0].duration += diffrence
 
       Firebase.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.pid+"/rooms/"+this.props.roomId+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+this.state.clientimageName)
       .update({duration:place[0].duration})
     }
}

  render() {
    if(this.state.closeRoom)
    {
      return <Redirect to="/feedback" />
    }

    return (<>

    {!this.state.init?<Scene
            room={this.props.roomId}
            project={this.props.pid}
            data={this.state.images}
            image={this.state.current_image}
            change={this.change}
            host={this.state.host}
            loader={this.loader}
            clientimage={this.state.clientimage}
            clientimageid={this.state.clientimageid}
            clientimageName={this.state.clientimageName}
            getImageName={this.getImageName}
          />:<></>}
            {/* <div style={{position: "absolute",bottom: "80px",right: "16px"}}>
    <span className="host_video_name">You</span>
    <video
                autoPlay
                id='localVideo' className="user-video"
                muted
                ref={video => (this.localVideo = video)}
              />
        
     </div> */}
    {this.state.apiload ?<></>: <>
  
    
          <div style={{width:'fit-content'}} id="bottom" className="container" ref={this.bottom} >
          <SceneControls
              destruct={this.destruct}
              pid={this.state.pid}
              
              roomId={this.props.roomId}
              user_id={this.state.user_id}
              data={this.state.data}
              changeImage={this.changeImage}
              changeProject={this.changeProject}
              micstate={this.state.micState}
              changedevice={this.changedevice}
              switch={this.switch}
              floorplandata={this.state.floorplandata}
              pdfdata={this.state.pdfdata} 
              mapdata={this.state.mapdata}
              connection={this.state.connection}
              micaction={() => {
                this.setAudioLocal();
              }}
              videoaction={() => {
                this.setVideoLocal();
              }}
              camstate={this.state.camState}
              host={this.state.host}
              videoinput={this.state.videoinput}
              audioinput={this.state.audioinput}
            />  
            </div>
          </>}
     
    














  <div className="sidedrawer_icon"> 
    <button datasrc="user_icon" onClick={this.togglenav} className="menu_option" style={{background: '#fff',display:'flex'}}>
      <svg style={{transform:'translateY(8px)'}} datasrc="user_icon"  height={24}  width={24} viewBox="0 0 24 24">
              <g datasrc="user_icon" data-name="Layer 2">
                  <g datasrc="user_icon" fill="#3366ff" data-name="people">
                      <rect datasrc="user_icon" width="24" height="24" opacity="0"/>
                        <path datasrc="user_icon" d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/>
                        <path datasrc="user_icon" d="M17 13a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
                        <path datasrc="user_icon" d="M17 14a5 5 0 0 0-3.06 1.05A7 7 0 0 0 2 20a1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 6.9 6.9 0 0 0-.86-3.35A3 3 0 0 1 20 19a1 1 0 0 0 2 0 5 5 0 0 0-5-5z"/>
                  </g>
              </g>
        </svg>  
            <sup className="members_count">{Object.keys(this.state.rtcstreams).length}</sup>             
     </button>
    <span className="sidedrawer_icon_separate"></span>
    <button datasrc="chat_icon" onClick={this.togglenav} className="menu_option" style={{background: '#fff',display:'flex'}}>
     <svg style={{transform:'translateY(8px) translateX(-1px)'}} datasrc="chat_icon"  height={24}  width={24} viewBox="0 0 24 24">
      <g datasrc="chat_icon" data-name="Layer 2">
        <g datasrc="chat_icon" fill="#3366ff" dataName="message-square">
          <rect datasrc="chat_icon" width="24" height="24" opacity="0"/>
          <circle datasrc="chat_icon" cx="12" cy="11" r="1"/>
          <circle datasrc="chat_icon" cx="16" cy="11" r="1"/>
          <circle datasrc="chat_icon" cx="8" cy="11" r="1"/>
          <path datasrc="chat_icon" d="M19 3H5a3 3 0 0 0-3 3v15a1 1 0 0 0 .51.87A1 1 0 0 0 3 22a1 1 0 0 0 .51-.14L8 19.14a1 1 0 0 1 .55-.14H19a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm1 13a1 1 0 0 1-1 1H8.55a3 3 0 0 0-1.55.43l-3 1.8V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"/>
        </g>
        </g>
    </svg>     
            <sup className="chat_count">{this.state.messagescount}</sup>                     
  </button>

  </div>

  
<div id="mySidenav" ref={this.Sidenav} className="sidenav" >
  <a datasrc="close_icon" onClick={this.togglenav} className="closebtn">×</a>
  <div style={{height: '100%'}}>
    <div className="nav-tabs-navigation">
      <div className="nav-tabs-wrapper">
        <ul style={{padding: 0}} className="nav nav-tabs" data-tabs="tabs">
          <li className="nav-item">
            <a id="members_tab" className="nav-link" href="#members" data-toggle="tab">Members</a>
          </li>
          <li className="nav-item">
            <a id="chat_tab" className="nav-link" href="#chat" data-toggle="tab">CHAT</a>
          </li>
        </ul>
      </div>
    </div>
    <div style={{height: '100%'}} className="tab-content text-center">
      <div style={{height: '100%'}} className="tab-pane active show" id="members">
      
      <ul className="video_div" style={{padding:'0px',height:'90%',overflowX:'hidden',overflowY: "auto", listStyle:"none",width:'85%',paddingLeft:'12px'}}>
      
   
               {this.state.rtcstreams.map((key)=>{
      if(key.type=="local"){
        return(
          <li style={{marginTop:'30px'}} className="video_content">
                          <div ref={this.localvideo}  className="relative-localvideo">
                             <div className="videotools">
                           
                               <span className="guest_video_name video_name_option">You</span>
                             
                          </div>
                          <VideoItem
              key={key.userid}
              userId={key.userid}
              stream={key.stream}
            />
                          </div>
                       </li>
          
        )
            }else{
     return(
      <li className="video_content">
      <div style={{"background":"#000"}}>
         <div className="videotools">
          
           <span className="guest_video_name video_name_option">{key.extra.name}</span>
         
      </div>
      <VideoItem
      key={key.userid}
      userId={key.userid}
      stream={key.stream}
    />
      </div>
               </li>
     )}
   })}
              </ul>
      </div>
      <div style={{height: '100%'}} className="tab-pane" id="chat">
        <ul className="chat_bar">
        {this.state.messages.map((child)=>{
          if(child.type==="message"){
            return(
              <li className={this.state.connection.userid===child.user?"self":"other"}>
              <div className="chat_name">{child.name}</div>
            <div className={this.state.connection.userid===child.user?"self_msg":"other_msg"}>{child.message}</div>
            </li>
            )}
            else{
              return(
                <li className={this.state.connection.userid===child.user?"self":"other"}>
  <div className="chat_name">{child.name}</div>
  <div className= {this.state.connection.userid===child.user?" media_msg self_msg":"media_msg  other_msg"}><span className="media_file_name">{child.filename}</span>
    <span style={{paddingRight: '8px', cursor: 'pointer'}}>
     <a target="_blank" href={child.filedata} download> <svg   width={24} height={24} viewBox="0 0 24 24">
        <defs>
          <path id="prefix__download" d="M19 16c.55 0 1 .45 1 1v2c0 .51-.388.935-.884.993L19 20H5c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v1h12v-1c0-.55.45-1 1-1zM12 3c.553 0 1 .448 1 1v8l2.4-1.8c.442-.333 1.069-.242 1.4.2.332.442.242 1.069-.2 1.4l-4 3c-.177.133-.389.2-.6.2-.201 0-.402-.061-.575-.182l-4-2.814c-.452-.318-.561-.942-.243-1.393.318-.452.941-.561 1.393-.243l2.428 1.71L11 12V4c0-.552.447-1 1-1z" />
        </defs>
        <g fill="none" fillRule="evenodd">
          <use fill="#fff" xlinkHref="#prefix__download" />
        </g>
      </svg></a>
    </span>
  </div>
</li>

              )
            }
          })}
         
        </ul>
        <form className="media_form" onSubmit={this.sendmessage}>
          <span style={{cursor:'pointer'}} onClick={this.onBtnClick}>
            <input type="file" ref={this.inputFileRef} onChange={this.fileupload} style={{display: 'none'}} />
            <svg   width={24} height={24} viewBox="0 0 24 24">
              <defs>
                <path id="prefix__file" d="M12 22c-3.309 0-6-2.557-6-5.698V6.132C6 3.854 7.944 2 10.333 2c2.39 0 4.334 1.854 4.334 4.132l-.006 10.177c0 1.414-1.197 2.565-2.667 2.565-1.47 0-2.666-1.151-2.666-2.566l.005-9.391c.001-.552.449-.999 1-.999h.001c.552 0 1 .448.999 1.001l-.005 9.39c0 .311.298.565.666.565.368 0 .667-.254.667-.566l.006-10.177C12.667 4.956 11.62 4 10.333 4 9.047 4 8 4.956 8 6.132v10.17C8 18.341 9.794 20 12 20s4-1.659 4-3.698V6.132c0-.553.448-1 1-1s1 .447 1 1v10.17C18 19.443 15.309 22 12 22" />
              </defs>
              <g fill="none" fillRule="evenodd">
                <use fill="#222B45" xlinkHref="#prefix__file" />
              </g>
            </svg>
          </span>
          <input type="text" className="input_box" ref={this.messagearea}    placeholder="Type your message and press enter" required/>
        </form>
      </div>  


      
    </div>
  </div>
</div>



{/* {this.state.loader && this.state.host?
<Switchprojectloader dis={this.state.loader} pid={this.state.pid}  data={this.state.data} host={this.state.host} Switchstatus={this.state.Switchstatus}></Switchprojectloader>
:<></>} */}

      </>
    );
  }









}

export default Video;