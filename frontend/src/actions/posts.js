import API from 'src/api/api'
import * as ACTIONS from './types'

export function getPosts () {
  return dispatch =>
    API
      .get(`/posts/`)
      .then(response => response.data)
      .then(
      	data => dispatch(gotPosts(data)),
      	error => console.error(error))
}

export function getPostsByCategory (category) {
  return dispatch =>
    API
      .get(`/${category}/posts`)
      .then(response => response.data)
      .then(
      	data => dispatch(gotPostsByCategory(data)),
      	error => console.error(error))
}

export function sortPosts (sortBy) {
  return {type: ACTIONS.TYPES_POSTS_SORT_BY, sortBy}
}



function gotPosts (data) {
  return {type: ACTIONS.TYPES_POSTS_GOT, data}
}

function gotPostsByCategory (data) {
  return {type: ACTIONS.TYPES_POSTS_BY_CATEGORY, data}
}

