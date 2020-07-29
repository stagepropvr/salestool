import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper,Circle,Listing} from 'google-maps-react';
import "../../styles/mapmodal.css"

export class MapModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            toogle_div:false,
            lat:0,
            long:0,
            places:[],
            getNextPage:null,
            google_props:'',
            maps:'',
            current_tab:'',
            icons:[],
            current_type:'roadmap',
            current_map:''
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

        this.close = <svg  width="24" height="24" viewBox="0 0 24 24">
        <defs>
            <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z"/>
        </defs>
        <g fill="none" fillRule="evenodd" transform="translate(6 6)">
            <use fill="#222B45" href="#prefix__close"/>
        </g>
    </svg>

    }


    collapse = (str) => {
        this.searchplace(str)
        if(str != this.state.tab)
        {
            this.setState({
                current_tab:str
            })
            this.setState({ show: true,tab:str });
        }
        else{
            this.setState({ show: false,tab:null });
        }
    }

    togglenav()
  {
    
    if(this.Sidenav1.current.style.width==="300px"){
      this.Sidenav1.current.style.width="0px";
      this.setState({
        toogle_div:false
    })
         // this.bottom.current.style.width=this.bottom.current.offsetWidth+259+"px";
  
    }
    else{
      this.Sidenav1.current.style.width="300px";
      this.setState({
          toogle_div:true
      })
     // this.bottom.current.style.width=this.bottom.current.offsetWidth-259+"px";
    }
  }
  componentDidMount(){   

    window.scrollTo(0, 0);
    var a = {
            bank:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/bank_intl_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            hospital:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/hospital_H_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            school:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/school_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            department_store:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/shoppingcart_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            restaurants:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/restaurant_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            movie_theater:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/movie_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            park:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/tree_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            bar:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/bar_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            bus_station:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/transit_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            train_station:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/transit_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25',
            airport:'https://www.google.com/maps/vt/icon/name=assets/icons/poi/tactile/pinlet_shadow-2-medium.png,assets/icons/poi/tactile/pinlet_outline_v2-2-medium.png,assets/icons/poi/tactile/pinlet-2-medium.png,assets/icons/poi/quantum/pinlet/airport_pinlet-2-medium.png&highlight=ff000000,ffffff,ea4335,ffffff&color=ff000000?scale=1.25'
        }
    
    this.setState({
        icons:a
    })
        
        if(this.props.data.length>1){
            var latlng = this.props.data;
            latlng = latlng.split(",");
            this.setState({
                lat:parseFloat(latlng[0]),
                long:parseFloat(latlng[1])
            })
        }
        else{
            // Remove Map Icon
        }
    }

     fetchPlaces=(mapProps, map) => {
        const {google} = mapProps;
        this.setState({
            google_props:google,
            maps:new google.maps.places.PlacesService(map),
            current_map:map
        })
        const service = new google.maps.places.PlacesService(map);
        // ...  
      }

      searchplace = (er) =>{
      //  const {google} = this.state.google_props;
         var data = this.props.data;

        if(data.hasOwnProperty('latlng')){
            var latlng = this.props.data.latlng;
            latlng = latlng.split(",");
            this.setState({
                lat:parseFloat(latlng[0]),
                long:parseFloat(latlng[1])
            })
            var pyrmont = {lat: parseFloat(this.state.lat), lng: parseFloat(this.state.long)};         
            var request = {
                location: pyrmont,
                radius: '1500',
                type: er
               };   
            this.state.maps.nearbySearch(request,this.callback); 
           
            
        }
      }
      callback = (results, status, pagination) => {
        if (status !== 'OK') return;

        this.setState({
            places:results
        })
        this.state.getNextPage = pagination.hasNextPage && function() {
          pagination.nextPage();
        };
      }

      changetype_local=(e,str)=>{
          this.state.current_map.setMapTypeId(str);
          var a = document.querySelectorAll('.map_button_active');
          a[0].classList.remove('map_button_active');
       document.getElementById(e).classList.add('map_button_active');
      }

    render(){
        const cord = {lat:this.state.lat,lng:this.state.long}
    return (
      <div className="modal" style={{display:"block"}}
      >
        <div className="modal-dialog map-modal-dialog" >
            <div style={{height:'100%'}} className="modal-content">
            <div style={{height:'100%'}} className="map-row">

            <button onClick={this.togglenav} className="map-menu_option" style={{background: '#3366ff',float: 'left',color: '#fff',position: 'absolute',top: '8px',zIndex: '1',display:this.state.toogle_div?'none':'block'}}>
                    <svg  width="24" height="24" viewBox="0 0 24 24">
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
                            <button  id="roadmap" onClick={(e)=> this.changetype_local('roadmap','roadmap')} className="map_button_active btn btn-sm out-primary">Maps</button>
                            <button id="sati" style={{marginLeft:'8px'}} onClick={(e)=> this.changetype_local('sati','satellite')} className="btn btn-sm out-secondary">Satellite</button>
                        </div>
                    </div>

                    <div className="group-body">
                        <div className="map-row"><label className="sub-header">Commute</label>
                        </div>
                        <div className="map-row">
                            <div className='collapsible' block = "true" onClick={(e) => {this.collapse('train_station')}}>
                                <div className="map-row">
                                    <div className="map-col">Railway</div>
                                    <div className="map-col plus">
                                        {this.state.tab === "train_station"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "train_station" &&
                                <div className="contentg">                                   
                                {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div key={index} className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                                {/* <div className="map-row"><div className="map-col content-button2">View More</div></div> */}
                            </div>
                            }


                            <div className='collapsible' block = "true" onClick={(e) => {this.collapse('bus_station')}}>
                                <div className="map-row">
                                    <div className="map-col label">Bus</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "bus_station"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "bus_station" &&
                                 <div className="contentg"> 
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                             </div>
                            }
                            
                            <div className='collapsible' block = "true" onClick={(e) => {this.collapse('airport')}}>
                                <div className="map-row">
                                    <div className="map-col label">Airport</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "airport"?<>{this.minus}</> : <>{this.plus}</>}

                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "airport" &&
                                <div className="contentg">
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                                </div>
                            }
                            
                            

                        </div>
                     </div>

                    <div className="group-body">
                        <div className="map-row"><label className="sub-header">Amenities</label></div>
                        <div className="map-row">
                        <div className='collapsible' block = "true" onClick={(e) => {this.collapse('bank')}}>
                                <div className="map-row">
                                    <div className="map-col label">Banks/ATMs</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "bank"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "bank" &&
                                <div className="contentg">
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                                </div>
                            }
                          
                          <div className='collapsible' block = "true" onClick={(e) => {this.collapse('hospital')}}>
                                <div className="map-row">
                                    <div className="map-col label">Hospitals</div>
                                    <div className="map-col plus">
                                      
                                    {this.state.tab === "hospital"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "hospital" &&
                                <div className="contentg">
                                        {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}                                    
                                </div>
                            }
                            
                            <div className='collapsible' block = "true" onClick={(e) => {this.collapse('school')}}>
                                <div className="map-row">
                                    <div className="map-col label">Schools</div>
                                    <div className="map-col plus">
                                      
                                    {this.state.tab === "school"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "school" &&
                                <div className="contentg">
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                                </div>
                            }
                            
                            <div className='collapsible' block = "true" onClick={(e) => {this.collapse('department_store')}}>
                                <div className="map-row">
                                    <div className="map-col label">Groceries</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "department_store"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "department_store" &&
                                <div className="contentg">
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                                </div>
                            }
                            
                        </div>
                    </div>

                    <div className="group-body">
                        <div className="map-row"><label className="sub-header">Entertainment</label></div>
                        <div className="map-row">
                        <div className='collapsible' block = "true" onClick={(e) => {this.collapse('restaurants')}}>
                                <div className="map-row">
                                    <div className="map-col label">Restaurants</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "restaurants"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "restaurants" &&
                                <div className="contentg">
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}                                    
                                </div>
                            }
                          
                          <div className='collapsible' block = "true" onClick={(e) => {this.collapse('movie_theater')}}>
                                <div className="map-row">
                                    <div className="map-col label">Movie Theaters</div>
                                    <div className="map-col plus">
                                      
                                    {this.state.tab === "movie_theater"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "movie_theater" &&
                                <div className="contentg">
                                        {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                                </div>
                            }
                            
                            <div className='collapsible' block = "true" onClick={(e) => {this.collapse('park')}}>
                                <div className="map-row">
                                    <div className="map-col label">Park</div>
                                    <div className="map-col plus">
                                      
                                    {this.state.tab === "park"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "park" &&
                                <div className="contentg">
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                          return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                    })}
                                </div>
                            }
                            
                            <div className='collapsible' block = "true" onClick={(e) => {this.collapse('bar')}}>
                                <div className="map-row">
                                    <div className="map-col label">Bar/Night Club</div>
                                    <div className="map-col plus">
                                    {this.state.tab === "bar"?<>{this.minus}</> : <>{this.plus}</>}
                                    </div> 
                                </div>
                            </div>
                            
                            {this.state.show && this.state.tab === "bar" &&
                                <div className="contentg">
                                    {this.state.places!=undefined && this.state.places.map((value,index)=>{
                                        return(
                                            <div className="map-row content-button1">
                                            <div className="map-col stick-left" >{value.name}</div>
                                             {/* <div className="map-col stick-right" >2Kms</div> */}
                                         </div>
                                        )
                                         
                                    })}
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

                     <Map  labels={true} center={{lat: this.state.lat,lng: this.state.long}} google={this.props.google} 
                            onReady={this.fetchPlaces} 
                            zoom={14}>
                    <Circle
                 radius={1500}
                 strokeColor='transparent'
                 strokeOpacity={0.8}
                 strokeWeight={2}
                 fillColor='#00000054'
                 fillOpacity={0.3}
                 center={cord}
            />
                        <Marker onClick={this.onMarkerClick}
                         position={{ lat: this.state.lat, lng: this.state.long }}
                                name={'Current location'} />

{this.state.places!=undefined && this.state.places.map((value,index)=>{
    return(<Marker
        name={value.name}
        position={{lat: value.geometry.location.lat(), lng: value.geometry.location.lng()}}
        icon={{
            url: this.state.icons[this.state.current_tab],
            origin: new this.props.google.maps.Point(0, 0),
            anchor: new this.props.google.maps.Point(17, 34),
            scaledSize: new this.props.google.maps.Size(25, 35)
          }}
        />)
})}
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
    apiKey: ('AIzaSyDInUcIHoZvLEIdLBqoRZY1_1Dk0P7gDHs')
  })(MapModal)

  