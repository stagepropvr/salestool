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
        local_pic:''
    }

    this.signout = this.signout.bind(this);
    this.handleregister = this.handleregister.bind(this);
    this.handlechange =  this.handlechange.bind(this);
    this.inputFileRef = React.createRef();
    this.onBtnClick = this.handleBtnClick.bind(this);

  }
  
componentDidMount(){

  Fire.auth().onAuthStateChanged((user) => {
    if (user) {
      var ref = Fire.database().ref("users/"+user.uid);
      ref.once('value',child=>{
        if(child.hasChild('username')){
          this.setState({
            username:child.val().username
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
      })
    }
  });
  var elems = document.querySelectorAll(".active");

[].forEach.call(elems, function(el) {
    el.classList.remove("active");
});
if(this.props.current_tag===1)
    document.getElementById('project').classList.add('active');
else if(this.props.current_tag===2)
    document.getElementById('tool').classList.add('active')

    window.scrollTo(0, 0)
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
  event.preventDefault();
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
    console.log(url);
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        Fire.database().ref("users/"+user.uid).update({
          username:this.state.name,
          profile_pic:url
        }).then(()=>{
          this.setState({
            myaccount:false,
            username:this.state.name
          })
        })
      }
    });
    
   }).catch(console.error);

  }
  


}

handlechange(event){
  const { name, value } = event.target;
  this.setState({ [name]: value });
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
    console.log(file.name);
    console.log(reader.result); 
    this.setState({
      profile_pic:reader.result
    })
  };
}

  render() {

    if(this.state.redirect){
      return <Redirect to="/login"></Redirect>
    }else{
   return( 
   <>
   <nav className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
   <div className="container">
     <div  className="navbar-translate">
       <a href="/" className="navbar-brand">
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
       <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
         <span className="sr-only">Toggle navigation</span>
         <span className="navbar-toggler-icon"></span>
         <span className="navbar-toggler-icon"></span>
         <span className="navbar-toggler-icon"></span>
       </button>
     </div>
     <div className="collapse navbar-collapse" id="navbarText">
       <ul className="navbar-nav mr-auto">
         <li id="project" className="nav-item">
           <Link to={"/projects"} className="nav-link">My projects</Link>
         </li>
         <li id="tool" className="nav-item">
           <Link to={"/tools"} className="nav-link">Tools</Link>
         </li>
       </ul>
     </div>
     <ul id="profile_img_div" className="navbar-nav mr-auto">
       <li className="nav-item" >
          <button className="upgrade">Upgrade now</button> 
       </li>
       <li style={{paddingLeft: "10px"}} className="dropdown nav-item">
         <a href="/" className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
           <img src={this.state.local_pic} alt="username" className="rounded-circle img-fluid" />
              <span className="username">{this.state.username}</span>
           <b className="caret"></b>
         </a>
         <div className="dropdown-menu dropdown-menu-right">
           <a href="#javascript" style={{color:'#8f9bb3'}} className="header_dropdown header_dropdown_email dropdown-item">{this.state.email}</a>
           <a href="#javascript" style={{flexDirection: "column",height: "90px"}} className="header_dropdown dropdown-item">
           <span>Enterprise plan</span>
           <span className="header_dropdown_subtext">794 MB of 10000 MB used</span>
         <div className="progress">
         <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
         </div>
         </a>
           <a href="#javascript" className="header_dropdown dropdown-item">Downloads</a>
           <a href="#javascript" onClick={()=> this.setState({
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
                <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
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
            <input onChange={this.handlechange}  type="text" id="name" name="name" className="input_box form-control" placeholder={this.state.username} required />
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
                  <img src={this.state.profile_pic} class="rounded-circle img-fluid" style={{height: "80px",width: "80px"}} />                  
                </div>
             </div>
          </div>
        </div>
        <div style={{display: "block"}} className="modal-footer">
            <center className="modal_button_div">
                <button onClick={()=> this.setState({myaccount:false})} type="button" className="btn cancel">Cancel</button>
                <button style={{marginLeft: "20px"}} type="submit" className="btn proceed">Save</button>
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
