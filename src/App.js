
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
//eslint-disable-next-line no-unused-vars
import Apps from './Apps.css'
import Weather from './Weather.js';





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      weatherData: [],
      isError: false,
      errorMessage: ''
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleCitySubmit = async (event) => {

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

    try {
      event.preventDefault();

      let locationInfo = await axios.get(url);
      this.setState({
        cityData: locationInfo.data[0],
        isError: false
      }, this.handleWeather);

     
    }
    catch (error) {
      console.log('error: ', error);
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }

  handleWeather = async () => {
    let url = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`;
    let weatherData = await axios.get(url);
    console.log(weatherData.data)

    this.setState({
      weatherData: weatherData.data
    })
    
  }


  render() {
    //console.log(this.state.weatherData);

    let weatherDisplay = this.state.weatherData.map(weatherData => {
      console.log(weatherData);
      return <Weather
      date = {weatherData.date}
      description = {weatherData.description}
      />
    });

    let display = '';
    if(this.state.isError) {
      display=<p>Oops! There is an Error there!</p>
    } else {
      display = <ul class="ul1">
        <ul>City: {this.state.cityData.display_name}</ul>
        <ul>Latitude: {this.state.cityData.lat}</ul>
        <ul>Longitude: {this.state.cityData.lon}</ul>
        {/* <li>Weather: {this.state.weatherData.data}</li> */}
      </ul>
    }

    return (
      <>
        <h1>Explore Today</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label>
            <input name='city' onChange={this.handleCityInput} placeholder="ex: Seattle"/>
          </label>
          <button type="submit">Explore!</button>
        </form>
        {this.state.isError ? <p>{this.state.errorMessage}</p> : <ul></ul>}
        {display}
        
        <img className ="image" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt={this.state.cityData.display_name} />

        {this.state.isError ? <Alert className="alert" variant="danger"><Alert.Heading>Oops! There is an Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert"></p>}

        <article>
        {weatherDisplay}
          </article>

        </>
          
    );
  }

}

export default App;
