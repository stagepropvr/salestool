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
                        urls: 'turn:52.15.126.155:3478',
                        credential: 'revsmart123',
                        username: 'propvr' 
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