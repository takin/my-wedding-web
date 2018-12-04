import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TimelineLite } from 'gsap/all';
import './Menu.css';

export default class Menu extends Component {
  tl = new TimelineLite();
  state = {
    menus: [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'About Us',
        path: 'about',
      },
      {
        name: 'Gallery',
        path: 'gallery',
      },
      {
        name: 'Ceremony',
        path: 'ceremony',
      },
      {
        name: 'RSVP',
        path: 'rsvp',
      },
      {
        name: 'Location',
        path: 'map',
      }
    ]
  }

  componentDidMount() {
    let title = document.getElementsByClassName('menu-left-title-container')
    let menus = document.getElementsByTagName('li')
    this.tl.from(title, 1, { autoAlpha: 0, left: -50 })
      .staggerFrom(menus, 1, { top: "+=30", opacity: 0 }, .2, "-=1")
  }
  render() {
    return (
      <div className="menu-main-container">
        <div className="menu-left-title-container">Wedding.</div>
        <div className="menu-list-container">
          <ul>
            {
              this.state.menus.map((menu, index) => (
                <li key={index}>
                  <Link to={menu.path}>
                    {menu.name}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}
