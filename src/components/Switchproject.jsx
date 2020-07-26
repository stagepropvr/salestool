import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";

class Switchproject extends React.Component {
  constructor(props){
    super(props);
    this.state={
        project_list:[],
        project_value:this.props.pid
    }
    this.handleregister=this.handleregister.bind(this);

}
  
componentDidMount(){
    
    window.scrollTo(0, 0);
    var temp=[];

    
    var ref = Fire.database().ref("users/"+this.props.user_id+"/Projects");
        ref.once('value',child=>{
        child.forEach(snap=>{
            temp.push({
                id:snap.key
            })
        })
    })

    this.setState({
        project_list:temp
    })
  }

  handleregister(event){
      this.props.switch()
      event.preventDefault();
      if(this.props.pid!==this.state.project_value){
        this.props.changeProject(this.props.user_id,this.state.project_value);
      }
  }
  handleChange = (event) => {
    this.setState({
        project_value:event.target.id
    })
  };

  render() {
      return( 
          <>
    <div className="modal" style={{display:this.props.project==true?'block':'none'}} id="project_modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 style={{color: "#222b45"}} className="modal-title">Switch project</h5>
          <button  onClick={() => this.props.open_close('project',false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z"/>
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(6 6)">
                    <use fill="#222B45" href="#prefix__close"/>
                </g>
            </svg></span>
          </button>
        </div>
        <form onSubmit={this.handleregister}>
        <div className="modal-body">
          <p className="share_content">Select the project you want to switch the session.</p>
          <div className="switch_project_list">
          { this.state.project_list.map((value,index)=>{
               return( <>
                 <div key={index} className="form-check form-check-radio">
              <label className="switch_project_label form-check-label">
                  <input onChange={this.handleChange} className="form-check-input" type="radio" name="projects" id={value.id} value="option1" checked={this.state.project_value===value.id?true:false} />
                        {value.id}
                  <span className="circle">
                      <span className="check"></span>
                  </span>
              </label>
          </div>
           <hr />  
               </>)
             
          })}
          </div>
        </div>
        <div style={{display: "block"}} className="modal-footer">
            <center className="modal_button_div">
                <button onClick={() => this.props.open_close('project',false)} type="button" className="btn cancel">Cancel</button>
                <button style={{marginLeft: "20px"}} type="submit" className="btn proceed">Switch project</button>
            </center>
           
        </div>
        </form>
      </div>
    </div>
    </div>
          </>
        
      )
  }
}
export default Switchproject;
