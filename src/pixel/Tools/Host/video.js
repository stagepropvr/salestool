import React from 'react';
import { Redirect } from "react-router-dom";
import '../../../styles/video.css';
import io from 'socket.io';
import VideoItem from "../ToolComponents/videoItem";
import SceneControls from "./SceneControls.js";
import * as RTCMultiConnection from 'rtcmulticonnection-react-js';


class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStream: {},
      micState: true,
      camState: true,
      messages:[],
      videoinput:"default",
      audioinput:"default",
      closeRoom:false,
      messagescount:0,
      connection : new RTCMultiConnection(),
      rtcstreams:[],
      usercount:0,
      lock:false
        };
    
    this.Sidenav = React.createRef();
    this.bottom = React.createRef();
    this.togglenav=this.togglenav.bind(this); 
    this.togglenav1=this.togglenav1.bind(this); 

    this.sendmessage=this.sendmessage.bind(this);
    this.changedevice=this.changedevice.bind(this);
    this.audioallctrl=this.audioallctrl.bind(this);
    this.messagearea=React.createRef();
    this.audioctrl=React.createRef();
    this.localvideo=React.createRef();
    this.inputFileRef = React.createRef();
    this.onBtnClick = this.handleBtnClick.bind(this);
    this.muteclient=this.muteclient.bind(this);
  }

  componentDidMount() {
    
      this.state.connection.socketURL = 'https://propvrrtc.propvr.tech/';
      this.state.connection.enableLogs = false;
      this.state.connection.session = {
          audio: true,
          video: true
      };
      this.state.connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
      };
      var bitrates = 512;



var  videoConstraints = {
  width: { min: 160, ideal: 640, max: 1280 },
  height: { min: 120, ideal: 360, max: 720 },
  frameRate: 30,
  deviceId:this.state.videoinput
};

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
this.state.connection.extra={
  name:"host"

}

this.state.connection.mediaConstraints = {
video: videoConstraints,
audio:{echoCancellation: true,
  deviceId:this.state.audioinput}
};
this.state.connection.userid="host";
this.state.connection.onstreamended = (event)=> {
  this.setState(ele => ({
    rtcstreams: [...ele.rtcstreams]
  })); 
};
this.state.connection.onstream = event => {



var count=0;
this.state.rtcstreams.map((key)=>{
  if(key.stream.active){
    count++;
  }
})
this.setState({
  usercount:count
})

if(event.type==="local"){
  this.setState({
    localStream:event
  })
  this.state.localStream.stream.unmute("audio");

}else{
  event.isAudioMuted=!event.extra.initaudio;
}
this.setState(ele => ({
  rtcstreams: [...ele.rtcstreams, event]
}))
};

this.state.connection.onUserStatusChanged = (event)=> {

  this.setState(ele => ({
    rtcstreams: [...ele.rtcstreams]
  }));  
  var count=0;
  this.state.rtcstreams.map((key)=>{
    if(key.stream.active){
      count++;
    }
  })
  this.setState({
    usercount:count
  });
};
 this.state.connection.onmessage = (event)=> {
  if(!document.getElementById('chat_tab').getAttribute("class").includes("active show")){
    this.setState({
    messagescount:this.state.messagescount+1
    })
  }
    this.setState(ele => ({
      messages: [...ele.messages, event.data]
    }))
   
  };
 
  var socket = this.state.connection.getSocket();

this.state.connection.openOrJoin(this.props.roomId);
this.state.connection.isAudioMuted=false;

 
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

    







  



// });

  }


 
  setAudioLocal() {


    this.state.connection.send("audio");

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
 
togglenav1(e){
  this.messagearea.current.focus();
    var a = document.querySelectorAll('.nav-link.active');
    [].forEach.call(a, function(el) {
      el.classList.remove("active");
      el.classList.remove("show");
    });

   a = document.querySelectorAll('.tab-pane.active');
    [].forEach.call(a, function(el) {
      el.classList.remove("active");
      el.classList.remove("show");
    });

    document.getElementById('members_tab').classList.add('active');
    document.getElementById('members_tab').classList.add('show');
    document.getElementById('members').classList.add('active');
    document.getElementById('members').classList.add('show');

    if(this.Sidenav.current.style.width==="320px"){
      this.Sidenav.current.style.width="0px";
          this.bottom.current.style.width="100%";
     this.localvideo.current.classList.add('relative-localvideo');
    }
}
  togglenav(e)
  {

    this.messagearea.current.focus();
    var a = document.querySelectorAll('.nav-link.active');
    [].forEach.call(a, function(el) {
      el.classList.remove("active");
      el.classList.remove("show");
    });

   a = document.querySelectorAll('.tab-pane.active');
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
    const message = {
      actiontype:"chat",
      room: this.props.roomId,
      user: this.state.connection.userid,
      message: this.messagearea.current.value,
      name:"Host",
      type:"message"
    };
    this.state.connection.send(message);
    this.setState(ele => ({
      messages: [...ele.messages, message]
    }))
  
    this.messagearea.current.value="";
  }
audioallctrl(e){
  const data = {
    id: this.props.roomId,
    ctrl: this.audioctrl.current.checked
  };
  this.state.connection.send({actiontype:"muteall",data})
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
      user: this.state.connection.userid,
      message:"",
      type:"file",
      name:"Host",
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
muteclient(id,status){

 // var streamByUserId = this.state.connection.streamEvents.selectFirst({ userid: id });
  

    
  this.state.connection.send({actiontype:"mute",user:id,status});


}
focus = (event)=>{
  this.messagearea.current.focus();
}

  render() {
    if(this.state.closeRoom)
  {    
      return <Redirect to="/salestool/pixel/feedback" />
    }

    return (<>
          <div style={{position:'absolute', left: '0', right: '0', bottom: '0', top: '0px' }}>
            <iframe src="https://pixel.propvr.tech/" zIndex="-1" width="100%" height="92.5%"></iframe>
          </div>
          <div id="bottom" className="container" ref={this.bottom} >
          
          <SceneControls
              roomId={this.props.roomId}
              micstate={this.state.micState}
              changedevice={this.changedevice}
              connection={this.state.connection}
              micaction={() => {
                this.setAudioLocal();
              }}
              videoaction={() => {
                this.setVideoLocal();
              }}
              camstate={this.state.camState}
            
              videoinput={this.state.videoinput}
              audioinput={this.state.audioinput}
              togglenav = {this.togglenav1}
            />  
            </div>     
    

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
            <sup className="members_count">{this.state.usercount}</sup>             
     </button>
    <span className="sidedrawer_icon_separate"></span>
    <button datasrc="chat_icon" onClick={this.togglenav} className="menu_option" style={{background: '#fff',display:'flex'}}>
     <svg style={{transform:'translateY(8px) translateX(-1px)'}} datasrc="chat_icon"  height={24}  width={24} viewBox="0 0 24 24">
      <g datasrc="chat_icon" data-name="Layer 2">
        <g datasrc="chat_icon" fill="#3366ff" dataname="message-square">
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
          <li onClick={this.focus} className="nav-item">
            <a id="chat_tab" className="nav-link" href="#chat" data-toggle="tab">CHAT</a>
          </li>
        </ul>
      </div>
    </div>
    <div style={{height: '100%'}} className="tab-content text-center">
      <div style={{height: '100%'}} className="tab-pane active show" id="members">
        <div className="mute_all_div">
          <input ref={this.audioctrl} onChange={this.audioallctrl} type="checkbox"/>
          <label className="mute_all">Mute all</label>
          </div>

      <ul style={{padding:'0px',height:'90%',overflow: "auto", listStyle:"none",width:'85%',paddingLeft:'12px'}}>
      
   {this.state.rtcstreams.map((key)=>{
    if(key.type=="local"){
return(

  <li className="video_content">
                  <div ref={this.localvideo}  className=" fixed-video relative-localvideo">


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
      if(key.stream.active){
     return(
      <li className="video_content">
      <div className="fixed-video">
         <div className="videotools">
          
           
           {!key.isAudioMuted? <button id={key} onClick={() => this.muteclient(key.userid,key.isAudioMuted)}   className="menu_option video_on guest_video_mute video_mute_option"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="#222B45" fill-rule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z"></path></svg>
           </button>:
              <button id={key} onClick={() => this.muteclient(key.userid,key.isAudioMuted)}  style={{"background":"rgb(255, 61, 113)"}} className="menu_option video_on guest_video_mute video_mute_option"> <svg width={24} height={24} xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" >
            <g data-name="Layer 2">
               <g data-name="mic-off">
                  <rect width={24} height={24} opacity={0} />
                  <path fill="#fff" d="M10 6a2 2 0 0 1 4 0v5a1 1 0 0 1 0 .16l1.6 1.59A4 4 0 0 0 16 11V6a4 4 0 0 0-7.92-.75L10 7.17z" />
                  <path fill="#fff" d="M19 11a1 1 0 0 0-2 0 4.86 4.86 0 0 1-.69 2.48L17.78 15A7 7 0 0 0 19 11z" />
                  <path fill="#fff" d="M12 15h.16L8 10.83V11a4 4 0 0 0 4 4z" />
                  <path fill="#fff" d="M20.71 19.29l-16-16a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                  <path fill="#fff" d="M15 20h-2v-2.08a7 7 0 0 0 1.65-.44l-1.6-1.6A4.57 4.57 0 0 1 12 16a5 5 0 0 1-5-5 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z" />
               </g>
            </g>
            </svg>   </button>}
      
           <span className="guest_video_name video_name_option">{key.extra.name}</span>
         
      </div>
      <VideoItem
      key={key.userid}
      userId={key.userid}
      stream={key.stream}
    />
      </div>
               </li>
     )}}
   })}
      
              </ul>
      </div>
      <div style={{height: '100%'}} className="tab-pane" id="chat">
        <ul className="chat_bar">
        {this.state.messages.map((child,key)=>{
          if(child.type==="message"){
            return(
             
             key<1?
             
             <li className={this.state.connection.userid===child.user?"self":"other"} ><div className="chat_name">{child.name}</div> <div className={this.state.connection.userid===child.user?"self_msg":"other_msg"}>{child.message}</div>
            </li>
            :
       
             this.state.messages[key].name===this.state.messages[key-1].name?
              <li className={this.state.connection.userid===child.user?"self":"other"} style={{"marginTop":"0px"}}> <div className={this.state.connection.userid===child.user?"self_msg":"other_msg"}>{child.message}</div>
              </li>
             
             
             : <li className={this.state.connection.userid===child.user?"self":"other"} ><div className="chat_name">{child.name}</div> <div className={this.state.connection.userid===child.user?"self_msg":"other_msg"}>{child.message}</div>
             </li>
             
             
              
           
            )}
            else{
              return(
                <li className={this.state.connection.userid===child.user?"self":"other"} style={{marginTop:this.state.messages[key].name===this.state.messages[key-1].name?"0px":"16px"}}>
   {key<1?<div className="chat_name">{child.name}</div>:
             this.state.messages[key].name===this.state.messages[key-1].name?<></>:<div className="chat_name">{child.name}</div>
             
             }
  <div className= {this.state.connection.userid===child.user?" media_msg self_msg":"media_msg  other_msg"}><span className="media_file_name">{child.filename}</span>
    <span style={{paddingRight: '8px', cursor: 'pointer'}}>
     <a  rel="noopener noreferrer" target="_blank" href={child.filedata} download> <svg   width={24} height={24} viewBox="0 0 24 24">
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
        <form style={{width:'90%'}} className="media_form" onSubmit={this.sendmessage}>
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
          <input  type="text" className="input_box" ref={this.messagearea}    placeholder="Type your message" autofocus required/>
          <button style={{cursor: "pointer",background: "#f7f9fc",border: "none",marginTop:'-5px'}} type="submit">
          <svg focusable="false" width={24} height={24} viewBox="0 0 24 24" class="Hdh4hc cIGbvc NMm5M hhikbc">
            <path d="M2 3v18l20-9L2 3zm2 11l9-2-9-2V6.09L17.13 12 4 17.91V14z" style={{fill: "#222b45"}}></path>
          </svg>
          </button>
        </form>
      </div>  
    </div>
  </div>
</div>

      </>
    );
  }
}

export default Video;