import React from "react";
import { BrowserRouter as  Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import Header from "../Layouts/Header";

class Dashboard extends React.Component {
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
      const current_tag = 0;
        return(<Header current_tag={current_tag} ></Header> )
    }
}
}
export default Dashboard;
