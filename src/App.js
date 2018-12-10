import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './app.config';
import './App.css';
import Router from './Router';

const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = {
    isOnline: false,
    isConnected: false
  }
  componentDidMount() {
    firebaseApp.database().ref('/online').on('value', snap => {
      let isConnected = navigator && navigator.onLine;
      this.setState({ isOnline: snap.val(), isConnected })
    })
  }
  render() {
    return (
      <Router {...this.state} />
    )
  }
}

export const firebaseDB = firebaseApp.database();
export default App;
