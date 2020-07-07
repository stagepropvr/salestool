import React from "react";
import { BrowserRouter as  Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import Header from "../Layouts/Header";

class Projects extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:false
    }
  }
  
async comonentDidMount(){
    
    window.scrollTo(0, 0)
  }
  






  render() {
    if(this.state.redirect){

    }
    else{
        return(
            <>
        <Header/>
        <div class="space-70"></div>

            <div class="cd-section">
                <div class="banner">
                   <span>My projects</span>
                </div>
                <div class="project_list">
                       <div class="container">
                           <div style={{padding: "20px"}} class="row">
                               <div class="project_card ">
                                   <img src="../assets/img/examples/studio-1.jpg" />
                                   <div class="project_name">
                                    <span>Brigade metropolis </span>
                                   </div>
                                 </div> 
                                 <div class="project_card ">
                                   <img src="../assets/img/examples/studio-1.jpg" />
                                   <div class="project_name">
                                    <span>Brigade metropolis </span>
                                   </div>
                                 </div> 
                                 <div class="project_card ">
                                   <img src="../assets/img/examples/studio-1.jpg" />
                                   <div class="project_name">
                                    <span>Brigade metropolis </span>
                                   </div>
                                 </div> 
                                 <div class="project_card ">
                                   <img src="../assets/img/examples/studio-1.jpg" />
                                   <div class="project_name">
                                    <span>Brigade metropolis </span>
                                   </div>
                                 </div> 
                                 <div class="project_card ">
                                   <img src="../assets/img/examples/studio-1.jpg" />
                                   <div class="project_name">
                                    <span>Brigade metropolis </span>
                                   </div>
                                 </div>    
                           </div>
                       </div>
                </div>
            </div>
            </>)
    }
}
}
export default Projects;
