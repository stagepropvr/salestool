import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../config/Firebase.jsx";
import "../assets/css/material-kit.css?v=2.0.7" ;
import "../assets/demo/demo.css";

class Switchprojectloader extends React.Component {
  constructor(props){
    super(props);
    this.state={
        bath:'',
        bed:'',
        sqft:'',
        title:'',
        img:'',
        info_details:false,
    }
 
}
  
componentDidMount(){
    
    window.scrollTo(0, 0);

    var list  = Object.values(this.props.data);
    console.log(list);
    this.setState({
        img:list.thumb
      })

    if(list.hasOwnProperty('Info')){
        if(list.Info.baths=='' || list.Info.beds=='' || list.Info.sqft==''){
            this.setState({
              info_details:false
            })
        }else{
          this.setState({
            bed:list.Info.beds,
            bath:list.Info.baths,
            sqft:list.Info.sqft,
            info_details:true
          })
        }
    }else{
        this.setState({
            info_details:false
          })
    }
    if(this.props.host){
        this.setState({
            title:'You are switching project !'
        })
    }else{
        this.setState({
            title:'Project is switched by the host'
        })
    }
  
  }


  render() {
      return( 
          <>
    <div style={{display:this.props.dis?'block':'none'}} className="page-header header-filter end_page">
		<div  className="endsession_container">
				<div style={{padding:"0",height:'100%'}}>
                    <div style={{padding:'0',boxShadow: "none",position:'absolute',width:'100%',background:'#fff'}} className="endsession_card">
                    <div style={{padding:'32px'}}>
                    <a className="login_logo">
                            <svg width="72" height="39" viewBox="0 0 72 39" fill="none">
                                <rect width="72" height="39" fill="url(#pattern0)"/>
                                <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use href="#image0" transform="scale(0.00970874 0.0178571)"/>
                                </pattern>
                                <image id="image0" width="103" height="56" href="data:image/png;base64,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"/>
                                </defs>
                                </svg>
                            <span>prop vr</span>                
                        </a>
                    </div>
                   
                <div style={{margin:"auto",bottom:'0',position:'absolute',padding:"0",flexDirection:'column',display: "flex",height: "70%",alignItems: "center",width:'100%'}}>
                     <h2 className="End-session-heading" style={{fontSize: "26px",textAlign:'center'}}>{this.state.title}</h2>
                               
                         <div className="switch_project_info">Please wait while we load the following project. </div>
                               
                                    <div style={{margin:"20px 0px 0px",padding:"0",width:'300px'}} className="card project_det_background">
                                        <div style={{padding: "0px"}} className="card-body d-flex flex-row">
                                          <img src={this.state.img} width="81px" alt="avatar" />
                                          <div style={{width: "300px"}}>
                                 <h4 style={{paddingLeft: "25px"}} className="card-title project_heading">{this.props.pid}</h4>
                                            <div style={{display:this.state.info_details==true?'flex':'none'}} className="card-text flex-row project_icon_content">
                                              <div>
                                                <span>
                                                <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="27) Icon/archive">
                                                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="#222B45"/>
                                                        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
                                                        <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M9.8662 14H14.1342C14.6102 14 15.0002 13.61 15.0002 13.134V12.866C15.0002 12.39 14.6102 12 14.1342 12H9.8662C9.3892 12 9.0002 12.39 9.0002 12.866V13.134C9.0002 13.61 9.3892 14 9.8662 14ZM18 18C18 18.551 17.552 19 17 19H7C6.449 19 6 18.551 6 18V9H18V18ZM6 5H18C18.552 5 19 5.449 19 6C19 6.551 18.552 7 18 7H6C5.449 7 5 6.551 5 6C5 5.449 5.449 5 6 5ZM21 6C21 4.346 19.654 3 18 3H6C4.346 3 3 4.346 3 6C3 6.883 3.391 7.67 4 8.22V18C4 19.654 5.346 21 7 21H17C18.654 21 20 19.654 20 18V8.22C20.609 7.67 21 6.883 21 6Z" fill="white"/>
                                                         </mask>
                                                    <g mask="url(#mask0)">
                                                    </g>
                                                     </g>
                                             </svg>        
                                         </span>
                                         <span id="room" className="createroom_icon_span">
                                         {this.state.bed} Beds
                                             </span>      
                                                 </span>
                                              </div>
                                            <div style={{paddingLeft: "15px"}}>
                                            <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="27) Icon/droplet">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M12.5585 5.42903L8.64851 9.35503C6.47251 11.538 6.44351 15.114 8.58051 17.327C9.60951 18.394 10.9835 18.988 12.4475 19H12.4495C13.9145 19.011 15.2985 18.44 16.3445 17.39C18.5185 15.211 18.5475 11.636 16.4095 9.42103L12.5585 5.42903ZM12.4315 21C10.4245 20.983 8.54651 20.172 7.14151 18.716C4.25251 15.724 4.29151 10.893 7.22851 7.94603L11.8615 3.29503C12.0515 3.10503 12.3095 2.99803 12.5785 3.00003C12.8475 3.00303 13.1035 3.11403 13.2895 3.30603L17.8495 8.03303C20.7375 11.026 20.6985 15.858 17.7615 18.802C16.3325 20.236 14.4405 21.016 12.4335 21H12.4315Z" fill="#222B45"/>
                    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="3" width="15" height="19">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor_2" fillRule="evenodd" clipRule="evenodd" d="M12.5585 5.42903L8.64851 9.35503C6.47251 11.538 6.44351 15.114 8.58051 17.327C9.60951 18.394 10.9835 18.988 12.4475 19H12.4495C13.9145 19.011 15.2985 18.44 16.3445 17.39C18.5185 15.211 18.5475 11.636 16.4095 9.42103L12.5585 5.42903ZM12.4315 21C10.4245 20.983 8.54651 20.172 7.14151 18.716C4.25251 15.724 4.29151 10.893 7.22851 7.94603L11.8615 3.29503C12.0515 3.10503 12.3095 2.99803 12.5785 3.00003C12.8475 3.00303 13.1035 3.11403 13.2895 3.30603L17.8495 8.03303C20.7375 11.026 20.6985 15.858 17.7615 18.802C16.3325 20.236 14.4405 21.016 12.4335 21H12.4315Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0)">
                    </g>
                    </g>
                    </svg>
                    
                </span>
                <span id="bath" className="createroom_icon_span">
                {this.state.bath} Baths
                 </span> 
                                            </div>
                                             
                                             <div style={{paddingLeft: "15px"}}>
                                             <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="27) Icon/home">
                    <path id="&#240;&#159;&#142;&#168; Icon &#208;&#161;olor" fillRule="evenodd" clipRule="evenodd" d="M16.0002 19.9878H18.9902L19.0002 11.6118L11.9982 4.41981L5.0062 11.5708L5.0002 19.9878H8.0002V12.9878C8.0002 12.4348 8.4472 11.9878 9.0002 11.9878H15.0002C15.5522 11.9878 16.0002 12.4348 16.0002 12.9878V19.9878ZM14.0002 19.9878H10.0002V13.9878H14.0002V19.9878ZM20.4242 10.1728L12.7152 2.28881C12.3382 1.90381 11.6622 1.90381 11.2852 2.28881L3.5752 10.1738C3.2102 10.5488 3.0002 11.0728 3.0002 11.6118V19.9878C3.0002 21.0908 3.8472 21.9878 4.8882 21.9878H9.0002H15.0002H19.1112C20.1522 21.9878 21.0002 21.0908 21.0002 19.9878V11.6118C21.0002 11.0728 20.7902 10.5488 20.4242 10.1728Z" fill="#222B45"/>
                    </g>
                    </svg>                    
                </span>
                <span id="sqft" className="createroom_icon_span">
                  {this.state.sqft} sq ft
                 </span> 
                                             </div>
                                              
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                     
                                    

                                <div className="switch_project_loader">
                                <span>
                                    <svg className="switch_project_svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                     <path fill="#36F" fillRule="evenodd" d="M6.659.473L7.977 0l.947 2.637-1.319.473C4.748 4.134 2.802 6.854 2.802 9.943c0 4.007 3.246 7.256 7.248 7.256 3.103 0 5.833-1.971 6.842-4.856l.463-1.322 2.645.925-.463 1.322c-1.4 4-5.183 6.732-9.487 6.732C4.5 20 0 15.497 0 9.943c0-4.28 2.697-8.049 6.659-9.47z"></path>
                                    </svg>
                                </span>
                            <span style={{paddingLeft: "16px",marginTop: "-5px"}}>Project loading</span>    

</div>
                            
                           
                            
                          
                        </div>
                        
                    </div>
                    
                    
				</div>
			
		</div>
	</div>
          </>
        
      )
  }
}
export default Switchprojectloader;
