import React, { Component } from 'react';
import { firebaseDB } from '../App';
import { TimelineLite } from 'gsap/all';
import Loading from './Loading';
import './About.css';

const Profile = (props, ref) => {
  let imgClass = `${props.className} profile-image-container`;
  let nameClass = `${props.className} profile-text-header`;
  let descClass = `${props.className} profile-text-body`;
  return (
    <div className="profile-card-container">
      <div className={imgClass}>
        <img src={props.picture} alt="Profile" />
      </div>
      <div className="profie-text-container">
        <div className={nameClass}>{props.name}</div>
        <div className={descClass}>{props.desc}</div>
      </div>
    </div>
  )
};

export default class About extends Component {
  constructor(props) {
    super(props);
    this.tl = new TimelineLite();
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
      },
      info: null
    }
  }

  componentDidUpdate() {
    let profileHeader = document.getElementsByClassName('profile-header');
    let suami = document.getElementsByClassName('suami');
    let istri = document.getElementsByClassName('istri');
    let info = document.getElementsByClassName('couple-info');
    this.tl.staggerFrom(suami, 1, { opacity: 0, left: "-=40" }, .2)
      .staggerFrom(istri, 1, { opacity: 0, left: "+=40" }, .2, "-=1.5")
      .fromTo(profileHeader, 1, { opacity: 0, top: -50 }, { opacity: 1, top: 0 }, "-=1.5")
      .fromTo(info, 1, { opacity: 0, top: 70 }, { opacity: 1, top: 0 }, "-=1.5")
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
        },
        info: couple.info
      })
    });
  }

  render() {
    return this.state.ready ? (
      <div className="profile-main-container">
        <div className="profile-header">The Story of Us</div>
        <div className="profile-container">
          <Profile className="suami" {...this.state.suami} />
          <Profile className="istri" {...this.state.istri} />
        </div>
        <div className="couple-info">{this.state.info}</div>
      </div>
    ) : <Loading />
  }
}
