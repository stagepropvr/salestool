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
                ]
            }
        })
        return this.peer
    }
    connect = (otherId) => {
        this.peer.signal(otherId)
    }  
} 