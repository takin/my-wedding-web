import React, { Component } from 'react';
import Loading from './Loading';

const LinkButton = props => (
  <a href={props.url} target="_blank" rel="noopener noreferrer">{props.linkText}</a>
)

export default class Maps extends Component {
  state = { latitude: null, longitude: null, accuracy: 1000, locationButtonPressed: false }
  handleAllow({ coords: { accuracy, latitude, longitude } }) {
    if (accuracy < 500) {
      this.setState({
        locationButtonPressed: true,
        latitude,
        longitude,
        accuracy
      })
    }
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handleAllow.bind(this), _ => this.setState({ locationButtonPressed: true }))
    }
  }
  render() {
    let { locationButtonPressed, latitude, longitude } = this.state
    if (locationButtonPressed) {
      return (
        <div>
          <img src="./maps.png" alt="Peta Lokasi" />
          {latitude !== null && longitude !== null && <LinkButton url="https://www.google.com/maps/dir/" linkText="Tuntun Saya Menuju Lokasi" />}
          {latitude === null && longitude === null && <LinkButton url="https://www.google.com/maps/" linkText="Lihat di Google Maps" />}
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>Tips</div>
        <div>
          Izinkan browser untuk mengakses lokasi Anda untuk dapat menggunakan fitur navigasi
          </div>
        <Loading />
      </div>
    )
  }
}
