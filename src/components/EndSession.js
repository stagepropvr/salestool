import React from "react";
import Fire from "../config/Firebase.jsx";
import StarRatings from 'react-star-ratings';

export default class EndSession extends React.Component {

    constructor()
    {
        super();
        this.state = {
            stars: 0,
            qn1:true,
            qn2:false,
            ans: "Need to explore further",
            cmnt:"",
            feedback:false,
            pid:localStorage.getItem('pid'),
            info_det:false,
            bed:'',
            bath:'',
            sqft:'',
            img_src:'',
            project:'',
            loader:true
        }
        this.handlechange=this.handlechange.bind(this);
        this.changeRating = this.changeRating.bind(this);
   
    }
    
    componentDidMount(){
    
        window.scrollTo(0, 0);
        let uid = localStorage.getItem("uid");
        let pid = localStorage.getItem("pid");
        var ref = Fire.database().ref("users/"+uid+"/Projects/"+pid);
        ref.once("value",child=>{
            console.log(child.val());
            this.setState({
                project:pid,
                img_src:child.val().thumb,
                loader:false
            })
            if(child.hasChild('Info')){
                var ref1 = Fire.database().ref("users/"+uid+"/Projects/"+pid+'/Info');
                ref1.once("value",snap=>{
                    if(snap.val().baths==="" || snap.val().beds==='' || snap.val().sqft===''){
                        this.setState({
                            info_det:false
                        })
                    }else{
                        this.setState({
                            bed:snap.val().beds,
                            bath:snap.val().baths,
                            sqft:snap.val().sqft,
                            info_det:true
                        })
                    }
                })
            }else{
                this.setState({
                    info_det:false
                })
            }
        })
      }

      changeRating( newRating, name ) {
        this.setState({
          stars: newRating
        });

      }

    handlechange(event){
        this.setState({cmnt:event.target.value})
    }

    cancel = () => {
        localStorage.removeItem('uid');
        localStorage.removeItem('pid');
        localStorage.removeItem('rid');
        localStorage.removeItem('guestkey');
        this.setState({feedback:true})    
    }

    submitFeedback = (event) => {
        event.preventDefault();

        let uid = localStorage.getItem("uid");
        let pid = localStorage.getItem("pid");
        let rid = localStorage.getItem("rid");
        let key = localStorage.getItem("guestkey");
       
        if(uid && pid && rid && key)
        {
            var ref =  Fire.database().ref('users/'+uid+'/Projects/'+pid+'/rooms/'+rid+'/analytics/'+key)
            .update(
                {feedback:{
                    Rating:this.state.stars,
                    Expirience:this.state.ans,
                    Comment:this.state.cmnt,
                }
                });
        }
        localStorage.removeItem('uid');
        localStorage.removeItem('pid');
        localStorage.removeItem('rid');
        localStorage.removeItem('guestkey');
        this.setState({feedback:true})

    }

    render(){
        if(!this.state.feedback)
        {
            return(   
                <div style={{background:'#eeee', height:'100vh'}} className="header-filter">
                <div  className="endsession_container container">
                    <div  className="endsession_container row">
                        <div style={{padding:0}}>
                            <div class="endsession_card card card-signup ">
                            <a  className="endsession_logo">
                                <img style={{width: '100%', height: '100%', objectFit: 'contain'}} src={require('../assets/logo.webp')}></img>                  
                            </a>
                                <h2 class="End-session-heading">Your session has ended</h2>
                                <div style={{display:'flex',justifyContent:'flex-start',padding:'0',marginLeft:'-10px'}} className="JoiningForm">
                                        <div style={{margin:"0",padding:"0"}} className="row">
                                     <div className="card project_det_background">
                                    <div style={{padding: "0px"}} className="card-body d-flex flex-row">
                                      {this.state.loader?
                                             <><a>
                                              <div>
                                      <div style={{width:'280px',height:'108px'}} className="project_name">
                                      <span className="skeleton-box"></span>
                                     </div>
                                  </div></a></>:<>
                                 <img src={this.state.img_src} height="93px"  width="81px" alt="avatar" />
                                  <div style={{width: "300px"}}>
        <h4 style={{paddingLeft: "25px",paddingTop:'3px'}} className="card-title project_heading">{this.state.pid}</h4>
              <div style={{display:this.state.info_det==true?'flex':'none'}} className="card-text flex-row project_icon_content">
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
                  {this.state.sqft} Sq.ft
                 </span> 
               </div>
                
              </div>
            </div>
            </>}
          </div>
        </div>
       </div>
      </div>  
                                <h2 class="End-session-heading" style={{fontSize: "14px"}}>Thanks for participating. Please leave your feedback here!</h2>
                                <form class="form" style={{paddingTop:"12px"}}>
                                    <div class="card-content">							
                                            <div class="form-group">
                                                <label class="input_Label_endsession">
                                                    1. How would you rate the experience?
                                                </label>
                                                <div class="rating d-none d-sm-block">
                                                <StarRatings
                                                     rating={this.state.stars}
                                                     starRatedColor="rgb(255,215,0,0.8)"
                                                     changeRating={this.changeRating}
                                                      numberOfStars={5}
                                                    name='rating'
                                                    starDimension="24px"
                                                    starSpacing="4px"
                                                    starHoverColor="rgb(255,215,0,0.8)"
                                                    starEmptyColor="rgb(34,43,69,1)"
                                                    svgIconViewBox="0 0 24 24"
                                                    svgIconPath="M12 16.05c.159 0 .318.038.463.113l3.769 1.97-.717-4.157c-.057-.326.052-.658.29-.889l3.036-2.936-4.203-.612c-.325-.047-.606-.25-.752-.544L12 5.201l-1.886 3.794c-.146.294-.427.497-.752.544l-4.203.612 3.036 2.936c.238.231.347.563.29.889l-.717 4.157 3.769-1.97c.145-.075.304-.113.463-.113m5.562 4.905c-.16 0-.318-.037-.463-.113l-5.1-2.664-5.098 2.664c-.338.176-.746.145-1.051-.079-.308-.224-.461-.603-.397-.978l.972-5.628-4.12-3.985c-.275-.265-.373-.663-.256-1.026.116-.363.43-.627.807-.682l5.7-.828 2.548-5.126c.338-.68 1.454-.68 1.792 0l2.547 5.126 5.7.828c.378.055.692.319.808.682.117.363.019.761-.256 1.026l-4.12 3.985.972 5.628c.064.375-.09.754-.397.978-.173.128-.38.192-.588.192"
                                                 />
                                                </div>

                                                {/* Mobile */}
                                                <div class="rating-Mobile d-sm-none">
                                                <StarRatings
                                                     rating={this.state.stars}
                                                     starRatedColor="rgb(255,215,0,0.8)"
                                                     changeRating={this.changeRating}
                                                      numberOfStars={5}
                                                    name='rating'
                                                    starDimension="24px"
                                                    starSpacing="4px"
                                                    starHoverColor="rgb(255,215,0,0.8)"
                                                    starEmptyColor="rgb(34,43,69,1)"
                                                    svgIconViewBox="0 0 24 24"
                                                    svgIconPath="M12 16.05c.159 0 .318.038.463.113l3.769 1.97-.717-4.157c-.057-.326.052-.658.29-.889l3.036-2.936-4.203-.612c-.325-.047-.606-.25-.752-.544L12 5.201l-1.886 3.794c-.146.294-.427.497-.752.544l-4.203.612 3.036 2.936c.238.231.347.563.29.889l-.717 4.157 3.769-1.97c.145-.075.304-.113.463-.113m5.562 4.905c-.16 0-.318-.037-.463-.113l-5.1-2.664-5.098 2.664c-.338.176-.746.145-1.051-.079-.308-.224-.461-.603-.397-.978l.972-5.628-4.12-3.985c-.275-.265-.373-.663-.256-1.026.116-.363.43-.627.807-.682l5.7-.828 2.548-5.126c.338-.68 1.454-.68 1.792 0l2.547 5.126 5.7.828c.378.055.692.319.808.682.117.363.019.761-.256 1.026l-4.12 3.985.972 5.628c.064.375-.09.754-.397.978-.173.128-.38.192-.588.192"
                                                 />
                                                </div>

                                            </div>
                                            
                                            <div class="form-group">
                                                <label class="input_Label_endsession">2. How likely are you convinced with this project?</label>
                                                <div style={{marginTop:'5px'}} class="form-check form-check-radio">
                                                <label class="radio_label form-check-label">
                                                    <input onClick={()=>{this.setState({ans: 'Need to explore further',qn1:true,qn2:false})}} class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked={this.state.qn1}/>
                                                    Need to explore further
                                                    <span class="circle">
                                                        <span class="check"></span>
                                                    </span>
                                                </label>
                                                <label class="radio_label form-check-label" >
                                                    <input onClick={()=>{this.setState({ans: 'I am convinced, call me for next steps',qn1:false,qn2:true})}} class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" checked={this.state.qn2} />
                                                    I am convinced, call me for next steps
                                                    <span class="circle">
                                                        <span class="check"></span>
                                                    </span>
                                                </label>
                                            </div>
                                            </div>
                                            
        
                                            <div class="form-group">
                                                <label class="input_Label_endsession">3. Additonal Comments (if any)</label>
                                                <textarea  onChange={this.handlechange} class="textbox_endsession form-control" placeholder="Enter your comments"></textarea>
                                            </div>
                                            
                                            <div  style={{paddingLeft: '10px'}}>
                                                <button type="submit" onClick={(event) => {this.cancel(event)}} class="btn feedback_cancel">Cancel</button>
                                                <button style={{marginLeft:'10px'}} type="submit" onClick={(event) => {this.submitFeedback(event)}} class="btn feedback">Proceed</button>
                                            </div>
                                    </div>
                                </form>
                        </div>

                    
                                    
                    </div>
                        </div>
                    </div>

                </div>
            )
        }
        else{
            return(
    <div className="page-header header-filter end_page">
		<div  className="endsession_container container">
			<div  className="endsession_container row">
				<div style={{padding:"0px"}} className="col-sm-12">
                    <div style={{boxShadow: 'none'}} className="endsession_card card card-signup">
                    <a  className="endsession_logo">
                                <img style={{width: '100%', height: '100%', objectFit: 'contain'}} src={require('../assets/logo.webp')}></img>                  
                            </a>
                        <div style={{margin:'0', padding:'0', marginTop: '10px', display: 'flex', height: '75%', justifyContent: 'center',alignItems: 'center'}} className="row">
                            <div style={{marginLeft: '0px'}}>
                                <h2 className="End-session-heading" style={{fontSize: '26px'}}>Thanks for your feedback! We will get in touch.</h2>
                                <div style={{display:'flex',justifyContent:'center'}} className="JoiningForm">
                <div style={{margin:"0",padding:"0"}} className="row">
        <div className="card project_det_background">
          <div style={{padding: "0px"}} className="card-body d-flex flex-row">
          {this.state.loader?
               <><a>
               <div>
                <div style={{width:'280px',height:'108px'}} className="project_name">
                 <span className="skeleton-box"></span>
                </div>
              </div></a></>:<>
            <img src={this.state.img_src} height="93px"  width="81px" alt="avatar" />
            <div style={{width: "300px"}}>
        <h4 style={{paddingLeft: "25px",paddingTop:'3px'}} className="card-title project_heading">{this.state.pid}</h4>
              <div style={{display:this.state.info_det==true?'flex':'none'}} className="card-text flex-row project_icon_content">
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
                  {this.state.sqft} Sq.ft
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
                           
                            
                          
                        </div>

                        
                        
                    </div>
                    
                    
				</div>
			</div>
		</div>
	</div>

            )
        }
    }
}

