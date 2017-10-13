import * as ACTIONS from 'src/actions/types'

function categories (state = [], action) {
  switch (action.type) {
    case ACTIONS.TYPES_CATEGORIES_GOT:
      return action.data
    default:
      return state
  }
}

export default categories