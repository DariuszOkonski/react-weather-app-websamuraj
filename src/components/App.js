import React from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

const APIkey = `APPID=a9302906cfdb7f28449954dd9590d745`;

class App extends React.Component {
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false,
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleCitySubmit = (e) => {
    e.preventDefault();

    if (this.state.value.length === 0) {
      this.setState({
        city: '',
        err: true,
      })
      alert('Type some city...');
      return;
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&${APIkey}&units=metric`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw Error('No city match: ' + this.state.value)
      })
      .then(data => {
        console.log(data);
        const time = new Date().toLocaleString()

        this.setState(prevState => ({
          err: false,
          date: time,
          city: prevState.value,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
        }));
      })
      .catch(err => {
        console.log(err)
        this.setState(prevState => ({
          err: true,
          city: prevState.value,
          date: '',
          sunrise: '',
          sunset: '',
          temp: '',
          pressure: '',
          wind: '',
        }));
      });
  }

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />

        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;

// a9302906cfdb7f28449954dd9590d745
// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=a9302906cfdb7f28449954dd9590d745&units=metric
// http://api.openweathermap.org/data/2.5/weather?q=Katowice&APPID=a9302906cfdb7f28449954dd9590d745&units=metric