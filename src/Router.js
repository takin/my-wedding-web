import React, { Component } from 'react'
import { BrowserRouter as ReactRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Menu from './components/Menu';
import Ceremony from './components/Ceremony';
import Maps from './components/Maps';
import Loading from './components/Loading';

export default class Router extends Component {
  render() {
    let { isConnected, isOnline } = this.props;
    return (
      <ReactRouter>
        <Route render={({ location }) => (
          <div className="container">
            {(isOnline || !isConnected) && <Menu />}
            <div className="main-body-container">
              <Switch location={location}>
                <Route exact path="/" render={_ => isOnline || !isConnected ? <Home /> : <Redirect to="/soon" />} />
                <Route path="/gallery" render={_ => isOnline || !isConnected ? <Gallery /> : <Redirect to="/soon" />} />
                <Route path="/rsvp" render={_ => isOnline || !isConnected ? <Rsvp /> : <Redirect to="/soon" />} />
                <Route path="/ceremony" render={_ => isOnline || !isConnected ? <Ceremony /> : <Redirect to="/soon" />} />
                <Route path="/about" render={_ => isOnline || !isConnected ? <About /> : <Redirect to="/soon" />} />
                <Route path="/map" render={_ => isOnline || !isConnected ? <Maps /> : <Redirect to="/soon" />} />
                <Route path="/soon" render={_ => isOnline || !isConnected ? <Redirect to="/" /> : (
                  <div className="container">
                    <div className="main-body-container">
                      <Loading text="Coming Soon..." />
                    </div>
                  </div>
                )} />
                <Route render={_ => <Redirect to="/" />} />
              </Switch>
            </div>
          </div>
        )} />
      </ReactRouter>
    )
  }
}
