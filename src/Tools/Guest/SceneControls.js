import React from "react";
import "../../assets/css/material-kit.css?v=2.0.7" ;
import "../../assets/demo/demo.css";
import "../../assets/css/Custom.css";
import Share from "../ToolComponents/ShareModal";
import ReactTooltip from "react-tooltip";
import CloseModal from './CloseModal';
import FloorplanClient from "./FloorplanClient";
import Settings from "../ToolComponents/Settings";
import MapModal from "./Mapmodal";
import PDFclient from "./PDFclient";
class SceneControls extends React.Component { 
  constructor(props){
    super(props);
    this.state={
      share:!this.props.loader,
      document:false,
      menu_bar:true,
      project:false,
      floorplan:false,
      data:this.props.data,
      pid:this.props.pid,
      close:false,
      map:false,
      floorplandata:"false",
      pdfdata:"false",
      settings:false,
      mapdata:"false"
    }
  }


  componentDidMount(){   

    window.scrollTo(0, 0);
    document.getElementById('menu_bar').click();
    //this.handleOutsideClick = this.handleOutsideClick.bind(this);
    //document.addEventListener('click', this.handleOutsideClick, false);
    this.menu.addEventListener("click", this.menu_bar_open);
    //this.menu_bar_open();

    this.setState({
        mapdata:this.props.mapdata
      })
      

   
   
  }
  componentDidUpdate(prevProps){
    if (this.props.mapdata !== prevProps.mapdata) {
      this.setState({
        mapdata:this.props.mapdata
      })
    }
  }
  // handleOutsideClick(e) {


  //   // ignore clicks on the component itself

  //   if(this.state.menu_bar && e.target.id!='menu_bar_up_icon'){
  //     this.setState({
  //       menu_bar:false
  //     })
  //     document.getElementById('menu_bar').classList.remove('menu_option_click');
  //     document.getElementById('tools_div').classList.remove('show');
  //     document.removeEventListener('click', this.handleOutsideClick, false);

  //   }else{
  //     document.addEventListener('click', this.handleOutsideClick, false);

  //     this.setState({
  //       menu_bar:true
  //     })
  //     document.getElementById('tools_div').classList.add('show');
  //     document.getElementById('menu_bar').classList.add('menu_option_click');
  //   }

   
    

  // }

menu_bar_open = (event) => {
 
  if(this.state.menu_bar){
    this.setState({
      menu_bar:false
    })
    document.getElementById('menu_bar').classList.remove('menu_option_click');
    document.getElementById('tools_div').classList.remove('show');
   // document.removeEventListener('click', this.handleOutsideClick, false);

  }
  else{
    this.setState({
      menu_bar:true
    })
   // document.addEventListener('click', this.handleOutsideClick, false);
    document.getElementById('tools_div').classList.add('show');
    document.getElementById('menu_bar').classList.add('menu_option_click');
  }
}
open_close = (name,flag) =>{
//  document.getElementById('tools_div').classList.remove('show');

  this.setState({
    [name]:flag
  })
    if(flag){
      this.props.togglenav();
    }
}
  render() {

    

return (

  <>

        <div style={{height: '72px', flexWrap: 'nowrap'}} className="row">
          <div className="content_padding dropup">
            <button ref={elem => this.menu = elem}  id="menu_bar" type="button" className="menu_option dropdown-toggle menu_option_click">
              <span id="menu_bar_up" style={{display:this.state.menu_bar===false?'block':'none'}}>
                <svg id="menu_bar_up_icon" style={{transform: 'translateY(2px)'}}  width={24} height={24} viewBox="0 0 24 24">
                  <defs>
                    <path id="prefix__a" d="M6.373 7.22c.371-.298.901-.294 1.267.012l6 5c.424.354.481.984.128 1.408-.198.238-.482.36-.769.36-.225 0-.452-.076-.639-.232L6.99 9.293l-5.363 4.314c-.43.347-1.059.279-1.406-.152-.347-.43-.278-1.06.152-1.406zm0-7c.371-.298.901-.295 1.267.012l6 5c.425.353.482.983.128 1.408-.198.237-.482.36-.768.36-.226 0-.453-.077-.64-.232L6.989 2.292 1.627 6.607c-.43.346-1.059.278-1.406-.152-.346-.43-.278-1.06.152-1.407z" />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(5 5)">
                    <use fill="#FFF" xlinkHref="#prefix__a" />
                  </g>
                </svg>
              </span>
              <span style={{display:this.state.menu_bar===true?'block':'none', transform: 'translateY(2px)'}} id="menu_bar_down">
                <svg id="menu_bar_down_icon"  width={24} height={24} viewBox="0 0 24 24">
                  <defs>
                    <path id="prefix__down" d="M.232 7.36c.353-.424.983-.482 1.408-.128l5.371 4.476 5.362-4.315c.43-.345 1.061-.277 1.406.152.346.43.278 1.06-.152 1.407l-6 4.828c-.183.147-.405.22-.627.22-.228 0-.455-.077-.64-.232l-6-5c-.425-.353-.482-.983-.128-1.408zm0-7c.354-.425.983-.48 1.408-.128l5.37 4.475L12.374.393c.43-.346 1.06-.278 1.406.152.347.43.278 1.06-.152 1.406l-6 4.828C7.444 6.926 7.222 7 7 7c-.227 0-.455-.077-.64-.232l-6-5C-.064 1.414-.121.784.232.36z" />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(5 5)">
                    <use fill="#36F" xlinkHref="#prefix__down" />
                  </g>
                </svg>
              </span>
            </button>
            <div id="tools_div" className="tools_div_guest menudrop dropdown-menu show" x-placement="top-start" style={{position: 'absolute', top: '0px', left: '15px', willChange: 'top, left'}}>

              <div onClick={()=> this.open_close('share',true)} name="share"  className="menudrop_item dropdown-item" href="#" data-tip="Share">
                <svg  width={24} height={24} viewBox="0 0 24 24">
                  <defs>
                    <path id="prefix__b" d="M16 16c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1M3 10c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1m13-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1m0 10c-.817 0-1.557.33-2.099.861L5.966 9.335C5.979 9.224 6 9.114 6 9c0-.114-.021-.224-.034-.335l7.935-3.526C14.443 5.67 15.183 6 16 6c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .114.021.224.034.335L5.099 6.861C4.557 6.33 3.817 6 3 6 1.346 6 0 7.346 0 9s1.346 3 3 3c.817 0 1.557-.33 2.099-.861l7.935 3.526c-.013.111-.034.221-.034.335 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3" />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(2 3)">
                    <use className="icon_svg" fill="#36F" xlinkHref="#prefix__b" />
                  </g>
                </svg>
              </div>
              <ReactTooltip aria-haspopup='true'  place="right" type="light" effect="solid"/>
             
              {/* <a onClick={()=> this.open_close('settings',true)} data-toggle="tooltip" data-placement="right" title="" className="menudrop_item dropdown-item" href="#" data-tip="Settings">
                <svg  width={24} height={24} viewBox="0 0 24 24">
                  <defs>
                    <path id="prefix__g" d="M2.403 9.622c1.116.383 2.005 1.317 2.377 2.501l.04.12c.426 1.256.253 2.608-.461 3.622-.13.184-.101.404.036.508l2.072 1.574c.073.055.144.055.188.05.05-.008.123-.035.182-.119l.23-.328c.69-.977 1.8-1.58 2.972-1.614 1.316-.027 2.498.576 3.234 1.64l.118.17c.059.084.13.112.182.12.044.01.116.006.188-.05l2.06-1.555c.145-.108.177-.339.07-.494l-.26-.375c-.67-.968-.87-2.224-.532-3.359.366-1.236 1.297-2.214 2.492-2.614l.2-.068c.162-.053.249-.253.192-.437l-.787-2.52c-.037-.119-.113-.172-.155-.194-.06-.03-.125-.036-.187-.015l-.34.113c-1.163.387-2.446.177-3.431-.564l-.108-.08c-.936-.705-1.493-1.84-1.49-3.036l.003-.28c0-.133-.063-.216-.101-.254-.036-.037-.097-.08-.183-.08L8.657 2c-.156 0-.283.15-.284.333l-.001.242C8.367 3.79 7.798 4.946 6.85 5.67l-.13.098c-1.042.793-2.402 1.017-3.634.597-.047-.016-.091-.013-.133.01-.032.015-.09.056-.118.147l-.817 2.596c-.06.19.038.386.22.45l.165.055zM6.613 20c-.485 0-.957-.158-1.355-.46l-2.072-1.574c-.99-.75-1.21-2.193-.49-3.216.375-.53.452-1.21.232-1.857l-.055-.168c-.183-.582-.601-1.034-1.118-1.21h-.001l-.163-.058C.373 11.04-.277 9.75.11 8.517l.816-2.595c.185-.587.584-1.06 1.124-1.334.528-.266 1.125-.307 1.683-.116.599.204 1.264.093 1.777-.297l.129-.098c.456-.348.73-.913.733-1.51v-.24C6.379 1.041 7.403 0 8.657 0h.004l2.547.003c.602.001 1.17.24 1.598.67.443.445.685 1.04.683 1.675l-.002.28c-.002.565.257 1.1.694 1.428l.107.081c.459.345 1.057.444 1.594.264l.339-.113c.577-.192 1.19-.145 1.732.132.555.284.965.773 1.153 1.378l.787 2.521c.38 1.218-.278 2.532-1.465 2.93l-.201.066c-.576.194-1.03.674-1.21 1.286-.166.561-.07 1.178.259 1.652l.26.375c.714 1.032.486 2.48-.508 3.23l-2.061 1.555c-.495.374-1.102.525-1.711.428-.614-.099-1.15-.439-1.51-.957l-.117-.172c-.35-.504-.91-.81-1.497-.777-.588.016-1.096.295-1.428.767l-.231.328c-.362.513-.9.848-1.51.944-.117.018-.233.026-.348.026zM10 8.5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5m0 5c-1.93 0-3.5-1.57-3.5-3.5S8.07 6.5 10 6.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5" />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(2 2)">
                    <use className="icon_svg" fill="#36F" xlinkHref="#prefix__g" />
                  </g>
                </svg>
              </a>
              <ReactTooltip aria-haspopup='true'  place="right" type="light" effect="solid"/> */}

            </div>
            <span className="content_separate" />
          </div>

          <div id="video-controls" className="content_padding">
            <button style={{marginRight:'8px'}} className={this.props.micstate?"menu_option video_on":"menu_option video_off"}  onClick={this.props.micaction}>
              {this.props.micstate?<svg  width={24} height={24} viewBox="0 0 24 24">
                <path fill="#222B45" fillRule="evenodd" d="M13 17.92V20h2.105c.493 0 .895.402.895.895v.21c0 .493-.402.895-.895.895h-6.21C8.402 22 8 21.598 8 21.106v-.211c0-.493.402-.895.895-.895H11v-2.08c-3.387-.488-6-3.4-6-6.92 0-.552.447-1 1-1 .553 0 1 .448 1 1 0 2.757 2.243 5 5 5s5-2.243 5-5c0-.552.447-1 1-1 .553 0 1 .448 1 1 0 3.52-2.613 6.432-6 6.92zM10 6c0-1.103.897-2 2-2s2 .897 2 2v5c0 1.103-.897 2-2 2s-2-.897-2-2V6zm2 9c2.206 0 4-1.794 4-4V6c0-2.205-1.794-4-4-4S8 3.795 8 6v5c0 2.206 1.794 4 4 4z" />
              </svg>:<svg width={24} height={24}  viewBox="0 0 24 24">
                  <g data-name="Layer 2">
                  <g data-name="mic-off">
                  <rect width="24" height="24" opacity="0"/>
                  <path fill="#fff" d="M10 6a2 2 0 0 1 4 0v5a1 1 0 0 1 0 .16l1.6 1.59A4 4 0 0 0 16 11V6a4 4 0 0 0-7.92-.75L10 7.17z"/>
                  <path fill="#fff" d="M19 11a1 1 0 0 0-2 0 4.86 4.86 0 0 1-.69 2.48L17.78 15A7 7 0 0 0 19 11z"/>
                  <path fill="#fff" d="M12 15h.16L8 10.83V11a4 4 0 0 0 4 4z"/>
                  <path fill="#fff" d="M20.71 19.29l-16-16a1 1 0 0 0-1.42 1.42l16 16a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/>
                  <path fill="#fff" d="M15 20h-2v-2.08a7 7 0 0 0 1.65-.44l-1.6-1.6A4.57 4.57 0 0 1 12 16a5 5 0 0 1-5-5 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/>
                  </g>
                  </g>
                  </svg>  }            
            </button>
            <button  style={{marginRight:'8px'}} onClick={this.props.videoaction}  className={this.props.camstate?"menu_option video_on":"menu_option video_off"}>
              
            {this.props.camstate?<svg id="video_on"  width={24} height={24} viewBox="0 0 24 24">
               <defs>
                  <path id="prefix__z" d="M18 9.6L15.191 7 18 4.4v5.2zM13 11c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V3c0-.551.448-1 1-1h9c.552 0 1 .449 1 1v8zm6.012-8.854c-.626-.273-1.352-.154-1.851.306l-2.161 2V3c0-1.654-1.346-3-3-3H3C1.346 0 0 1.346 0 3v8c0 1.655 1.346 3 3 3h9c1.654 0 3-1.345 3-3V9.549l2.161 1.999c.32.297.735.452 1.158.452.234 0 .469-.047.693-.145.609-.266.988-.835.988-1.484V3.63c0-.65-.379-1.218-.988-1.484z" />
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(2 5)">
                  <use fill="#222B45" xlinkHref="#prefix__z" />
                </g>
              </svg>:<svg id="video_off"  width={24} height={24} viewBox="0 0 24 24">
                <path fill="#fff" fillRule="evenodd" d="M20 9.4L17.191 12 20 14.6V9.4zm2-.77v6.74c0 .65-.379 1.218-.988 1.484-.224.098-.459.146-.693.146-.206 0-.409-.038-.601-.11L15 12.17v-4.17c0-.553-.448-1-1-1H9.828l-2-2H14c1.654 0 3 1.344 3 3v1.45l2.161-2c.499-.46 1.225-.578 1.851-.306.609.266.988.835.988 1.484zM14 17H5c-.552 0-1-.449-1-1V8c0-.32.161-.593.396-.777L2.974 5.801C2.379 6.351 2 7.13 2 8.001v8c0 1.653 1.346 3 3 3h9c.616 0 1.188-.189 1.665-.508l-1.522-1.523c-.049.008-.092.03-.143.03zm6.707 2.293c.391.39.391 1.023 0 1.414-.195.195-.451.293-.707.293-.256 0-.512-.098-.707-.293L16.386 17.8l-1.455-1.455L5.586 7l-1.76-1.76-.533-.533c-.391-.39-.391-1.024 0-1.414.391-.39 1.023-.39 1.414 0L6.414 5l2 2L15 13.586l2 2 3.707 3.707z" />
              </svg>} 
            
              
            </button>
            {/* {onClick={this.props.screenaction}} */}
            <button  onClick={()=> this.open_close('close',true)} className="menu_option" style={{background: '#fff'}}>
              <svg  width={24} height={24} viewBox="0 0 24 24">
                <defs>
                  <path id="prefix__q" d="M12.15 12.146c.243-.234.588-.326.916-.253l5.964 1.369c.336.077.608.32.72.647.082.235.145.48.186.73.041.248.064.503.064.762C20 17.937 17.936 20 15.4 20c-3.566 0-6.844-1.23-9.457-3.271l1.428-1.427C9.61 16.988 12.386 18 15.4 18 16.834 18 18 16.834 18 15.4c0-.111-.006-.22-.021-.327l-4.62-1.061-.286.545c-.455.87-.782 1.502-1.627 1.163-1.053-.37-2.032-.91-2.934-1.561l1.43-1.43c.447.304.918.574 1.412.799.65-1.243.654-1.245.796-1.382zm4.332-9.885c.348-.348.91-.348 1.257 0 .348.347.348.909 0 1.257L3.517 17.74c-.347.347-.91.347-1.257 0-.173-.173-.26-.401-.26-.628 0-.228.087-.455.26-.63zM4.6 0c.261 0 .517.023.766.066.243.039.49.1.727.183.325.112.57.385.646.72l1.37 5.965c.074.328-.02.673-.254.916-.136.142-.14.145-1.38.795.227.494.497.964.8 1.41l-1.43 1.429c-.658-.908-1.203-1.9-1.579-2.97-.322-.803.307-1.132 1.178-1.587l.545-.285-1.06-4.62C4.817 2.007 4.708 2 4.598 2 3.166 2 2 3.166 2 4.6c0 3.013 1.012 5.789 2.698 8.03l-1.427 1.427C1.23 11.443.001 8.166.001 4.6 0 2.064 2.062 0 4.598 0z" />
                </defs>
                <g fill="none" fillRule="evenodd" transform="translate(2 2)">
                  <use fill="#FF3D71" xlinkHref="#prefix__q" />
                </g>
              </svg>                
            </button>
            <span className="content_separate" />
          </div>
          {/* <OwlCarousel responsiveClass={true} autoWidth={true}   margin={10} navText={nav} dots={false} responsive={res} nav={true} id="MultiCarousel" className="MultiCarousel owl-carousel">
            {this.rooms}
        </OwlCarousel> */}
 
        
 
        </div>

     
  
    <Share open_close={this.open_close} share={this.state.share} pid={this.state.pid} roomId={this.props.roomId} user_id={this.props.user_id} ></Share>
   
    <CloseModal destruct={this.props.destruct}  project={this.props.pid} room={this.props.roomId} host={this.props.host} close={this.state.close} open_close={this.open_close} ></CloseModal>
   

    {this.state.settings?<Settings videoinput={this.props.videoinput}
              audioinput={this.props.audioinput} changedevice={this.props.changedevice} open_close={this.open_close} />:<></>}

{this.props.floorplandata!=="false"?<FloorplanClient data={this.props.floorplandata}/>:<></>}
{this.props.pdfdata!=="false"?<PDFclient data={this.props.pdfdata}/>:<></>}
{this.props.mapdata!=="false"?<MapModal
        open_close={this.open_close}
        data={this.state.mapdata}
      />:<></>}



  </>


)}
}
export default SceneControls;
