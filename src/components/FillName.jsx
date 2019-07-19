import React, { Component } from "react";
import "./FillName.css";

const NAME_LS = "NAME_LS";

class FillName extends Component {
  state = {
    inputValue: ""
  };

  submitName() {
    localStorage.setItem(NAME_LS, this.state.inputValue);
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <div className="fill-name">
      </div>
    );
  }
}

export default FillName;
