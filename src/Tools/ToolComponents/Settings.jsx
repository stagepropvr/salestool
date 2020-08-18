import React from "react";
// import { Redirect, Route, Link } from "react-router-dom";
class Settings extends React.Component{
    constructor(props){
        super(props);

this.state={
  audiooutput:[],
  audioinput:[],
  videoinput:[],
  currentvideoinput:this.props.videoinput,
  currentaudioinput:this.props.audioinput

}
this.change=this.change.bind(this);
this.submit=this.submit.bind(this);

        navigator.mediaDevices.enumerateDevices().then((device)=>{
Object.values(device.foreach((value)=>{
  this.setState(ele => ({
    [value.kind]: [...ele[value.kind], {value}]
  }))
}))
  });
    }


  change(event){
    this.setState({[event.target.name]: event.target.value});
  }

submit(){
  this.props.changedevice(this.state.currentvideoinput,this.state.currentaudioinput);
}

render()
{
    return(
        <div className="modal" id="setting_modal" tabIndex={-1} role="dialog" style={{display: 'block'}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 style={{color: '#222b45'}} className="modal-title">Settings</h5>
        <button onClick={() => this.props.open_close('settings',false)}  type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><svg  width={24} height={24} viewBox="0 0 24 24">
              <defs>
                <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z" />
              </defs>
              <g fill="none" fillRule="evenodd" transform="translate(6 6)">
                <use fill="#222B45" xlinkHref="#prefix__close" />
              </g>
            </svg></span>
        </button>
      </div>
      <div style={{padding: 0, marginTop: '25px'}} className="modal-body">
        <div>
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <ul style={{padding: 0}} className="nav nav-tabs" data-tabs="tabs">
                <li className="nav-item">
                  <a className="nav-link" href="#Audio" data-toggle="tab">Audio</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active show" href="#VIDEO" data-toggle="tab">VIDEO</a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{marginTop: '25px'}} className="tab-content text-center">
            <div style={{padding: '10px 50px'}} className="tab-pane" id="Audio">
              <div style={{display: 'flex', flexFlow: 'column'}} className="form-group">
                <label className="setting_input input_Label">
                  Microphones
                </label>
                <div className="dropdown bootstrap-select minimal"><select name="currentaudioinput" value={this.state.currentaudioinput} onChange={this.change} className="btn dropdown-toggle btn-light" tabIndex={-98}>
                  {this.state.audioinput.map((device) =>{
                   
                          return(
                            <option value={device["value"].deviceId} >{device["value"].label}</option>
                            )
                           
                                      })}
                  
                  </select></div>
              </div>
              <div style={{display: 'flex', flexFlow: 'column'}} className="form-group">
                <label className="setting_input input_Label">
                  Speakers
                </label>
                <div className="dropdown bootstrap-select minimal"><select className="btn dropdown-toggle btn-light" tabIndex={-98}>
                {this.state.audiooutput.map((device) =>{
                          return(
                            <option value={device["value"].deviceId}>{device["value"].label}</option>
                            )
                                      })}
                  </select>
                  </div> 
                   </div>
            </div>
            <div style={{padding: '10px 50px'}} className="tab-pane active show" id="VIDEO">
              <div style={{display: 'flex', flexFlow: 'column'}} className="form-group">
                <label className="setting_input input_Label">
                  Camera
                </label>
                <div className="dropdown bootstrap-select minimal"><select  name="currentvideoinput" value={this.state.currentvideoinput}  onChange={this.change} className="btn dropdown-toggle btn-light" tabIndex={-98}>
                {/* <option value="environment" >Back</option>
                <option value="user" >Back</option> */}
                {this.state.videoinput.map((device) =>{
                        
                              return(
                                <option value={device["value"].deviceId} >{device["value"].label}</option>
                                )
                               
                                      })}
                  </select></div>
                    </div>
              {/* <div style={{display: 'flex', flexFlow: 'column'}} className="form-group">
                <label className="setting_input input_Label">
                  Send resolution (MAXIMUM)
                </label>
                <div className="dropdown bootstrap-select minimal"><select className="selectpicker minimal" tabIndex={-98}>
                    <option value={2}>Default - Internal Microphones (Built-in)</option>
                    <option value={3}>Default - Internal Microphones (Built-in)</option>
                  </select></div>
                    </div> */}
              {/* <div style={{display: 'flex', flexFlow: 'column'}} className="form-group">
                <label className="setting_input input_Label">
                  Receive resolution (Maximum)
                </label>
                <div className="dropdown bootstrap-select minimal"><select className="selectpicker minimal" tabIndex={-98}>
                    <option value={2}>Default - Internal Microphones (Built-in)</option>
                    <option value={3}>Default - Internal Microphones (Built-in)</option>
                  </select></div>
                    </div> */}
            </div>  
          </div>
        </div>
      </div>
      <div style={{display: 'block'}} className="modal-footer">
        <center className="modal_button_div">
          <button onClick={() => this.props.open_close('settings',false)} type="button" className="btn cancel">Cancel</button>
          <button style={{marginLeft: '20px'}} type="button" onClick={this.submit} className="btn proceed">SAVE</button>
        </center>
      </div>
    </div>
  </div>
</div>

    )
}
}


export default Settings;