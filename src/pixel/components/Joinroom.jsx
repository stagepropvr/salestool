import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import shortid from "shortid";

class Joinroom extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:true,
    }
  }  

  componentDidMount()
  {
    localStorage.setItem("rid",this.props.match.params.rid);
    localStorage.setItem("name","Client");
    localStorage.setItem("guestkey",shortid.generate());
  }

  render() {
    if(this.state.redirect){
        return(
            <Redirect to={"/salestool/pixel/guest/room/"+this.props.match.params.rid}/>
        )
    }
    }
}
export default Joinroom;
