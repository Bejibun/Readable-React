import React, {Component} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Icon, Button, Segment} from 'semantic-ui-react'
import {deletePost, votePost} from 'src/actions/post'
import formatTimestamp from 'src/utils/format-timestamp'

class PostAside extends Component {
  editPost = () => {
    const {post} = this.props
    this.props.history.push(`/${post.category}/${post.id}/edit`)
  }

  deletePost = () => {
    this.props
      .deletePost({postId: this.props.post.id})
      .then(() => this.props.history.push(`/`))
  }

  render () {
    const {post} = this.props
    return (
      <Segment.Group>
        <Segment>
          <Icon name='user' />
          {post.author}
        </Segment>
        <Segment>
          <Icon disabled name='tag' />
          {post.category}
        </Segment>
        <Segment>
          <Icon disabled name='thumbs outline up' />
          {post.voteScore}

          <Button
            basic
            compact
            size='tiny'
            floated='right'
            color='green'
            icon='thumbs outline up'
            onClick={() =>
              this.props.votePost({postId: post.id, vote: 'upVote'})}
          />
          <Button
            basic
            compact
            size='tiny'
            floated='right'
            color='red'
            icon='thumbs outline down'
            onClick={() =>
              this.props.votePost({postId: post.id, vote: 'downVote'})}
          />
        </Segment>
        <Segment>
          <Icon disabled name='calendar outline' />
          {formatTimestamp(post.timestamp)}
        </Segment>
        <Button.Group attached='bottom'>
          <Button
            secondary
            size='small'
            icon='trash outline'
            content='delete'
            onClick={this.deletePost}
          />
          <Button
            primary
            size='small'
            icon='edit'
            content='edit'
            onClick={this.editPost}
          />
        </Button.Group>
      </Segment.Group>
    )
  }
}

const mapStateToProps = ({post}) => ({post})
const mapDispatchToProps = {deletePost, votePost}
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)
export default enhance(PostAside)
