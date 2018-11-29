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
import Maps from './components/Maps';
import { firebaseConfig } from './app.config';
import './App.css';

const firebaseApp = firebase.initializeApp(firebaseConfig);

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
                <Route path="/map" component={Maps} />
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
