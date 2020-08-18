import React from "react";
// import { Redirect, Route, Link } from "react-router-dom";
// import Fire from "../../config/Firebase.jsx";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
// import $ from 'jquery';
import PDFViewer from 'mgr-pdf-viewer-react'

class Pdfviewer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      
    }
   this.ExamplePDFViewer = this.ExamplePDFViewer.bind(this);
}
  
componentDidMount(){
    
    window.scrollTo(0, 0);
    // var data = this.props.data;
  
    //document.getElementById('pdf_viewer').style.display='block'; 

  }

 
  ExamplePDFViewer(){
    // const style={
    //   height:'300px'
    // }

    return (
        <PDFViewer
            document={{
                url: this.props.data
                
            }}
            css="pdf_height"
            navigation={{
              css: {
                previousPageBtn: ('pdf_navigation_host'),  
                nextPageBtn: ('pdf_navigation_host')
            }
               
            }}
        />
    )
}

  
 
 






  render() {
      return( 
        <div style={{'display':'block'}} className="modal" id="pdf_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div style={{height:'fit-content'}} className="modal-content">   
              <div id="df_manual_book">
            
              {this.ExamplePDFViewer()}
              {/* <ExamplePDFViewer></ExamplePDFViewer> */}
	        </div>  
          </div>
        </div>
        </div>
      )
  }
}
export default Pdfviewer;
