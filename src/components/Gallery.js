import React, { Component } from 'react';
import { TimelineLite } from 'gsap/all';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './Gallery.css';

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.tl = new TimelineLite();
    this.state = {
      images: [{
        original: 'https://firebasestorage.googleapis.com/v0/b/sm-bm-wedding.appspot.com/o/IMG_8753.JPG?alt=media&token=7766b29d-6d95-42db-bd51-32d6368c2311',
        thumbnail: 'Lorem ipsum',
        originalClass: 'image-item'
      }, {
        original: 'https://firebasestorage.googleapis.com/v0/b/sm-bm-wedding.appspot.com/o/IMG_8752.JPG?alt=media&token=75149915-f3a3-43e1-9ae7-898d0ef350b9',
        thumbnail: 'Lorem ipsum',
        originalClass: 'image-item'
      }, {
        original: 'https://firebasestorage.googleapis.com/v0/b/sm-bm-wedding.appspot.com/o/IMG_8743.JPG?alt=media&token=118a64fe-bb87-4587-9f4a-6bad4e17e328',
        thumbnail: 'Lorem ipsum',
        originalClass: 'image-item'
      }, {
        original: 'https://firebasestorage.googleapis.com/v0/b/sm-bm-wedding.appspot.com/o/IMG_8739.JPG?alt=media&token=51cb6176-5563-43f4-9999-f77a41b3c629',
        thumbnail: 'Lorem ipsum',
        originalClass: 'image-item'
      }]
    }
  }
  componentWillUnmount() {
    this.tl.kill();
  }
  componentDidMount() {
    let title = document.getElementsByClassName('gallery-title');
    let gallery = document.getElementsByClassName('gallery-container');
    this.tl.fromTo(title, 1, { opacity: 0, top: -50 }, { opacity: 1, top: 0 })
      .from(gallery, 1, { opacity: 1, top: 50 }, "-=1")
  }
  render() {
    return (
      <div className="gallery-main-container">
        <div className="gallery-title">Our Wedding Gallery</div>
        <div className="gallery-container">
          <ImageGallery showThumbnails={false} items={this.state.images} />
        </div>
      </div>
    )
  }
}
