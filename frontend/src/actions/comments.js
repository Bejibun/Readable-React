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

export function addCommentOnPost ({body, author, parentId}) {
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

export function editCommentOnPost ({id, body, author}) {
  return dispatch =>
    API
      .put(`/comments/${id}`, {body, author})
      .then(response => response.data)
      .then(
        data => dispatch(commentEdited(data)),
        error => console.error(error)
      )
}

export function deleteCommentOnPost ({commentId}) {
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

function commentAdded(data) {
  return {type: ACTIONS.TYPES_COMMENT_ADDED, data}
}

function commentEdited(data) {
  return {type: ACTIONS.TYPES_COMMENT_EDITED, data}
}

function commentDeleted(data) {
  return {type: ACTIONS.TYPES_COMMENT_DELETED, data}
}

function commentVoted(data) {
  return {type: ACTIONS.TYPES_COMMENT_VOTED, data}
}
