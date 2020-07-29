import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
import 'jquery';
import ReactTooltip from "react-tooltip";

class Share extends React.Component {
  constructor(props){
    super(props);
    this.state={
        url:'',
        tooltip:false
    }
   this.handlecopy=this.handlecopy.bind(this);
 
}
  
handlecopy(event){
  navigator.clipboard.writeText(this.state.url);
  this.setState({
    tooltip:true
  })
}
componentDidMount(){
    
    window.scrollTo(0, 0);

    this.setState({

        url:window.location.protocol+'//'+window.location.hostname+window.location.port+"/joinroom/"+this.props.user_id+'/'+this.props.pid+'/'+this.props.roomId

    })
  }

 
 

  
 
 






  render() {
      return( 
      <div style={{display:this.props.share==true?'block':'none'}} className="modal" id="share_modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add others to the session</h5>
            <button onClick={() => this.props.open_close('share',false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
              
              
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
            <p className="share_content">Share the link with people you want to invite to the session</p>
             <span className="share_link">{this.state.url}</span>
          </div>
          <div className="modal-footer">
            <span>
              <svg  width="20" height="20" viewBox="0 0 20 20">
                  <defs>
                      <path id="prefix__copy" d="M8 7.167c-.46 0-.833.374-.833.833v5c0 .46.374.833.833.833h5c.46 0 .833-.374.833-.833V8c0-.46-.373-.833-.833-.833H8zM8.277.5c1.226 0 2.223.997 2.223 2.223V5.5H13c1.378 0 2.5 1.122 2.5 2.5v5c0 1.378-1.122 2.5-2.5 2.5H8c-1.378 0-2.5-1.122-2.5-2.5v-2.5H2.723C1.497 10.5.5 9.503.5 8.277V2.723C.5 1.497 1.497.5 2.723.5h5.554zm0 1.667H2.723c-.307 0-.556.249-.556.556v5.554c0 .307.249.556.556.556H5.5V8c0-1.378 1.122-2.5 2.5-2.5h.833V2.723c0-.307-.249-.556-.556-.556z"/>
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(2 2)">
                      <use fill="#36F" href="#prefix__copy"/>
                  </g>
              </svg>
              
            </span>
            <span onClick={this.handlecopy} data-toggle="tooltip" data-placement="right" data-tip="Joining link copied"  className="clipboard">Copy joining link</span>
            <div style={{display:this.state.tooltip?'block':'none'}} className="share_tooltip">Joining link copied</div>
            {/* <ReactTooltip style={{display:this.state.tooltip?'block':'none'}} aria-haspopup='true'  place="right" type="light" effect="solid"/> */}
          </div>
        </div>
      </div>
      </div>)
  }
}
export default Share;
