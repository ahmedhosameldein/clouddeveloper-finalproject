import * as React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import { MovieModel } from '../types/MovieModel'

interface ImageCardProps {
  image: MovieModel
  onDelete: (movieId: string) => void
}

interface ImageCardState { }

export class Movie extends React.PureComponent<
  ImageCardProps,
  ImageCardState
  > {

  render() {
    return (
      <Card fluid color="red">
        <Card.Content>
          <Card.Header>{this.props.image.title}</Card.Header>
          <Card.Description>{this.props.image.timestamp}</Card.Description>
          {this.props.image.imageUrl && (
            <Image src={this.props.image.imageUrl} />
          )}
          <Button floated="right"
            icon
            color="red"
            onClick={() => this.props.onDelete(this.props.image.movieId)}
          >
            <Icon name="delete" />
          </Button>
        </Card.Content>
      </Card >
    )
  }
}
