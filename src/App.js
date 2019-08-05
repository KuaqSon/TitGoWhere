import React, { Component } from "react";
import { DateTime } from "luxon";
import Quote from "./components/Quote";
import FillName from "./components/FillName";
import "./App.css";

const NAME_LS = "NAME_LS";

class TitGoWhere extends Component {
  constructor() {
    super();

    var time = this.getTime();

    this.state = {
      time,
      name: "",
      isNameRequired: false,
      salutation: this.determineSalutation(time.hour),
      quote: null,
      geolocation: {
        latitude: null,
        longitude: null
      },
      location: null,
      temperature: null,
      weatherAPIKey: "594d083c4f45203a1d8cf6c1f7dd0a0b",
      weatherIcon: null,
      modalIsOpen: false,
      nameEmpty: false,
      inputValue: ""
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.setState({ name: this.state.inputValue });
    localStorage.setItem(NAME_LS, this.state.inputValue);
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  componentWillMount() {
    // navigator.geolocation.getCurrentPosition(
    //   position =>
    //     this.setState(
    //       {
    //         geolocation: {
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude
    //         }
    //       },
    //       () => this.updateWeather()
    //     ),
    //   (e) => {
    //     console.log(e);
    //   }
    // );
    this.updateWeather();
  }

  componentDidMount() {
    const name = localStorage.getItem(NAME_LS);
    if (name) {
      this.setState({ name });
    } else {
      this.setState({ nameEmpty: true });
    }

    setInterval(() => {
      var time = DateTime.local();
      this.setState({
        time,
        salutation: this.determineSalutation(time.hour)
      });
    }, 1000 * 1);
  }

  determineSalutation(hour) {
    if (hour > 11 && hour < 19) {
      return "afternoon";
    } else if (hour > 18) {
      return "evening";
    } else {
      return "morning";
    }
  }

  determineWeatherCondition(str) {
    switch (str) {
      case "Rain":
        return "wi-day-rain";
      case "Thunderstorm":
        return "wi-day-thunderstorm";
      case "Drizzle":
        return "wi-day-showers";
      case "Extreme":
        return "wi-day-snow-thunderstorm";
      case "Snow":
        return "wi-day-snow";
      case "Clouds":
        return "wi-day-cloudy";
      case "Clear":
        return "wi-day-sunny";
      default:
        return null;
    }
  }

  updateWeather() {
    // fetch(
    //   `http://api.openweathermap.org/data/2.5/weather?APPID=${
    //     this.state.weatherAPIKey
    //   }&lat=${this.state.geolocation.latitude}&lon=${
    //     this.state.geolocation.longitude
    //   }`
    // )
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?APPID=${
        this.state.weatherAPIKey
      }&lat=10.762622&lon=106.660172`
    )
      .then(resp => resp.json())
      .then(resp =>
        this.setState({
          location: resp.name,
          temperature: Math.round(resp.main.temp - 273.15),
          weatherIcon: this.determineWeatherCondition(resp.weather[0].main)
        })
      )
      .catch(e => console.log(e));
  }

  getTime() {
    return DateTime.local();
  }

  getCurrentDateString() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    return dd + "-" + mm + "-" + yyyy;
  }

  getBGStyle(category = "VN") {
    return {
      // backgroundImage: `url(https://source.unsplash.com/1600x900/daily?${category})`,
      // backgroundImage: `url(./img/bg.jpg)`,
      // backgroundImage: "url(https://source.unsplash.com/1600x900/daily)",
      backgroundImage: "url(https://picsum.photos/1600/900)",
      backgroundSize: "cover",
      height: "100vh",
      backgroundColor: "#2f4f4f"
    };
  }

  render() {
    const { nameEmpty } = this.state;

    return (
      <div style={this.getBGStyle(this.state.category)}>
        <div className="bg-wrapper">
          {nameEmpty && <FillName />}
          {!nameEmpty && (
            <div>
              <div className="text-right top-right weather">
                <div>
                  <i className={`wi ${this.state.weatherIcon}`} />
                  &nbsp;
                  <span id="weather" />
                  {this.state.temperature}&#8451;
                </div>
                <h5 id="location">{this.state.location}</h5>
                <div>{this.getCurrentDateString()}</div>
              </div>
              <div className="text-center centered">
                <div className="block-text">
                  <h1 id="time">{this.state.time.toFormat("h':'mm")}</h1>
                  <h2 id="ampm">{this.state.time.toFormat("a")}</h2>
                </div>
                <h5 className="text-white text-left">
                  Good {this.state.salutation}!
                </h5>
                <h3 id="greetings">{this.state.name}</h3>
              </div>
              <div className="bottom-third quote">
                <Quote />
              </div>
              <div className="text-right bottom-right">
                <div id="settings-text">
                  <div>
                    <i className="fa fa-exclamation-circle" />
                    Made by: Quang Son Nguyen
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TitGoWhere;
