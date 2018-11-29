import React, { Component } from 'react';
import { TimelineLite } from 'gsap/all';
import { firebaseDB } from '../App';
import ImageGallery from 'react-image-gallery';
import Loading from './Loading';
import "react-image-gallery/styles/css/image-gallery.css";
import './Gallery.css';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.tl = new TimelineLite();
    this.state = {
      ready: false,
      images: []
    }
  }

  getData() {
    firebaseDB.ref('/gallery').on('value', snapshots => {
      let images = snapshots.val();
      this.setState({ images, ready: true });
    })
  }

  animate() {
    let title = document.getElementsByClassName('gallery-title');
    let gallery = document.getElementsByClassName('gallery-container');
    this.tl.fromTo(title, 1, { opacity: 0, top: -50 }, { opacity: 1, top: 0 })
      .from(gallery, 1, { opacity: 1, top: 50 }, "-=1")
  }

  componentWillMount() {
    document.title = document.title.replace(/\|.*/, '| Gallery');
  }

  componentWillUnmount() {
    this.tl.kill();
  }

  componentDidUpdate() {
    this.animate();
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return this.state.ready ? (
      <div className="gallery-main-container">
        <div className="gallery-title">Our Wedding Gallery</div>
        <div className="gallery-container">
          <ImageGallery
            lazyLoad={true}
            autoPlay={true}
            showThumbnails={false}
            items={this.state.images}
          />
        </div>
      </div>
    ) : <Loading />
  }
}
