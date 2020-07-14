import React from 'react';

function AssetsLoader(props){
    // Load Assets  
    let render=[];    
    for (var key in props.data){
render.push({
    url:props.data[key].url,
    index:key,
    name:props.data[key].name
})
    }  
    let assets =render.map((value) => {
        
    return(
        <img crossOrigin="anonymous" id={value.index}  onLoad={props.sceneloader} src={value.url} alt={value.name} key={value.index}/>
    )});

    
    // Load Hotspot Icon
    let hotspotIcon = <img 
        id="hotspot" 
        crossOrigin="anonymous"
        src="https://cdn.glitch.com/a04a26d3-92af-4a88-9d49-8fcc2c5344a5%2Fhotspots.png?v=1562761623319"
        alt="Hotspot"/>
    
    console.log('Hoste:',assets)
    return(
        <a-assets>
            {assets}
            {hotspotIcon}
        </a-assets>
    )
    }

export default AssetsLoader;
