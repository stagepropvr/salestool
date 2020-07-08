import React from 'react';
import VideoCall from '../helpers/simple-peer';
import '../App.css';
import '../styles/video.css'
import io from 'socket.io-client';
import { getDisplayStream } from '../helpers/media-access';
import Data from "../Data/data.json"
import Peer from 'simple-peer'
import VideoItem from "./videoItem"
import SceneControls from "./SceneControls.js";
import Scene from "./Scene"
import {firestore} from "../firebase/firebase.utils"
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
      current_image: Object.values(Data.images)[0],
      socket:io.connect("localhost:5000"),
      host:false
    };
 
    this.doc_id = null;
    this.images = Object.values(Data.images);   
   
   
  }
  videoCall = new VideoCall();

  upload = async(data) => {
    var ind;
    const _ = this;
    data['room'].forEach(function(item,index){
      if(item.id == _.props.roomId){
        ind = index
      }
    });   
    
    if(this.state.socket.id === data['room'][ind].host)
    {
      var room =  data['room'][ind]
      console.log("Firebase: ",room)
            
      if(!this.doc_id)
      {
        firestore.collection("rooms").add({
          id: room.id,
          host: room.host,
          occupants: room.occupants
        })
        .then(function(docRef) {
          _.doc_id = docRef.id
          console.log("Firebase: Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Firebase: Error adding document: ", error);
        });
        this.setState({host:true});
      }
      else{
          firestore.collection("rooms").doc(this.doc_id).update({
            occupants: room.occupants
          })
          .then(function() {
            console.log("Firebase: Document written in same ID: ");
          })
          .catch(function(error) {
              console.error("Firebase: Error adding document: ", error);
          });
        } 
      


      
    }
    else{
      console.log('Firebase: Not host',this.state.socket.id,data['room'][ind].host);
    }
    }
  componentDidMount() {
    const component = this;
    // this.setState({ socket });
    const { roomId } = this.props.roomId;
    this.getUserMedia().then(() => {
      this.state.socket.emit('join', { room:this.props.roomId});
      console.log("socket.on join", roomId)

    });


    this.state.socket.on('init', (data) => {

      console.log("socket.on init", data)

      userId = data.userId;
      this.state.socket.emit('ready', { room: this.props.roomId, user:userId });
    });

    this.state.socket.on("data",(room) => {
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
              room:this.props.roomId
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
      peer.signal(signal)
    })
    this.state.socket.on('chat message', ({ message, user }) => {
     console.log("fsdsadasdasdsadsad");
    });
    this.state.socket.on('disconnect', (disuser) => {
      console.log(disuser);
      component.setState({ initiator: true });
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
    const message={
      room:this.props.roomId,
      user:this.state.socket.id,
mesage:"asd"
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
    console.log(str);
    this.setState({current_image:str})
}

change = (str) => {
  this.images.map((value,index) => {
    if(value.name === str)
    {this.changeImage(value)}
  });
}
  render() {
    console.log("Daata:",this.images[0])

    return (
      <>
      <Scene           
        data={this.images} 
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
   </> );
  }
}

export default Video;