import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './app.config';
import './App.css';
import Router from './Router';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = {
    online: false
  }
  componentDidMount() {
    firebaseApp.database().ref('/online').on('value', snap => {
      this.setState({ online: snap.val() })
    })
  }
  render() {
    return (
      <Router appState={this.state.online} />
    )
  }
}

export const firebaseDB = firebaseApp.database();
export default App;
