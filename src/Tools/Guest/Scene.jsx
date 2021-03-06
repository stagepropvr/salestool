import React from 'react';
// import * as THREE from 'three'

import 'aframe';
import 'aframe-look-at-component';

// import './AframeComp';

// import Fire from "../../config/Firebase.jsx";

class Scene extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {
        loaded:false,
        VRMode:false,
        imageload:true,
        anirotation:"0 0 0",
        thumb:true
    };
    this.first = true;
    this.total = 0;
    this.assets = [];
    this.clientAssets = [];
    // this.change = this.change.bind(this);
// this.imageloaded=this.imageloaded.bind(this);
   }

imageloaded = () => {
  this.setState({
    imageload:false,
    thumb:false
  })
}


Thumbloaded = () => {
  this.props.loader();
  this.setState({
    imageload:false,
  })
  this.first = false
}

  loadAssets = () => {
    if(!this.assets.includes(this.props.clientimageid))
    {this.setState({
      imageload:true,
      thumb:true
    })
      this.assets.push(this.props.clientimageid)
      this.assets.push(this.props.clientimageid+'Thumb')

      this.clientAssets.push(
        <img 
          crossOrigin="anonymous" 
          id={this.props.clientimageid}  
          src={this.props.clientimage} 
          alt={this.props.clientimageid} 
          key={this.props.clientimageid}
          onLoad={this.imageloaded}
        />
        )

        this.clientAssets.push(
        <img 
          crossOrigin="anonymous" 
          id={this.props.clientimageid+'Thumb'}  
          src={this.props.clientimageThumb} 
          alt={this.props.clientimageid} 
          key={this.props.clientimageid+'Thumb'}
          onLoad={this.Thumbloaded}
        />
        )

    }
  }
  
  render()
    {
      
      this.loadAssets()      
      return(
      <div style={{"position":"absolute"}}>
      <a-scene loading-screen="dotsColor: transparent; backgroundColor: transparent" >
      
      {/* Loads Assets a*/}

      <a-assets>
        {this.clientAssets}
      </a-assets>

      {this.state.thumb?
        <a-sky src= {'#'+this.props.clientimageid+'Thumb'} /> :
        <a-sky src= {'#'+this.props.clientimageid} />
      } 

{this.state.imageload?
      <div className="imageswitch">
        <div className="switch_project_loader2">
            <span>
                <svg className="switch_project_svg"  width="20" height="20" viewBox="0 0 20 20">
                  <path fill="#36F" fillRule="evenodd" d="M6.659.473L7.977 0l.947 2.637-1.319.473C4.748 4.134 2.802 6.854 2.802 9.943c0 4.007 3.246 7.256 7.248 7.256 3.103 0 5.833-1.971 6.842-4.856l.463-1.322 2.645.925-.463 1.322c-1.4 4-5.183 6.732-9.487 6.732C4.5 20 0 15.497 0 9.943c0-4.28 2.697-8.049 6.659-9.47z"></path>
                </svg>
            </span>
            
          <span style={{paddingLeft: "16px",marginTop: "-5px"}}>
            {this.first? <>Loading image</>: <>Switching Image</>}
          </span>    
        </div>
      </div>:<></>}
    
      {/* Loads Mouse */}
      <a-camera id="cam1" rotation="0 0 0" look-controls-enabled rotation-reader cursor="rayOrigin: mouse; fuse: false;">
 

      </a-camera>
     
  </a-scene></div>
        );  
    }
}

export default Scene;