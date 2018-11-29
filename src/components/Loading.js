import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    let text = this.props.text || "Menunggu...";
    return (
      <div className="loading-container">
        <div className="lds-heart">
          <div></div>
        </div>
        <div className="loading-text">{text}</div>
      </div>
    )
  }
}
