import React, { Component } from 'react';
import { TimelineLite } from 'gsap/all';
import { firebaseDB } from '../App';
import Loading from './Loading';
import './Rsvp.css';

const Form = props => {

  const handleChange = e => {
    if (typeof (props.changeHandler) === 'function') {
      props.changeHandler(e);
    }
  }
  return (
    <div className="form-containter">
      <input className="form-item" onChange={handleChange} type="text" id="nama" placeholder="Nama Lengkap" />
      <input className="form-item" onChange={handleChange} type="text" id="gelar" placeholder="Gelar" />
      <div>
        <textarea className="form-item" onChange={handleChange} type="textarea" id="alamat" placeholder="Alamat Lengkap" />
      </div>
      <button className="form-item" onClick={props.submitHandler}>Saya Akan Hadir!</button>
    </div>
  )
}

export default class Rsvp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      submitted: false,
      nama: null,
      gelar: null,
      alamat: null
    }
  }

  handleChange(e) {
    switch (e.target.id) {
      case 'nama':
        this.setState({ nama: e.target.value });
        break;
      case 'alamat':
        this.setState({ alamat: e.target.value });
        break;
      default:
        this.setState({ gelar: e.target.value });
    }
  }

  handleSubmit() {
    let data = this.state;
    delete data.loading;
    delete data.submitted;
    this.setState({ loading: true })
    firebaseDB.ref('/undangan').push({ ...data }).then(snap => (
      this.setState({ loading: false, submitted: true })
    ))
  }

  componentWillMount() {
    document.title = document.title.replace(/\|.*/, '| RSVP');
  }

  componentDidMount() {
    let tl = new TimelineLite()
    let header = document.getElementsByClassName('rsvp-header')
    let forms = document.getElementsByClassName('form-item')
    tl.fromTo(header, 1, { opacity: 0, top: -50 }, { opacity: 1, top: 0 })
      .staggerFrom(forms, 1, { opacity: 0, top: "+=50" }, .2, "-=1")
  }

  render() {
    let { submitted, loading } = this.state;

    return (
      <div className="rsvp-container">
        <div className="rsvp-header">Kindly Fill The Form</div>
        <div className="rsvp-body">
          {
            loading ? <Loading /> : submitted ? <div>Terima Kasih, Sampai jumpa di hari bahagia Kami</div> : <Form changeHandler={this.handleChange.bind(this)} submitHandler={this.handleSubmit.bind(this)} />
          }
        </div>
      </div>
    )
  }
}
