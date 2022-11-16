import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <>
        {this.props.date}
        {this.props.description}
      </>
    )

  }
}

export default Weather;