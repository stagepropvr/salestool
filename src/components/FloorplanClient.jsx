import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import Select from 'react-select';

class Flooplanclient extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.data);
}


componentDidMount()
{
    
  }


  render() {
  
      return(          
        <div style={{display:this.props.data.data!=false?'block':'none'}} className="floorplan_div">
            <div className="container">
                <div className="row">
         
            </div>
            <div className="row">
                
                 
                        <div className="map_div">
                        <div className="map">
                        <img  src={this.props.data.data.planurl} style={{width: "100%"}}/>
                        </div>
                        {/* {this.props.data.data.pins.forEach(element => {
                           console.log(element);
                           return(
                           //     <div onClick={this.changesky} id={sub.dest}  style={{top:(sub.y+8.5)+'%',left:(sub.x)+'%'}} className="box"> 
                           // </div>
                           <></>
                           ) 
                        })} */}
                            
                            
                   
                        </div>
                
            </div>
        </div>
    </div>
        
      )
  }
}
export default Flooplanclient;
