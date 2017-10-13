import * as ACTIONS from 'src/actions/types'

function post (state = {}, action) {
  switch (action.type) {
    case ACTIONS.TYPES_POST_GOT:
    case ACTIONS.TYPES_POST_ADDED:
    case ACTIONS.TYPES_POST_RESETTED:
    case ACTIONS.TYPES_POST_EDITED:
    case ACTIONS.TYPES_POST_DELETED:
    case ACTIONS.TYPES_POST_VOTED:
      return action.data
    default:
      return state
  }
}

export default post
