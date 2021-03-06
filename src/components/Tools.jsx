import React from "react";
import { Redirect, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import Header from "../Layouts/Header";

class Tools extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:true,
    }
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
  






  render() {
    if(this.state.redirect){
      const current_tag = 2;
      return(
        <>
    <Header current_tag={current_tag}/>
    <div className="space-70"></div>

        <div className="cd-section">
       <div style={{"background":"#edf1f7"}}>     <div className="banner container">
               <span>Tools</span>
            </div></div>
            <div className="project_list">
                   <div className="container" style={{"padding":"0"}}>
                       <div style={{padding: "16px 4px"}} className="row">
                       <div className="product" id="creator">
                           <img alt="Creation Tool" src="https://cdn.glitch.com/d919fddc-bed5-4101-a53e-3764014fe3bb%2F5.png?v=1585560094420" /></div>
                      <Link to={"/salestool/projects"} className="product" id="sales">
                          <img alt="Sales Tool " src="https://cdn.glitch.com/d919fddc-bed5-4101-a53e-3764014fe3bb%2F6.png?v=1585560098012" /></Link>
                       <div className="product" id="strtview">
                           <img alt="Street View Editor" src="https://cdn.glitch.com/d919fddc-bed5-4101-a53e-3764014fe3bb%2F4.png?v=1585560090774" /></div>  
                       </div>
                   </div>
            </div>
        </div>
        </>)
    }
    else{
       return(<Redirect to="/salestool/login" />)
    }
}
}
export default Tools;
