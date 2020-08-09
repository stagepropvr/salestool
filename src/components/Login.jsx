import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire,{Firebase} from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:false,
        email:'',
        password:'',
        exception:'',
        modal:false,
        forget_email:''
    }
    this.handlechange=this.handlechange.bind(this);
    this.handlelogin=this.handlelogin.bind(this);
    this.closemodal = this.closemodal.bind(this);
    this.openmodal = this.openmodal.bind(this);
    this.forgetpass = this.forgetpass.bind(this);
}
  
componentDidMount(){
    
    window.scrollTo(0, 0);
    this.fireBaseListener = Fire.auth().onAuthStateChanged((user) => {
      
        if (user) {
            var ref = Fire.database().ref("users/"+user.uid);
            ref.once('value',child=>{
                if(child.hasChild('username') && child.hasChild('email'))
                {
                    this.setState({
                        redirect: true
                    });
                }
                else{    
                    console.log("User Not Found")
                    document.getElementById('exception').style.display='block';
                    this.setState({
                        exception:"User Not Found",
                        redirect: false
                    }) 

                    Fire.auth().signOut().then(function() {
                        // console.log("Signed Out")
                      }, function(error) {
                        // An error happened.
                      });
                }
            });
        }
        else {
            this.setState({
                redirect: false
            })
        }
     });
  }

  componentWillUnmount(){
    this.fireBaseListener && this.fireBaseListener();
  }

  forgetpass(event){
      if(this.state.forget_email!=''){
        var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.forget_email.match(email)){
            Fire.auth().sendPasswordResetEmail(this.state.forget_email).then(()=>{
                document.getElementById('other_exception').childNodes[0].classList.remove('input_error_hide'); 
                document.getElementById('other_exception').childNodes[0].style.color='#3366ff !important';
                this.setState({
                    exception:'Password reset email has been sent.'
                })
              }).catch(error=>{
                document.getElementById('other_exception').childNodes[0].classList.remove('input_error_hide');
                this.setState({
                    exception:error.message
                })
                });
        }else{
            document.getElementById('forget_email').classList.add('input_error_border');
            document.getElementById('other_exception').childNodes[0].classList.remove('input_error_hide');
            this.setState({
                exception:'Invalid email address'
            })
        }
      }else{
        document.getElementById('forget_email').classList.add('input_error_border');
        document.getElementById('forget_email').childNodes[0].classList.remove('input_error_hide');
      }
  }
  openmodal(event){
    this.setState({
        modal:true
    })
  }

  closemodal(event){
      this.setState({
          modal:false
      })
  }
  handlelogin(event){
      event.preventDefault();
      if(this.state.email!='' && this.state.password!=''){
            if(this.state.email!=''){
                    if(this.state.password!=''){
                        document.getElementById('submit').style.display='none';
                        document.getElementById('loader').style.display='inline-block';
                        Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( result => {
                    
                            var user = Fire.auth().currentUser;
                            localStorage.setItem("id", user.uid);
                            localStorage.setItem("email", user.email);    
                            this.setState({
                                redirect:true
                            }) 
                        }).catch(err=>{
                            document.getElementById('exception').style.display='block';
                            document.getElementById('exception').childNodes[0].classList.remove('input_error_hide');
                            this.setState({
                                exception:err.message
                            })
                            document.getElementById('submit').style.display='inline-block';
                            document.getElementById('loader').style.display='none';
                        }); 
                    }else{
                        document.getElementById('exception').style.display='block';
                        document.getElementById('exception').childNodes[0].classList.remove('input_error_hide');
                        this.setState({
                            exception:'Invalid Password'
                        })
                        document.getElementById('password').classList.add('input_error_border');

                    }
            }else{
                document.getElementById('exception').style.display='block';
                document.getElementById('exception').childNodes[0].classList.remove('input_error_hide');
                this.setState({
                    exception:'Invalid Email address'
                })
                document.getElementById('email').classList.add('input_error_border');
            }
      }else{
        document.getElementById('exception').style.display='block';
        document.getElementById('exception').childNodes[0].classList.remove('input_error_hide');
        this.setState({
            exception:'Invalid Email address and Password'
        })
        document.getElementById('email').classList.add('input_error_border');
        document.getElementById('password').classList.add('input_error_border');

      }
  }
  handlechange(event){
    this.setState({
		exception: ""
    })
   
		const { name, value } = event.target;
        this.setState({ [name]: value });
        document.getElementById(name).classList.remove('input_error_border');
}

googleSignin = () => {
    console.log("Perform ")
    var provider = new Firebase.auth.GoogleAuthProvider();

     Fire.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        localStorage.setItem("id", user.uid);
        localStorage.setItem("email", user.email);    

        var ref = Fire.database().ref("users/"+user.uid);
        ref.once('value',child=>{
            if(child.hasChild('username') && child.hasChild('email'))
            {
                this.setState({
                    redirect: true
                });
            }
            else{    
                console.log("User Not Found")
                document.getElementById('exception').style.display='block';
                document.getElementById('exception').childNodes[0].classList.remove('input_error_hide');
                        
                this.setState({
                    exception:"User Not Found",
                    redirect: false
                }) 
            }
        });

        console.log(user.displayName)
        console.log(user.email)
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error)
        // ...
      });
}






  render() {
    if(this.state.redirect){
        return <Redirect to="/salestool/projects" />
        }
    else{
        return( 
            <>
        <div style={{width:"100%"}} className="page-header d-none d-sm-block">
		<div  className="login_container" >
			<div  className="login_container row">
            {/* image Col */}
            <div style={{padding:"0", maxHeight:'100vh', position:"relative"}} className="col-sm-5">
                <img style={{  width: '100%', height: '100%', objectFit: 'cover'}} src={require('../assets/loginBG.png')}></img>
                
                <div className="loginNew_logo">
                    <img style={{width: '70%', height: '70%', objectFit: 'cover'}} src={require('../assets/logo.webp')}></img>
                </div>
                
                <div class="loginNew_center">
                    <h3>Create, Collaborate and Share</h3>
                    <p>Prop VR allows you to create, collaborate and share virtual tour experience of your properties with your customers. Take your customers for a virtual-guided tour and increase sales. </p>
                </div>

                <div class="loginNew_bottom">
                    <p>Trusted by India’s top real-estate companies</p>   
                </div>
                
            </div>
				
            {/* Form Col */}
            <div style={{padding:"0", textAlign:'center', width:"100%"}} className="col-sm-7 col-xs-12">
                <div className="login_card card card-signup" style={{justifyContent:'center', padding:'0px 20% 0px 20%'}}>
                    <h2 style={{paddingTop: "25px"}} className="Welcome-to-Prop-VR">Hello! Welcome back!</h2>
                        <p className="Have-an-account-alre">New to Prop VR?   <Link style={{paddingLeft: "10px"}} to="/salestool/signup" className="login_span">Sign up</Link></p>
                    <form onSubmit={this.handlelogin} className="form" style={{paddingTop: "12px", textAlign:'left'}}>
                        <div className="card-content">							
                                <div className="form-group">
                                    <label className="input_Label">
                                        User name
                                    </label>
                                    <input onChange={this.handlechange} id="email" name="email" type="email" className="input_box form-control" placeholder="Enter your email address"/>
                                </div>
        
                                <div className="form-group">
                                    <label className="input_Label">
                                        Password
                                    </label>
                                    <input onChange={this.handlechange} id="password" name="password" type="password" className="input_box form-control" placeholder="Enter your password" />
                                </div>

                                <div onClick={this.openmodal} className="form-group">
                                    <span className="login_span">
                                        Forgot password?
                                    </span>
                                </div>

                                <div id="exception" className="form-group">
                                    <span className="input_error input_error_hide">
                                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>  
                                        {this.state.exception}
                                    </span>
                                </div>

                                <div style={{textAlign: "center"}} className="form-group">
                                <button id="submit" type="submit" className="btn input_button">Login</button>
                                <button style={{cursor: "progress",display:'none'}} id="loader" type="button" className="btn input_button" disabled>
                                <i id="loginloader" className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "1rem", color: "white", paddingRight: 2, paddingLeft: 2 }}></i>
                                </button>
                                </div>
                        </div>
                    </form>
                    
                    <div className="join_now">
                    <span>or join with other accounts</span>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="btn google_button" onClick={this.googleSignin} >
                            <i className="fa fa-google" aria-hidden="true"></i> Sign In with Google
                            </button>
                    </div>
                </div>
            </div>
			</div>
		</div>
	</div>

    <div className="modal" style={{display: this.state.modal==true? 'block':'none'}} id="forget_modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 style={{color: "#222b45"}} className="modal-title">Password Reset Email</h5>
          <button onClick={this.closemodal} type="button" className="close" data-dismiss="modal" aria-label="Close">
            
            
            <span aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z"></path>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(6 6)">
                    <use fill="#222B45" href="#prefix__close"></use>
                </g>
            </svg></span>
          </button>

        </div>
        <div className="modal-body">          
        <hr style={{marginTop: "-4px"}}></hr>
                    <div className="form-group">
                                    <label className="input_Label">Registered Email Address
                                    </label>
                                    <input onChange={this.handlechange} name="forget_email" id="forget_email" type="email" className="input_box form-control" placeholder="Enter your email address" />
                                    <small id="email_exception" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Email is <sup>*</sup> required
                                        </span>
                                        
                                        </small>
                                        <small id="other_exception" className="form-text text-muted">
                                            <span className="input_error input_error_hide">
                                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                               
                                            </span>
                                            
                                            </small>
                                </div>
        </div>
        <div style={{display: 'block',marginTop: '-20px'}} className="modal-footer">
            <hr></hr>
                <center className="modal_button_div">
                <button onClick={this.forgetpass} style={{marginLeft: "20px"}} type="button" className="btn proceed">Send request</button>
                </center>
        </div>
      </div>
    </div>
    </div>

{/* Mobile */}
    <div style={{width:"100%"}} className="page-header d-sm-none">
		<div  className="login_container container  " >
			<div  className="login_container row">
            {/* Form Col */}
            <div style={{padding:"0", textAlign:'center', width:"100%"}} className="col-sm-7 col-xs-12">
                <div className="login_card card card-signup" style={{justifyContent:'center'}}>
                    <h2 style={{paddingTop: "25px"}} className="Welcome-to-Prop-VR">Hello! Welcome back!</h2>
                        <p className="Have-an-account-alre">New to Prop VR?   <Link style={{paddingLeft: "10px"}} to="/salestool/signup" className="login_span">Sign up</Link></p>
                    <form onSubmit={this.handlelogin} className="form" style={{paddingTop: "12px", textAlign:'left'}}>
                        <div className="card-content">							
                                <div className="form-group">
                                    <label className="input_Label">
                                        User name
                                    </label>
                                    <input onChange={this.handlechange} id="email" name="email" type="email" className="input_box form-control" placeholder="Enter your email address"/>
                                </div>
        
                                <div className="form-group">
                                    <label className="input_Label">
                                        Password
                                    </label>
                                    <input onChange={this.handlechange} id="password" name="password" type="password" className="input_box form-control" placeholder="Enter your password" />
                                </div>

                                <div onClick={this.openmodal} className="form-group">
                                    <span className="login_span">
                                        Forgot password?
                                    </span>
                                </div>

                                <div id="exception" className="form-group">
                                    <span className="input_error input_error_hide">
                                        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>  
                                        {this.state.exception}
                                    </span>
                                </div>

                                <div style={{textAlign: "center"}} className="form-group">
                                <button id="submit" type="submit" className="btn input_button">Login</button>
                                <button style={{cursor: "progress",display:'none'}} id="loader" type="button" className="btn input_button" disabled>
                                <i id="loginloader" className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "1rem", color: "white", paddingRight: 2, paddingLeft: 2 }}></i>
                                </button>
                                </div>
                        </div>
                    </form>
                    
                    <div className="join_now">
                    <span>or join with other accounts</span>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="btn google_button" onClick={this.googleSignin} >
                            <i className="fa fa-google" aria-hidden="true"></i> Sign In with Google
                            </button>
                    </div>
                </div>
            </div>
			</div>
		</div>
	</div>

    <div className="modal" style={{display: this.state.modal==true? 'block':'none'}} id="forget_modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 style={{color: "#222b45"}} className="modal-title">Password Reset Email</h5>
          <button onClick={this.closemodal} type="button" className="close" data-dismiss="modal" aria-label="Close">
            
            
            <span aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z"></path>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(6 6)">
                    <use fill="#222B45" href="#prefix__close"></use>
                </g>
            </svg></span>
          </button>

        </div>
        <div className="modal-body">          
        <hr style={{marginTop: "-4px"}}></hr>
                    <div className="form-group">
                                    <label className="input_Label">Registered Email Address
                                    </label>
                                    <input onChange={this.handlechange} name="forget_email" id="forget_email" type="email" className="input_box form-control" placeholder="Enter your email address" />
                                    <small id="email_exception" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Email is <sup>*</sup> required
                                        </span>
                                        
                                        </small>
                                        <small id="other_exception" className="form-text text-muted">
                                            <span className="input_error input_error_hide">
                                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                               
                                            </span>
                                            
                                            </small>
                                </div>
        </div>
        <div style={{display: 'block',marginTop: '-20px'}} className="modal-footer">
            <hr></hr>
                <center className="modal_button_div">
                <button onClick={this.forgetpass} style={{marginLeft: "20px"}} type="button" className="btn proceed">Send request</button>
                </center>
        </div>
      </div>
    </div>

    
    </div>
    </>
    )
    
    }
}
}
export default Login;
