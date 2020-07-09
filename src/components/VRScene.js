import React, { Component } from 'react'
import Data from "../Data/data.json"


export default class VRScene extends React.Component { 
    constructor()
    {
        super();
        
        this.images = Object.values(Data.images);

        this.state = {
        current_image: {
            "info" : {
                "About Innov8" : {
                    "Description" : "Innov8 Coworking offers beautifully crafted workspaces where people can create, connect, and grow their businesses at prime locations in multiple cities pan-India. Innov8 hosts people from diverse backgrounds such as digital nomads, entrepreneurs, freelancers, corporates employees and startup enthusiasts.",
                    "buyurl" : "",
                    "info3diosurl" : "",
                    "info3durl" : "",
                    "infoimgurl" : "",
                    "knowurl" : "",
                    "position" : "-0.8980867539712181 0.00034748211845683774 0.4203239232941025",
                    "vidurl" : "https://www.youtube.com/embed/0UA80LzjJh0"
                    }
            },
            "links" : {
                "theatere" : {
                "name" : "Theatre",
                "dest-image" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2F1579863181062-20200124_161208_885.jpg?alt=media&token=dc168d99-2e45-4758-b0fb-c41b356eb675",
                "dest-thumb" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2Fthumbs%2F1579863191216-20200124_161208_885.jpg?alt=media&token=bbffb628-3d4e-4369-8571-a0af07abb52b",
                "position" : "0.8826060510846503 -0.08739164477592737 -0.48291200668298667"
            }
        },
            "name" : "Entrance",
            "thumbnail" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2Fthumbs%2F1579863216723-20200124_161250_786.jpg?alt=media&token=95e7d027-8490-4cf5-9679-0d5b7404ce14",
            "url" : "https://firebasestorage.googleapis.com/v0/b/realvr-eb62c.appspot.com/o/iHwPWJvWDQYW6ilIAfNfgupytcb2%2FInnov8%2F1579863210017-20200124_161250_786.jpg?alt=media&token=3311ca91-4238-4b73-b75a-dfc37fdc6d24"
        }
    }}
    
    changeImage = (str) => {
        // console.log(str);
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