import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import Home from './components/Home';
import About from './components/About';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Menu from './components/Menu';
import Ceremony from './components/Ceremony';
import './App.css';

const config = {
  apiKey: "AIzaSyAXlLRpCVl2XBl1PEuB85RHW8WXjg50x4I",
  authDomain: "sm-bm-wedding.firebaseapp.com",
  databaseURL: "https://sm-bm-wedding.firebaseio.com",
  projectId: "sm-bm-wedding",
  storageBucket: "sm-bm-wedding.appspot.com",
  messagingSenderId: "899347634314"
};

const firebaseApp = firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Router>
        <Route render={({ location }) => (
          <div className="container">
            <Menu />
            <div className="main-body-container">
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/rsvp" component={Rsvp} />
                <Route path="/ceremony" component={Ceremony} />
                <Route path="/about" component={About} />
              </Switch>
            </div>
          </div>
        )} />
      </Router>
    );
  }
}

export const firebaseDB = firebaseApp.database();
export default App;
