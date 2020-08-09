import React from "react";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";

class Projectloader extends React.Component {
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
    this.setState({
        img:list.thumb
      })

    if(list.hasOwnProperty('Info')){
        if(list.Info.baths==='' || list.Info.beds==='' || list.Info.sqft===''){
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

  }

  render() {
      return( 
          <>
    <div style={{display:this.props.dis?'block':'none'}} className="page-header header-filter end_page">
		<div  className="endsession_container">
				<div style={{padding:"0",height:'100%'}}>
                    <div style={{padding:'0',boxShadow: "none",position:'absolute',width:'100%',background:'#fff'}} className="endsession_card">
                    <div className="loader-logo">
                      <img style={{width: '70%', height: '70%', objectFit: 'cover'}} src={require('../../assets/logo.webp')}></img>
                    </div>
                   
                <div style={{margin:"auto",bottom:'0',position:'absolute',padding:"0",flexDirection:'column',display: "flex",height: "70%",alignItems: "center",width:'100%'}}>
                     <h2 className="End-session-heading" style={{fontSize: "26px",textAlign:'center'}}>{this.props.title}</h2>
                               
                         <div className="switch_project_info">Please wait while we load the following project. </div>
                               
                                    <div style={{margin:"20px 0px 0px",padding:"0",width:'300px'}} className="card project_det_background">
                                        <div style={{padding: "0px"}} className="card-body d-flex flex-row">
                                          
                                          <div style={{width: "300px"}}>
                                 <h4 style={{paddingLeft: "25px"}} className="card-title project_heading">{this.props.pid}</h4>
                                            <div style={{display:this.state.info_details===true?'flex':'none'}} className="card-text flex-row project_icon_content">
                                              <div>
                                                <span>
                                                <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
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
                                    <svg className="switch_project_svg"  width="20" height="20" viewBox="0 0 20 20">
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
export default Projectloader;
