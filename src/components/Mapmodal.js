import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Row,Col, Button,ButtonGroup} from 'react-bootstrap'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import "../styles/mapmodal.css"

export class MapModal extends React.Component {
    constructor()
    {
        super()
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
        console.log(str)
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
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body >
            <Col>
            <Row>
                <Col sm={4} className="scroll">
                    <div className="group">
                        <Row><label className="bold">Tumkur road, Bangalore</label></Row>
                        <Row>
                            <Button className="btn" variant="out-primary">Maps</Button>
                            <Button className="btn" variant="out-secondary">Satellite</Button>
                        </Row>
                    </div>

                    <div className="group">
                        <Row><label className="sub-header">Commute</label>
                        </Row>
                        <Row>
                            <div class='collapsible' block onClick={(e) => {this.collapse('Railway')}}>
                                <Row>
                                    <Col className="label">Railway</Col>
                                    <Col className="plus">
                                        {this.state.tab === "Railway"?<>{this.minus}</> : <>{this.plus}</>}
                                    </Col> 
                                </Row>
                            </div>
                            
                            {this.state.show && this.state.tab === "Railway" &&
                                <div class="content">
                                <Row className="content-button1">
                                    <Col sm={9} >Railway 1</Col>
                                    <Col sm={3} >2Kms</Col>
                                </Row>
                                <Row className="content-button1">
                                    <Col sm={9} >Railway 2</Col>
                                    <Col sm={3} >2Kms</Col>
                                </Row>
                                <Row><Col className="content-button2">View More</Col></Row>
                            </div>
                            }


                            <div class='collapsible' block onClick={(e) => {this.collapse('Bus')}}>
                                <Row>
                                    <Col className="label">Bus</Col>
                                    <Col className="plus">
                                    {this.state.tab === "Bus"?<>{this.minus}</> : <>{this.plus}</>}

                                    </Col> 
                                </Row>
                            </div>
                            
                            {this.state.show && this.state.tab === "Bus" &&
                                 <div class="content">
                                 <Row className="content-button1">
                                     <Col sm={9} >Bus 1</Col>
                                     <Col sm={3} >2Kms</Col>
                                 </Row>
                                 <Row className="content-button1">
                                     <Col sm={9} >Bus 2</Col>
                                     <Col sm={3} >2Kms</Col>
                                 </Row>
                                 <Row><Col className="content-button2">View More</Col></Row>
                             </div>
                            }
                            
                            <div class='collapsible' block onClick={(e) => {this.collapse('Airport')}}>
                                <Row>
                                    <Col className="label">Airport</Col>
                                    <Col className="plus">
                                    {this.state.tab === "Airport"?<>{this.minus}</> : <>{this.plus}</>}

                                    </Col> 
                                </Row>
                            </div>
                            
                            {this.state.show && this.state.tab === "Airport" &&
                                <div class="content">
                                    <Row className="content-button1">
                                        <Col sm={9} >Airport 1</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row className="content-button1">
                                        <Col sm={9} >Airport 2</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row><Col className="content-button2">View More</Col></Row>
                                </div>
                            }
                            
                            

                        </Row>
                     </div>

                    <div className="group">
                        <Row><label className="sub-header">Amenities</label></Row>
                        <Row>
                        <div class='collapsible' block onClick={(e) => {this.collapse('Banks/ATMs')}}>
                                <Row>
                                    <Col className="label">Banks/ATMs</Col>
                                    <Col className="plus">
                                    {this.state.tab === "Banks/ATMs"?<>{this.minus}</> : <>{this.plus}</>}
                                    </Col> 
                                </Row>
                            </div>
                            
                            {this.state.show && this.state.tab === "Banks/ATMs" &&
                                <div class="content">
                                    <Row className="content-button1">
                                        <Col sm={9} >Bank 1</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row className="content-button1">
                                        <Col sm={9} >Bank 2</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row><Col className="content-button2">View More</Col></Row>
                                </div>
                            }
                          
                          <div class='collapsible' block onClick={(e) => {this.collapse('Hospitals')}}>
                                <Row>
                                    <Col className="label">Hospitals</Col>
                                    <Col className="plus">
                                      
                                    {this.state.tab === "Hospitals"?<>{this.minus}</> : <>{this.plus}</>}
                                    </Col> 
                                </Row>
                            </div>
                            
                            {this.state.show && this.state.tab === "Hospitals" &&
                                <div class="content">
                                    <Row className="content-button1">
                                        <Col sm={9} >Hospitals 1</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row className="content-button1">
                                        <Col sm={9} >Hospitals 2</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row><Col className="content-button2">View More</Col></Row>
                                </div>
                            }
                            
                            <div class='collapsible' block onClick={(e) => {this.collapse('Schools')}}>
                                <Row>
                                    <Col className="label">Schools</Col>
                                    <Col className="plus">
                                      
                                    {this.state.tab === "Schools"?<>{this.minus}</> : <>{this.plus}</>}
                                    </Col> 
                                </Row>
                            </div>
                            
                            {this.state.show && this.state.tab === "Schools" &&
                                <div class="content">
                                    <Row className="content-button1">
                                        <Col sm={9} >Schools 1</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row className="content-button1">
                                        <Col sm={9} >Schools 2</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row><Col className="content-button2">View More</Col></Row>
                                </div>
                            }
                            
                            <div class='collapsible' block onClick={(e) => {this.collapse('Groceries')}}>
                                <Row>
                                    <Col className="label">Groceries</Col>
                                    <Col className="plus">
                                    {this.state.tab === "Groceries"?<>{this.minus}</> : <>{this.plus}</>}
                                    </Col> 
                                </Row>
                            </div>
                            
                            {this.state.show && this.state.tab === "Groceries" &&
                                <div class="content">
                                    <Row className="content-button1">
                                        <Col sm={9} >Groceries 1</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row className="content-button1">
                                        <Col sm={9} >Groceries 2</Col>
                                        <Col sm={3} >2Kms</Col>
                                    </Row>
                                    <Row><Col className="content-button2">View More</Col></Row>
                                </div>
                            }
                            
                        </Row>
                    </div>
                </Col>
                <Col className="map-col">
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

                </Col>
            </Row>
            </Col>
        </Modal.Body>
      </Modal>
    );
    }
  }
  
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDH_UFxLxEo1w5RuI8R3QHoVkWY2r6Xc0M')
  })(MapModal)

  