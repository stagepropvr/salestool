import React from "react";
// import { Redirect } from "react-router-dom";
import "../../../assets/css/material-kit.css?v=2.0.7" ;
import "../../../assets/demo/demo.css";
import 'jquery';

class CloseModal extends React.Component {
  constructor(props){
    super(props);
    this.state={
     
        redirect:false
    }
   // this.handlechange=this.handlechange.bind(this);
}
  closeSocket = () => {
      window.location="/salestool/pixel/createroom";    
  }
  
componentDidMount(){
    window.scrollTo(0, 0);
  }

 
 

  
 
 






  render() {
  
      return( 
        <div style={{display:this.props.close===true?'block':'none'}} className="modal" id="close_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 style={{color: "#222b45"}} className="modal-title">You are about to leave the session</h5>
              <button onClick={() => this.props.open_close('close',false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                
                
                <span aria-hidden="true">
                    <svg  width="24" height="24" viewBox="0 0 24 24">
                    <defs>
                        <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z"/>
                    </defs>
                    <g fill="none" fillRule="evenodd" transform="translate(6 6)">
                        <use fill="#222B45" href="#prefix__close"/>
                    </g>
                </svg></span>
              </button>
            </div>
            <div className="modal-body">
              <p className="share_content">Are you sure your want to leave the session?</p>
            </div>
            <div style={{display: "block"}} className="modal-footer">
                <center style={{display: "flex",justifyContent: "center"}}>
                    <button onClick={() => this.props.open_close('close',false)} type="button" className="btn cancel">Cancel</button>
                    <button onClick={this.closeSocket}style={{marginLeft: "20px"}} type="button" className="btn proceed">Proceed</button>
                </center>
               
            </div>
          </div>
        </div>
        </div>)}
  }
export default CloseModal;
