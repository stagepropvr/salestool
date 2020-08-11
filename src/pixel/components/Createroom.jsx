import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
import shortId from 'shortid';


class Createroom extends React.Component {
  constructor(props){
    super(props);
    this.state={
        redirect:true,
        room:null,
        loader:true,
        roomId:shortId.generate()
    }
  }
  
componentDidMount(){  
  window.scrollTo(0, 0);
  }

room = () => {
  let roomId = this.state.roomId
  localStorage.setItem(roomId,true);
  this.setState({
    room:roomId
  });
}

  render() {
        if(!this.state.room){
        return(
            <>
              <div style={{background: "#fff"}} className="center-container">
                <div style={{padding:"30px",background: "#fff"}} className="row">
                  Room Id
                  <input style={{marginLeft:"10px"}} type="text" value={this.state.roomId} placeholder="Room id" onChange={(event) => {this.setState({roomId:event.target.value})}}/>
                </div>     
                
              <div  className="col-md-5">
                <button onClick={this.room} type="submit" className="btn create_session">Create session</button>    
              </div>
              </div>
            </>
           
        )}
        else{
          return(<Redirect to={"/salestool/pixel/room/"+this.state.room}/>)
        }
    }
}
export default Createroom;
