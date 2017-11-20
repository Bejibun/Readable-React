import {orderBy, findIndex} from 'lodash'
import * as ACTIONS from 'src/actions/types'

function comments (state = [], action) {
  switch (action.type) {
    case ACTIONS.TYPES_COMMENT_GOT:
      return orderBy(action.data, ['timestamp'], ['asc'])
    case ACTIONS.TYPES_COMMENT_ADDED:
      const newState = state.concat([action.data])
      return orderBy(newState, ['timestamp'], ['asc'])
    case ACTIONS.TYPES_COMMENT_EDITED:
      const editPostIndex = findIndex(state, o => o.id === action.data.id)
      return [
        ...state.slice(0, editPostIndex),
        {...action.data},
        ...state.slice(editPostIndex + 1)
      ]
    case ACTIONS.TYPES_COMMENT_DELETED:
      return state.filter(comment => comment.id !== action.data.id)
    case ACTIONS.TYPES_COMMENT_VOTED:
      const votePostIndex = findIndex(state, o => o.id === action.data.id)
      return [
        ...state.slice(0, votePostIndex),
        {...action.data},
        ...state.slice(votePostIndex + 1)
      ]
    default:
      return state
  }
}


export default comments
