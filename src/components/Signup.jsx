import React from "react";
import { BrowserRouter as  Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
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
        exception:''
    }
    this.handlechange=this.handlechange.bind(this);
    this.handleregister=this.handleregister.bind(this);
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

  
handleregister(event){
    event.preventDefault();

    if(this.state.name!='' && this.state.cname!='' && this.state.email!='' && this.state.number!='' && this.state.password!=''){

        var alpha = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        if(this.state.name.match(alpha)){

            var email=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(this.state.email.match(email)){
                var phoneno = /^\d{10}$/;
                if(this.state.number.match(phoneno)){
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
                        document.getElementById('other_exception ').style.display='block';
                        document.getElementById('other_exception ').childNodes[0].classList.remove('input_error_hide');
                        this.setState({
                            exception:err
                        })
                    })
                }
                else{
                    document.getElementById('number').classList.add('input_error_border');
                    document.getElementById('other_exception ').style.display='block';
                    this.setState({
                        exception:'Contains only Numbers[0-9] and length is upto 10'
                    })
                }
            }
            else{
                document.getElementById('email').classList.add('input_error_border');
                document.getElementById('other_exception ').style.display='block';
                this.setState({
                    exception:'Email Address invalid format'
                })
            }
        }
        else{
            document.getElementById('name').classList.add('input_error_border');
            document.getElementById('other_exception ').style.display='block';
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




  render() {
    if(this.state.redirect){
        return (<Redirect to="/dashboard" />)
    }
    else{
        return( 
        <div style={{width:'100%'}} className="header-filter">
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
                        <h2 className="Welcome-to-Prop-VR">Welcome to Prop VR!</h2>
                            <p className="Have-an-account-alre">Have an account already?   <a style={{paddingLeft: "10px"}} href="/login" className="login_span">Login</a>
                            </p>
						<form onSubmit={this.handleregister} className="form" style={{paddingTop: "25px"}}>
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
                                            Company name
                                        </label>
                                        <input onChange={this.handlechange} type="text" id="cname" name="cname" className="input_box form-control" placeholder="Enter the company name" />
                                        <small id="cname_error" className="form-text text-muted">
                                        <span className="input_error input_error_hide">
                                            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Company name is <sup>*</sup>required
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
                                    <button type="submit" className="btn input_button">Sign up</button>
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
	</div> )
    }
}
}
export default Signup;
