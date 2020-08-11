import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire,{Firebase} from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:false,
        name:'',
        cname:'',
        password:'',
        number:'',
        email:'',
        exception:'',
        googleSignin:false
    }
    this.handlechange=this.handlechange.bind(this);
    this.handleregister=this.handleregister.bind(this);
    this.SignupWithGoogle=this.SignupWithGoogle.bind(this);
    
  }
  
  componentDidMount(){
    window.scrollTo(0, 0);
    this.fireBaseListener = Fire.auth().onAuthStateChanged((user) => {
        // if(user)
        // {
        //     this.setState({name:user.displayName})
        //     this.setState({email:user.email})
        //     console.log("User:",user.email)
        // }
        // if (user) {
        //    this.setState({
        //       redirect: true
        //    });
        // } else {
        //    this.setState({
        //       redirect: false
        //    })
        // }
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
                    this.setState({
                        redirect: false
                    }) 
                }
            });
        }
     });

  }

  componentWillUnmount(){
    this.fireBaseListener && this.fireBaseListener();
  }

  
handleregister(event){
    event.preventDefault();

    if(this.state.name!='' && this.state.email!='' && this.state.password!=''){

        var alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        if(this.state.name.match(alpha)){

            var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(this.state.email.match(email)){
                    document.getElementById('submit').style.display='none';
                    document.getElementById('loader').style.display='inline-block';
                    
                    Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(result=> {
                        var user = Fire.auth().currentUser;
                        var appnd = user.uid;
                        Fire.database().ref("users/" + appnd).set({
                                        "email": this.state.email,
                                        "id" : appnd,
                                        "username":this.state.name,
                                        "company":this.state.cname,
                                        "phone":this.state.number
                                    }).then(()=>{
                                        this.setState({
                                            redirect:true
                                        })
                                    });
                    }).catch(err=>{
                        document.getElementById('other_exception').style.display='block';
                        document.getElementById('other_exception').childNodes[0].classList.remove('input_error_hide');
                        document.getElementById('submit').style.display='inline-block';
                        document.getElementById('loader').style.display='none';
                        this.setState({
                            exception:err.message
                        })
                    })
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

        if(this.state.cname==''){
                document.getElementById('cname').classList.add('input_error_border');
                document.getElementById('cname_error').childNodes[0].classList.remove('input_error_hide');
        }

        if(this.state.number==''){
            document.getElementById('number').classList.add('input_error_border');
            document.getElementById('number_error').childNodes[0].classList.remove('input_error_hide');

        }

        if(this.state.password==''){
            document.getElementById('password').classList.add('input_error_border');
            document.getElementById('password_error').childNodes[0].classList.remove('input_error_hide');

        }

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
}

SignupWithGoogle(){
 console.log("Goog")
 
 var provider = new Firebase.auth.GoogleAuthProvider();
 Fire.auth().signInWithPopup(provider).then((result) => {
    // var token = result.credential.accessToken;
    var user = result.user;
    var appnd = user.uid;
    
    Fire.database().ref("users/" + appnd).set({
                    "email": user.email,
                    "id" : user.uid,
                    "username":user.displayName,
                    "company":this.state.cname,
                    "phone":this.state.number
                }).then(()=>{
                    this.setState({
                        redirect:true
                    })
                });
    console.log(user.displayName)
    console.log(user.email)
    
  }).catch(function(error) {
        console.log(error)
  });
}


  render() {
    if(this.state.redirect){
        return <Redirect to="/salestool/projects" />
    }
    else{
        return( 
            <>
        <div style={{width:'100%', height:'100vh'}} className="d-none d-sm-block">
		<div  className="login_container">
			<div  className="login_container row">
            {/* image Col */}
            <div style={{padding:"0", maxHeight:'100vh', position:"relative"}} className="col-sm-5 d-none d-sm-block">
                <img style={{  width: '100%', height: '100%', objectFit: 'cover'}} src={require('../assets/loginBG.png')}></img>
                
                <div className="loginNew_logo">
                    <img style={{width: '100px', height: '71px', objectFit: 'cover'}} src={require('../assets//img/whitelogo.png')}></img>
                </div>
                
                <div class="loginNew_center">
                    <h3>Create, Collaborate and Share</h3>
                    <p>Prop VR allows you to create, collaborate and share virtual tour experience of your properties with your customers. Take your customers for a virtual-guided tour and increase sales. </p>
                    <a style={{lineHeight:'2.7'}} href="https://calendly.com/propvr/propvr-demo-call" type="submit" className="btn create_session_back">SCHEDULE DEMO</a>
                </div>

                <div class="loginNew_bottom">
                    <p>Trusted by India’s top real-estate companies</p>   
                </div>
                
            </div>
				
            {/* Form Col */}
            <div style={{padding:"0", textAlign:'center', width:"100%"}} className="col-sm-7 col-xs-12">
                   <div className="login_card card card-signup" style={{justifyContent:'center', padding:'0px 20% 0px 20%'}}>
                        <h2 className="Welcome-to-Prop-VR" style={{paddingTop: "25px"}}>Welcome to Prop VR!</h2>
                            <p className="Have-an-account-alre">Have an account already?   <Link style={{paddingLeft: "10px"}} to="/salestool/login" className="login_span">Login</Link>
                            </p>
						<form onSubmit={this.handleregister} className="form" style={{paddingTop: "25px", textAlign:'left'}}>
							<div className="card-content">							
        
                                    <div className="form-group">
                                        <label className="input_Label">
                                            Email ID
                                        </label>
                                        <input onChange={this.handlechange} value={this.state.email} type="email" id="email" name="email" className="input_box form-control" placeholder="Enter your email address" />
                                        <small id="email_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                          Email Address <sup>*</sup> is required
                                        </span>
                                        
                                        </small>
                                    </div>

                                    
                                    <div className="form-group">
                                        <label className="input_Label">
                                            Name
                                        </label>
                                        <input value={this.state.name} onChange={this.handlechange} type="text" id="name" name="name" className="input_box form-control" placeholder="Enter your full name" />
                                        <small id="name_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Name is <sup>*</sup> required
                                        </span>
                                        
                                        </small>
                                    </div>
								
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


                                    {/* <div className="form-group">
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
                                    </div> */}

                                    <div className="form-group">
                                        <label className="input_Label">
                                            Password
                                        </label>
                                        <input onChange={this.handlechange} type="password" id="password" name="password" className="input_box form-control" placeholder="Create your password" />
                                        <small id="password_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                           Password is <sup>*</sup> required
                                        </span>
                                        
                                        </small>

                                    </div>

                                    <div id="other_exception" style={{display:'none'}} className="form-group">   
                                         <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            {this.state.exception}
                                        </span>
                                    </div>

                                    <div style={{textAlign: "center"}} className="form-group">
                                    <button id="submit" type="submit" className="btn input_button">Sign up</button>
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
                            <button className="btn google_button" onClick={this.SignupWithGoogle} >
                                <i className="fa fa-google" aria-hidden="true"></i> Sign up with Google
                              </button>
                        </div>
					</div>
				</div>
			</div>
		</div>
    </div>

    {/* Mobile */}
    <div style={{width:'100%', height:'100vh'}} className="d-sm-none">
		<div  className="login_container container">
			<div  className="login_container row">
   			
            {/* Form Col */}
            <div style={{padding:"0", textAlign:'center', width:"100%"}} className="col-sm-7 col-xs-12">
                   <div className="login_card card card-signup" style={{justifyContent:'center'}}>
                        <h2 className="Welcome-to-Prop-VR" style={{paddingTop: "25px"}}>Welcome to Prop VR!</h2>
                            <p className="Have-an-account-alre">Have an account already?   <Link style={{paddingLeft: "10px"}} to="/salestool/login" className="login_span">Login</Link>
                            </p>
						<form onSubmit={this.handleregister} className="form" style={{paddingTop: "25px", textAlign:'left'}}>
							<div className="card-content">							
        
                                    <div className="form-group">
                                        <label className="input_Label">
                                            Email ID
                                        </label>
                                        <input onChange={this.handlechange} value={this.state.email} type="email" id="email" name="email" className="input_box form-control" placeholder="Enter your email address" />
                                        <small id="email_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                          Email Address <sup>*</sup> is required
                                        </span>
                                        
                                        </small>
                                    </div>

                                    
                                    <div className="form-group">
                                        <label className="input_Label">
                                            Name
                                        </label>
                                        <input value={this.state.name} onChange={this.handlechange} type="text" id="name" name="name" className="input_box form-control" placeholder="Enter your full name" />
                                        <small id="name_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Name is <sup>*</sup> required
                                        </span>
                                        
                                        </small>
                                    </div>
								
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


                                    {/* <div className="form-group">
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
                                    </div> */}

                                    <div className="form-group">
                                        <label className="input_Label">
                                            Password
                                        </label>
                                        <input onChange={this.handlechange} type="password" id="password" name="password" className="input_box form-control" placeholder="Create your password" />
                                        <small id="password_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                           Password is <sup>*</sup> required
                                        </span>
                                        
                                        </small>

                                    </div>

                                    <div id="other_exception" style={{display:'none'}} className="form-group">   
                                         <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            {this.state.exception}
                                        </span>
                                    </div>

                                    <div style={{textAlign: "center"}} className="form-group">
                                    <button id="submit" type="submit" className="btn input_button">Sign up</button>
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
                            <button className="btn google_button" onClick={this.SignupWithGoogle} >
                                <i className="fa fa-google" aria-hidden="true"></i> Sign up with Google
                              </button>
                        </div>
					</div>
				</div>
			</div>
		</div>
    </div>
    </> )
    }
}
}
export default Signup;
