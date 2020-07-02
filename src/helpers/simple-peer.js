import Peer from 'simple-peer'

export default class VideoCall {
    peer = null 
    init = (stream, initiator) => {
        this.peer = new Peer({
            initiator: initiator,
            stream: stream,
            trickle: false,
            reconnectTimer: 1000,
            iceTransportPolicy: 'relay',
            config: {
                iceServers: [
                    {
urls: "turn:turnserver.example.org",
      username: "webrtc",
      credential: "turnpassword" 
                    }
                ]
            }
        })
        return this.peer
    }
    connect = (otherId) => {
        this.peer.signal(otherId)
    }  
} 