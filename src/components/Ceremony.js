import React, { Component, forwardRef } from 'react';
import { TimelineMax } from 'gsap/all';
import './Ceremony.css';

const Card = forwardRef((props, ref) => (
  <div ref={ref} className="card-container">
    <div className="card-title">{props.title}</div>
    <div className="card-body-container">
      <div className="card-time-container">
        <span className="">
        </span>
        <span className="start-time">{props.eventTime.start}</span>
        <span className="end-time">{props.eventTime.end}</span>
      </div>
      <div className="card-date-container">
        <span className=""></span>
        <span className="start-time">{props.eventDate.date}</span>
        <span className="end-time">{props.eventDate.month}</span>
      </div>
    </div>
    <div className="card-item-body">{props.body}</div>
  </div>
))

export default class Ceremony extends Component {
  constructor(props) {
    super(props)
    this.tm = new TimelineMax()
    this.state = {
      items: {
        left: {
          title: 'Main Ceremony',
          body: `Acara pengucapan Ijab dan Qobul Akad Nikah 
      yang juga dirangkaikan dengan acara tasyakuran yang 
      ditujukan khusus untuk tamu undangan yang berasal dari luar`,
          eventDate: {
            date: 'Rabu 12',
            month: 'Desember'
          },
          eventTime: {
            start: '08.00 Pagi',
            end: '12.00 Siang'
          }
        },
        right: {
          title: 'Second Ceremony',
          body: `Acara tasyakuran hari kedua yang ditujukan 
      khusus untuk warga sekitar yang akan dilanjutkan 
      dengan acara Nyongkolan ke rumah mempelai wanita`,
          eventDate: {
            date: 'Kamis 13',
            month: 'Desember'
          },
          eventTime: {
            start: '08.00 Pagi',
            end: '12.00 Siang'
          }
        }
      }
    }
    this.element = {
      pageTitle: "",
      card: {
        left: null,
        right: null
      }
    }
  }
  componentWillUnmount() {
    this.tm.kill();
  }
  componentWillMount() {
    document.title = document.title.replace(/\|.*/, '| Event Date');
  }
  componentDidMount() {
    this.tm.fromTo(this.element.card.left, 1.3, { left: -100, opacity: 0 }, { left: 0, opacity: 1 })
      .fromTo(this.element.card.right, 1.3, { left: 100, opacity: 0 }, { left: 0, opacity: 1 }, "-=1.3")
      .fromTo(this.element.pageTitle, 1.3, { top: -50, opacity: 0 }, { top: 0, opacity: 1 }, "-=1.3")

  }
  render() {
    let keys = Object.keys(this.state.items);
    return (
      <div className="ceremony-container" >
        <div ref={div => this.element.pageTitle = div} className="ceremony-page-title">Our Wedding Event</div>
        <div className="card-main-container">
          {
            keys.map((key, index) => (
              <Card key={index} ref={div => this.element.card[key] = div} {...this.state.items[key]} />
            ))
          }
        </div>
      </div >
    )
  }
}
