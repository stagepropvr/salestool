import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";
import $ from 'jquery';
import FlipBook from "flip-book";
import  THREE from 'three';

class Pdfviewer extends React.Component {
  constructor(props){
    super(props);
    this.state={
      
    }
   // this.handlechange=this.handlechange.bind(this);
 
}
  
componentDidMount(){
    
    window.scrollTo(0, 0);
    var data = this.props.data;
    $('#df_manual_book').FlipBook({
        pdf: data,
        template: {
          html: 'node_modules/flip-book/templates/default-book-view.html',
          links: [
            {
              rel: 'stylesheet',
              href: 'node_modules/flip-book/css/font-awesome.min.css'
            }
          ],
          styles: [
            'node_modules/flip-book/css/short-white-book-view.css'
          ],
          links: [{
            rel: 'stylesheet',
            href: 'node_modules/flip-book/css/font-awesome.min.css'
          }],
          script: 'node_modules/flip-book/js/default-book-view.js',
          sounds: {
            startFlip: 'node_modules/flip-book/sounds/start-flip.mp3',
            endFlip: 'node_modules/flip-book/sounds/end-flip.mp3'
          }
        }
      });
      
    //document.getElementById('pdf_viewer').style.display='block'; 

  }

 
 

  
 
 






  render() {
      return( 
        <div style={{display:this.props.pdf==true?'block':'none'}} className="modal" id="pdf_modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <button  onClick={() => this.props.open_close_pdf('pdf',false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
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
              <div id="df_manual_book">
	        </div>  
          </div>
        </div>
        </div>
      )
  }
}
export default Pdfviewer;
