import React from "react";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
import PDFViewer from 'mgr-pdf-viewer-react'

class Pdfviewer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      
    }
   this. ExamplePDFViewer = this. ExamplePDFViewer.bind(this);
 
}
  
componentDidMount(){
    
    window.scrollTo(0, 0);
    var data = this.props.data;
  
    //document.getElementById('pdf_viewer').style.display='block'; 

  }

 
  ExamplePDFViewer(){
    // const style={
    //   height:'300px'
    // }

    return (
        <PDFViewer
            document={{
                url: this.props.data,
                page:2
            }}
            css="pdf_height"
            navigation={{
              css: {
                previousPageBtn:'pdf_navigation_host',  
                nextPageBtn:'pdf_navigation_host', 
            }
               
            }}
        />
    )
}

  
 
 






  render() {
      return( 
        <div style={{display:this.props.pdf==true?'block':'none'}} className="modal" id="pdf_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div style={{height:'fit-content'}} className="modal-content">   
              <div id="df_manual_book">
              <button  onClick={() => this.props.open_close_pdf('pdf_modal',false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
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
