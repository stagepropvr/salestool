import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../../config/Firebase.jsx";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
import Select from 'react-select';

class Flooplanclient extends React.Component {
  constructor(props){
    super(props);
}


componentDidMount()
{
    
  }


  render() {
var position=[];
  if(this.props.data.pin!==null){
position=this.props.data.pin.split("-");
  }
      return(          
        <div style={{display:this.props.data.data!=false?'block':'none'}} className="floorplan_div">
            <div className="container">
                <div style={{"height":"46px"}} className="row">
         
            </div>
            <div className="row">
                
                 
                        <div className="map_div">
                        <div className="map">
                        <img  src={this.props.data.data.planurl} style={{width: "100%"}}/>
                        </div>
                       
                             {this.props.data.pin!==null?   <div style={{top:position[0],left:position[1]}} className="box"> 
                            </div>:<></>}
                           
                          
                            
                            
                   
                        </div>
                
            </div>
        </div>
    </div>
        
      )
  }
}
export default Flooplanclient;
