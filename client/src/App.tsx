import React, { Component } from 'react'
import { GenresList } from './components/GenresList'
import { Router, Link, Route, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { MoviesList } from './components/moviesList'
import { NotFound } from './components/NotFound'
import { LogIn } from './components/LogIn'
import { CreateMovie } from './components/CreateMovie'
import { CreateGenre } from './components/CreateGenre'
import Auth from './auth/Auth'

export interface AppProps { }

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState { }

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <Menu>
        <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {

    if (!this.props.auth.isAuthenticated()) {
      return <LogIn auth={this.props.auth} />
    }

    return (
      <Switch>
        <Route
          path="/groups/create"
          exact
          render={props => {
            return <CreateGenre {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/images/:groupId"
          exact
          render={props => {
            return <MoviesList  {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/images/:groupId/create"
          exact
          render={props => {
            return <CreateMovie {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/"
          exact
          render={props => {
            return <GenresList {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
