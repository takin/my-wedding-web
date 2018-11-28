import React from 'react';
import ReactDOM from 'react-dom';
import CSSPlugin from 'gsap/CSSPlugin';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// hack for GSAP to included when in build mode
const c = CSSPlugin;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
