import React from 'react';

import 'aframe';
import 'aframe-look-at-component';

// import './AframeComp';

import AssestsLoader from "./AssetsLoader";
import Fire from "../config/Firebase.jsx";

class Scene extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {
        loaded:false,
        VRMode:false,
        imageload:true,
    };
    this.time = null;
    this.total = 0;
    this.assets = [];
    this.clientAssets = [];
      //  console.log(this.props)
    // this.change = this.change.bind(this);
this.imageloaded=this.imageloaded.bind(this);
   }
imageloaded(){
  this.setState({
    imageload:false
  })
}

  componentDidMount(){
    this.start = new Date();
    if(this.props.host)
    {
      // console.log('  2::: Image Loaded',this.props.image)
      let ref = Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/host/images/"+this.props.getImageName(this.props.image))
      .set({
          duration:0}) 
    }

    if(!this.props.host)
    {  
      
      Fire.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+this.props.clientimageName)    
      .set({duration:0})
    }
  }
  componentWillUnmount(){
    console.log("Unmounted")
  }
  
  componentDidUpdate(prevProps, prevState) {

    if(this.props.loader){
    if(this.props.host)
    {      
      // console.log("Called");
      if(prevProps.image !== "")
      {
          if (prevProps.image !== this.props.image) {

            let end = new Date;
            var diffrence = Math.floor((Math.abs(end - this.start)/1000));
            this.start = new Date;
        
          //entering the room
          Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/host/images/"+this.props.getImageName(this.props.image))
          .once('value').then( (snapshot) => {
            if(!snapshot.val())
            {
              Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/host/images/"+this.props.getImageName(this.props.image))
              .update({duration:0})
            }
          });  

          //leving the room
          Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/host/images/"+this.props.getImageName(prevProps.image))
          .once('value').then( (snapshot) => {
            if(snapshot.val())
            {
              if(snapshot.val().duration)
              {
                Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/host/images/"+this.props.getImageName(prevProps.image))
                .update({duration:snapshot.val().duration+diffrence})
              }
              else{
                Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/host/images/"+this.props.getImageName(prevProps.image))
                .update({duration:diffrence})
              }
            }
            else{
              Fire.database().ref("users/"+Fire.auth().currentUser.uid+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/host/images/"+this.props.getImageName(prevProps.image))
              .update({duration:diffrence})
            }
          });
          }
      }
    }

      if(!this.props.host)
      {
        if(prevProps.clientimageid !== "")
        {
          if (prevProps.clientimageid !== this.props.clientimageid) {
                  
            let end = new Date;
            var diffrence = Math.floor((Math.abs(end - this.start)/1000));
            this.start = new Date;
            
          //entering the room  
          Fire.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+this.props.clientimageName)
          .once('value').then( (snapshot) => {
            if(!snapshot.val())
            {
              Fire.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+this.props.clientimageName)
              .update({duration:0})
            }
          });  

          //leaving the room
          Fire.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+prevProps.clientimageName)
          .once('value').then( (snapshot) => {
            // console.log("snap::",snapshot.val())
            if(snapshot.val())
            {
              if(snapshot.val().duration)
              {
                Fire.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+prevProps.clientimageName)
                .update({duration:snapshot.val().duration+diffrence})
              }
              else{
                Fire.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+prevProps.clientimageName)
                .update({duration:diffrence})
              }
            }
            else{
              Fire.database().ref("users/"+localStorage.getItem('uid')+"/Projects/"+this.props.project+"/rooms/"+this.props.room+"/analytics/"+localStorage.getItem('guestkey')+"/images/"+prevProps.clientimageName)
              .update({duration:diffrence})
            }
          });
        }
        }
      }
    }
  }

  loadAssets = () => {
    //  console.log("Not Host : Load Assets Called", this.props.clientimageid,this.props.clientimage)
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

  // console.log(this.clientAssets)

    
    }

  
  render()
    {
      // console.log('Pew: ',this.props.clientimageName);
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
{this.state.imageload?
      <div className="imageswitch">
        <div className="switch_project_loader2">
            <span>
                <svg className="switch_project_svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                  <path fill="#36F" fillRule="evenodd" d="M6.659.473L7.977 0l.947 2.637-1.319.473C4.748 4.134 2.802 6.854 2.802 9.943c0 4.007 3.246 7.256 7.248 7.256 3.103 0 5.833-1.971 6.842-4.856l.463-1.322 2.645.925-.463 1.322c-1.4 4-5.183 6.732-9.487 6.732C4.5 20 0 15.497 0 9.943c0-4.28 2.697-8.049 6.659-9.47z"></path>
                </svg>
            </span>
          <span style={{paddingLeft: "16px",marginTop: "-5px"}}>Switching image</span>    
        </div>
      </div>:<></>}
    
      {/* Loads Mouse */}
      <a-camera id="cam1" rotation="0 0 0" rotation-reader cursor="rayOrigin: mouse; fuse: false;"></a-camera>
     
  </a-scene></div>
        );  }
    }
}

export default Scene;