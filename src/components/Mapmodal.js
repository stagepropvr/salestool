import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import "../styles/mapmodal.css"

export class MapModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            toogle_div:false
        }
        this.Sidenav1 = React.createRef();
        this.togglenav=this.togglenav.bind(this); 

        this.center = {lat: 59.95,lng: 30.33}
        this.zoom = 11
        this.state = {show:true,tab:null}

        this.plus = 
        <svg aria-hidden="true" width="15px" height="15px" focusable="false" viewBox="0 0 10 10">
            <rect className="vert" height="8" width="2" y="1" x="4"/>
            <rect height="2" width="8" y="4" x="1"/>
        </svg>

        this.minus = 
        <svg aria-hidden="true" width="15px" height="15px" focusable="false" viewBox="0 0 10 10">
            <rect height="2" width="8" y="4" x="1"/>
        </svg>

        this.close = <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
        <defs>
            <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z"/>
        </defs>
        <g fill="none" fillRule="evenodd" transform="translate(6 6)">
            <use fill="#222B45" href="#prefix__close"/>
        </g>
    </svg>

    }


    collapse = (str) => {
        console.log(str)
        if(str != this.state.tab)
        {
            this.setState({ show: true,tab:str });
        }
        else{
            this.setState({ show: false,tab:null });
        }
    }

    togglenav()
  {
    //console.log(this.Sidenav.current.style.width);
    
    if(this.Sidenav1.current.style.width==="300px"){
      this.Sidenav1.current.style.width="0px";
      this.setState({
        toogle_div:false
    })
          //console.log(this.bottom.current.offsetWidth);
         // this.bottom.current.style.width=this.bottom.current.offsetWidth+259+"px";
  
    }
    else{
      this.Sidenav1.current.style.width="300px";
      this.setState({
          toogle_div:true
      })
      //console.log(this.bottom.current.offsetWidth);
     // this.bottom.current.style.width=this.bottom.current.offsetWidth-259+"px";
    }
  }

    render(){
    return (
      <div className="modal" style={{display:"block"}}
      >
        <div className="modal-dialog map-modal-dialog" >
            <div style={{height:'100%'}} className="modal-content">
            <div style={{height:'100%'}} className="map-row">

            <button onClick={this.togglenav} className="map-menu_option" style={{background: '#3366ff',float: 'left',color: '#fff',position: 'absolute',top: '8px',zIndex: '1',display:this.state.toogle_div?'none':'block'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
                        <defs>
                            <path id="prefix__dot" d="M12 17c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"/>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                            <use fill="#fff" href="#prefix__dot"/>
                        </g>
                    </svg>               
                </button>
                <div ref={this.Sidenav1} id="mySidenav1" className="sidenavg">
                    <button style={{display:this.state.toogle_div?'block':'none'}} id="close_option_map" className="map-closebtn map_option_div_close" onClick={this.togglenav} >&times;</button >
                    <div style={{height: "100%",overflow:'auto'}}>
                    
                    <div className="map-col map-menu">
                    <div className="group">
                        <div className="map-row"><label className="location-label">Tumkur road, Bangalore</label></div>
                        <div className="map-row">
                            <button className="btn btn-sm out-primary">Maps</button>
                            <button className="btn btn-sm out-secondary">Satellite</button>
                        </div>
                    </div>

                    <div className="group-body">
                        <div className="map-row"><label className="sub-header">Commute</label>
                        </div>
                        <div className="map-row">
                            <div className='collapsible' block onClick={(e) => {this.collapse('Railway')}}>
                                <div className="map-row">
                                    <div className="map-col">Railway</div>
                                    <div className="map-col plus">
                                        {this.state.tab === "Railway"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Railway" &&
                                <div className="contentg">
                                <div className="map-row content-button1">
                                    <div className="map-col stick-left" >Railway 1</div>
                                    <div className="map-col stick-right" >2Kms</div>
                                </div>
                                <div className="map-row content-button1">
                                    <div className="map-col stick-left" >Railway 2</div>
                                    <div className="map-col stick-right" >2Kms</div>
                                </div>
                                <div className="map-row"><div className="map-col content-button2">View More</div></div>
                            </div>
                            }


                            <div className='collapsible' block onClick={(e) => {this.collapse('Bus')}}>
                                <div className="map-row">
                                    <div className="map-col label">Bus</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "Bus"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Bus" &&
                                 <div className="contentg"> 
                                 <div className="map-row content-button1">
                                     <div className="map-col stick-left" >Bus 1</div>
                                     <div className="map-col stick-right">2Kms</div>
                                 </div>
                                 <div className="map-row content-button1">
                                     <div className="map-col stick-left" >Bus 2</div>
                                     <div className="map-col stick-right">2Kms</div>
                                 </div>
                                 <div className="map-row"><div className="map-col content-button2">View More</div></div>
                             </div>
                            }
                            
                            <div className='collapsible' block onClick={(e) => {this.collapse('Airport')}}>
                                <div className="map-row">
                                    <div className="map-col label">Airport</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "Airport"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Airport" &&
                                <div className="contentg">
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Airport 1</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Airport 2</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col content-button2">View More</div></div>
                                </div>
                            }
                            
                            

                        </div>
                     </div>

                    <div className="group-body">
                        <div className="map-row"><label className="sub-header">Amenities</label></div>
                        <div className="map-row">
                        <div className='collapsible' block onClick={(e) => {this.collapse('Banks/ATMs')}}>
                                <div className="map-row">
                                    <div className="map-col label">Banks/ATMs</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "Banks/ATMs"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Banks/ATMs" &&
                                <div className="contentg">
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Bank 1</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Bank 2</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col content-button2">View More</div></div>
                                </div>
                            }
                          
                          <div className='collapsible' block onClick={(e) => {this.collapse('Hospitals')}}>
                                <div className="map-row">
                                    <div className="map-col label">Hospitals</div>
                                    <div className="map-col plus">
                                      
                                    {this.state.tab === "Hospitals"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Hospitals" &&
                                <div className="contentg">
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Hospitals 1</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Hospitals 2</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col content-button2">View More</div></div>
                                </div>
                            }
                            
                            <div className='collapsible' block onClick={(e) => {this.collapse('Schools')}}>
                                <div className="map-row">
                                    <div className="map-col label">Schools</div>
                                    <div className="map-col plus">
                                      
                                    {this.state.tab === "Schools"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Schools" &&
                                <div className="contentg">
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Schools 1</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Schools 2</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col content-button2">View More</div></div>
                                </div>
                            }
                            
                            <div className='collapsible' block onClick={(e) => {this.collapse('Groceries')}}>
                                <div className="map-row">
                                    <div className="map-col label">Groceries</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "Groceries"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Groceries" &&
                                <div className="contentg">
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Groceries 1</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row content-button1">
                                        <div className="map-col stick-left" >Groceries 2</div>
                                        <div className="map-col stick-right">2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col content-button2">View More</div></div>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
                  </div>
                </div>
                <div className="map-col" className="map-col">
                <div className="map">
                    {/* <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDH_UFxLxEo1w5RuI8R3QHoVkWY2r6Xc0M' }}
                    defaultCenter={this.center}
                    defaultZoom={this.zoom}
                    >
                    </GoogleMapReact> */}
                    <button draggable="false" onClick={() => this.props.open_close('map',false)} type="button" className="map-close-btn" style={{background: 'none rgb(255, 255, 255)', border: '0px', margin: '10px', padding: '0px', position: 'absolute', cursor: 'pointer', userSelect: 'none', borderRadius: '2px', height: '40px', width: '40px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', overflow: 'hidden', top: '8px', zIndex:"20", right: '55px'}}>
                        {/* {this.close} */}
                        &times;
                    </button>


                     <Map google={this.props.google} zoom={14}>
                        <Marker onClick={this.onMarkerClick}
                                name={'Current location'} />
                    </Map>
                </div>

                </div>
            </div>
            </div>
        </div>
      </div>
    );
    }
  }
  
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDH_UFxLxEo1w5RuI8R3QHoVkWY2r6Xc0M')
  })(MapModal)

  