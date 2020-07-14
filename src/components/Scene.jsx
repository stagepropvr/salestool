import React from 'react';

import 'aframe';
import 'aframe-look-at-component';
// import './AframeComp';

import AssestsLoader from "./AssetsLoader";


class Scene extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {
        loaded:false,
        VRMode:false
    };
    this.assets = [];
    this.clientAssets = [];
      //  console.log(this.props)
    // this.change = this.change.bind(this);

   }

   componentDidMount(){
    const AFRAME = window.AFRAME

    AFRAME.registerComponent('rotation-reader', {
      tick: function () {
        
        // var x = this.el.object3D.rotation.x;
        // var y = this.el.object3D.rotation.y
        // console.log(this.el.getAttribute('rotation').x);
        // console.log(this.el.getAttribute('rotation').y);
       }
    });

    AFRAME.registerComponent('rotation-setter', {
      tick: function () {
       this.el.setAttribute('rotation', {x: 0, y: 90, z: 30});
       }
    });
   }

   loadAssets = () => {
    //  console.log("Not Host : Load Assets Called", this.props.clientimageid,this.props.clientimage)
    if(!this.assets.includes(this.props.clientimageid))
    {
      this.assets.push(this.props.clientimageid)

      this.clientAssets.push(
        <img 
          crossOrigin="anonymous" 
          id={this.props.clientimageid}  
          src={this.props.clientimage} 
          alt={this.props.clientimageid} 
          key={this.props.clientimageid}
        />
        )

    }

    // console.log(this.clientAssets)

    
    }

  
  render()
    {
      // console.log('Host: ',this.props.host);
    if(this.props.host){
      
    return (
      <div style={{"position":"absolute"}}>
        <a-scene loading-screen="dotsColor: transparent; backgroundColor: transparent" >
            {/* Loads Assets a*/}
            <AssestsLoader sceneloader={this.props.loader} data = {this.props.data}/>
            
            <a-sky src= {'#'+this.props.image} /> 
            
           
            {this.links = Object.values(this.props.data[this.props.image].links).map((item,key) => 
    {
      var splitrot=item.position.split(" ");
      var x= parseFloat(splitrot[0]*120);
      // var y= parseFloat(splitrot[1]*80);
      var z= parseFloat(splitrot[2]*120);
      // console.log(item["dest-image"]);
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
    })}
            
            {/* Loads Mouse */}
            <a-camera id="cam1" rotation="0 0 0" rotation-reader cursor="rayOrigin: mouse; fuse: false;"></a-camera>           
            
        </a-scene>
       
      </div>
    );}
    else{
      this.loadAssets()      
      return(
      <div style={{"position":"absolute"}}>
      <a-scene loading-screen="dotsColor: transparent; backgroundColor: transparent" >
      
      {/* Loads Assets a*/}

      <a-assets>
        {this.clientAssets}
      </a-assets>

      <a-sky src= {'#'+this.props.clientimageid} /> 

      
    
      {/* Loads Mouse */}
      <a-camera id="cam1" rotation="0 0 0" rotation-reader cursor="rayOrigin: mouse; fuse: false;"></a-camera>
     
  </a-scene></div>
        );  }
    }
}

export default Scene;