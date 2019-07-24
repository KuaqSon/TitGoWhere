import React, { Component } from "react";
import "./FillName.css";

const NAME_LS = "NAME_LS";

class FillName extends Component {
  state = {
    inputValue: "",
    emptyText: true
  };

  submitName() {
    localStorage.setItem(NAME_LS, this.state.inputValue);
    window.location.reload();
  }

  handleChange = e => {
    const text = e.target.value;
    this.setState({ inputValue: text, emptyText: !text });
  };

  render() {
    const { emptyText } = this.state;
    return (
      <div>
        <div className="centered fill-name">
          <div>
            <input
              type="text"
              name="name"
              className="question"
              id="nme"
              required
              autoComplete="off"
              onChange={this.handleChange}
            />
            <label htmlFor="nme">
              <span>What's your name?</span>
            </label>
          </div>
          {!emptyText && <div className="d-flex justify-content-center mt-5">
            <button className="start-btt" onClick={() => this.submitName()}>Go</button>
          </div>}
        </div>
      </div>
    );
  }
}

export default FillName;
