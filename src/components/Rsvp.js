import React, { Component } from 'react';
import { TimelineLite } from 'gsap/all';
import { firebaseDB } from '../App';
import Loading from './Loading';
import * as QRCode from 'qrcode.react';
import { QRURLBuilder } from '../helpers';
import './Rsvp.css';

const Form = props => {

  const handleChange = e => {
    if (typeof (props.changeHandler) === 'function') {
      props.changeHandler(e);
    }
  }
  return (
    <div className="form-containter">
      <div className="nama-gelar-container">
        <input className="form-item" onChange={handleChange} type="text" id="nama" placeholder="Nama Lengkap" />
        <input className="form-item" onChange={handleChange} type="text" id="gelar" placeholder="Gelar" />
      </div>
      <div className="alamat-container">
        <textarea className="form-item" onChange={handleChange} type="textarea" id="alamat" placeholder="Alamat Lengkap" />
      </div>
      <div className="submit-button-container">
        <button className="form-item" onClick={props.submitHandler}>Saya Akan Hadir!</button>
      </div>
    </div>
  )
}

const ShowQRCode = props => (
  <div className="qr-main-container">
    <div className="qr-header-container">
      <h1>Terima Kasih</h1>
      <p>
        Sampai jumpa di hari bahagia Kami. Mohon tunjukkan QR Code berikut ini kepada bagian resepsionis
        untuk di scan di lokasi acara untuk mengambil souvenir yang telah kami siapkan
      </p>
    </div>
    <div className="qr-container">
      <QRCode value={QRURLBuilder(props.url)} />
    </div>
  </div>
);

export default class Rsvp extends Component {

  constructor(props) {
    super(props);
    this.tl = new TimelineLite();
    this.state = {
      QRurl: localStorage.getItem('qrurl') || null,
      message: null,
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
    if (this.state.nama !== null && this.state.gelar !== null && this.state.alamat !== null) {
      let data = this.state;
      delete data.loading;
      delete data.submitted;
      this.animate(true).then(_ => {
        this.setState({ loading: true })
        firebaseDB.ref('/undangan').push({ ...data, hadir: false })
          .then(snap => {
            localStorage.setItem('qrurl', snap.key);
            this.setState({ loading: false, submitted: true, QRurl: snap.key });
          })
          .catch(e => console.log(e))
      })
    } else {
      this.setState({
        message: 'Mohon untuk melengkapi semua data'
      })
    }
  }

  animate(reverse) {
    let header = document.getElementsByClassName('rsvp-header')
    let forms = document.getElementsByClassName('form-item')
    return new Promise(resolve => {
      if (reverse) {
        this.tl.staggerFromTo(forms, 1, { opacity: 1, top: 0 }, { opacity: 0, top: "+=50" }, .2);
      } else {
        this.tl.fromTo(header, 1, { opacity: 0, top: -50 }, { opacity: 1, top: 0 })
          .staggerFrom(forms, 1, { opacity: 0, top: "+=50" }, .2, "-=1");
      }
      this.tl.eventCallback('onComplete', _ => resolve())
    })
  }

  componentWillMount() {
    document.title = document.title.replace(/\|.*/, '| RSVP');
  }

  componentWillUnmount() {
    this.tl.kill();
  }

  componentDidUpdate() {
    if (this.state.message !== null) {
      setTimeout(_ => {
        this.setState({ message: null })
      }, 1500);
    }
  }

  componentDidMount() {
    this.animate();
  }

  render() {
    let { QRurl, loading } = this.state;

    if (QRurl !== null) {
      return <ShowQRCode url={QRurl} />
    }

    return (
      <div className="rsvp-container">
        <div className="rsvp-header">Kindly Fill The Form</div>
        <div className="rsvp-body">
          {
            loading ? <Loading /> : <Form changeHandler={this.handleChange.bind(this)} submitHandler={this.handleSubmit.bind(this)} />
          }
        </div>
        <div className="rejected-message">{this.state.message}</div>
      </div>
    )
  }
}
