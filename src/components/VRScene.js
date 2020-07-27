import React, { Component } from 'react'


export default class VRScene extends React.Component { 
    constructor()
    {
        super();
        this.state = {}
    }
    
    changeImage = (str) => {
        this.setState({current_image:str})
    }

    render()
    {    
        return(
            <VRScene           
            data={this.images} 
            image={this.state.current_image}
            changeImage={this.changeImage.bind(this)}
          />
        );
    }
}