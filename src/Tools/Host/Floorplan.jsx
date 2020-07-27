import React from "react";
import { Redirect, Route, Link } from "react-router-dom";
import Fire from "../../config/Firebase.jsx";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
import Select from 'react-select';

class Flooplan extends React.Component {
  constructor(props){
    super(props);
    this.state={
        default:[],
        floorplan_name:[],
        floorplan_list:[],
        selectedOption: null,
        data:this.props.data
    }
    this.changesky = this.changesky.bind(this);
}
handleChange = selectedOption => {
    var a = document.querySelectorAll('.map_div');
    [].forEach.call(a, function(el) {
        el.style.display='none';
    });

    this.props.socket.emit('floorplan',{ roomid:this.props.room,data:this.state.data.plans[selectedOption.value],pin:null});
    this.setState({ selectedOption });
    document.getElementById(selectedOption.value).style.display='block';
  };


  changesky(event){
    //   var list = Object.values(this.props.data.images);
    //   var key = Object.keys(this.props.data.images);
      
    var a = document.querySelectorAll('.bounce');
    [].forEach.call(a, function(el) {
              el.classList.remove("bounce");
    });
     var key = event.target.id.split("_pins");
    this.props.changeImage(key[0]);
    this.props.socket.emit('floorplan',{ roomid:this.props.room,data:this.state.data.plans[this.state.selectedOption[0].value],pin:event.target.style.top+"-"+event.target.style.left});
   
    document.getElementById(event.target.id).classList.add('bounce');
    //   for(var i =0; i<key.length; i++){
    //     if(list[i].url === event.target.id){
            
           
    //     }
    //   }
  }

componentDidMount(){
    
    window.scrollTo(0, 0);
    var temp=[];
    var temp_floor=[];
    if(this.state.data.hasOwnProperty('plans')){
        var obj = Object.keys(this.state.data.plans);
        var list = Object.values(this.state.data.plans);

        for(var i =0; i<obj.length; i++){
            if(i===0){
                var a = [
                   {
                    value:obj[i],
                    label:list[i].name
                   }
                ];
               this.setState({
                   selectedOption:a
               });


this.props.socket.emit('floorplan',{ roomid:this.props.room,data:this.state.data.plans[obj[i]],pin:null});
            }
            temp.push({
                value:obj[i],
                label:list[i].name
            })

            var pins=[];
            var j;
            var k;
            for(j in list[i]['pins']){
                for(k in this.props.data.images){
                    if(this.props.data.images[k].url==list[i]['pins'][j].dest){
                        pins.push({
                            x:list[i]['pins'][j].posx,
                            y:list[i]['pins'][j].posy,
                            dest:list[i]['pins'][j].dest,
                            id:k+"_pins"+j
                        })
                    }
                }
               
            }

            temp_floor.push({
                index:i,
                id:obj[i],
                name:list[i].name,
                url:list[i].planurl,
                pins:pins
            })
        }
    }
    this.setState({
        floorplan_list:temp_floor,
        floorplan_name:temp
    })

  }


  render() {
    const customStyles = {
        control: () => ({
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '4px',
            display: '-webkit-box',
            display: '-webkit-flex',
             display: '-ms-flexbox',
             display: 'flex',
            webkitFlexWrap: 'wrap',
            flexWrap: 'wrap',
            webkitBoxPack: 'justify',
            webkitJustifyContent: 'space-between',
            msFlexPack: 'justify',
            justifyContent: 'space-between',
             minHeight: '38px',
            outline: '0 !important',
            position: 'relative',
            webkitTransition: 'all 100ms',
            transition: 'all 100ms',
            boxSizing: 'border-box'
        }),
        indicatorSeparator:()=>({
            display:'none'
        })
    }
      return(          
        <div style={{display:this.props.floorplan?'block':'none'}} className="floorplan_div">
            <div className="container">
                <div className="row">
                <Select
                value={this.state.selectedOption}
                onChange={this.handleChange}
                isSearchable={false}
                 options={this.state.floorplan_name}
                 className="select_map"
                 style={{flex:'auto'}}
                 styles={customStyles}
                 defaultValue={this.state.default}
                />
            <button onClick={() => this.props.open_close('floorplan',false)} type="button" className="close" data-dismiss="modal" aria-label="Close" style={{flex: "auto",textAlign: "end",marginRight: "10px"}}>
                <span aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
                        <defs>
                            <path id="prefix__close" d="M7.414 6l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L6 4.586 1.707.293C1.317-.098.684-.098.293.293c-.39.391-.39 1.023 0 1.414L4.586 6 .293 10.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L6 7.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L7.414 6z">
                            </path>
                        </defs>
                        <g fill="none" fill-rule="evenodd" transform="translate(6 6)">
                            <use fill="#222B45" href="#prefix__close"></use>
                        </g>
                    </svg>
                </span>
            </button>
            </div>
            <div className="row">
                {this.state.floorplan_list.map((value,index)=>{
                    return(
                        <div className="map_div" key={index} id={value.id} style={{display:(value.index==0 ? 'block':'none')}}>
                        <div className="map">
                        <img  src={value.url} style={{width: "100%"}}/>
                        </div>
                        {value.pins.map((sub)=>{
                            return(
                                <div onClick={this.changesky} id={sub.id}  style={{top:(sub.y+8.5)+'%',left:(sub.x)+'%'}} className="box"> 
                            </div>
                            )
                            
                        })}
                        </div>)
                })}
            </div>
        </div>
    </div>
        
      )
  }
}
export default Flooplan;
