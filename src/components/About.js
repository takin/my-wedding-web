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

  getData() {
    firebaseDB.ref('/couple').on('value', snapshot => {
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

  animate() {
    let screenWidth = document.body.scrollWidth;
    let profileHeader = document.getElementsByClassName('profile-header');
    let suami = document.getElementsByClassName('suami');
    let istri = document.getElementsByClassName('istri');
    let info = document.getElementsByClassName('couple-info');
    let staggerPropsSuami = screenWidth < 400 ? { opacity: 0, top: "+=40" } : { opacity: 0, left: "-=40" };
    let staggerPropsIstri = screenWidth < 400 ? { opacity: 0, top: "-=40" } : { opacity: 0, left: "+=40" };
    this.tl.staggerFrom(suami, 1, staggerPropsSuami, .2)
      .staggerFrom(istri, 1, staggerPropsIstri, .2, "-=1.5")
      .fromTo(profileHeader, 1, { opacity: 0, top: -50 }, { opacity: 1, top: 0 }, "-=1.5")
      .fromTo(info, 1, { opacity: 0, top: 70 }, { opacity: 1, top: 0 }, "-=1.5")
  }

  componentDidUpdate() {
    this.animate();
  }

  componentDidMount() {
    this.getData();
  }

  componentWillMount() {
    document.title = document.title.replace(/\|.*/, '| About Us');
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
