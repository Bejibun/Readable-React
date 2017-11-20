import * as ACTIONS from './types'
import API from 'src/api/api'
import uuidv4 from 'uuid/v4'

//POST
export function getPostByPost (postId) {
  return dispatch =>
    API
      .get(`/posts/${postId}`)
      .then(response => response.data)
      .then(
        data => dispatch(gotPost(data)),
        error => console.error(error)
      )
}

export function addPost ({post}) {
  const postData = {...post, id: uuidv4(), timestamp: Date.now()}
  return dispatch =>
    API
      .post(`/posts`, postData)
      .then(response => response.data)
      .then(
        data => {
          dispatch(postAdded(postData))
          return postData
        },
        error => console.error(error)
      )
}

export function editPost ({postId,post}) {
  return dispatch =>
    API
      .put(`/posts/${postId}`, post)
      .then(response => response.data)
      .then(
      	data => dispatch(postEdited(post)),
      	error => console.error(error))
}

export function deletePost ({postId}) {
  return dispatch =>
    API
      .delete(`/posts/${postId}`)
      .then(response => response.data)
      .then(
      	data => dispatch(postDeleted(postId)),
      	error => console.error(error))
}

export function votePost ({postId,vote}) {
  return dispatch =>
    API
      .post(`/posts/${postId}`, {option: vote})
      .then(response => response.data)
      .then(
      	data => dispatch(postVoted(data)),
      	error => console.error(error))
}

export function postResetted () {
  return {type: ACTIONS.TYPES_POST_RESETTED, data: {}}
}

function gotPost (data) {
  return {type: ACTIONS.TYPES_POST_GOT, data}
}

function postAdded (data) {
  return {type: ACTIONS.TYPES_POST_ADDED, data}
}

function postEdited (data) {
  return {type: ACTIONS.TYPES_POST_EDITED, data}
}

function postDeleted (data) {
  return {type: ACTIONS.TYPES_POST_DELETED, data}
}

function postVoted (data) {
  return {type: ACTIONS.TYPES_POST_VOTED, data}
}
