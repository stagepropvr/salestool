import React from 'react';
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
      socket: io.connect("mysterious-dusk-60271.herokuapp.com"),
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
      clientimageid:""
    };
    this.Sidenav = React.createRef();
    this.bottom = React.createRef();
    this.togglenav=this.togglenav.bind(this); 
    this.sendmessage=this.sendmessage.bind(this);
    this.loader=this.loader.bind(this);
this.changedevice=this.changedevice.bind(this);
    this.messagearea=React.createRef();
  }
  videoCall = new VideoCall();

  componentDidMount() {

    this.setState({
      pid:this.props.pid
    })

    Firebase.auth().onAuthStateChanged((user) => {
////console.log(localStorage.getItem(this.props.roomId));
      if (user &&  localStorage.getItem(this.props.roomId)!==undefined) {
        
        Firebase.database().ref("users/" + user.uid + "/Projects/" + this.props.pid).once("value", (node) => {
          this.state.data = node.val();
       
            for (var x in node.val().images){
              Firebase.database().ref("roomsession/"+this.props.roomId).set({
                currentimage:node.val().images[x].url,
                imageid:x
              })
              this.setState({
                current_image:x,
                images: node.val().images,
                data:node.val(),
                apiload:false,
                user_id:user.uid,
                init:false
              });
            break;
            }
        });
      }
      else{
        Firebase.database().ref("roomsession/"+this.props.roomId).on("value",(snap)=>{
          this.setState({
            clientimage:snap.val().currentimage,
            clientimageid:snap.val().imageid,
            apiload:false,
            init:false,
            host:false,
            loader:true
          });
        });
      }
    });






    // const socket = io.connect("localhost:5000");
    const component = this;
    // this.setState({ socket });
    const { roomId } = this.props;
    this.getUserMedia().then(() => {
      this.state.socket.emit('join', { roomId });
      ////console.log("socket.on join", roomId)

    });

    this.state.socket.on('init', (data) => {

      ////console.log("socket.on init", data)

      userId = data.userId;
      this.state.socket.emit('ready', { room: roomId, userId });
    });

    this.state.socket.on("users", ({ initiator, users }) => {
      ////console.log("socket.on  users", users)

      Object.keys(users.sockets)
        .filter(
          sid =>
            !this.state.peers[sid] && sid !== userId)
        .forEach(sid => {
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
          peer.on('stream', stream => {
            //console.log("peer.on  stream", stream)

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
    this.state.socket.on('chat message', ({ message, user }) => {
     
      this.setState(ele => ({
        messages: [...ele.messages, {user: user,content:message}]
      }))
      //console.log(this.state.messages);
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
    if (this.state.localStream.getAudioTracks().length > 0) {
      this.state.localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    this.setState({
      micState: !this.state.micState
    })
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

    changedevice(videoinput,audioinput) {
  this.setState({
  videoinput:videoinput,
  audioinput:audioinput
  });

  console.log(this.state.videoinput,this.state.audioinput);
      var op = {
        video: false,
        audio:{echoCancellation: true,
          deviceId: this.state.audioinput} 
      };
      navigator.getUserMedia(
        op,
        stream => {
          var streamremove=this.localVideo.srcObject;
          streamremove.getTracks().forEach((track)=>{
track.stop();
      });
          stream.oninactive = () => {
            alert(this.state.videoinput);

          
           
          };
          Object.keys(this.state.peers).forEach((key)=>{
            this.state.peers[key].removeStream(this.state.localStream);
          })
          this.setState({ streamUrl: stream, localStream: stream });
          this.localVideo.srcObject = stream;
            Object.keys(this.state.peers).forEach((key)=>{
              this.state.peers[key].addStream(this.state.localStream);
            })
        
        },
        () => { }
      );
      op = {
        video: {
          width: 200,
          height: 500,
          deviceId: this.state.videoinput
          
        },
        audio:{echoCancellation: true,
          deviceId: this.state.audioinput} 
      };
      navigator.getUserMedia(
        op,
        stream => {
      alert(this.state.videoinput);
      var streamremove=this.localVideo.srcObject;
      streamremove.getTracks().forEach((track)=>{
track.stop();
  });
          
          Object.keys(this.state.peers).forEach((key)=>{
            this.state.peers[key].removeStream(this.state.localStream);
          })
          this.setState({ streamUrl: stream, localStream: stream });
          this.localVideo.srcObject = stream;
            Object.keys(this.state.peers).forEach((key)=>{
              this.state.peers[key].addStream(this.state.localStream);
            })
        
        },
        () => { }
      );
    
    }


  changeImage = (str) => {
    Firebase.database().ref("roomsession/"+this.props.roomId).set({
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
          Firebase.database().ref("roomsession/"+this.props.roomId).set({
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
      message: this.messagearea.current.value
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



  render() {

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
    {this.state.apiload ?<></>: <>
  
      <div style={{position: "absolute",bottom: "80px",right: "16px"}}>
        <span className="host_video_name">you(Host)</span>
        <video style={{width: "206px",height: "103px",background: "#000"}}></video>
     </div>
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
        <div className="mute_all_div">
          <input type="checkbox"/>
          <label className="mute_all">Mute all</label>
          </div>
      <ul style={{padding:'0px',height:'90%',overflow: "auto", listStyle:"none",width:'85%',paddingLeft:'8px'}}>
      <li>
        <div>
      <span className="guest_video_name">value</span>
      <button className="menu_option video_on guest_video_mute">
                      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                        <path fill="#222B45" fill-rule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z">
                          </path>
                      </svg>
                      <svg  style={{display:'none'}} width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <g data-name="Layer 2">
                          <g data-name="mic-off">
                          <rect width="24" height="24" opacity="0"/>
                          <path fill="#fff" d="M10 6a2 2 0 0 1 4 0v5a1 1 0 0 1 0 .16l1.6 1.59A4 4 0 0 0 16 11V6a4 4 0 0 0-7.92-.75L10 7.17z"/>
                          <path fill="#fff" d="M19 11a1 1 0 0 0-2 0 4.86 4.86 0 0 1-.69 2.48L17.78 15A7 7 0 0 0 19 11z"/>
                          <path fill="#fff" d="M12 15h.16L8 10.83V11a4 4 0 0 0 4 4z"/>
                          <path fill="#fff" d="M20.71 19.29l-16-16a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                          <path fill="#fff" d="M15 20h-2v-2.08a7 7 0 0 0 1.65-.44l-1.6-1.6A4.57 4.57 0 0 1 12 16a5 5 0 0 1-5-5 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
                        </g>
                        </g>
                      </svg>
                    </button>
      <video
                autoPlay
                id='localVideo' className="user-video"
                muted
                ref={video => (this.localVideo = video)}
              /></div></li>
      {
                Object.keys(this.state.streams).map((key, id) => {
                  return <li><div>
                    <span className="guest_video_name">{key}</span>
                    <button className="menu_option video_on guest_video_mute">
                      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24">
                        <path fill="#222B45" fill-rule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z">
                          </path>
                      </svg>
                      <svg id="mute" style={{display:'none'}} width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <g data-name="Layer 2">
                          <g data-name="mic-off">
                          <rect width="24" height="24" opacity="0"/>
                          <path fill="#fff" d="M10 6a2 2 0 0 1 4 0v5a1 1 0 0 1 0 .16l1.6 1.59A4 4 0 0 0 16 11V6a4 4 0 0 0-7.92-.75L10 7.17z"/>
                          <path fill="#fff" d="M19 11a1 1 0 0 0-2 0 4.86 4.86 0 0 1-.69 2.48L17.78 15A7 7 0 0 0 19 11z"/>
                          <path fill="#fff" d="M12 15h.16L8 10.83V11a4 4 0 0 0 4 4z"/>
                          <path fill="#fff" d="M20.71 19.29l-16-16a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                          <path fill="#fff" d="M15 20h-2v-2.08a7 7 0 0 0 1.65-.44l-1.6-1.6A4.57 4.57 0 0 1 12 16a5 5 0 0 1-5-5 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
                        </g>
                        </g>
                      </svg>
                    </button>
                    <VideoItem
                    key={key}
                    userId={key}
                    stream={this.state.streams[key]}
                  /></div></li>
                })
              }
              </ul>
      </div>
      <div style={{height: '100%'}} className="tab-pane" id="chat">
        <ul className="chat_bar">
        {this.state.messages.map((child)=>{
            return(
              <li className={this.state.socket.id===child.user?"self":"other"}>
              <div className="chat_name">{child.user}</div>
            <div className={this.state.socket.id===child.user?"self_msg":"other_msg"}>{child.content}</div>
            </li>
            )
          })}
         
        </ul>
        <form className="media_form" onSubmit={this.sendmessage}>
          <span>
            <input type="file" style={{display: 'none'}} />
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} height={24} viewBox="0 0 24 24">
              <defs>
                <path id="prefix__file" d="M12 22c-3.309 0-6-2.557-6-5.698V6.132C6 3.854 7.944 2 10.333 2c2.39 0 4.334 1.854 4.334 4.132l-.006 10.177c0 1.414-1.197 2.565-2.667 2.565-1.47 0-2.666-1.151-2.666-2.566l.005-9.391c.001-.552.449-.999 1-.999h.001c.552 0 1 .448.999 1.001l-.005 9.39c0 .311.298.565.666.565.368 0 .667-.254.667-.566l.006-10.177C12.667 4.956 11.62 4 10.333 4 9.047 4 8 4.956 8 6.132v10.17C8 18.341 9.794 20 12 20s4-1.659 4-3.698V6.132c0-.553.448-1 1-1s1 .447 1 1v10.17C18 19.443 15.309 22 12 22" />
              </defs>
              <g fill="none" fillRule="evenodd">
                <use fill="#222B45" xlinkHref="#prefix__file" />
              </g>
            </svg>
          </span>
          <input type="text" className="input_box" ref={this.messagearea}    placeholder="Type your message and press enter" />
        </form>
      </div>  
















      
    </div>
  </div>
</div>




<Switchprojectloader dis={this.state.loader} pid={this.state.pid}  data={this.state.data} host={this.state.host}></Switchprojectloader>






      </>
    );
  }








 
}

export default Video;