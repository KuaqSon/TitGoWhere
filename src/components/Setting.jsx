import React, { Component } from "react";
import "./Setting.css";

class Setting extends Component {
  loadLocalImage = e => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = r => {
      localStorage.img = r.target.result;
    };
    reader.readAsDataURL(files[0]);
    window.location.reload();
  };

  render() {
    return (
      <div className="text-right bottom-left">
        <div className="upload-btn-wrapper">
          <button className="btn-uploader">Choose image</button>
          <input type="file" name="myfile" onChange={e => this.loadLocalImage(e)} />
        </div>
      </div>
    );
  }
}

export default Setting;
