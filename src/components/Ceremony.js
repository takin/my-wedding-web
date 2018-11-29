import React, { Component, forwardRef } from 'react';
import { TimelineMax } from 'gsap/all';
import { firebaseDB } from '../App';
import Loading from './Loading';
import { DateConverter } from '../helpers';
import './Ceremony.css';

const Card = forwardRef((props, ref) => {
  return (
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
  )
})

export default class Ceremony extends Component {
  constructor(props) {
    super(props)
    this.tm = new TimelineMax()
    this.state = {
      ready: false,
      items: {
        left: {
          title: null,
          body: null,
          eventDate: {
            date: null,
            month: null
          },
          eventTime: {
            start: null,
            end: null
          }
        },
        right: {
          title: null,
          body: null,
          eventDate: {
            date: null,
            month: null
          },
          eventTime: {
            start: null,
            end: null
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

  componentDidUpdate() {
    if (this.state.ready) {
      let screenWidth = document.body.scrollWidth;
      let firstCardOption = screenWidth > 400 ? [{ left: -100, opacity: 0 }, { left: 0, opacity: 1 }] : [{ bottom: -100, opacity: 0 }, { bottom: 0, opacity: 1 }]
      let secondCardOption = screenWidth > 400 ? [{ left: 100, opacity: 0 }, { left: 0, opacity: 1 }] : [{ bottom: 100, opacity: 0 }, { bottom: 0, opacity: 1 }]
      this.tm.fromTo(this.element.card.left, 1.3, ...firstCardOption)
        .fromTo(this.element.card.right, 1.3, ...secondCardOption, "-=1.3")
        .fromTo(this.element.pageTitle, 1.3, { top: -50, opacity: 0 }, { top: 0, opacity: 1 }, "-=1.3")
    }
  }

  componentDidMount() {
    firebaseDB.ref('/event').once('value').then(snapshots => {
      let leftItem = snapshots.child('0').val();
      let rightItem = snapshots.child('1').val();
      let leftDate = DateConverter(leftItem.date).id();
      let rightDate = DateConverter(rightItem.date).id();
      this.setState({
        ready: true,
        items: {
          left: {
            title: leftItem.title,
            body: leftItem.description,
            eventDate: {
              date: `${leftDate.day} ${leftDate.date}`,
              month: `${leftDate.month} ${leftDate.year}`
            },
            eventTime: {
              start: leftItem.startTime,
              end: leftItem.endTime
            }
          },
          right: {
            title: rightItem.title,
            body: rightItem.description,
            eventDate: {
              date: `${rightDate.day} ${rightDate.date}`,
              month: `${rightDate.month} ${rightDate.year}`
            },
            eventTime: {
              start: rightItem.startTime,
              end: rightItem.endTime
            }
          }
        }
      })
    });
  }
  render() {
    let keys = Object.keys(this.state.items);
    return this.state.ready ? (
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
    ) : <Loading />
  }
}
