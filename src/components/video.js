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
      loader:true
    };
    this.Sidenav = React.createRef();
    this.bottom = React.createRef();
    this.togglenav=this.togglenav.bind(this); 
    this.sendmessage=this.sendmessage.bind(this);
    this.loader=this.loader.bind(this);

    this.messagearea=React.createRef();
  }
  videoCall = new VideoCall();

  componentDidMount() {

    Firebase.auth().onAuthStateChanged((user) => {
//console.log(user.uid);
      if (user) {
        
        Firebase.database().ref("users/" + user.uid + "/Projects/" + this.props.pid).once("value", (node) => {
          this.state.data = node.val();
       
            for (var x in node.val().images){
              console.log(x,node.val().images[x]);
              Firebase.database().ref("roomsession/"+this.props.roomId).set({
                currentimage:node.val().images[x].url
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
        console.log("fsfsf");
        Firebase.database().ref("roomsession/"+this.props.roomId).on("value",(snap)=>{
          console.log(snap.val());
          this.setState({
            clientimage:snap.val().currentimage,
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
      console.log("socket.on join", roomId)

    });

    this.state.socket.on('init', (data) => {

      console.log("socket.on init", data)

      userId = data.userId;
      this.state.socket.emit('ready', { room: roomId, userId });
    });

    this.state.socket.on("users", ({ initiator, users }) => {
      console.log("socket.on  users", users)

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
                  urls: "turn:turnserver.example.org",
                        username: "webrtc",
                        credential: "turnpassword" 
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
            console.log("peer.on  signal", users)

            const signal = {
              userId: sid,
              signal: data
            };

            this.state.socket.emit('signal', signal);
          });
          peer.on('stream', stream => {
            console.log("peer.on  stream", stream)

            const streamsTemp = { ...this.state.streams }
            streamsTemp[sid] = stream

            this.setState({ streams: streamsTemp })
          });
          peer.on('error', function (err) {
            console.log("peer.on  error", err)

            console.log(err);
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
      console.log(this.state.messages);
    });
    this.state.socket.on('signal', ({ userId, signal,image }) => {
     // console.log("socket.on  signal userId", userId, "signal", signal);
   

      
      const peer = this.state.peers[userId]
      peer.signal(signal)
    })

    this.state.socket.on('disconnected', () => {
      component.setState({ initiator: true });
    });
    
this.state.socket.on("switchimage",(url)=>{
console.log(url);
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
          height: { min: 120, ideal: 360, max: 720 }
        },
        audio: true
      };
      navigator.getUserMedia(
        op,
        stream => {
          this.setState({ streamUrl: stream, localStream: stream });
          this.localVideo.srcObject = stream;
          resolve();
        },
        () => { }
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

  getDisplay() {
    getDisplayStream().then(stream => {
      stream.oninactive = () => {
        Object.keys(this.state.peers).forEach((key)=>{
          this.state.peers[key].removeStream(this.state.localStream);
        })
        this.getUserMedia().then(() => {
          Object.keys(this.state.peers).forEach((key)=>{
            this.state.peers[key].addStream(this.state.localStream);
          })
        });
      };
      this.setState({ streamUrl: stream, localStream: stream });
      this.localVideo.srcObject = stream;
      Object.keys(this.state.peers).forEach((key)=>{
        this.state.peers[key].addStream(this.state.localStream);
      })
    });
  }


  changeImage = (str) => {
    Firebase.database().ref("roomsession/"+this.props.roomId).set({
      currentimage:this.state.images[str].url
    })
    this.setState({ current_image: str })
    if(document.getElementById(str+"_thumb")){
      var a = document.querySelectorAll('.item_active');
      console.log(a);
      [].forEach.call(a, function(el) {
        console.log(el);
                el.classList.remove("item_active");
      });
      document.getElementById(str+"_thumb").classList.add('item_active');
    }
  }

  change = (str) => {
    for (var key in this.state.images){
      console.log(str,this.state.images[key].url);
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
            currentimage:node.val().images[x].url
          })
        break;
        }
      }
    });
  }
  togglenav()
  {
    console.log(this.Sidenav.current.style.width);
    
    if(this.Sidenav.current.style.width==="300px"){
      this.Sidenav.current.style.width="0px";
          console.log(this.bottom.current.offsetWidth);
          this.bottom.current.style.width=this.bottom.current.offsetWidth+300+"px";
  
    }
    else{
      this.Sidenav.current.style.width="300px";
      console.log(this.bottom.current.offsetWidth);
      this.bottom.current.style.width=this.bottom.current.offsetWidth-300+"px";
    }
  }
  sendmessage(e){
    e.preventDefault();
    const message = {
      room: this.props.roomId,
      user: this.state.socket.id,
      message: this.messagearea.current.value
    };
    console.log(message);
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
          />:<></>}
    {this.state.apiload ?<></>: <>
  
    
          <div id="bottom" className="container" ref={this.bottom} >
          <SceneControls
              pid={this.state.pid}
              roomId={this.props.roomId}
              user_id={this.state.user_id}
              data={this.state.data}
              changeImage={this.changeImage}
              changeProject={this.changeProject}
              micstate={this.state.micState}
              screenaction={() => {
                this.getDisplay();
              }}
              micaction={() => {
                this.setAudioLocal();
              }}
              videoaction={() => {
                this.setVideoLocal();
              }}
              camstate={this.state.camState}
              host={this.state.host}
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
      <div style={{padding: '10px 50px'}} className="tab-pane active show" id="members">
        <div>
      <video
                autoPlay
                id='localVideo' className="user-video"
                muted
                ref={video => (this.localVideo = video)}
              /></div>
      {
                Object.keys(this.state.streams).map((key, id) => {
                  return <div>
                    <p> {key}</p><VideoItem
                    key={key}
                    userId={key}
                    stream={this.state.streams[key]}
                  /></div>
                })
              }
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




{this.state.loader?
<div className="asceneloader"></div>:<></>}






      </>
    );
  }








 
}

export default Video;