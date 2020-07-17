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
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
        <rect className="vert" height="8" width="2" y="1" x="4"/>
        <rect height="2" width="8" y="4" x="1"/>
    </svg>

    this.minus = 
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
        <rect height="2" width="8" y="4" x="1"/>
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
        <div className="modal-dialog" >
            <div style={{height:'100%'}} className="modal-content">
            <div style={{height:'100%'}} className="map-row">
            <button onClick={this.togglenav} className="menu_option" style={{background: '#3366ff',float: 'left',color: '#fff',position: 'absolute',top: '8px',zIndex: '1',display:this.state.toogle_div?'none':'block'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
                        <defs>
                            <path id="prefix__dot" d="M12 17c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-7c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z"/>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                            <use fill="#fff" href="#prefix__dot"/>
                        </g>
                    </svg>               
                </button>
                <div ref={this.Sidenav1} id="mySidenav1" className="sidenav1">
                    <button style={{display:this.state.toogle_div?'block':'none'}} id="close_option_map" className="closebtn map_option_div_close" onClick={this.togglenav} >&times;</button >
                    <div style={{height: "90%",overflow:'auto'}}>
                    <div className="map-col"  >
                    <div className="group">
                        <div className="map-row"><label className="bold">Tumkur road, Bangalore</label></div>
                        <div className="map-row">
                            <button className="btn" variant="out-primary">Maps</button>
                            <button className="btn" variant="out-secondary">Satellite</button>
                        </div>
                    </div>

                    <div className="group">
                        <div className="map-row"><label className="sub-header">Commute</label>
                        </div>
                        <div className="map-row">
                            <div className='collapsible' block onClick={(e) => {this.collapse('Railway')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Railway</div>
                                    <div className="map-col" className="plus">
                                        {this.state.tab === "Railway"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Railway" &&
                                <div className="content">
                                <div className="map-row" className="content-button1">
                                    <div className="map-col" sm={9} >Railway 1</div>
                                    <div className="map-col" sm={3} >2Kms</div>
                                </div>
                                <div className="map-row" className="content-button1">
                                    <div className="map-col" sm={9} >Railway 2</div>
                                    <div className="map-col" sm={3} >2Kms</div>
                                </div>
                                <div className="map-row"><div className="map-col" className="content-button2">View More</div></div>
                            </div>
                            }


                            <div className='collapsible' block onClick={(e) => {this.collapse('Bus')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Bus</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Bus"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Bus" &&
                                 <div className="content"> 
                                 <div className="map-row" className="content-button1">
                                     <div className="map-col" sm={9} >Bus 1</div>
                                     <div className="map-col" sm={3} >2Kms</div>
                                 </div>
                                 <div className="map-row" className="content-button1">
                                     <div className="map-col" sm={9} >Bus 2</div>
                                     <div className="map-col" sm={3} >2Kms</div>
                                 </div>
                                 <div className="map-row"><div className="map-col" className="content-button2">View More</div></div>
                             </div>
                            }
                            
                            <div className='collapsible' block onClick={(e) => {this.collapse('Airport')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Airport</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Airport"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Airport" &&
                                <div className="content">
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Airport 1</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Airport 2</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col" className="content-button2">View More</div></div>
                                </div>
                            }
                            
                            

                        </div>
                     </div>

                    <div className="group">
                        <div className="map-row"><label className="sub-header">Amenities</label></div>
                        <div className="map-row">
                        <div className='collapsible' block onClick={(e) => {this.collapse('Banks/ATMs')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Banks/ATMs</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Banks/ATMs"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Banks/ATMs" &&
                                <div className="content">
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Bank 1</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Bank 2</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col" className="content-button2">View More</div></div>
                                </div>
                            }
                          
                          <div className='collapsible' block onClick={(e) => {this.collapse('Hospitals')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Hospitals</div>
                                    <div className="map-col" className="plus">
                                      
                                    {this.state.tab === "Hospitals"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Hospitals" &&
                                <div className="content">
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Hospitals 1</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Hospitals 2</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col" className="content-button2">View More</div></div>
                                </div>
                            }
                            
                            <div className='collapsible' block onClick={(e) => {this.collapse('Schools')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Schools</div>
                                    <div className="map-col" className="plus">
                                      
                                    {this.state.tab === "Schools"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Schools" &&
                                <div className="content">
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Schools 1</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Schools 2</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col" className="content-button2">View More</div></div>
                                </div>
                            }
                            
                            <div className='collapsible' block onClick={(e) => {this.collapse('Groceries')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Groceries</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Groceries"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Groceries" &&
                                <div className="content">
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Groceries 1</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row" className="content-button1">
                                        <div className="map-col" sm={9} >Groceries 2</div>
                                        <div className="map-col" sm={3} >2Kms</div>
                                    </div>
                                    <div className="map-row"><div className="map-col" className="content-button2">View More</div></div>
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
                    <button draggable="false" title="Toggle fullscreen view" aria-label="Toggle fullscreen view" type="button" className="gm-control-active gm-fullscreen-control" style={{background: 'none rgb(255, 255, 255)', border: '0px', margin: '10px', padding: '0px', position: 'absolute', cursor: 'pointer', userSelect: 'none', borderRadius: '2px', height: '40px', width: '40px', boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px', overflow: 'hidden', top: '8px', zIndex:"20", right: '55px'}}><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%20018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" style={{height: '18px', width: '18px'}} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" style={{height: '18px', width: '18px'}} /><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" style={{height: '18px', width: '18px'}} /></button>

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

  