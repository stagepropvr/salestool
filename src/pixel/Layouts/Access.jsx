import React from "react";

import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
import VideoItem from "../Tools/ToolComponents/videoItem"
class Access extends React.Component {
  constructor(props){
    super(props);
    this.state={
        modal:false,
        redirect:false,
        localStream:false,
        micstate:true,
        camstate:{
          width: { min: 160, ideal: 640, max: 1280 },
          height: { min: 120, ideal: 360, max: 720 }   
        },
        access:false,
    }
    this.setAudioLocal=this.setAudioLocal.bind(this);
    this.setVideoLocal=this.setVideoLocal.bind(this);
    this.granted=this.granted.bind(this);
    this.permission = false;
  }
  
componentDidMount = () => {

  navigator.mediaDevices.enumerateDevices().then((devices) => {
    devices.forEach((device) => {
      if(device.deviceId){
        this.setState({"access":true});
        this.granted()
      }
    });
  })
  
  window.scrollTo(0, 0);  
  }

 granted(){
   
  navigator.getUserMedia = navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
  
const op = {
  video: {
    width: { min: 160, ideal: 640, max: 1280 },
    height: { min: 120, ideal: 360, max: 720 }
  },
  audio:true
};
navigator.getUserMedia(
  op,
  stream => {
 this.setState({
  localStream:stream,
  access:true
 })
  },
  (err) => {
   }
);
 }
  

 setAudioLocal() {
  if (this.state.localStream.getAudioTracks().length > 0) {
    this.state.localStream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
  }
  this.setState({
    micstate: !this.state.micstate
  })
}

setVideoLocal() {
  if (this.state.localStream.getVideoTracks().length > 0) {
    this.state.localStream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });
  }
  this.setState({
    camstate: !this.state.camstate
  })
}


  render() {

    return( 
    <div style={{width:'100%', height:'100vh'}} >
    <div  className="login_container">
        <div style={{background: "#eeeeee"}} className="login_container row">
            {/* Image Col */}
            <div style={{padding:"0", maxHeight:'100vh', position:"relative"}} className="col-sm-5 d-none d-sm-block">
                <img style={{  width: '100%', height: '100%', objectFit: 'cover'}} alt="Logo" src={require('../../assets/loginBG.png')}></img>
                <div className="loginNew_logo">
                    <img style={{width: '70%', height: '70%', objectFit: 'cover'}} alt="Logo" src={require('../../assets/logo.webp')}></img>
                </div>
                
                <div class="loginNew_center">
                    <h3>Virtual Property Tour Invite</h3>
                    <p>You are invited for a virtual guided property tour. Ask your questions, virtually experience the property and book your dream property.</p>
                </div>

                <div class="loginNew_bottom">
                    <p>Powered by <u>PROPVR.in</u></p>   
                </div>
                
            </div>
			
            {/* Form Col Mobile*/} 
            <div style={{padding:"0", textAlign:'center', width:"100%"}} className="col-sm-7 col-xs-12 d-sm-none">
            <div className="login_card_Mobile card card-signup" >
              <div className="BlueBG">   
                <h2 className="Welcome-to-Prop-VR" style={{color: "white"}}>You are joining a virtual tour session</h2>
      </div>


                        {!this.state.access?
                        <div><div><h2 className="Access-to-video-and">Access to video and voice</h2></div>
                        <div className="For-others-to-see-yo"> For others to see you and hear you, your browser will request access to your camera and microphone. Click ‘Allow’ to start the camera and mic.</div>
                      
                      <div> <div className="access_warning_content">      <svg style={{"margin":"0px 13px"}} xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
        <defs>
          <path id="advu1hv3da" d="M9 11.5c.46 0 .833.373.833.833 0 .46-.373.834-.833.834-.46 0-.833-.374-.833-.834 0-.46.373-.833.833-.833zm0-6.667c.46 0 .833.374.833.834v4.166c0 .46-.373.834-.833.834-.46 0-.833-.374-.833-.834V5.667c0-.46.373-.834.833-.834zm0 10.834c-3.676 0-6.667-2.991-6.667-6.667 0-3.676 2.991-6.667 6.667-6.667 3.676 0 6.667 2.991 6.667 6.667 0 3.676-2.991 6.667-6.667 6.667m0-15C4.397.667.667 4.397.667 9c0 4.602 3.73 8.333 8.333 8.333 4.602 0 8.333-3.73 8.333-8.333S13.603.667 9 .667" />
        </defs>
        <g fill="none" fillRule="evenodd" transform="translate(1 1)">
          <use fill="#8F9BB3" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#advu1hv3da" />
        </g>
      </svg><span style={{"verticalAlign": "super"}}>You can turn them off anytime you want.</span></div></div>
                        <div className="Steph_Video_Call_Thumbnailsocial_share_1024x512_center">
         <div  className="accesstools  videotools ">
          
           
          
         <button className={this.state.micstate?"menu_option video_on accesstools-icon":"menu_option video_off accesstools-icon"}  onClick={this.setAudioLocal}>
              {this.state.micstate?<svg  width={16} height={16} viewBox="0 0 24 24">
                <path fill="#222B45" fillRule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z" />
              </svg>:<svg width={16} height={16}  viewBox="0 0 24 24">
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
                  </svg>  }            
            </button>   
          
      
            <div style={{flex: 'auto'}}><span className="guest_video_name video_name_option" style={{left: 0, maxWidth: 'fit-content', float: 'right'}}>You</span></div>

         
      </div>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{"top": "30px","position": "relative"}}>
  <path fill="#FFF" fillRule="evenodd" d="M20 9.4L17.191 12 20 14.6V9.4zm2-.77v6.74c0 .65-.379 1.218-.988 1.484-.224.098-.459.146-.693.146-.206 0-.409-.038-.601-.11L15 12.17v-4.17c0-.553-.448-1-1-1H9.828l-2-2H14c1.654 0 3 1.344 3 3v1.45l2.161-2c.499-.46 1.225-.578 1.851-.306.609.266.988.835.988 1.484zM14 17H5c-.552 0-1-.449-1-1V8c0-.32.161-.593.396-.777L2.974 5.801C2.379 6.351 2 7.13 2 8.001v8c0 1.653 1.346 3 3 3h9c.616 0 1.188-.189 1.665-.508l-1.522-1.523c-.049.008-.092.03-.143.03zm6.707 2.293c.391.39.391 1.023 0 1.414-.195.195-.451.293-.707.293-.256 0-.512-.098-.707-.293L16.386 17.8l-1.455-1.455L5.586 7l-1.76-1.76-.533-.533c-.391-.39-.391-1.024 0-1.414.391-.39 1.023-.39 1.414 0L6.414 5l2 2L15 13.586l2 2 3.707 3.707z" />
</svg></div>

      </div>
      <div><button onClick={this.granted } className="accessjoin-button">
      GRANT ACCESS</button></div></div>
                        
                        
                        




                        
            :<div>
              <div>
                <h2 className="Great-you-are-about">Great, you are about to enter your dream home</h2>
              </div>
                <div className="Steph_Video_Call_Thumbnailsocial_share_1024x512_center">
         <div  className="accesstools  videotools ">
          
           
          
         <button className={this.state.micstate?"menu_option video_on accesstools-icon":"menu_option video_off accesstools-icon"}  onClick={this.setAudioLocal}>
              {this.state.micstate?<svg  width={16} height={16} viewBox="0 0 24 24">
                <path fill="#222B45" fillRule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z" />
              </svg>:<svg width={16} height={16}  viewBox="0 0 24 24">
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
                  </svg>  }            
            </button>   
            <button   onClick={this.setVideoLocal}  className={this.state.camstate?"menu_option video_on accesstools-icon":"menu_option video_off accesstools-icon"}>
              
              {this.state.camstate?<svg id="video_on"  width={16} height={16} viewBox="0 0 24 24">
                 <defs>
                    <path id="prefix__z" d="M18 9.6L15.191 7 18 4.4v5.2zM13 11c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V3c0-.551.448-1 1-1h9c.552 0 1 .449 1 1v8zm6.012-8.854c-.626-.273-1.352-.154-1.851.306l-2.161 2V3c0-1.654-1.346-3-3-3H3C1.346 0 0 1.346 0 3v8c0 1.655 1.346 3 3 3h9c1.654 0 3-1.345 3-3V9.549l2.161 1.999c.32.297.735.452 1.158.452.234 0 .469-.047.693-.145.609-.266.988-.835.988-1.484V3.63c0-.65-.379-1.218-.988-1.484z" />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(2 5)">
                    <use fill="#222B45" xlinkHref="#prefix__z" />
                  </g>
                </svg>:<svg id="video_off"  width={16} height={16} viewBox="0 0 24 24">
                  <path fill="#fff" fillRule="evenodd" d="M20 9.4L17.191 12 20 14.6V9.4zm2-.77v6.74c0 .65-.379 1.218-.988 1.484-.224.098-.459.146-.693.146-.206 0-.409-.038-.601-.11L15 12.17v-4.17c0-.553-.448-1-1-1H9.828l-2-2H14c1.654 0 3 1.344 3 3v1.45l2.161-2c.499-.46 1.225-.578 1.851-.306.609.266.988.835.988 1.484zM14 17H5c-.552 0-1-.449-1-1V8c0-.32.161-.593.396-.777L2.974 5.801C2.379 6.351 2 7.13 2 8.001v8c0 1.653 1.346 3 3 3h9c.616 0 1.188-.189 1.665-.508l-1.522-1.523c-.049.008-.092.03-.143.03zm6.707 2.293c.391.39.391 1.023 0 1.414-.195.195-.451.293-.707.293-.256 0-.512-.098-.707-.293L16.386 17.8l-1.455-1.455L5.586 7l-1.76-1.76-.533-.533c-.391-.39-.391-1.024 0-1.414.391-.39 1.023-.39 1.414 0L6.414 5l2 2L15 13.586l2 2 3.707 3.707z" />
                </svg>} 
              
                
              </button>
      
           <span style={{left:'-24px'}} className="guest_video_name video_name_option">{"You"}</span>
         
      </div>
      {this.state.localStream?<VideoItem
      key={"you"}
      userId={"you"}
      stream={this.state.localStream}
    />:<></>}
      </div>
      <div><button onClick={() => { this.props.join(this.state.micstate,this.state.camstate) }} className="accessjoin-button">
          JOIN SESSION</button></div></div>}

                </div>
            </div>


           {/* Form Col Monitor*/} 
           <div style={{padding:"0", textAlign:'center', width:"100%"}} className="col-sm-7 col-xs-12 d-none d-sm-block">
                <div className="login_card card card-signup" style={{justifyContent:'center'}}>
                    <h2 className="Welcome-to-Prop-VR" style={{padding: "25px"}}>You are joining a virtual tour session</h2>
        
               


                        {!this.state.access?
                        <div><div><h2 className="Access-to-video-and">Access to video and voice</h2></div>
                        <div className="For-others-to-see-yo"> For others to see you and hear you, your browser will request access to your camera and microphone. Click ‘Allow’ to start the camera and mic.</div>
                      
                      <div> <div className="access_warning_content">      <svg style={{"margin":"0px 13px"}} xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
        <defs>
          <path id="advu1hv3da" d="M9 11.5c.46 0 .833.373.833.833 0 .46-.373.834-.833.834-.46 0-.833-.374-.833-.834 0-.46.373-.833.833-.833zm0-6.667c.46 0 .833.374.833.834v4.166c0 .46-.373.834-.833.834-.46 0-.833-.374-.833-.834V5.667c0-.46.373-.834.833-.834zm0 10.834c-3.676 0-6.667-2.991-6.667-6.667 0-3.676 2.991-6.667 6.667-6.667 3.676 0 6.667 2.991 6.667 6.667 0 3.676-2.991 6.667-6.667 6.667m0-15C4.397.667.667 4.397.667 9c0 4.602 3.73 8.333 8.333 8.333 4.602 0 8.333-3.73 8.333-8.333S13.603.667 9 .667" />
        </defs>
        <g fill="none" fillRule="evenodd" transform="translate(1 1)">
          <use fill="#8F9BB3" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#advu1hv3da" />
        </g>
      </svg><span style={{"verticalAlign": "super"}}>You can turn them off anytime you want.</span></div></div>
                        <div className="Steph_Video_Call_Thumbnailsocial_share_1024x512_center">
         <div  className="accesstools  videotools ">
          
           
          
         <button className={this.state.micstate?"menu_option video_on accesstools-icon":"menu_option video_off accesstools-icon"}  onClick={this.setAudioLocal}>
              {this.state.micstate?<svg  width={16} height={16} viewBox="0 0 24 24">
                <path fill="#222B45" fillRule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z" />
              </svg>:<svg width={16} height={16}  viewBox="0 0 24 24">
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
                  </svg>  }            
            </button>   
          
      
            <div style={{flex: 'auto'}}><span className="guest_video_name video_name_option" style={{left: 0, maxWidth: 'fit-content', float: 'right'}}>You</span></div>

         
      </div>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" style={{"top": "30px","position": "relative"}}>
  <path fill="#FFF" fillRule="evenodd" d="M20 9.4L17.191 12 20 14.6V9.4zm2-.77v6.74c0 .65-.379 1.218-.988 1.484-.224.098-.459.146-.693.146-.206 0-.409-.038-.601-.11L15 12.17v-4.17c0-.553-.448-1-1-1H9.828l-2-2H14c1.654 0 3 1.344 3 3v1.45l2.161-2c.499-.46 1.225-.578 1.851-.306.609.266.988.835.988 1.484zM14 17H5c-.552 0-1-.449-1-1V8c0-.32.161-.593.396-.777L2.974 5.801C2.379 6.351 2 7.13 2 8.001v8c0 1.653 1.346 3 3 3h9c.616 0 1.188-.189 1.665-.508l-1.522-1.523c-.049.008-.092.03-.143.03zm6.707 2.293c.391.39.391 1.023 0 1.414-.195.195-.451.293-.707.293-.256 0-.512-.098-.707-.293L16.386 17.8l-1.455-1.455L5.586 7l-1.76-1.76-.533-.533c-.391-.39-.391-1.024 0-1.414.391-.39 1.023-.39 1.414 0L6.414 5l2 2L15 13.586l2 2 3.707 3.707z" />
</svg></div>

      </div>
      <div><button onClick={this.granted} className="accessjoin-button">
      GRANT ACCESS</button></div></div>
                        
                        
                        




                        
            :<div><div><h2 className="Great-you-are-about">Great, you are about to enter your dream home</h2></div>
                <div className="Steph_Video_Call_Thumbnailsocial_share_1024x512_center">
         <div className="accesstools  videotools ">
          
           
          
         <button className={this.state.micstate?"menu_option video_on accesstools-icon":"menu_option video_off accesstools-icon"}  onClick={this.setAudioLocal}>
              {this.state.micstate?<svg  width={16} height={16} viewBox="0 0 24 24">
                <path fill="#222B45" fillRule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z" />
              </svg>:<svg width={16} height={16}  viewBox="0 0 24 24">
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
                  </svg>  }            
            </button>   
            <button   onClick={this.setVideoLocal}  className={this.state.camstate?"menu_option video_on accesstools-icon":"menu_option video_off accesstools-icon"}>
              
              {this.state.camstate?<svg id="video_on"  width={16} height={16} viewBox="0 0 24 24">
                 <defs>
                    <path id="prefix__z" d="M18 9.6L15.191 7 18 4.4v5.2zM13 11c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V3c0-.551.448-1 1-1h9c.552 0 1 .449 1 1v8zm6.012-8.854c-.626-.273-1.352-.154-1.851.306l-2.161 2V3c0-1.654-1.346-3-3-3H3C1.346 0 0 1.346 0 3v8c0 1.655 1.346 3 3 3h9c1.654 0 3-1.345 3-3V9.549l2.161 1.999c.32.297.735.452 1.158.452.234 0 .469-.047.693-.145.609-.266.988-.835.988-1.484V3.63c0-.65-.379-1.218-.988-1.484z" />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(2 5)">
                    <use fill="#222B45" xlinkHref="#prefix__z" />
                  </g>
                </svg>:<svg id="video_off"  width={16} height={16} viewBox="0 0 24 24">
                  <path fill="#fff" fillRule="evenodd" d="M20 9.4L17.191 12 20 14.6V9.4zm2-.77v6.74c0 .65-.379 1.218-.988 1.484-.224.098-.459.146-.693.146-.206 0-.409-.038-.601-.11L15 12.17v-4.17c0-.553-.448-1-1-1H9.828l-2-2H14c1.654 0 3 1.344 3 3v1.45l2.161-2c.499-.46 1.225-.578 1.851-.306.609.266.988.835.988 1.484zM14 17H5c-.552 0-1-.449-1-1V8c0-.32.161-.593.396-.777L2.974 5.801C2.379 6.351 2 7.13 2 8.001v8c0 1.653 1.346 3 3 3h9c.616 0 1.188-.189 1.665-.508l-1.522-1.523c-.049.008-.092.03-.143.03zm6.707 2.293c.391.39.391 1.023 0 1.414-.195.195-.451.293-.707.293-.256 0-.512-.098-.707-.293L16.386 17.8l-1.455-1.455L5.586 7l-1.76-1.76-.533-.533c-.391-.39-.391-1.024 0-1.414.391-.39 1.023-.39 1.414 0L6.414 5l2 2L15 13.586l2 2 3.707 3.707z" />
                </svg>} 
              
                
              </button>
      
           <span style={{left:'-24px'}} className="guest_video_name video_name_option">{"You"}</span>
         
      </div>
      {this.state.localStream?<VideoItem
      key={"you"}
      userId={"you"}
      stream={this.state.localStream}
    />:<></>}
      </div>
      <div><button onClick={() => { this.props.join(this.state.micstate,this.state.camstate) }} className="accessjoin-button">
          JOIN SESSION</button></div></div>}

                </div>
            </div>

        </div>


        
    </div>

    
</div>)}
  
}
export default Access;
