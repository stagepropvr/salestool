import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from "./registerServiceWorker";
const version="0.1.3"
if(localStorage.getItem("version")===version){
    serviceWorker.register();

}
else{
localStorage.setItem("version",version);
serviceWorker.unregister();
}
ReactDOM.render(<App />, document.getElementById('root'));

