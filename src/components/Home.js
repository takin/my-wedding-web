import React, { Component, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { TimelineLite, TimelineMax } from 'gsap/all';
import './Home.css';

import { firebaseDB } from '../App'

const Circle = forwardRef(({ number, text }, ref) => {
  return (
    <div ref={ref} className="circle-item">
      <div className="circle-number">{number}</div>
      <div className="circle-text">{text}</div>
    </div>
  );
})

let dateCounter = (eventDate) => {
  let today = new Date();
  let todayTime = today.getTime();
  let timeRemaining = (eventDate - todayTime) / 1000;
  if (timeRemaining > 0) {
    return {
      done: false,
      counter: {
        hari: Math.floor(timeRemaining / 86400),
        jam: Math.floor((timeRemaining % 86400) / 3600),
        menit: Math.floor((timeRemaining % 3600) / 60),
        detik: 60 - today.getSeconds()
      }
    }
  }
  return {
    done: true,
    counter: {
      hari: Math.floor(Math.abs(timeRemaining) / 86400),
      jam: Math.floor(Math.abs((timeRemaining % 86400)) / 3600),
      menit: Math.floor(Math.abs((timeRemaining % 3600)) / 60),
      detik: today.getSeconds()
    }
  }
}

const Marriage = forwardRef(({ hasMarriage, event: { hari, jam, menit, detik } }, ref) => {
  if (hasMarriage) {
    return (
      <div className="body-main-container">
        <div className="body-text-container header-item">Alhamdulillah Kami Sudah Menikah</div>
        <div className="circle-container">
          <Circle number={hari} text="Hari" />
          <Circle number={jam} text="Jam" />
          <Circle number={menit} text="Menit" />
          <Circle number={detik} text="Detik" />
        </div>
        <div className="link-container">
          <Link to="gallery">Lihat Gallery</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="body-text-container header-item">Insya Allah Kami Akan Menikah</div>
      <div className="circle-container">
        <Circle number={hari} text="Hari" />
        <Circle number={jam} text="Jam" />
        <Circle number={menit} text="Menit" />
        <Circle number={detik} text="Detik" />
      </div>
      <div className="link-container">
        <Link to="rsvp">Saya Akan Hadir</Link>
      </div>
    </div>
  )

})

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.countdownElement = null;
    this.animationTimeout = null;
    this.animationState = 0; // 0 = not started, 1 = started, 2 = completed
    this.tl = new TimelineLite();
    this.state = {
      ready: false,
      suami: 'Syamsul',
      istri: 'Marlina',
      hasMarriage: false,
      eventDate: null,
      counter: {
        hari: 0,
        jam: 0,
        menit: 0,
        detik: 0
      }
    }
  }

  getData() {
    firebaseDB.ref('/').on('value', snapshots => {
      let mainDate = snapshots.child('event/0/date').val();
      let suami = snapshots.child('couple/suami/firstName').val();
      let istri = snapshots.child('couple/istri/lastName').val();
      let eventDate = new Date(mainDate).getTime();
      console.log(eventDate, mainDate, new Date(mainDate));
      this.setState({
        eventDate,
        suami,
        istri
      })
    })
  }

  componentWillUnmount() {
    this.tl.kill();
    clearInterval(this.countdownElement);
    clearTimeout(this.animationTimeout);
  }

  componentWillMount() {
    document.title = document.title.replace(/\|.*/, '| Welcome');
  }

  animate() {
    let circles = document.getElementsByClassName('circle-item');
    let headers = document.getElementsByClassName('header-item');
    let linkButton = document.getElementsByClassName('link-container');
    this.tl
      .staggerFromTo(headers, 1, { top: "-=60", opacity: 0 }, { top: 0, opacity: 1 }, 0.1)
      .staggerFromTo(circles, 1, { top: "+=80", opacity: 0, rotationY: 360, scale: .5 }, { top: 0, rotationY: 0, opacity: 1, scale: 1 }, 0.3, "-=.8")
      .fromTo(linkButton, .6, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1 }, "-=0.8")
      .eventCallback('onComplete', _ => {
        let tw = new TimelineMax({ repeat: -1 })
        tw.to(circles[1], 1, { scale: 1.1 })
          .to(circles[2], 1, { scale: 1.1 }, "-=1")
          .to(circles[0], 1, { scale: 1.1 }, "-=0.8")
          .to(circles[3], 1, { scale: 1.1 }, "-=1")
          .to(circles[1], 1, { scale: 1 })
          .to(circles[2], 1, { scale: 1 }, "-=1")
          .to(circles[0], 1, { scale: 1 }, "-=.8")
          .to(circles[3], 1, { scale: 1 }, "-=1");
        this.animationState = 2;
      });
  }

  componentDidMount() {
    this.getData();
    this.countdownElement = setInterval(_ => {
      if (this.state.eventDate !== null) {
        let { done, counter } = dateCounter(this.state.eventDate);
        this.setState({
          ready: true,
          hasMarriage: done,
          counter
        })
      }
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.ready && this.animationState === 0) {
      this.animationState = 1;
      this.animate();
    }
  }

  render() {
    let { ready, suami, istri, hasMarriage, counter } = this.state;
    return ready ? (
      <div className="home-main-container" >
        <div className="home-header-container">
          <span className="suami header-item">{suami}</span>
          <span className="header-item heart"> ❤︎ </span>
          <span className="istri header-item">{istri}</span>
        </div>
        <Marriage event={counter} hasMarriage={hasMarriage} />
      </div>
    ) : <Loading />;
  }
}