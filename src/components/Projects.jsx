import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import Header from "../Layouts/Header";

class Projects extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:true,
        project_list:[]
    }
  }
  
componentDidMount(){
    
    window.scrollTo(0, 0);
   Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var temp_list=[];
        var ref = Fire.database().ref("users/"+user.uid+"/Projects");
        ref.once('value',child=>{
          child.forEach(snap=>{
            if(snap.val().Publish){
              temp_list.push({
                img:snap.val().thumb,
                id:snap.key
            })
            }
          })
          this.setState({
            project_list:temp_list
          })
        })
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
  






  render() {
    if(this.state.redirect){
      const current_tag = 1;
      return(
        <>
    <Header current_tag={current_tag}/>
    <div className="space-70"></div>

        <div className="cd-section">
            <div className="banner">
               <span>My projects</span>
            </div>
            <div className="project_list">
                   <div className="container">
                       <div style={{padding: "20px"}} className="row">
                       {this.state.project_list.map((node) =>{
                         return(
                          <Link style={{paddingLeft:'16px'}} key={node.id} to={"/createroom/" + node.id}>
                          <div  className="project_card">
                          <img src={node.img} />
                          <div className="project_name">
                           <span>{node.id}</span>
                          </div>
                        </div>
                        </Link>
                         )
                         
                       })}   
                       </div>
                   </div>
            </div>
        </div>
        </>)
    }
    else{
       return(<Redirect to="/login" />)
    }
}
}
export default Projects;
