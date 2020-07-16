import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state={
        url:'',
    }
 
}
  

componentDidMount(){
    
    window.scrollTo(0, 0);
    this.setState({
        url:'https://propvr.tech/map.html?cid='+this.props.user_id+'&proid='+this.props.pid
    })
  }

 
 

  
 
 






  render() {
      return( 
      <div style={{display:this.props.map==true?'block':'none'}} className="modal" id="share_modal" tabIndex="-1" role="dialog">
      <div style={{width:'100%'}}  className="modal-dialog" role="document">
        <div style={{width:'100%',height:'100%'}} className="modal-content">
        <iframe style={{width:'100%',height:'100%',border:'none'}} src={this.state.url} id="map_display" />
        </div>
      </div>
      </div>)
  }
}
export default Map;
