import React, { Component } from 'react';
import Loading from './Loading';
import './Maps.css';
import { firebaseDB } from '../App';

const LinkButton = props => (
  <a href={props.url} target="_blank" className="link-button" rel="noopener noreferrer">{props.linkText}</a>
)

export default class Maps extends Component {

  state = {
    user: {
      available: false,
      latitude: null,
      longitude: null,
      accuracy: 1000,
    },
    event: {
      available: false,
      latitude: null,
      longitude: null
    },
    locationButtonPressed: false
  }

  handleAllow({ coords: { accuracy, latitude, longitude } }) {
    if (accuracy < 500) {
      this.setState({
        locationButtonPressed: true,
        user: {
          accuracy,
          longitude,
          latitude,
          available: true
        }
      })
    } else {
      this.setState({
        locationButtonPressed: true,
        user: {
          available: false
        }
      })
    }
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleAllow.bind(this),
        _ => this.setState({ locationButtonPressed: true })
      )
    }

    firebaseDB.ref('/event/location').on('value', snap => {
      let { latitude, longitude } = snap.val();
      this.setState({
        event: {
          available: false,
          latitude,
          longitude
        }
      })
    }, _ => {
      this.setState({
        event: {
          available: false
        }
      })
    })
  }
  render() {
    let { locationButtonPressed, user, event } = this.state
    if (locationButtonPressed) {
      return (
        <div style={{ flexDirection: 'column', alignItems: 'center' }}>
          <div>Our Wedding Location</div>
          <div className="map-image-container">
            <img src="images/map.png" alt="Peta Lokasi" />
          </div>
          <div>
            {
              user.latitude !== null &&
              user.longitude !== null &&
              event.latitude !== null &&
              event.longitude !== null &&
              <LinkButton url={`https://www.google.com/maps/dir/${event.latitude},${event.longitude}/${user.latitude},${user.longitude}`} linkText="Tuntun Saya Menuju Lokasi" />
            }
            {
              user.latitude === null &&
              user.longitude === null &&
              event.latitude !== null &&
              event.longitude !== null &&
              <LinkButton url={`https://www.google.com/maps/${event.latitude},${event.longitude}`} linkText="Lihat di Google Maps" />
            }
          </div>
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
