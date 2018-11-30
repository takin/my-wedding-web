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
    let online = this.props.appState;
    return (
      <ReactRouter>
        <Route render={({ location }) => (
          <div className="container">
            {online ? <Menu /> : ""}
            <div className="main-body-container">
              <Switch location={location}>
                <Route exact path="/" render={_ => online ? <Home /> : <Redirect to="/soon" />} />
                <Route path="/gallery" render={_ => online ? <Gallery /> : <Redirect to="/soon" />} />
                <Route path="/rsvp" render={_ => online ? <Rsvp /> : <Redirect to="/soon" />} />
                <Route path="/ceremony" render={_ => online ? <Ceremony /> : <Redirect to="/soon" />} />
                <Route path="/about" render={_ => online ? <About /> : <Redirect to="/soon" />} />
                <Route path="/map" render={_ => online ? <Maps /> : <Redirect to="/soon" />} />
                <Route path="/soon" render={_ => online ? <Redirect to="/" /> : (
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
