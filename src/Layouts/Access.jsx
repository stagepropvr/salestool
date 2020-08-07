import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import VideoItem from "../Tools/ToolComponents/videoItem"
class Access extends React.Component {
  constructor(props){
    super(props);
    this.state={
        modal:false,
        name:'',
        job_title:'',
        number:'',
        // cname:'',
        email:'',
        info_details:false,
        bed:'',
        bath:'',
        sqft:'',
        img:'',
        redirect:false,
        localStream:false,
        micstate:true,
        loader:true,
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
  
    var ref = Fire.database().ref("users/"+this.props.uid+'/Projects/'+this.props.pid);
    ref.once('value',child=>{
        this.setState({
            img:child.val().thumb,
            loader:false
        })
        if(child.hasChild('Info')){
            var ref1 = Fire.database().ref("users/"+this.props.uid+'/Projects/'+this.props.pid+"/Info");
            ref1.once('value',snap=>{
                this.setState({
                    bed:snap.val().beds,
                    bath:snap.val().baths,
                    sqft:snap.val().sqft,
                    info_details:true
                })
            })
        }
        else{
            this.setState({
                info_details:false
            })
        }
       

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
                <img style={{  width: '100%', height: '100%', objectFit: 'cover'}} src={require('../assets/loginBG.png')}></img>
                <div className="loginNew_logo">
                <svg width="72" height="39" viewBox="0 0 103 56" fill="none">
                    <rect width="103" height="56" fill="url(#pattern0)"></rect>
                        <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href="#image0" transform="scale(0.00970874 0.0178571)"></use>
                    </pattern>
                    <image id="image0" width="103" height="56" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAA4CAYAAADgmebbAAAABGdBTUEAALGOfPtRkwAABWpJREFUeAHtXE1oHVUUPi+mtUKkLqyFKLpIEIpRhEBBWiF0owshVRorRRqh4CKmNaXZFWoCXZVYW42KuDHukoZKiAtdWSiKIC2lhLb+dBFoU21LtW1KSJomft+bTDLvZ37evHve3JJ74CQz9+fMme+bc+fOuW8mJyllcXGxCV3boa3QxoA2YHu1yjROfCqgZ7A9lsvlLqcBJFdJJxDyFNp3Q9+EtlTSd5W3ncD5fwcdBFHXk2KRiByQwmg4AO2FrubISIprWDtG1gD0Y5DE7UiJJQfEvAULX0A3RlpylZUg8A8ad4Ggk1Gd6sIqQUoO+hHqR6GOmDCg0pUTz1HiS5zDTJStQIfH0GEI2hHW0ZUbQ+AELHUiimaKLZaQs8TkMBo6YorR0tsnQTtB0GLwEOWGtUNo4IgJoqS/TbyJe4EURA6ihjd/3mMKygt6uB0tBBg1O4KThGUSQAynyH9B3c1fC/54u5zFNYOg/DQ7OKzxOcYREw+gZgviTx7yko8cRA2f/JliYPQ4yRYBRk0Toue6Hzl7UeCIyZYU/+jkoZs7Pjnb/Rr33woEmLsUZgGYXeZEwIldCDQzcpj2d2IfAu0kh+sxTuxDoJXkcKHMiX0INNbDp5qQM/9A5NQ5Ty9Oity47aGxYb3IpudE2l72tP4R+1DKyKNGTgju4uCq02iScmxU5MqN6NN8ZoNIzw6PpOiW5mpv3xP5ckzk7J8is3MimzeJvPe6yNNPmjtGSkvTJKcgE5rSUNlutPwZFme//bFsdWjh7tdE9mIymVtOLoU2rariX1yWuw4jiv8rNPPoGo+gTpC0lmNLRqJKzqdY56uUGB8HErSPaVhF6R8SGf8l/ACM5N6dIltfDG+jWeM/hBo/BoeytMTQGfalDU357VK0dQ7DPYMi+z8XuXozuq1GrQo5vPnzHlOt0AZtacnft5JZPn1e5O0+ka+/F5mbT9bHRCsVcnjFx938kzhPG9rRk8QPtpm9L/LVuEcSJw+1EDVyTDlvCzn++fCC6T4u8vOEX6L3X4UcPseYEpO2TPk0hyg6OiKiN8/1PFUhx3/ANAGGSVsm/PFtTGLN8lrCe5bfp9L/KuRU6sTD2n5hQddzFXKYkjElJm2Z8ol2nsWCMp+DNEWFHObKTIlJW6Z8WrdW5OC7pqyF21Ehh0lMU2LSlgmfGC2DH2Kd5XkT1qJtqGSOCChPotpnHdqwhRzm25hrY1K0Vvk2lchh2p/Z5WqFNjSXEJ5oSObhqy+JjPSJvP9G7YihZyrk0DCveCYv0wr7akfNKy9Ee8fIPdYt8skH2SwhqGalbV8yuIkFvz1HSpOaWQxh5S4TknMHFY+XqzRVxhSMrYttJOibH0R+vSCygPWnLS0i72zLJlKK8L5Lcn5Hofrcwy1TF0Efv/sHyfkJ7dri27oWNUbgFCcEUzU+qDtcMgSmSA7flXdiHwJnOKy5n+PaRww9aq7DqwZ89aMGS0d2ImCpVxPkhcMaBT9gcmIRAnk+8r8Mw9DmXp6yh5lpuLLy8hTfokLBgD3+rWpPBpb4WHlrGtHTAEjcC7vZXhflX9gFWwynLiiSGE4yQIC483s45CEv/oQgv4OKk9jo96rc3xoj0L+E//Jh8xOC5T1sYHhj2TC0I1jutlUROAHr8Z9XAXsMr04oOzjRR4A488NEJbeTgmHN9wMNZ7CN39dLH7SkE8qcVI8Ace2DMmKId4mUDGvFLTDM8UUM9zG8YmCq2+esLPZjeLHk0IelafYBbPZCOeV2kg4BzsT4PGnmM5JBH0ASMwn82sd2aEuwzm1HIjCBWqZkzH+AtdxhQRSz2e3QVqj7dLEHEiOD62O+cjkm9aeL/wdo+WcsHD0GuAAAAABJRU5ErkJggg=="></image>
                </defs>
                </svg>
                    <span>prop vr</span>                
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
        
                <div style={{display:'flex',justifyContent:'center'}} className="JoiningForm">
                <div style={{margin:"0",padding:"0",width:'300px'}} className="row">
        <div className="card project_det_background">
          <div style={{padding: "0px"}} className="card-body d-flex flex-row">
          {this.state.loader?
               <><a>
               <div>
                <div style={{width:'280px',height:'108px'}} className="project_name">
                 <span className="skeleton-box"></span>
                </div>
              </div></a></>:<>
            <img src={this.state.img} width="81px" alt="avatar" />
            <div style={{width: "300px"}}>
        <h4 style={{paddingLeft: "25px"}} className="card-title project_heading">{this.props.pid}</h4>
              <div style={{display:this.state.info_details==true?'flex':'none'}} className="card-text flex-row project_icon_content">
                <div>
                  <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g id="27) Icon/archive">
                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="#222B45"/>
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0)"></g>
                      </g>
                    </svg>        
                   </span>
                   <span id="room" className="createroom_icon_span">
                    {this.state.bed} BHK
                   </span> 
                </div>
              <div style={{paddingLeft: "15px"}}>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                    <g id="27) Icon/droplet">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M12.5585 5.42903L8.64851 9.35503C6.47251 11.538 6.44351 15.114 8.58051 17.327C9.60951 18.394 10.9835 18.988 12.4475 19H12.4495C13.9145 19.011 15.2985 18.44 16.3445 17.39C18.5185 15.211 18.5475 11.636 16.4095 9.42103L12.5585 5.42903ZM12.4315 21C10.4245 20.983 8.54651 20.172 7.14151 18.716C4.25251 15.724 4.29151 10.893 7.22851 7.94603L11.8615 3.29503C12.0515 3.10503 12.3095 2.99803 12.5785 3.00003C12.8475 3.00303 13.1035 3.11403 13.2895 3.30603L17.8495 8.03303C20.7375 11.026 20.6985 15.858 17.7615 18.802C16.3325 20.236 14.4405 21.016 12.4335 21H12.4315Z" fill="#222B45"/>
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="3" width="15" height="19">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M12.5585 5.42903L8.64851 9.35503C6.47251 11.538 6.44351 15.114 8.58051 17.327C9.60951 18.394 10.9835 18.988 12.4475 19H12.4495C13.9145 19.011 15.2985 18.44 16.3445 17.39C18.5185 15.211 18.5475 11.636 16.4095 9.42103L12.5585 5.42903ZM12.4315 21C10.4245 20.983 8.54651 20.172 7.14151 18.716C4.25251 15.724 4.29151 10.893 7.22851 7.94603L11.8615 3.29503C12.0515 3.10503 12.3095 2.99803 12.5785 3.00003C12.8475 3.00303 13.1035 3.11403 13.2895 3.30603L17.8495 8.03303C20.7375 11.026 20.6985 15.858 17.7615 18.802C16.3325 20.236 14.4405 21.016 12.4335 21H12.4315Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0)">
                    </g>
                    </g>
                    </svg>
                    
                </span>
                <span id="bath" className="createroom_icon_span">
                {this.state.bath} Bath
                 </span> 
              </div>
               
               <div style={{paddingLeft: "15px"}}>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                    <g id="27) Icon/home">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M16.0002 19.9878H18.9902L19.0002 11.6118L11.9982 4.41981L5.0062 11.5708L5.0002 19.9878H8.0002V12.9878C8.0002 12.4348 8.4472 11.9878 9.0002 11.9878H15.0002C15.5522 11.9878 16.0002 12.4348 16.0002 12.9878V19.9878ZM14.0002 19.9878H10.0002V13.9878H14.0002V19.9878ZM20.4242 10.1728L12.7152 2.28881C12.3382 1.90381 11.6622 1.90381 11.2852 2.28881L3.5752 10.1738C3.2102 10.5488 3.0002 11.0728 3.0002 11.6118V19.9878C3.0002 21.0908 3.8472 21.9878 4.8882 21.9878H9.0002H15.0002H19.1112C20.1522 21.9878 21.0002 21.0908 21.0002 19.9878V11.6118C21.0002 11.0728 20.7902 10.5488 20.4242 10.1728Z" fill="#222B45"/>
                    </g>
                    </svg>                    
                </span>
                <span id="sqft" className="createroom_icon_span">
                  {this.state.sqft} sq.ft
                 </span> 
               </div>
                
              </div>
              </div>
              </>}
            </div>
          </div>
        </div>
       </div>
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
        
                <div style={{display:'flex',justifyContent:'center'}} className="JoiningForm">
                <div style={{margin:"0",padding:"0"}} className="row">
        <div className="card project_det_background">
          <div style={{padding: "0px"}} className="card-body d-flex flex-row">
            <img src={this.state.img} width="81px" alt="avatar" />
            <div style={{width: "300px"}}>
        <h4 style={{paddingLeft: "25px"}} className="card-title project_heading">{this.props.pid}</h4>
              <div style={{display:this.state.info_details==true?'flex':'none'}} className="card-text flex-row project_icon_content">
                <div>
                  <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g id="27) Icon/archive">
                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="#222B45"/>
                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0)"></g>
                      </g>
                    </svg>        
                   </span>
                   <span id="room" className="createroom_icon_span">
                    {this.state.bed} BHK
                   </span> 
                </div>
              <div style={{paddingLeft: "15px"}}>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                    <g id="27) Icon/droplet">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M12.5585 5.42903L8.64851 9.35503C6.47251 11.538 6.44351 15.114 8.58051 17.327C9.60951 18.394 10.9835 18.988 12.4475 19H12.4495C13.9145 19.011 15.2985 18.44 16.3445 17.39C18.5185 15.211 18.5475 11.636 16.4095 9.42103L12.5585 5.42903ZM12.4315 21C10.4245 20.983 8.54651 20.172 7.14151 18.716C4.25251 15.724 4.29151 10.893 7.22851 7.94603L11.8615 3.29503C12.0515 3.10503 12.3095 2.99803 12.5785 3.00003C12.8475 3.00303 13.1035 3.11403 13.2895 3.30603L17.8495 8.03303C20.7375 11.026 20.6985 15.858 17.7615 18.802C16.3325 20.236 14.4405 21.016 12.4335 21H12.4315Z" fill="#222B45"/>
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="3" width="15" height="19">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M12.5585 5.42903L8.64851 9.35503C6.47251 11.538 6.44351 15.114 8.58051 17.327C9.60951 18.394 10.9835 18.988 12.4475 19H12.4495C13.9145 19.011 15.2985 18.44 16.3445 17.39C18.5185 15.211 18.5475 11.636 16.4095 9.42103L12.5585 5.42903ZM12.4315 21C10.4245 20.983 8.54651 20.172 7.14151 18.716C4.25251 15.724 4.29151 10.893 7.22851 7.94603L11.8615 3.29503C12.0515 3.10503 12.3095 2.99803 12.5785 3.00003C12.8475 3.00303 13.1035 3.11403 13.2895 3.30603L17.8495 8.03303C20.7375 11.026 20.6985 15.858 17.7615 18.802C16.3325 20.236 14.4405 21.016 12.4335 21H12.4315Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0)">
                    </g>
                    </g>
                    </svg>
                    
                </span>
                <span id="bath" className="createroom_icon_span">
                {this.state.bath} Bath
                 </span> 
              </div>
               
               <div style={{paddingLeft: "15px"}}>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                    <g id="27) Icon/home">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M16.0002 19.9878H18.9902L19.0002 11.6118L11.9982 4.41981L5.0062 11.5708L5.0002 19.9878H8.0002V12.9878C8.0002 12.4348 8.4472 11.9878 9.0002 11.9878H15.0002C15.5522 11.9878 16.0002 12.4348 16.0002 12.9878V19.9878ZM14.0002 19.9878H10.0002V13.9878H14.0002V19.9878ZM20.4242 10.1728L12.7152 2.28881C12.3382 1.90381 11.6622 1.90381 11.2852 2.28881L3.5752 10.1738C3.2102 10.5488 3.0002 11.0728 3.0002 11.6118V19.9878C3.0002 21.0908 3.8472 21.9878 4.8882 21.9878H9.0002H15.0002H19.1112C20.1522 21.9878 21.0002 21.0908 21.0002 19.9878V11.6118C21.0002 11.0728 20.7902 10.5488 20.4242 10.1728Z" fill="#222B45"/>
                    </g>
                    </svg>                    
                </span>
                <span id="sqft" className="createroom_icon_span">
                  {this.state.sqft} sq.ft
                 </span> 
               </div>
                
              </div>
            </div>
          </div>
        </div>
       </div>
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
