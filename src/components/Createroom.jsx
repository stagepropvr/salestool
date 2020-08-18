import React from "react";
import { Redirect, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import Header from "../Layouts/Header";

class Createroom extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:true,
        info:false,
        info_about:false,
        info_details:false,
        about:'',
        bath:'',
        bed:'',
        sqft:'',
        name:'',
        img:'',
        username:'',
        modal:false,
        room:"",
        loader:true
        
    }

    this.handlechange=this.handlechange.bind(this);
    this.handlesubmit=this.handlesubmit.bind(this);
    this.room=this.room.bind(this);

  }
  
componentDidMount(){
    
    window.scrollTo(0, 0);
   Fire.auth().onAuthStateChanged((user) => {
      if (user) {

        var name = Fire.database().ref("users/"+user.uid);
        name.once("value",checkname=>{
          if(checkname.hasChild('username')){
            this.setState({
              username:checkname.val().username
            })
          }else{
            this.setState({
              modal:true
            })
          }
        })
        var ref = Fire.database().ref("users/"+user.uid+"/Projects/"+this.props.match.params.pid);
        ref.once('value',child=>{
          this.setState({
            img:child.val().thumb,
            loader:false
          })
            if(child.hasChild('Info')){
                var ref1 = Fire.database().ref("users/"+user.uid+"/Projects/"+this.props.match.params.pid+'/Info');
                ref1.once('value',snap=>{
                    if(snap.val().des!=='undefined'){
                        this.setState({ 
                          about:snap.val().des,
                          info_about:true
                        }) 
                    }else{
                        this.setState({
                            info_about:false
                        })
                    }

                    if(snap.val().baths==='' || snap.val().beds==='' || snap.val().sqft===''){
                        this.setState({
                          info_details:false
                        })
                    }else{
                      this.setState({
                        bed:snap.val().beds,
                        bath:snap.val().baths,
                        sqft:snap.val().sqft,
                        info_details:true
                      })
                    }
                })

            }else{
                this.setState({
                    info:false,
                    info_about:false
                })
            }
        })
        this.setState({
            redirect:true
        })
      } 
      else {
         this.setState({
             redirect:false
         })
      }
   });
  }
  
  handlesubmit(event){
   this.setState({
     modal:false
   })
  }
  handlechange(event){
    this.setState({
		exception: ""
    })
   
		const { name, value } = event.target;
        this.setState({ [name]: value });
}

room(){
 Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.match.params.pid+"/rooms/")
 .push({
  analytics:{
    host:{
      name:Fire.auth().currentUser.email,
      start:new Date().getTime(),
      end:"",
      status:"Live"
    }
  }
}).then((res)=>{
  localStorage.setItem(res.key,true);
  this.setState({
  room:res.key
});
});

}



  render() {
    if(this.state.redirect){
        const current_tag = 1;
        if(this.state.room===""){
        return(
            <>
             <Header current_tag={current_tag}/>
             <div className="space-70"></div>
  <div className="cd-section">
    <div style={{background: "#fff"}} className="container">
      <div style={{padding:"30px",background: "#fff"}} className="row">
        <h2 className="create_heading">Hi {this.state.username}, You are now creating a session</h2>
      </div>
     
       <div style={{margin:"0",padding:"0"}} className="row">
          
                        <div className="card project_det_background">
                        
          <div style={{padding: "0px"}} className="card-body d-flex flex-row">
          {this.state.loader?
               <><div>
               <div>
                <div style={{width:'280px',height:'108px'}} className="project_name">
                 <span className="skeleton-box"></span>
                </div>
              </div></div></>:<>
           <img src={this.state.img} width="81px" height="93px" alt="avatar" />
         
            
            <div style={{width: "300px"}}>
        <h4 style={{paddingLeft: "25px",paddingTop:'3px'}} className="card-title project_heading">{this.props.match.params.pid}</h4>
              <div style={{display:this.state.info_details===true?'flex':'none'}} className="card-text flex-row project_icon_content">
                <div>
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
        
      
    
     
    <div style={{display:this.state.info_about===true?'flex':'none'}}  className="project_heading heading_align">
      About the project
    </div>

    <div style={{display:this.state.info_about===true?'flex':'none'}} className="project_about col-md-6">
            {this.state.about}
    </div>

    <div  className="col-md-5" style={{paddingLeft: "10px",paddingTop: "20px"}}>
            <Link to={"/salestool/projects"}><button type="submit" className="btn create_session_back">Back</button></Link>
            <button onClick={this.room} style={{marginLeft:'14px'}} type="submit" className="btn create_session">Create session</button>    
    </div>
    </div>
  </div>


  <div className="modal" style={{display: this.state.modal===true? 'block':'none'}} id="username_modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">          
                    <div className="form-group">
                                    <label className="input_Label">Enter Username
                                    </label>
                                    <input onChange={this.handlechange} name="username" id="username" type="text" className="input_box form-control" placeholder="Enter your Username" />
                                </div>
        </div>
        <div style={{display: 'block',marginTop: '-20px'}} className="modal-footer">
                
                <button  onClick={this.handlesubmit} style={{marginLeft: "20px"}} type="button" className="btn proceed">SUBMIT</button>
                
        </div>
      </div>
    </div>
    </div>
    
            </>
           
        )}
        else{
return(<Redirect to={"/salestool/room/"+this.props.match.params.pid+"/"+this.state.room}/>)
        }
    }
    else{
        return <Redirect to="/salestool/login"></Redirect>
    }
  }
}
export default Createroom;
