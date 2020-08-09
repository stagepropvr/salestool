import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:false,
        email:'',
        myaccount:false,
        name:'',
        username:'',
        profile_pic:'',
        file:'',
        local_pic:'',
        button_dis:true,
        loader:true
    }

    this.signout = this.signout.bind(this);
    this.handleregister = this.handleregister.bind(this);
    this.handlechange =  this.handlechange.bind(this);
    this.inputFileRef = React.createRef();
    this.onBtnClick = this.handleBtnClick.bind(this);

  }
  
componentDidMount(){
  this.fireBaseListener1 = Fire.auth().onAuthStateChanged((user) => {
    if (user) {
      var ref = Fire.database().ref("users/"+user.uid);
      ref.once('value',child=>{
        if(child.hasChild('username') && child.hasChild('email'))
        {
          if(child.hasChild('username')){
            this.setState({
              username:child.val().username,
              name:child.val().username,
              loader:false
            })
          }else{
            this.setState({
              username:'John Doe'
            })
          }
          if(child.hasChild('profile_pic')){
            this.setState({
              profile_pic:child.val().profile_pic,
              local_pic:child.val().profile_pic
            })
          }
          else{
            this.setState({
              profile_pic:'https://s3.amazonaws.com/creativetim_bucket/new_logo.png',
              local_pic:'https://s3.amazonaws.com/creativetim_bucket/new_logo.png'
            })
          }
          this.setState({
            email:child.val().email
          })
        }
        else{
          console.log("User Not Found")    
        }
      })
    }else{
      this.setState({
        redirect:true
      })
    }
  });
  var elems = document.querySelectorAll(".active");

[].forEach.call(elems, function(el) {
    el.classList.remove("active");
});
// if(this.props.current_tag===0)
//     document.getElementById('dashboard').classList.add('active');
// else if(this.props.current_tag===1)
//     document.getElementById('project').classList.add('active');
// else if(this.props.current_tag===2)
//     document.getElementById('tool').classList.add('active')

    window.scrollTo(0, 0)
}
  
componentWillUnmount(){
  this.fireBaseListener1 && this.fireBaseListener1();
  this.fireBaseListener2 && this.fireBaseListener2();

}
signout(event){
  Fire.auth().signOut().then(e=> {
    this.setState({
       redirect:true
    })
  }).catch(function (error) {
    alert(error.message);
  });
}

handleregister(event){
  this.setState({
    button_dis:false
  })
  event.preventDefault();
  if(this.state.file!==""){
    const ref = Fire.storage().ref();
    const file = this.state.file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const name = file.name;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
  
        this.fireBaseListener2 = Fire.auth().onAuthStateChanged((user) => {
        if (user) {
          Fire.database().ref("users/"+user.uid).update({
           // username:this.state.name,
            profile_pic:url
          }).then(()=>{
            this.setState({
              myaccount:false,
            //  username:this.state.name,
              button_dis:true,
              local_pic:url
            })
          })
        }
      });
      
     }).catch(console.error);
  
  
    }
  }else if(this.state.username!==this.state.name){
    this.fireBaseListener2 = Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        Fire.database().ref("users/"+user.uid).update({
          username:this.state.name,
        }).then(()=>{
          this.setState({
            myaccount:false,
            username:this.state.name,
            button_dis:true
          })
        })
      }
    })
  }else{
    this.setState({
      myaccount:false,
      button_dis:true
    })
  }
  
  



}

handlechange(event){
  const { name, value } = event.target;
  this.setState({ [name]: value });
}



handlechange(event){
  const { name, value } = event.target;
  this.setState({ [name]: value });

}

fileupload = (event)=>{
  let file = event.target.files[0];
  this.setState({
    file:file
  })
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.setState({
      profile_pic:reader.result
    })
  };
}

handleBtnClick() {
  /*Collecting node-element and performing click*/
  this.inputFileRef.current.click();
}



fileupload = (event)=>{
  let file = event.target.files[0];
  this.setState({
    file:file
  })
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {


    this.setState({
      profile_pic:reader.result
    })
  };
}

  render() {

    if(this.state.redirect){
      return <Redirect to="/salestool/login"></Redirect>
    }else{
   return( 
   <>
   <nav className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
   <div style={{ "padding-left": "20px",
  "padding-right": "20px"}} className="container">
     <div  className="navbar-translate">
       <a href="/" className="navbar-brand">
         <img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={require('../assets/logo.webp')}></img>                  
       </a>
       <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
         <span className="sr-only">Toggle navigation</span>
         <span className="navbar-toggler-icon"></span>
         <span className="navbar-toggler-icon"></span>
         <span className="navbar-toggler-icon"></span>
       </button>
     </div>
     <div className="collapse navbar-collapse" id="navbarText">
       {/* <ul className="navbar-nav mr-auto">
         <li id="dashboard" className="nav-item active">
           <Link to={"/salestool/dashboard"} className="nav-link">Dashboard</Link>
         </li>
         <li id="project" className="nav-item">
           <Link to={"/salestool/projects"} className="nav-link">My projects</Link>
         </li>
         <li id="tool" className="nav-item">
           <Link to={"/salestool/tools"} className="nav-link">Tools</Link>
         </li>
       </ul> */}
     </div>
     <ul id="profile_img_div" className="navbar-nav mr-auto">
       {/* <li className="nav-item" >
          <button className="upgrade">Upgrade now</button> 
       </li> */}
       <li style={{paddingLeft: "10px"}} className="dropdown nav-item">
         {this.state.loader?<a href="/" className=" nav-link" data-toggle="dropdown" aria-expanded="false">
           
              <span className="username skeleton-box" ></span>
     
         </a>:
           <a href="/" className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
           <img src={this.state.local_pic} alt="username" className="rounded-circle img-fluid" />
              <span className="username">{this.state.username}</span>
           <b className="caret"></b>
         </a>}
         <div className="dropdown-menu dropdown-menu-right">
           <a  style={{color:'#8f9bb3'}} className="header_dropdown header_dropdown_email dropdown-item">{this.state.email}</a>
           {/* <a href="#javascript" style={{flexDirection: "column",height: "90px"}} className="header_dropdown dropdown-item">
           <span>Enterprise plan</span>
           <span className="header_dropdown_subtext">794 MB of 10000 MB used</span>
         <div className="progress">
         <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
         </div>
         </a> */}
           <a  className="header_dropdown dropdown-item">Downloads</a>
           <a  onClick={()=> this.setState({
             myaccount:true
           })} className="header_dropdown dropdown-item">My Account</a>
           <a target="_blank" href="https://www.touchwizardtechnologies.com/#comp-jqhpwkc6" className="header_dropdown dropdown-item">Contact us</a>
           <a href="#" style={{border:'none'}} onClick={this.signout} className="header_dropdown dropdown-item">Sign out</a>
         </div>
       </li>
   </ul>
   </div>
 </nav>
 <div className="modal" style={{display:this.state.myaccount==true?'block':'none'}} id="myaccount_modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 style={{color: "#222b45"}} className="modal-title">My Account</h5>
          <button onClick={()=> this.setState({
            myaccount:false
          })} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">

                <svg  width="24" height="24" viewBox="0 0 24 24">

                <defs>
                    <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z"/>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(6 6)">
                    <use fill="#222B45" href="#prefix__close"/>
                </g>
            </svg></span>
          </button>
        </div>
        <form onSubmit={this.handleregister}>
        <div className="modal-body">
          <div>
          <div className="form-group">
            <label className="input_Label">
                                            Name
            </label>
            <input onChange={this.handlechange}  type="text" id="name" name="name" className="input_box form-control" placeholder={this.state.username} />
                <small id="name_error" className="form-text text-muted">
                 <span className="input_error input_error_hide">
                  <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                            Name is <sup>*</sup> required
                </span>
                                        
                </small>
             </div>
             <div className="form-group">
                <label className="input_Label">
                                    Profile Pic
                </label>
                <input ref={this.inputFileRef} style={{display: 'none'}} onChange={this.fileupload}  type="file" accept="image/*" />
                <div>
                <span style={{cursor:'pointer'}} onClick={this.onBtnClick} className="profile_edit">
                  <i className="fa fa-pencil profile_icon"></i>
                </span>
                  <img src={this.state.profile_pic} className="rounded-circle img-fluid" style={{height: "80px",width: "80px"}} />                  
                </div>
             </div>
          </div>
        </div>
        <div style={{display: "block"}} className="modal-footer">
            <center className="modal_button_div">
                <button onClick={()=> this.setState({myaccount:false})} type="button" className="btn cancel">Cancel</button>
                <button style={{marginLeft: "20px",display:this.state.button_dis?'block':'none'}} type="submit" className="btn proceed">Save</button>
                <button style={{cursor: "progress",display:this.state.button_dis?'none':'block', marginLeft: "20px"}} id="loader" type="button" className="proceed btn input_button" disabled>
                                    <i id="loginloader" className="fa fa-circle-o-notch fa-spin" style={{ fontSize: "1rem", color: "white", paddingRight: 2, paddingLeft: 2 }}></i>
                </button>
            </center> 
        </div>
        </form>
      </div>
    </div>
    </div>
 </>)
    }
}
}
export default Header;