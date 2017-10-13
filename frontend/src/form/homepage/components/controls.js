import React, {Component} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button, Container} from 'semantic-ui-react'
import {sortPosts} from 'src/actions/posts'
import {postResetted} from 'src/actions/post'

class HomepageControls extends Component {
  newPost = () => {
    this.props.postResetted()
    this.props.history.push('/new')
  }

  render () {
    const {sortPosts} = this.props
    return (
      <Container>
        <Button.Group fluid>
          <Button primary onClick={this.newPost}>
            Add new post
          </Button>
          <Button onClick={() => sortPosts('title')}>Sort by Title</Button>
          <Button onClick={() => sortPosts('-timestamp')}>
            Sort by Newest
          </Button>
          <Button onClick={() => sortPosts('timestamp')}>Sort by Oldest</Button>
          <Button onClick={() => sortPosts('-voteScore')}>Sort by Score</Button>
        </Button.Group>
      </Container>
    )
  }
}

const mapStateToProps = ({categories, posts}) => ({categories, posts})
const mapDispatchToProps = {sortPosts, postResetted}
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhance(HomepageControls)
