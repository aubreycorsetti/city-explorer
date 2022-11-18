import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './Movie.css';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <section id = "wholeCard">
      <div id="movies">
      <section id="section1">
        <h3>{this.props.city}</h3>
          <div id='movieRecs'>
            {this.props.movies.map((movie, idx) => (
              <Card key={idx}>
                <section id="img">
                  {movie.imgPath &&
                <Card.Img variant="left" id={movie.title} alt={movie.title} src={movie.imgPath}/>
                  }
                </section>
                <Card.Body>
                  <div>
                  <div id="title">
                    <Card.Title>{movie.title}</Card.Title>
                  </div>
                  <div id="summary">
                    <h5>Summary:</h5>
                    <Card.Text>{movie.overview} </Card.Text>
                  </div>
                  </div>
                  </Card.Body>
                  <ListGroup id="list-group-flush">
                    <ListGroup.Item>Rating: {movie.avgRating}</ListGroup.Item>
                    <ListGroup.Item>Reviews: {movie.totalReviews}</ListGroup.Item>
                    <ListGroup.Item>Release Date: {movie.releaseDate}</ListGroup.Item>
                  </ListGroup>
                  
              </Card>
              ))
            }
          </div>
      </section>
    </div>
    </section>
    )

  }
}

export default Movie;