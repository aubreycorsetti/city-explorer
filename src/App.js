
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
import Apps from './Apps.css'





class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
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
      });

     
    }
    catch (error) {
      console.log('error: ', error);
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }


  render() {

    let display = '';
    if(this.state.isError) {
      display=<p>Oops! There is an Error there!</p>
    } else {
      display = <ul>
        <li>City: {this.state.cityData.display_name}</li>
        <li>Latitude: {this.state.cityData.lat}</li>
        <li>Longitude: {this.state.cityData.lon}</li>
      </ul>
    }

    return (
      <>
        <h1>Explore the City</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label>
            <input name='city' onChange={this.handleCityInput} placeholder="ex: Seattle"/>
          </label>
          <button type="submit">Explore!</button>
        </form>
        {this.state.isError ? <p>{this.state.errorMessage}</p> : <ul></ul>}
        {display}
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt={this.state.cityData.display_name} />

        {this.state.isError ? <Alert className="alert" variant="danger"><Alert.Heading>Oops! There is an Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert">Great Location!</p>}


        </>
          
    );
  }

}

export default App;
