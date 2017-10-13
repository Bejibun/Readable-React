import API from 'src/api/api'
import * as ACTIONS from './types'
import uuidv4 from 'uuid/v4'

export function getCommentsByPost (postId) {
  return dispatch =>
    API
      .get(`/posts/${postId}/comments`)
      .then(response => response.data)
      .then(
        data => dispatch(gotComments(data)),
        error => console.error(error)
      )
}

export function addComment ({body, author, parentId}) {
  return dispatch =>
    API
      .post(`/comments`, {
        id: uuidv4(),
        timestamp: Date.now(),
        body,
        author,
        parentId
      })
      .then(response => response.data)
      .then(
        data => dispatch(commentAdded(data)),
        error => console.error(error)
      )
}

export function editComment ({commentId, body, author}) {
  return dispatch =>
    API
      .put(`/comments/${commentId}`, {body, author})
      .then(response => response.data)
      .then(
        data => dispatch(commentEdited(data)),
        error => console.error(error)
      )
}

export function deleteComment ({commentId}) {
  return dispatch =>
    API
      .delete(`/comments/${commentId}`)
      .then(response => response.data)
      .then(
        data => dispatch(commentDeleted(data)),
        error => console.error(error)
      )
}

export function voteOnComment ({commentId, vote}) {
  return dispatch =>
    API
      .post(`/comments/${commentId}`, {option: vote})
      .then(response => response.data)
      .then(
        data => dispatch(commentVoted(data)),
        error => console.error(error)
      )
}

function gotComments(data) {
  return {type: ACTIONS.TYPES_COMMENT_GOT, data}
}

function commentAdded(comment) {
  return {type: ACTIONS.TYPES_COMMENT_ADDED, comment}
}

function commentEdited(comment) {
  return {type: ACTIONS.TYPES_COMMENT_EDITED, comment}
}

function commentDeleted(comment) {
  return {type: ACTIONS.TYPES_COMMENT_DELETED, comment}
}

function commentVoted(comment) {
  return {type: ACTIONS.TYPES_COMMENT_VOTED, comment}
}

