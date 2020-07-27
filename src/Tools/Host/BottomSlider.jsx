import React from 'react'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../../assets/css/owl.carousel.css";
import "../../assets/css/owl.theme.default.css";
import OwlCarousel from 'react-owl-carousel';



export default class BottomSlider extends React.Component { 
    
constructor(props){
    super(props);
}

render(){
    const res = {
        0:{
            items:1,
        },
        700:{
            items:2
        },
        1000:{
            items:4
        },
        1200:{
            items:5
        }
    
    }
    const nav=['<svg id="left_light_mode"  width="24" height="24" viewBox="0 0 24 24"><defs><path id="prefix__left" d="M5.829 14c-.292 0-.582-.127-.78-.373l-4.828-6c-.298-.371-.294-.901.01-1.267l5-6c.354-.424.985-.481 1.41-.128.424.353.48.984.127 1.408L2.293 7.011l4.315 5.362c.346.43.278 1.06-.153 1.406-.184.149-.406.221-.626.221"/></defs><g fill="none" fill-rule="evenodd" transform="translate(8 5)"><use fill="#FFF" xlink:href="#prefix__left"/></g></svg><svg id="left_dark_mode" style="display:none;"  width="24" height="24" viewBox="0 0 24 24"><defs><path id="prefix__pre_dark" d="M5.829 14c-.292 0-.582-.127-.78-.373l-4.828-6c-.298-.371-.294-.901.01-1.267l5-6c.354-.424.985-.481 1.41-.128.424.353.48.984.127 1.408L2.293 7.011l4.315 5.362c.346.43.278 1.06-.153 1.406-.184.149-.406.221-.626.221"/></defs><g fill="none" fill-rule="evenodd" transform="translate(8 5)"><use fill="#222B45" xlink:href="#prefix__pre_dark"/></g></svg>','<svg id="right_light_mode"  width="24" height="24" viewBox="0 0 24 24"><defs><path id="prefix__right" d="M1 14c-.227 0-.454-.076-.64-.232-.424-.353-.481-.984-.128-1.408l4.476-5.371L.391 1.627C.047 1.197.115.567.545.221c.431-.346 1.06-.278 1.407.152l4.828 6c.298.371.295.901-.01 1.267l-5 6c-.198.237-.482.36-.77.36"/></defs><g fill="none" fill-rule="evenodd" transform="translate(9 5)"><use fill="#FFF" xlink:href="#prefix__right"/></g></svg><svg id="right_dark_mode" style="display:none;"  width="24" height="24" viewBox="0 0 24 24"><defs><path id="prefix__nxt_dark" d="M1 14c-.227 0-.454-.076-.64-.232-.424-.353-.481-.984-.128-1.408l4.476-5.371L.391 1.627C.047 1.197.115.567.545.221c.431-.346 1.06-.278 1.407.152l4.828 6c.298.371.295.901-.01 1.267l-5 6c-.198.237-.482.36-.77.36"/></defs><g fill="none" fill-rule="evenodd" transform="translate(9 5)"><use fill="#222B45" xlink:href="#prefix__nxt_dark"/></g></svg>']

    return(
        <OwlCarousel responsiveclassname="true" autoWidth={true}   margin={10} navText={nav} dots={false} responsive={res} nav={true} id="MultiCarousel" className="MultiCarousel owl-carousel">
           {Object.keys(this.props.data.images).map((value,index) => {
            return(
                <div key={index} className="MultiCarousel-inner">  
                    <div id={value+'_thumb'} className="item" onClick={() => this.props.changeImage(value)}>
                      <div className="pad15">
                          <p className="slider_name">{this.props.data.images[value]['name']}</p>
                      </div>
                    </div> 
                </div>
                
                );
        })}
        </OwlCarousel>
    );
    }
}
