import React, { Component } from 'react';
import { TimelineLite } from 'gsap/all';
import './Rsvp.css';

export default class Rsvp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nama: null,
      gelar: null
    }
  }

  handleChange(e) {
    if (e.target.id === 'nama') {
      this.setState({ nama: e.target.value });
    } else {
      this.setState({ gelar: e.target.value });
    }
  }

  handleSubmit() {
    console.log(this.state)
  }

  componentDidMount() {
    let tl = new TimelineLite()
    let header = document.getElementsByClassName('rsvp-header')
    let forms = document.getElementsByClassName('form-item')
    tl.fromTo(header, 1, { opacity: 0, top: -50 }, { opacity: 1, top: 0 })
      .staggerFrom(forms, 1, { opacity: 0, top: "+=50" }, .2, "-=1")
  }

  render() {
    return (
      <div className="rsvp-container">
        <div className="rsvp-header">Kindly Fill The Form</div>
        <div className="rsvp-body">
          <input className="form-item" onChange={this.handleChange.bind(this)} type="text" id="nama" placeholder="Nama Lengkap" />
          <input className="form-item" onChange={this.handleChange.bind(this)} type="text" id="gelar" placeholder="Gelar" />
          <button className="form-item" onClick={this.handleSubmit.bind(this)}>Saya Akan Hadir!</button>
        </div>
      </div>
    )
  }
}
