import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import io from 'socket.io-client';

import * as RTCMultiConnection from 'rtcmulticonnection';

class RTC extends React.Component {
    constructor(props){
      super(props);
     this.state={
         connection : new RTCMultiConnection()
     }
    }


    componentDidMount(){
            this.state.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
            this.state.connection.socketMessageEvent = 'video-conference-demo';

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
        width: {
            ideal: 1280
        },
        height: {
            ideal: 720
        },
        frameRate: 30
    };






this.state.connection.mediaConstraints = {
    video: videoConstraints,
    audio: true
};
this.state.connection.onstream = function(event) {
    console.log( event );
};
this.state.connection.openOrJoin("qwe");
    }
    render(){
        return(
            <>sadfsaafsa
            
            </>
        )
    }
}

export default RTC;
