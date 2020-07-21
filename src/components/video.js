import React from 'react';
import { Redirect } from "react-router-dom";
import VideoCall from '../helpers/simple-peer';
import '../styles/video.css';
import io from 'socket.io-client';
import { getDisplayStream } from '../helpers/media-access';
import Peer from 'simple-peer'
import VideoItem from "./videoItem";
import Scene from "./Scene";
import Firebase from "../config/Firebase";
import SceneControls from "./SceneControls.js";
import { useEffect } from 'react';
import Switchprojectloader from './Switchprojectloader';

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
      streams: {},
      current_image: "",
      socket: io.connect("localhost:5000"),
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
      hostaudioctrl:false

    };
    this.Sidenav = React.createRef();
    this.bottom = React.createRef();
    this.togglenav=this.togglenav.bind(this); 
    this.sendmessage=this.sendmessage.bind(this);
    this.loader=this.loader.bind(this);
this.changedevice=this.changedevice.bind(this);
this.audioallctrl=this.audioallctrl.bind(this);
    this.messagearea=React.createRef();
    this.audioctrl=React.createRef();

    this.inputFileRef = React.createRef();
    this.onBtnClick = this.handleBtnClick.bind(this)

  }
  videoCall = new VideoCall();

  componentDidMount() {

    this.setState({
      pid:this.props.pid
    })
    var promise = new Promise( (resolve, reject) => {
    Firebase.auth().onAuthStateChanged((user) => {

      if (user &&  localStorage.getItem(this.props.roomId)!==undefined) {
       
        Firebase.database().ref("users/" + user.uid + "/Projects/" + this.props.pid).once("value", (node) => {
          this.state.data = node.val();
       
            for (var x in node.val().images){
              console.log(this.state.socket.id);
              Firebase.database().ref("roomsession/"+this.props.roomId).update({
                currentimage:{currentimage:node.val().images[x].url,
                imageid:x},
                hostid:{
                hostid:this.state.socket.id}
              })
              this.setState({
                current_image:x,
                images: node.val().images,
                data:node.val(),
                apiload:false,
                user_id:user.uid,
                init:false,
                name:"host"
              });
            break;
            }

        }).then((value)=>{
          
          resolve("Promise resolved successfully");
        })

      }
      else{
       
        this.setState({
          host:false
        })
        Firebase.database().ref("roomsession/"+this.props.roomId+"/hostid").on("value",(snap)=>{
          this.setState({
            hostref:snap.val().hostid
          })
        })
        Firebase.database().ref("roomsession/"+this.props.roomId+"/currentimage").on("value",(snap)=>{
          this.setState({
            clientimage:snap.val().currentimage,
            clientimageid:snap.val().imageid,
            apiload:false,
            init:false,
           
            loader:true
          });
        })
      }
      
        resolve("Promise resolved successfully");
     
 
    });
  });


    promise.then( result => {
    
    


    // const socket = io.connect("localhost:5000");
    const component = this;
    // this.setState({ socket });
    const { roomId } = this.props;
    this.getUserMedia().then(() => {
      console.log(this.state.localStream);
      this.state.socket.emit('join', { roomId });
      ////console.log("socket.on join", roomId)
      console.log(this.state.host);
     
    });

    
    this.state.socket.on('closeRoom', () => {
      console.log("Host Closed The Room")
      this.state.socket.close()  
      this.setState({closeRoom:true});    
    });


    this.state.socket.on('init', (data) => {
      Firebase.database().ref("roomsession/"+this.props.roomId+"/members").update({
        [this.state.socket.id]:(this.state.host?"host":this.state.name)
        })
    console.log("socket.on init", data)

      userId = data.userId;
      this.state.socket.emit('ready', ({ room: roomId, userId:userId, name:(!this.state.host?this.state.name:"host") }));
     
      Firebase.database().ref("roomsession/"+this.props.roomId+"/members").on("value",(members)=>{
          console.log(members.val());
          this.setState({
            members:members.val()
          })
      });
    });

    this.state.socket.on("users", ({ initiator, users,name,usersocketid }) => {


console.log(this.state.members);
      Object.keys(users.sockets)
        .filter(
          sid =>
            !this.state.peers[sid] && sid !== userId)
        .forEach(sid => {
          console.log(sid);
          const peer = new Peer({
            initiator: userId === initiator,
            config: {
              iceServers: [
                {
                  urls: 'turn:52.15.126.155:3478',
                  credential: 'revsmart123',
                  username: 'propvr' 
                                      }
              ]
            },
            // Allow the peer to receive video, even if it's not sending stream:
            // https://github.com/feross/simple-peer/issues/95
            offerConstraints: {
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            },
            stream: this.state.localStream,
            
          })

          peer.on('signal', data => {
            //console.log("peer.on  signal", users)

            const signal = {
              userId: sid,
              signal: data
            };

            this.state.socket.emit('signal', signal);
          });
          peer.on('stream', (stream)=> {
            console.log("peer.on  stream", stream)

            const streamsTemp = { ...this.state.streams }
            streamsTemp[sid] = stream

            this.setState({ streams: streamsTemp })
          });
          peer.on('error', function (err) {
            //console.log("peer.on  error", err)

            //console.log(err);
          });

          const peersTemp = { ...this.state.peers }
          peersTemp[sid] = peer

          this.setState({ peers: peersTemp })
        })
    })
    this.state.socket.on('chat message',  msg  => {
     console.log(msg);
      this.setState(ele => ({
        messages: [...ele.messages, msg]
      }))
      console.log(this.state.messages);
    });
    this.state.socket.on('signal', ({ userId, signal,image }) => {
     // //console.log("socket.on  signal userId", userId, "signal", signal);
   

      
      const peer = this.state.peers[userId]
      peer.signal(signal)
    })

    this.state.socket.on('disconnected', () => {
      component.setState({ initiator: true });
    });
    
this.state.socket.on("switchimage",(url)=>{
//console.log(url);
});

if(!this.state.host){
  this.state.socket.on("audioctrl",(audioctrl)=>{
    if(audioctrl){
      if (this.state.localStream.getAudioTracks().length > 0) {
        this.state.localStream.getAudioTracks().forEach(track => {
          track.enabled =false;
        });
      }
      this.setState({
        micState: false,
        hostaudioctrl:true
      })
    }
    else{
      if (this.state.localStream.getAudioTracks().length > 0) {
        this.state.localStream.getAudioTracks().forEach(track => {
          track.enabled =true;
        });
      }
      this.setState({
        micState: true,
        hostaudioctrl:true
      })
    }
    });
}


});
  }

  getUserMedia(cb) {
    
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      const op = {
        video: {
          width: { min: 160, ideal: 640, max: 1280 },
          height: { min: 120, ideal: 360, max: 720 },
          deviceId:this.state.videoinput
          
        },
        audio:{echoCancellation: true,
          deviceId: this.state.audioinput} 
      };
      navigator.getUserMedia(
        op,
        stream => {
          stream["name"]="karthik";
          
          this.setState({ streamUrl: stream, localStream: stream });
          
          this.localVideo.srcObject = stream;
          resolve();
        },
        (err) => {
          console.log(err);
         }
      );
    });
  }

  setAudioLocal() {
    if(!this.state.hostaudioctrl){
    if (this.state.localStream.getAudioTracks().length > 0) {
      this.state.localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    this.setState({
      micState: !this.state.micState
    })
  }
  }
  setVideoLocal() {
    if (this.state.localStream.getVideoTracks().length > 0) {
      this.state.localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    this.setState({
      camState: !this.state.camState
    })
  }

  async changedevice(videoinput,audioinput) {
  this.setState({
  videoinput:videoinput,
  audioinput:audioinput
  });
console.log('1');
 console.log(this.state.videoinput,this.state.audioinput);
      var op = {
        video: false,
        audio:{echoCancellation: true,
          deviceId:audioinput} 
      };
      await navigator.getUserMedia(
        op,
        stream => {
          console.log('2')
          var streamremove=this.localVideo.srcObject;
          streamremove.getTracks().forEach((track)=>{
track.stop();
      });
          
          console.log('4')
          Object.keys(this.state.peers).forEach((key)=>{
            this.state.peers[key].removeStream(this.state.localStream);
          })
          this.setState({ streamUrl: stream, localStream: stream });
          this.localVideo.srcObject = stream;
            Object.keys(this.state.peers).forEach((key)=>{
              this.state.peers[key].addStream(this.state.localStream);
            })
            console.log('5')
        },
        () => { }
      );
      console.log('6')
      var op = {
        video: {
          width: { min: 160, ideal: 640, max: 1280 },
          height: { min: 120, ideal: 360, max: 720 },
          deviceId: videoinput
          
        },
        audio:{echoCancellation: true,
          deviceId: this.state.audioinput} 
      };
      console.log('7')
     navigator.getUserMedia(
        op,
        stream => {
          console.log('8')
      var streamremove=this.localVideo.srcObject;
      //this.localVideo.srcObject=null;
      streamremove.getTracks().forEach((track)=>{
track.stop();
  });
  console.log('9')   
          Object.keys(this.state.peers).forEach((key)=>{
            this.state.peers[key].removeStream(this.state.localStream);
          })
          this.setState({ streamUrl: stream, localStream: stream });
          this.localVideo.srcObject = stream;
            Object.keys(this.state.peers).forEach((key)=>{
              this.state.peers[key].addStream(this.state.localStream);
            })
            console.log('10')
        },
        () => { }
      );
      console.log('11')
    }


  changeImage = (str) => {
    Firebase.database().ref("roomsession/"+this.props.roomId+"/currentimage").set({
      currentimage:this.state.images[str].url,
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
  changeProject = (user_id,pid) =>{
    this.setState({
      loader:true,
      apiload:true
    })
    Firebase.database().ref("users/" + user_id + "/Projects/" + pid).once("value", (node) => {
      this.setState({
        data:node.val(),
        pid:pid,
        apiload:false
      })
      if (node.hasChild("images")) {
        for (var x in node.val().images){
          this.setState({
            current_image:x,
            images: node.val().images
          });
          Firebase.database().ref("roomsession/"+this.props.roomId+"/currentimage").set({
            currentimage:node.val().images[x].url,
            imageid:x
          })
        break;
        }
      }
    });
  }
  togglenav()
  {
    //console.log(this.Sidenav.current.style.width);
    
    if(this.Sidenav.current.style.width==="300px"){
      this.Sidenav.current.style.width="0px";
          //console.log(this.bottom.current.offsetWidth);
          this.bottom.current.style.width=this.bottom.current.offsetWidth+259+"px";
  
    }
    else{
      this.Sidenav.current.style.width="300px";
      //console.log(this.bottom.current.offsetWidth);
      this.bottom.current.style.width=this.bottom.current.offsetWidth-259+"px";
    }
  }
  sendmessage(e){
    e.preventDefault();
    const message = {
      room: this.props.roomId,
      user: this.state.socket.id,
      message: this.messagearea.current.value,
      type:"message"
    };
    //console.log(message);
    this.state.socket.emit('chat message', message);
    this.messagearea.current.value="";
  }
loader(){
  this.setState({
    loader:false
  })
}
audioallctrl(e){
  const data = {
    id: this.props.roomId,
    ctrl: this.audioctrl.current.checked
  };
  console.log(data);
  this.state.socket.emit('audioctrl', data);
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
    console.log(file.name);
    console.log(reader.result);
    const message = {
      room: this.props.roomId,
      user: this.state.socket.id,
      message:"",
      type:"file",
      filename:file.name,
      filedata:reader.result
    };
    //console.log(message);
    this.state.socket.emit('chat message', message);
    
  };
}

  render() {

    if(this.state.closeRoom)
    {
      this.state.socket.close();
      return <Redirect to="/feedback" />
    }

    return (<>

    {!this.state.init?<Scene
            data={this.state.images}
            image={this.state.current_image}
            change={this.change}
            host={this.state.host}
            loader={this.loader}
            clientimage={this.state.clientimage}
            clientimageid={this.state.clientimageid}
          />:<></>}
            <div style={{position: "absolute",bottom: "80px",right: "16px"}}>
    <span className="host_video_name">You</span>
    <video
                autoPlay
                id='localVideo' className="user-video"
                muted
                ref={video => (this.localVideo = video)}
              />
        
     </div>
    {this.state.apiload ?<></>: <>
  
    
          <div id="bottom" className="container" ref={this.bottom} >
          <SceneControls
              pid={this.state.pid}
              socket={this.state.socket}
              roomId={this.props.roomId}
              user_id={this.state.user_id}
              data={this.state.data}
              changeImage={this.changeImage}
              changeProject={this.changeProject}
              micstate={this.state.micState}
              changedevice={this.changedevice}
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
     
    















          <button onClick={this.togglenav} className="menu_option" style={{background: '#fff', float: 'right', position: 'relative', marginRight: '16px', top: '10px'}}>
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24">
    <defs>
      <path id="prefix__dot" d="M12 17c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <use fill="#222B45" xlinkHref="#prefix__dot" />
    </g>
  </svg>               
</button>
<div id="mySidenav" ref={this.Sidenav} className="sidenav" >
  <a onClick={this.togglenav} className="closebtn" onclick="closeNav()">×</a>
  <div style={{height: '100%'}}>
    <div className="nav-tabs-navigation">
      <div className="nav-tabs-wrapper">
        <ul style={{padding: 0}} className="nav nav-tabs" data-tabs="tabs">
          <li style={{marginLeft: 0}} className="nav-item">
            <a className="nav-link active show" href="#members" data-toggle="tab">Members</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#chat" data-toggle="tab">CHAT</a>
          </li>
        </ul>
      </div>
    </div>
    <div style={{height: '100%'}} className="tab-content text-center">
      <div style={{height: '100%'}} className="tab-pane active show" id="members">
       {this.state.host? <div className="mute_all_div">
          <input ref={this.audioctrl} onChange={this.audioallctrl} type="checkbox"/>
          <label className="mute_all">Mute all</label>
          </div>:<></>}
      <ul style={{padding:'0px',height:'90%',overflow: "auto", listStyle:"none",width:'85%',paddingLeft:'8px'}}>
     
   
      {
                Object.keys(this.state.streams).map((key, id) => {
                  if(this.state.streams[key].active ){
                    console.log(this.state.members[key]);
                  return    <li>
                  <div style={{"background":"#000"}}>
                     <div className="videotools">
                    {this.state.host?   <button className="menu_option video_on guest_video_mute video_mute_option">
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                           <path fill="#222B45" fillRule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z" />
                        </svg>
                        <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{display: 'none'}}>
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
                        </svg>
                     </button>:<></>}
                       <span className="guest_video_name video_name_option">{this.state.members[key]}</span>
                     
                  </div>
                  <VideoItem
                    key={key}
                    userId={key}
                    stream={this.state.streams[key]}
                  />
                  </div>
               </li>






                   } 
                  else{
                    return(
                      <></>
                    )
                  }  })
              }
              </ul>
      </div>
      <div style={{height: '100%'}} className="tab-pane" id="chat">
        <ul className="chat_bar">
        {this.state.messages.map((child)=>{
          if(child.type==="message"){
            return(
              <li className={this.state.socket.id===child.user?"self":"other"}>
              <div className="chat_name">{this.state.members[child.user]}</div>
            <div className={this.state.socket.id===child.user?"self_msg":"other_msg"}>{child.message}</div>
            </li>
            )}
            else{
              return(
                <li className={this.state.socket.id===child.user?"self":"other"}>
  <div className="chat_name">{this.state.members[child.user]}</div>
  <div className= {this.state.socket.id===child.user?" media_msg self_msg":"media_msg  other_msg"}><span className="media_file_name">{child.filename}</span>
    <span style={{paddingRight: '8px', cursor: 'pointer'}}>
     <a target="_blank" href={child.filedata} download> <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24">
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
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24">
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



{this.state.loader && this.state.host?
<Switchprojectloader dis={this.state.loader} pid={this.state.pid}  data={this.state.data} host={this.state.host}></Switchprojectloader>
:<></>}

      </>
    );
  }









}

export default Video;