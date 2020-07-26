import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import "../styles/mapmodal.css"

export class MapModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.center = {lat: 59.95,lng: 30.33}
        this.zoom = 11
        this.state = {show:true,tab:null}
    this.plus = 
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
        <rect class="vert" height="8" width="2" y="1" x="4"/>
        <rect height="2" width="8" y="4" x="1"/>
    </svg>

    this.minus = 
    <svg aria-hidden="true" focusable="false" viewBox="0 0 10 10">
        <rect height="2" width="8" y="4" x="1"/>
    </svg>

    }


    collapse = (str) => {
        if(str != this.state.tab)
        {
            this.setState({ show: true,tab:str });
        }
        else{
            this.setState({ show: false,tab:null });
        }
    }

    render(){
    return (
      <div className="modal"
      >
        <div className="modal-dialog" >
            <div className="map-col">
            <div className="map-row">
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
                            <div class='collapsible' block onClick={(e) => {this.collapse('Railway')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Railway</div>
                                    <div className="map-col" className="plus">
                                        {this.state.tab === "Railway"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Railway" &&
                                <div class="content">
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


                            <div class='collapsible' block onClick={(e) => {this.collapse('Bus')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Bus</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Bus"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Bus" &&
                                 <div class="content">
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
                            
                            <div class='collapsible' block onClick={(e) => {this.collapse('Airport')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Airport</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Airport"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Airport" &&
                                <div class="content">
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
                        <div class='collapsible' block onClick={(e) => {this.collapse('Banks/ATMs')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Banks/ATMs</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Banks/ATMs"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Banks/ATMs" &&
                                <div class="content">
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
                          
                          <div class='collapsible' block onClick={(e) => {this.collapse('Hospitals')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Hospitals</div>
                                    <div className="map-col" className="plus">
                                      
                                    {this.state.tab === "Hospitals"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Hospitals" &&
                                <div class="content">
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
                            
                            <div class='collapsible' block onClick={(e) => {this.collapse('Schools')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Schools</div>
                                    <div className="map-col" className="plus">
                                      
                                    {this.state.tab === "Schools"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Schools" &&
                                <div class="content">
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
                            
                            <div class='collapsible' block onClick={(e) => {this.collapse('Groceries')}}>
                                <div className="map-row">
                                    <div className="map-col" className="label">Groceries</div>
                                    <div className="map-col" className="plus">
                                    {this.state.tab === "Groceries"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "Groceries" &&
                                <div class="content">
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
                <div className="map-col" className="map-col">
                <div className="map">
                    {/* <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDH_UFxLxEo1w5RuI8R3QHoVkWY2r6Xc0M' }}
                    defaultCenter={this.center}
                    defaultZoom={this.zoom}
                    >
                    </GoogleMapReact> */}
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

  