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
      pdf_data:''
    }
 
}
  
componentDidMount(){
    
    window.scrollTo(0, 0);

  }

  open_close_pdf = (name,flag,data) =>{
      this.setState({
          pdf_data:data
      })
    if(flag){
      document.getElementById('left_light_mode').style.display='none';
      document.getElementById('right_light_mode').style.display='none';
      document.getElementById('left_dark_mode').style.display='block';
      document.getElementById('right_dark_mode').style.display='block';
      document.getElementById('menu_bar_down').style.display='none';
      document.getElementById('menu_bar_up').style.display='block';
      document.getElementById('menu_bar').classList.remove('menu_option_click');
      document.getElementById('bottom').classList.add('bottom_modal_open');
      var a = document.querySelectorAll('.pad15');
      for(var i =0 ; i<a.length;i++){
          console.log(a[i].childNodes[0]);
          var classname = a[i].parentNode.className;
          if(classname.includes('item_active')){
              a[i].classList.add('pad15_modal_open_active');
              a[i].childNodes[0].classList.add('slider_name_modal_open_active');
          }
          else{
              a[i].classList.add('pad15_modal_open');
              a[i].childNodes[0].classList.add('slider_name_modal_open');
  
          }
          
      }
    }else{
      document.getElementById('left_dark_mode').style.display='none';
      document.getElementById('right_dark_mode').style.display='none';
      document.getElementById('left_light_mode').style.display='block';
      document.getElementById('right_light_mode').style.display='block';
  
      document.getElementById('bottom').classList.remove('bottom_modal_open');
      var a = document.querySelectorAll('pad15_modal_open_active');
      var a = document.querySelectorAll('.pad15');
      for(var i =0 ; i<a.length;i++){
          console.log(a[i].childNodes[1]);
          var classname = a[i].parentNode.className;
          if(classname.includes('item_active')){
              a[i].classList.remove('pad15_modal_open_active');
              a[i].childNodes[0].classList.remove('slider_name_modal_open_active');
          }
          else{
              a[i].classList.remove('pad15_modal_open');
              a[i].childNodes[0].classList.remove('slider_name_modal_open');
  
          }
          
      }
    }
    this.setState({
      [name]:flag
    })
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
            <div className="modal-body">
              <p className="share_content">Select the document you would like to share</p>
              <div className="switch_project_list">
                  {Object.keys(this.props.data.brochure).map((value,index)=>{
                        return( <>
                        <div onClick={()=> this.open_close_pdf('pdf_modal',true,this.props.data.brochure[value]['url'])} className="form-check form-check-radio">
                        <label className="switch_project_label form-check-label">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                            {this.props.data.brochure[value]['name']}
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
                    <button style={{marginLeft: "20px"}} type="button" className="btn proceed">View  document</button>
                </center>
            </div>
          </div>
        </div>
        </div>
        <Pdfviewer pdf={this.state.pdf_modal} data={this.state.data}></Pdfviewer>
          </>
        
      )
  }
}
export default DocumentModal;
