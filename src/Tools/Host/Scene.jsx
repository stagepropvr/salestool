import React from 'react';

import AFRAME from 'aframe';
import 'aframe-look-at-component';
import * as THREE from 'three'
import AssestsLoader from "./AssetsLoader";
import Fire from "../../config/Firebase.jsx";

class Scene extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {
        loaded:false,
        VRMode:false,
        imageload:true
     
    };
    this.time = null;
    this.total = 0;
    this.assets = [];
    this.clientAssets = [];
this.imageloaded=this.imageloaded.bind(this);
this.sendrotation=this.sendrotation.bind(this);

   }



  

sendrotation(){
 if(this.props.lock){
   
   
    var cameraEl =document.getElementById('cam1');
   const data = {
    actiontype:"lock",
   lockmode:true,
  rotation:cameraEl.getAttribute("rotation")
  };
  
  this.props.connection.send(data)
 
}
}

imageloaded(){
  this.setState({
    imageload:false
  })
  
}

 
  loadAssets = () => {
    if(!this.assets.includes(this.props.clientimageid))
    {this.setState({
      imageload:true
    })
      this.assets.push(this.props.clientimageid)

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

    }



    
    }

  
  render()
    {
   
   
    return (
      <div style={{"position":"absolute"}}>
        <a-scene loading-screen="dotsColor: transparent; backgroundColor: transparent" >
            {/* Loads Assets a*/}
            <AssestsLoader sceneloader={this.props.loader} data = {this.props.data}/>
            
            <a-sky id="sky"  onMouseUp={this.sendrotation} cursor="rayOrigin: mouse; fuse: false;" src= {'#'+this.props.image} /> 
            
           
            {this.props.data[this.props.image].links!==undefined? this.links = Object.values(this.props.data[this.props.image].links).map((item,key) => 
    {
      var splitrot=item.position.split(" ");
      var x= parseFloat(splitrot[0]*120);
      // var y= parseFloat(splitrot[1]*80);
      var z= parseFloat(splitrot[2]*120);
      return(
        <a-image
          id={item.name} key={item.name} src="#hotspot"
          position={x+" -8 "+z} scale="10 10"
          class="hotspot"
          look-at='#cam1' 
          onClick={(e) => this.props.change(item["dest-image"])}
          raycaster-listen
         >
        </a-image>
      ) 
    }):<></>}
           
            {/* Loads Mouse */}
            <a-camera id="cam1" rotation="0 0 0"  cursor="rayOrigin: mouse; fuse: false;" rotation-reader >
           </a-camera> 
            {/* {this.props.lock?
            <a-camera id="cam1" rotation="0 0 0"  cursor="rayOrigin: mouse; fuse: false;" rotation-reader ></a-camera>           
            :<a-camera id="cam1" rotation="0 0 0"  cursor="rayOrigin: mouse; fuse: false;"  ></a-camera>
    } */}
        </a-scene>
       
      </div>
    );
   
    }
}

export default Scene;