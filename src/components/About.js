import React, { Component } from 'react'
import './About.css';

const Profile = (props) => (
  <div className="profile-container">
    <div className="profile-image-container">
      <img src={props.img} alt="Profile" />
    </div>
    <div className="profie-text-container">
      <div className="profile-text-header">{props.name}</div>
      <div className="profile-text-body">{props.text}</div>
    </div>
  </div>
);

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suami: {
        name: 'Syamsul Muttaqin',
        img: 'https://firebasestorage.googleapis.com/v0/b/sm-bm-wedding.appspot.com/o/IMG_8753.JPG?alt=media&token=7766b29d-6d95-42db-bd51-32d6368c2311',
        text: 'lorem ipsum'
      },
      istri: {
        name: 'Baiq Marlina',
        img: 'https://firebasestorage.googleapis.com/v0/b/sm-bm-wedding.appspot.com/o/IMG_8752.JPG?alt=media&token=75149915-f3a3-43e1-9ae7-898d0ef350b9',
        text: 'lorem ipsum'
      }
    }
  }
  render() {
    return (
      <div>
        <div className="profile-main-container">
          <Profile {...this.state.suami} />
          <Profile {...this.state.istri} />
        </div>
      </div>
    )
  }
}
