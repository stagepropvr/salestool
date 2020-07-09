import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
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
    Fire.auth().onAuthStateChanged((user) => {
        if (user) {
           this.setState({
              redirect: true
           });
        } else {
           this.setState({
              redirect: false
           })
        }
     });
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






  render() {
    if(this.state.redirect){
        return <Redirect to="/dashboard" />
        }
    else{
        return( 
            <>
        <div style={{width:"100%"}} className="page-header header-filter">
		<div  className="login_container container">
			<div  className="login_container row">
				<div style={{padding:"0"}} className="col-sm-4">
                    <div className="login_card card card-signup">
                        <a className="login_logo">
                            <svg width="72" height="39" viewBox="0 0 72 39" fill="none">
                                <rect width="72" height="39" fill="url(#pattern0)"/>
                                <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use href="#image0" transform="scale(0.00970874 0.0178571)"/>
                                </pattern>
                                <image id="image0" width="103" height="56" href="data:image/png;base64,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"/>
                                </defs>
                                </svg>
                            <span>prop vr</span>                
                        </a>
                        <h2 style={{paddingTop: "25px"}} className="Welcome-to-Prop-VR">Hello! Welcome back!</h2>
                            <p className="Have-an-account-alre">New to Prop VR?   <Link style={{paddingLeft: "10px"}} to="/signup" className="login_span">Sign up</Link></p>
						<form onSubmit={this.handlelogin} className="form" style={{paddingTop: "12px"}}>
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
                            <button className="btn google_button">
                                <i className="fa fa-google" aria-hidden="true"></i> Sign up with Google
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
