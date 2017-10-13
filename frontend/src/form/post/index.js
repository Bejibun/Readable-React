import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Container, Segment, Grid, Header, Message} from 'semantic-ui-react'
import {isEmpty} from 'lodash'
import SiteHeader from 'src/components/header'
import SiteFooter from 'src/components/footer'
import PostComments from './components/comments'
import PostAside from './components/aside'
import {getPostByPost} from 'src/actions/post'
import {getCommentsByPost} from 'src/actions/comments'
import marked from 'src/utils/marked'

class Post extends Component {
  componentDidMount () {
    this.getData()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.getData()
    }
  }

  getData = () => {
    const {postId} = this.props.match.params
    this.props.getPostByPost(postId)
    this.props.getCommentsByPost(postId)
  }

  render () {
    const {post} = this.props
    const linkStyle = {fontWeight: 500, textDecoration: 'underline'}
    return (
      <div>
        <SiteHeader params={this.props.match.params} />
        <Container>
          {isEmpty(post) ? (
            <Message negative>
              <Message.Header>Post not found</Message.Header>
              <p>
                You may want to view the{' '}
                <Link to='/' style={linkStyle}>
                  post listings page
                </Link>{' '}
                or{' '}
                <Link to='/new' style={linkStyle}>
                  create a new post
                </Link>.
              </p>
            </Message>
          ) : (
            <Grid centered>
              <Grid.Column width={12}>
                <Segment>
                  <Header as='h2'>{post.title}</Header>
                  {post.body && (
                    <div
                      dangerouslySetInnerHTML={{__html: marked(post.body)}}
                    />
                  )}
                </Segment>
                <PostComments />
              </Grid.Column>
              <Grid.Column width={4}>
                <PostAside />
              </Grid.Column>
            </Grid>
          )}
        </Container>
        <SiteFooter />
      </div>
    )
  }
}

const mapStateToProps = ({post, comments}) => ({post, comments})
const mapDispatchToProps = {getPostByPost, getCommentsByPost}
export default connect(mapStateToProps, mapDispatchToProps)(Post)
