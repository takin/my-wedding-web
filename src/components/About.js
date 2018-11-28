import React, { Component } from 'react'
import { firebaseDB } from '../App'
import Loading from './Loading';
import './About.css';

const Profile = (props) => (
  <div className="profile-container">
    <div className="profile-image-container">
      <img src={props.picture} alt="Profile" />
    </div>
    <div className="profie-text-container">
      <div className="profile-text-header">{props.name}</div>
      <div className="profile-text-body">{props.desc}</div>
    </div>
  </div>
);

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      suami: {
        name: null,
        picture: null,
        desc: null
      },
      istri: {
        name: null,
        picture: null,
        desc: null
      }
    }
  }

  componentWillMount() {
    document.title = document.title.replace(/\|.*/, '| About Us');
    firebaseDB.ref('/couple').once('value').then(snapshot => {
      let couple = snapshot.val();
      this.setState({
        ready: true,
        suami: {
          name: `${couple.suami.firstName} ${couple.suami.lastName}`,
          picture: couple.suami.picture,
          desc: couple.suami.description
        },
        istri: {
          name: `${couple.istri.firstName} ${couple.istri.lastName}`,
          picture: couple.istri.picture,
          desc: couple.istri.description
        }
      })
    });
  }

  render() {
    return this.state.ready ? (
      <div>
        <div className="profile-main-container">
          <Profile {...this.state.suami} />
          <Profile {...this.state.istri} />
        </div>
      </div>
    ) : <Loading />
  }
}
