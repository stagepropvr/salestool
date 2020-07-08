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
      streams: {}, current_image: {
        "info" : {
            "About Innov8" : {
                "Description" : "Innov8 Coworking offers beautifully crafted workspaces where people can create, connect, and grow their businesses at prime locations in multiple cities pan-India. Innov8 hosts people from diverse backgrounds such as digital nomads, entrepreneurs, freelancers, corporates employees and startup enthusiasts.",
                "buyurl" : "",
                "info3diosurl" : "",
                "info3durl" : "",
                "infoimgurl" : "",
                "knowurl" : "",
                "position" : "-0.8980867539712181 0.00034748211845683774 0.4203239232941025",
                "vidurl" : "https://www.youtube.com/embed/0UA80LzjJh0"
                }
        },
        "links" : {
            "theatere" : {
            "name" : "Theatre",
            "dest-image" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2F1579863181062-20200124_161208_885.jpg?alt=media&token=dc168d99-2e45-4758-b0fb-c41b356eb675",
            "dest-thumb" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2Fthumbs%2F1579863191216-20200124_161208_885.jpg?alt=media&token=bbffb628-3d4e-4369-8571-a0af07abb52b",
            "position" : "0.8826060510846503 -0.08739164477592737 -0.48291200668298667"
        }
    },
        "name" : "Entrance",
        "thumbnail" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2Fthumbs%2F1579863216723-20200124_161250_786.jpg?alt=media&token=95e7d027-8490-4cf5-9679-0d5b7404ce14",
        "url" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2F1579863210017-20200124_161250_786.jpg?alt=media&token=3311ca91-4238-4b73-b75a-dfc37fdc6d24"
        },
      socket:io.connect("localhost:5000"),
      host:true
    };
 
    this.doc_id = null;
    this.images = Object.values(Data.images);   
   
   
  }
  videoCall = new VideoCall();


  get = async(data) => {
    if(data){
      console.log("Async",data);
    }
    // const ref = firestore.collection('test').doc('cdJnGkoY9ahOXXyCjfpA');
    // const doc = await ref.get();
    // if (!doc.exists) {
    //   console.log('No such document!');
    // } else {
    //   console.log('Document data:', doc.data());
    // }

    // occupants.forEach(function(item,index){
    //   if(socket.id == item.id){ind = index}
    // });   

    // firestore.collection("users").add({
    //     first: "Adam",
    //     last: "Lovelace",
    //     born: 1815
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });

  }

  
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
  changeImage(str){
    // console.log(str);
    this.setState({current_image:str})
 
}
  render() {

    return (
      <>
       <Scene           
        micstate={this.state.micState}
        camstate={this.state.camstate}
        data={this.images} 
        image={this.state.current_image}
        changeImage={this.changeImage.bind(this)}
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
micstate={this.state.micState}
images={this.images} 
   changeImage={this.changeImage.bind(this)} images = {this.images}
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