import * as React from 'react'
import { GenreModel } from '../types/GenreModel'
import { Genre } from './Genre'
import { getGenres } from '../api/genres-api'
import { Card, Button, Divider } from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'

interface GroupsListProps {
  history: History
  auth: Auth
}

interface GroupsListState {
  groups: GenreModel[]
}

export class GenresList extends React.PureComponent<GroupsListProps, GroupsListState> {
  state: GroupsListState = {
    groups: []
  }

  handleCreateGroup = () => {
    this.props.history.push(`/groups/create`)
  }

  async componentDidMount() {
    try {
      const groups = await getGenres(this.props.auth.getIdToken())
      this.setState({
        groups
      })
    } catch (e) {
      alert(`Failed to fetch genres: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Genres</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateGroup}
        >
          Add new genre
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.groups.map(group => {
            return <Genre key={group.id} group={group} />
          })}
        </Card.Group>
      </div>
    )
  }
}
