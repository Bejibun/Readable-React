import {orderBy} from 'lodash'
import * as ACTIONS from 'src/actions/types'

function posts (state = [], action) {
  switch (action.type) {
    case ACTIONS.TYPES_POSTS_GOT:
    case ACTIONS.TYPES_POSTS_BY_CATEGORY:
      return action.data
    case ACTIONS.TYPES_POSTS_SORT_BY:
      const desc = action.sortBy[0] === '-'
      const sortProperty = desc ? action.sortBy.slice(1) : action.sortBy
      return orderBy([...state], [sortProperty], [desc ? 'desc' : 'asc'])
    default:
      return state
  }
}

export default posts
