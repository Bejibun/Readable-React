import React, {Component} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button, Card, Icon, Container, Divider} from 'semantic-ui-react'
import formatTimestamp from 'src/utils/format-timestamp'
import {deletePost, votePost} from 'src/actions/post'
import marked from 'src/utils/marked'

class HomepagePosts extends Component {
  newPost = () => {
    this.props.postResetted()
    this.props.history.push('/new')
  }

  goToPost = post => {
    this.props.history.push(`/${post.category}/${post.id}`)
  }

  deletePost = post => {
    this.props
      .deletePost({postId: post.id})
      .then(() => this.props.history.push(`/`))
  }

  votePost = ({post,vote}) => {
    this.props
      .votePost({postId: post.id, vote:vote})
      .then(() => this.props.history.push(`/`))
  }

  render () {
    return (
      <Container>
        <Card.Group>
          {this.props.posts.map(post => (
            <Card key={post.id} centered>
              <Card.Content
                header={post.title}
                onClick={() => this.goToPost(post)}
              />
              <Card.Content extra>
                <Icon name='user' />
                {post.author}
                <Icon disabled name='tag' />
                {post.category}
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  {post.body && (
                    <div
                      dangerouslySetInnerHTML={{__html: marked(post.body)}}
                      style={{maxHeight: 150, overflow: 'hidden'}}
                    />
                  )}
                  <Divider hidden />
                  <Button
                    basic
                    compact
                    size='tiny'
                    floated='left'
                    color='blue'
                    icon='thumbs outline up'
                    onClick={() => this.votePost({post: post, vote: 'upVote'})}
                  />
                  <Button
                    basic
                    compact
                    size='tiny'
                    floated='left'
                    color='red'
                    icon='thumbs outline down'
                    onClick={() => this.votePost({post: post, vote: 'downVote'})}
                  />
                  <Button
                    secondary
                    compact
                    size='tiny'
                    icon='trash outline'
                    floated='right'
                    content='delete'
                    onClick={() => this.deletePost(post)}
                  />
                  <Button
                    basic
                    compact
                    color='blue'
                    size='mini'
                    floated='right'
                    onClick={() => this.goToPost(post)}
                  >
                    Read more
                  </Button>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon disabled name='calendar outline' />
                {formatTimestamp(post.timestamp)}
                <Icon disabled name='thumbs outline up' />
                {post.voteScore}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Container>
    )
  }
}

const mapStateToProps = ({posts}) => ({posts})
const mapDispatchToProps = {deletePost, votePost}
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhance(HomepagePosts)
