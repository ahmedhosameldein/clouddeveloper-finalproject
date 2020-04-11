import * as React from 'react'
import { MovieModel } from '../types/MovieModel'
import { getMovies, deleteMovie } from '../api/movies-api'
import { Card, Divider, Button } from 'semantic-ui-react'
import { Movie } from './Movie'
import { History } from 'history'
import Auth from '../auth/Auth'

interface ImagesListProps {
  history: History
  auth: Auth
  match: {
    params: {
      groupId: string
    }
  }
}

interface ImagesListState {
  images: MovieModel[]
}

export class MoviesList extends React.PureComponent<
  ImagesListProps,
  ImagesListState
  > {
  state: ImagesListState = {
    images: []
  }

  handleCreateImage = () => {
    this.props.history.push(`/images/${this.props.match.params.groupId}/create`)
  }

  onMovieDelete = async (movieId: string) => {
    try {
      console.log('Movie deleted:', movieId)
      await deleteMovie(this.props.auth.getIdToken(), movieId)
      this.setState({
        images: this.state.images.filter(img => img.movieId != movieId)
      })
    } catch {
      alert('Movie deletion failed')
    }
  }


  async componentDidMount() {
    try {
      const images = await getMovies(this.props.auth.getIdToken(), this.props.match.params.groupId)
      this.setState({
        images
      })
    } catch (e) {
      alert(`Failed to fetch movies for genre : ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Movies</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateImage}
        >
          Add new movie
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.images.map(image => {
            return <Movie key={image.movieId} image={image} onDelete={this.onMovieDelete} />
          })}
        </Card.Group>

      </div>
    )
  }
}
