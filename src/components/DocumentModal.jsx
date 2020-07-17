import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import Pdfviewer from "./Pdfviewer";

class DocumentModal extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pdf_modal:false,
      pdf_data:'https://arxiv.org/pdf/quant-ph/0410100.pdf',
      pdf_list:[]
    }
    this.handleregister=this.handleregister.bind(this);

}
  
componentDidMount(){
    
    window.scrollTo(0, 0);

    if(this.props.data.hasOwnProperty('brochure')){
      var key = Object.keys(this.props.data.brochure);
      var list = Object.values(this.props.data.brochure);
      var temp=[];
      for(var i =0; i<key.length ; i++){
        temp.push({
          id:key[i],
          name:list[i].name,
          url:list[i].url
        })
      }

      this.setState({
        pdf_list:temp
      })
    }

  }

  open_close_pdf = (name,flag) =>{
    if(flag==true){
      this.props.open_close('document',false);

    }
    else{
      this.props.socket.emit('pdf',{ roomid:this.props.room,data:"false"});

    }
    this.setState({
      [name]:flag
    })
  }
 

  handleChange = (event) => {
    this.setState({
        pdf_data:event.target.value
    })
  };
 
  handleregister(event){
    event.preventDefault();
    this.open_close_pdf('pdf_modal',true);
    this.props.socket.emit('pdf',{ roomid:this.props.room,data:this.state.pdf_data});
}

  render() {
      return( 
          <>
          <div style={{display:this.props.document==true?'block':'none'}} className="modal" id="document_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 style={{color: "#222b45"}} className="modal-title">Documents</h5>
              <button  onClick={() => this.props.open_close('document',false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
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
              <p className="share_content">Select the document you would like to share</p>
              <div className="switch_project_list">

                  {this.state.pdf_list.map((value,index)=>{

                        return( <>
                        <div key={index} className="form-check form-check-radio">
                        <label className="switch_project_label form-check-label">
                            <input onChange={this.handleChange} className="form-check-input" type="radio" name="exampleRadios" id={value.id} value={value.url} />
                            <svg style={{transform:'translateY(1px)'}} width={24} height={24} xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" viewBox="0 0 100 100">
                            <path fill="#d80505" d="M40 65h2.5c4.136 0 7.5-3.364 7.5-7.5S46.636 50 42.5 50H35v20h5v-5zm0-10h2.5c1.379 0 2.5 1.122 2.5 2.5S43.879 60 42.5 60H40v-5zM75 65h7.5v-5H75v-5h10v-5H70v20h5zM67.5 62.5v-5c0-4.136-3.364-7.5-7.5-7.5h-7.5v20H60c4.136 0 7.5-3.364 7.5-7.5zm-10-7.5H60c1.379 0 2.5 1.122 2.5 2.5v5c0 1.378-1.121 2.5-2.5 2.5h-2.5V55z"/>
                            <path fill="#d80505" d="M77.5 30l-25-25h-35c-5.523 0-10 4.477-10 10v70c0 5.523 4.477 10 10 10h50c5.523 0 10-4.477 10-10v-5H95V40H77.5V30zM50 13.107L69.393 32.5H50V13.107zM90 45v30H30V45h60z"/>
                            </svg>
                            <label style={{transform:'translateY(-6px)'}} className="switch_project_label">{value.name}</label>
                            <span className="circle">
                                <span className="check"></span>
                            </span>
                        </label>
                    </div>
                    <hr/> 
                        </> )
                  })} 
                            
           </div>
            </div>
           
            <div style={{display: "block"}} className="modal-footer">
                <center className="modal_button_div">
                    <button onClick={() => this.props.open_close('document',false)} type="button" className="btn cancel">Cancel</button>
                    <button style={{marginLeft: "20px"}} type="submit " className="btn proceed">View  document</button>
                </center>
            </div>
            </form>
          </div>
        </div>
        </div>
        <Pdfviewer host={this.props.host} open_close_pdf={this.open_close_pdf} pdf={this.state.pdf_modal} data={this.state.pdf_data}></Pdfviewer>
          </>
        
      )
  }
}
export default DocumentModal;
