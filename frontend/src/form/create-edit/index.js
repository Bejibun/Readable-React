import React, {Component} from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Container, Divider} from 'semantic-ui-react'
import {getPostByPost, addPost, editPost} from 'src/actions/post'
import SiteHeader from 'src/components/header'
import CreateEditForm from 'src/form/create-edit/components/form'

class CreateEdit extends Component {
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
    if (postId != null) {
      this.props.getPostByPost(postId)
    }
  }

  editPost = payload => {
    const {post, editPost, history} = this.props
    editPost(payload).then(() => {
      history.push(`/${post.category}/${post.id}`)
    })
  }

  createPost = payload => {
    const {addPost, history} = this.props
    addPost(payload).then(postData => {
      history.push(`/${postData.category}/${postData.id}`)
    })
  }

  render () {
    const {post, categories} = this.props
    const postId = post.id || null
    const formDefaults = postId
      ? {
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category,
        voteScore: post.voteScore
      }
      : {}
    return (
      <div>
        <SiteHeader params={this.props.match.params} />
        {postId === null ? 
          <Divider horizontal>Add Post</Divider>
        : <Divider horizontal>Edit Post</Divider>
        }
        <Container>
          <CreateEditForm
            categories={categories}
            defaults={formDefaults}
            postId={postId}
            createPost={this.createPost}
            editPost={this.editPost}
          />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({post, categories}) => ({post, categories})
const mapDispatchToProps = {getPostByPost, addPost, editPost}
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)
export default enhance(CreateEdit)
