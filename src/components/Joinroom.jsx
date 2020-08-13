import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";

class Joinroom extends React.Component {
  constructor(props){
    super(props);
    this.state={
        modal:false,
        name:'',
        job_title:'',
        number:'',
        // cname:'',
        email:'',
        start: new Date().getTime(),
        endTime: "",
        exception:'',
        info_details:false,
        bed:'',
        bath:'',
        sqft:'',
        img:'',
        redirect:false,
        loader:true,
        roomStatus:'Live',
        
    }
    this.handlechange=this.handlechange.bind(this);
    this.handlejoin=this.handlejoin.bind(this);
    this.isRoomAlive();
  }
  
componentDidMount(){
    
    var ref = Fire.database().ref("users/"+this.props.match.params.uid+'/Projects/'+this.props.match.params.pid);
    ref.once('value',child=>{
        this.setState({
            img:child.val().thumb,
            loader:false
        })
        if(child.hasChild('Info')){
            var ref1 = Fire.database().ref("users/"+this.props.match.params.uid+'/Projects/'+this.props.match.params.pid+"/Info");
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

 handlejoin(event){
    event.preventDefault();
    
    if(this.state.name!='' && this.state.email!='' && this.state.number!=''){
        var alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        if(this.state.name.match(alpha)){
            var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(this.state.email.match(email)){
                var phoneno = /^\d{10}$/;

                if(this.state.number.match(phoneno)){
                    document.getElementById('submit').style.display='none';
                    document.getElementById('loader').style.display='inline-block';
                   var ref =  Fire.database().ref('users/'+this.props.match.params.uid+'/Projects/'+this.props.match.params.pid+'/rooms/'+this.props.match.params.rid+'/analytics').push({
                     name:this.state.name,
                     number:this.state.number,
                    //  job:this.state.job_title,
                    //  company:this.state.cname,
                     email:this.state.email,   
                     start:this.state.start,
                     end:this.state.endTime,
                     feedback:{}
                    });
                    localStorage.setItem("uid",this.props.match.params.uid);
                    localStorage.setItem("pid",this.props.match.params.pid);
                    localStorage.setItem("rid",this.props.match.params.rid);
                    
                    localStorage.setItem("guestkey",ref.key);
                    localStorage.setItem("name",this.state.name);
                    localStorage.setItem(this.props.match.params.rid,false);
                    this.setState({
                        redirect:true
                    })
                }
                else{
                    document.getElementById('number').classList.add('input_error_border');
                    document.getElementById('other_exception').style.display='block';
                    document.getElementById('other_exception').childNodes[0].classList.remove('input_error_hide');
                    this.setState({
                        exception:'Contains only Numbers[0-9] and length is upto 10'
                    })
                }
            }
            else{
                document.getElementById('email').classList.add('input_error_border');
                document.getElementById('other_exception').style.display='block';
                document.getElementById('other_exception').childNodes[0].classList.remove('input_error_hide');
                this.setState({
                    exception:'Email Address invalid format'
                })
            }
        }
        else{
            document.getElementById('name').classList.add('input_error_border');
            document.getElementById('other_exception').style.display='block';
            document.getElementById('other_exception').childNodes[0].classList.remove('input_error_hide');
                this.setState({
                    exception:'Contains only alphabets[A-Z]'
                })
        }
    }
    else{
        if(this.state.name==''){
            document.getElementById('name').classList.add('input_error_border');
            document.getElementById('name_error').childNodes[0].classList.remove('input_error_hide');
        }

        // if(this.state.cname==''){
        //         document.getElementById('cname').classList.add('input_error_border');
        //         document.getElementById('cname_error').childNodes[0].classList.remove('input_error_hide');
        // }

        if(this.state.number==''){
            document.getElementById('number').classList.add('input_error_border');
            document.getElementById('number_error').childNodes[0].classList.remove('input_error_hide');

        }

        // if(this.state.job_title==''){
        //     document.getElementById('job_title').classList.add('input_error_border');
        //     document.getElementById('job_title_error').childNodes[0].classList.remove('input_error_hide');

        // }

        if(this.state.email==''){
            document.getElementById('email').classList.add('input_error_border');
            document.getElementById('email_error').childNodes[0].classList.remove('input_error_hide');

        }
    }
  }
  
handlechange(event){
    this.setState({
		exception: ""
    })
		const { name, value } = event.target;
        this.setState({ [name]: value });
        document.getElementById(name).classList.remove('input_error_border');
        document.getElementById(name+'_error').childNodes[0].classList.add('input_error_hide');
}

isRoomAlive = () => {
    var ref = Fire.database().ref("users/"+this.props.match.params.uid+'/Projects/'+this.props.match.params.pid+'/rooms/'+this.props.match.params.rid+'/analytics/host/status');
    ref.on('value',(value) => {
        if(value.val() === null)
        {
            alert("Invalid Room ID")
        }
        else if(value.val() === 'End')
        {
            // alert("Room Session Has ended")
        }
            
    })
}



  render() {
if(this.state.redirect){
    return(
    <Redirect to={"/salestool/guest/room/"+this.props.match.params.uid+"/"+this.props.match.params.pid+"/"+this.props.match.params.rid}/>
    )
}else{
    return( 
         <div style={{width:'100%', height:'100vh'}} >
    <div  className="login_container d-none d-sm-block">
        <div style={{background: "#eeeeee"}} className="login_container row">
            {/* Image Col */}
            <div style={{padding:"0", maxHeight:'100vh', position:"relative"}} className="col-sm-5 d-none d-sm-block">
                <img style={{  width: '100%', height: '100%', objectFit: 'cover'}} src={require('../assets/loginBG.png')}></img>
                <div className="loginNew_logo">
                    <img style={{width: '70%', height: '70%', objectFit: 'cover'}} src={require('../assets/logo.webp')}></img>
                </div>
                
                <div className="loginNew_center">
                    <h3>Virtual Property Tour Invite</h3>
                    <p>You are invited for a virtual guided property tour. Ask your questions, virtually experience the property and book your dream property.</p>
                </div>

                <div className="loginNew_bottom">
                    <p>Powered by <u>PROPVR.in</u></p>   
                </div>
                
            </div>
			
            {/* Form Col */} 
            <div style={{padding:"0", textAlign:'center', width:"100%"}} className="col-sm-7 col-xs-12">
                <div className="login_card card card-signup" style={{justifyContent:'center'}}>
                    <h2 className="Welcome-to-Prop-VR" style={{padding: "25px"}}>You are joining a virtual tour session</h2>
        
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
            <img src={this.state.img} height="93px"  width="81px" alt="avatar" />
            <div style={{width: "300px"}}>
        <h4 style={{paddingLeft: "25px",paddingTop:'3px'}} className="card-title project_heading">{this.props.match.params.pid}</h4>
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
                        <div style={{display:'flex',justifyContent:'center'}}>
                        <form onSubmit={this.handlejoin} className="form" style={{paddingTop: "25px", textAlign: "left"}}>
							<div className="card-content">							
									<div className="form-group">
                                        <label className="input_Label">
                                            Name
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="name" name="name" className="input_box form-control" placeholder="Enter your full name" />
                                        <small id="name_error" className="form-text text-muted">
                                            <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Name is <sup>*</sup> required
                                            </span>
                                        </small>
                                    </div>
								
                                    <div className="form-group">
                                        <label className="input_Label">
                                            Email ID
                                        </label>
                                        <input onChange={this.handlechange} type="email" id="email" name="email" className="input_box form-control" placeholder="Enter your email address" />
                                        <small id="email_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                          Email Address <sup>*</sup> is required
                                        </span>   
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label className="input_Label">
                                            Phone number
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="number" name="number" className="input_box form-control" placeholder="Enter your 10-digit phone number" />
                                        <small id="number_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Number is <sup>*</sup> required
                                        </span>                    
                                        </small>
                                    </div>
                                    
                                    {/* <div className="form-group">
                                        <label className="input_Label">
                                           Job Title 
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="job_title" name="job_title" className="input_box form-control" placeholder="Enter Job Title" />
                                        <small id="job_title_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                           Job Title  is <sup>*</sup> required
                                        </span>     
                                        </small>

                                    </div> */}

                                    {/* <div className="form-group">
                                        <label className="input_Label">
                                            Company name
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="cname" name="cname" className="input_box form-control" placeholder="Enter the company name" />
                                        <small id="cname_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Company name is <sup>*</sup>required
                                        </span>      
                                        </small>
                                    </div> */}

                                    

                                    <div id="other_exception" style={{display:'none'}} className="form-group">   
                                         <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            {this.state.exception}
                                        </span>
                                    </div>

                                    <div style={{textAlign: "center"}} className="form-group">
                                    <button style={{ padding:'10px',margin:'10px'}} className="btn input_button">CANCEL</button>
                                    <button id="submit" type="submit" style={{ padding:'10px',margin:'10px'}} className="btn input_button">NEXT</button>
                                    <button style={{cursor: "progress",display:'none'}} id="loader" type="button" className="btn input_button" disabled>
                                    <i id="loginloader" className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "1rem", color: "white", paddingRight: 2, paddingLeft: 2 }}></i>
                                    </button>

                                    </div>
							</div>
                        </form>
                        </div>
                </div>
            </div>
        </div>


        
    </div>

    {/* Mobile */}
    <div  className="login_container d-sm-none">
        <div style={{background: "#eeeeee"}} className="login_container row">
            {/* Form Col */} 
            <div style={{padding:"0", textAlign:'center', width:"100%"}}>
                <div className="login_card_Mobile card card-signup" >
                <div className="BlueBG">   
                    <h1 className="Welcome-to-Prop-VR" >Join Virtual Tour </h1>
                    <p>You are invited to join the virtual property tour. Fill the required details and enjoy your session.</p>
                    <div style={{margin:0, padding:0, width:'100%'}} className="card project_det_background">    
                          <div style={{padding: "0px",height:'115px'}} className="card-body d-flex flex-row">
                          {this.state.loader?
               <><a>
               <div>
                <div style={{width:'280px',height:'108px'}} className="project_name">
                 <span className="skeleton-box"></span>
                </div>
              </div></a></>:<>
                            <img src={this.state.img} width="81px"  alt="avatar" />
                            <div style={{width: "100%"}}>
                                <h4 className="card-title project_heading" style={{textAlign:"center"}}>{this.props.match.params.pid}</h4>
                                <div style={{display:this.state.info_details==true?'flex':'none'}} className="card-text flex-row project_icon_content">
                                    <div className="col">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <g id="27) Icon/archive">
                                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="#222B45"/>
                                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
                                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="white"/>
                                        </mask>
                                        <g mask="url(#mask0)">
                                        </g>
                                        </g>
                                        </svg>        
                                   </span>
                                   <span id="room" className="createroom_icon_span">
                                        {this.state.bed} BHK
                                   </span> 
                                </div>
                              <div className="col">
                                <span>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                               
                               <div className="col">
                                <span>
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                    <div style={{margin:"0",padding:"0",paddingTop: "0px", height: 'inherit'}} className="row">    
                    
                    <form onSubmit={this.handlejoin} className="form form_Mobile" style={{paddingTop: "25px", textAlign: "left", width:"100%"}}>
							<div className="card-content">							
									<div className="form-group">
                                        <label className="input_Label">
                                            Name
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="name" name="name" className="input_box form-control" placeholder="Enter your full name" />
                                        <small id="name_error" className="form-text text-muted">
                                            <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Name is <sup>*</sup> required
                                            </span>
                                        </small>
                                    </div>
								
                                    <div className="form-group">
                                        <label className="input_Label">
                                            Email ID
                                        </label>
                                        <input onChange={this.handlechange} type="email" id="email" name="email" className="input_box form-control" placeholder="Enter your email address" />
                                        <small id="email_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                          Email Address <sup>*</sup> is required
                                        </span>   
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label className="input_Label">
                                            Phone number
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="number" name="number" className="input_box form-control" placeholder="Enter your 10-digit phone number" />
                                        <small id="number_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Number is <sup>*</sup> required
                                        </span>                    
                                        </small>
                                    </div>
                                    
                                    {/* <div className="form-group">
                                        <label className="input_Label">
                                           Job Title 
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="job_title" name="job_title" className="input_box form-control" placeholder="Enter Job Title" />
                                        <small id="job_title_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                           Job Title  is <sup>*</sup> required
                                        </span>     
                                        </small>

                                    </div> */}

                                    {/* <div className="form-group">
                                        <label className="input_Label">
                                            Company name
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="cname" name="cname" className="input_box form-control" placeholder="Enter the company name" />
                                        <small id="cname_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Company name is <sup>*</sup>required
                                        </span>      
                                        </small>
                                    </div> */}

                                    

                                    <div id="other_exception" style={{display:'none'}} className="form-group">   
                                         <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            {this.state.exception}
                                        </span>
                                    </div>

                                    <div style={{textAlign: "center"}} className="form-group">
                                    <button style={{margin:'10px'}} className="btn input_button">CANCEL</button>
                                    <button id="submit" type="submit" style={{margin:'10px',marginLeft:'14px'}} className="btn input_button">NEXT</button>
                                    <button style={{cursor: "progress",display:'none'}} id="loader" type="button" className="btn input_button" disabled>
                                    <i id="loginloader" className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "1rem", color: "white", paddingRight: 2, paddingLeft: 2 }}></i>
                                    </button>

                                    </div>
							</div>
                        </form>
                        </div>
                </div>
            </div>
        </div>


        
    </div>
</div>)
  }
}
}
export default Joinroom;
