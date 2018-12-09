import React, { Component } from 'react';
import Loading from './Loading';
import './Maps.css';
import { firebaseDB } from '../App';
import { TimelineLite } from 'gsap/all';

const LinkButton = props => (
  <a href={props.url} target="_blank" className="link-button" rel="noopener noreferrer">{props.linkText}</a>
)

export default class Maps extends Component {

  tl = new TimelineLite();
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
    }, err => {
      this.setState({
        event: {
          available: false
        }
      })
    })
  }

  componentDidUpdate() {
    let header = document.getElementsByClassName('page-title');
    let image = document.getElementsByClassName('map-image-container');
    let button = document.getElementsByClassName('button-continer');
    this.tl.from(header, 1, { opacity: 0, top: -50 });
  }

  render() {
    let { locationButtonPressed, user, event } = this.state
    if (locationButtonPressed) {
      return (
        <div style={{ flexDirection: 'column', alignItems: 'center' }}>
          <div className="page-title">Our Wedding Location</div>
          <div className="map-image-container">
            <img src="images/map.png" alt="Peta Lokasi" />
          </div>
          <div className="button-container">
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
              <LinkButton url={`https://www.google.com/maps/place/Masjid+Nurul+Huda+Bangket+lauq/@-8.6049778,116.4538586,17.87z/data=!4m5!3m4!1s0x2dcc4be68813fc7b:0x83c8e47d4ac4daed!8m2!3d-8.6048364!4d116.4542996`} linkText="Lihat di Google Maps" />
            }
          </div>
        </div>
      )
    }

    return (
      <div className="map-loading-container">
        <div className="tips-header">Tips</div>
        <div className="tips-body">
          Izinkan browser untuk mengakses lokasi Anda untuk dapat menggunakan fitur navigasi
          </div>
        <Loading />
      </div>
    )
  }
}
