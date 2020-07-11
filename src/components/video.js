import React from 'react';
import VideoCall from '../helpers/simple-peer';
import '../App.css';
import '../styles/video.css'
import io from 'socket.io-client';
import { getDisplayStream } from '../helpers/media-access';
import Peer from 'simple-peer'
import Data from "../Data/data.json"
import VideoItem from "./videoItem"
import SceneControls from "./SceneControls.js";
import Scene from "./Scene"
import Firebase from "../config/Firebase"
// import BottomSlider from "./BottomSlider"

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
      data:'',
      user_id:''
    };

    this.doc_id = null;

    console.log(this.props.roomId);
  }
  videoCall = new VideoCall();



  componentDidMount() {

    Firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        this.setState({
          user_id:user.uid
        })
        Firebase.database().ref("users/" + user.uid + "/Projects/" + this.props.pid).once("value", (node) => {
          this.state.data = node.val();
          if (node.hasChild("images")) {
            for (var x in node.val().images){
              console.log(x,node.val().images[x]);
              this.setState({
                current_image:x,
                images: node.val().images
              });
            break;
            }
            this.setState({
              host: true,
              
              apiload: false
            });
            this.Videoinit();
          }
          else {
            this.setState({
              host: false
            });
          }
        });



      } else {
        this.setState({
          host: false
        })
      }
    });
  }
  Videoinit(){

    const component = this;
    // this.setState({ socket });
    const roomId = this.props.roomId;
    this.getUserMedia().then(() => {
      this.state.socket.emit('join', { room: this.props.roomId });
      console.log("socket.on join", roomId)

    });


    this.state.socket.on('init', (data) => {

      console.log("socket.on init", data)

      userId = data.userId;
      this.state.socket.emit('ready', { room: this.props.roomId, user: userId });
    });

    this.state.socket.on("data", (room) => {
      this.upload(room);
    })

    this.state.socket.on("users", ({ initiator, users }) => {
      console.log("socket.on  initiator", initiator)
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
          const peersTemp = { ...this.state.peers }
          peersTemp[sid] = peer

          this.setState({ peers: peersTemp })
          peer.on('signal', data => {
            console.log("peer.on  signal", users)

            const signal = {
              userId: sid,
              signal: data,
              room: this.props.roomId
            };
            console.log(data);
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


        })
    })

    this.state.socket.on('signal', ({ userId, signal }) => {
      console.log("socket.on  signal userId", userId, "signal", signal)

      const peer = this.state.peers[userId];
      console.log(this.state.peers);
      console.log(this.state.peers[userId]);
      if (peer != undefined) {
        peer.signal(signal)
      }
    })
    this.state.socket.on('chat message', ({ message, user }) => {
      console.log("fsdsadasdasdsadsad");
    });
    this.state.socket.on('disconnect', (disuser) => {
      console.log(disuser);
      component.setState({ initiator: true });
    });

    this.state.socket.on('location', (location) => {
      if (!this.state.host) {
        console.log("pew:", location);
        this.change(location.location)
      }
    });


  }
  

  getUserMedia(cb) {

    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia = navigator.getUserMedia =
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
    console.log(this.state.socket.id)
    const message = {
      room: this.props.roomId,
      user: this.state.socket.id,
      mesage: "asd"
    };
    this.state.socket.emit('chat message', message);
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
        Object.keys(this.state.peers).forEach((key) => {
          this.state.peers[key].removeStream(this.state.localStream);
        })
        this.getUserMedia().then(() => {
          Object.keys(this.state.peers).forEach((key) => {
            this.state.peers[key].addStream(this.state.localStream);
          })
        });
      };
      this.setState({ streamUrl: stream, localStream: stream });
      this.localVideo.srcObject = stream;
      Object.keys(this.state.peers).forEach((key) => {
        this.state.peers[key].addStream(this.state.localStream);
      })
    });
  }

  changeImage = (str) => {
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
  render() {
    if (this.state.apiload) {
      return (<></>)

    }

    else {
      if (this.state.host) {
        this.state.socket.emit('location',
          {
            location: this.state.current_image.name,
            room: this.props.roomId
          });
      }

      return (
        <>
          <Scene
            data={this.state.images}
            image={this.state.current_image}
            change={this.change}
            host={this.state.host}
          />
          <div className='video-wrapper'>
            <div className='local-video-wrapper'>
              <video
                autoPlay
                id='localVideo' className="user-video"
                muted
                ref={video => (this.localVideo = video)}
              />
              {
                Object.keys(this.state.streams).map((key, id) => {
                  return <VideoItem
                    key={key}
                    userId={key}
                    stream={this.state.streams[key]}
                  />
                })
              }
            </div>

            <SceneControls
              pid={this.props.pid}
              roomId={this.props.roomId}
              user_id={this.state.user_id}
              data={this.state.data}
              changeImage={this.changeImage}
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
        </>);
    }
  }
}

export default Video;