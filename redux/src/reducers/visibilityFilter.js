import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes'
import { SHOW_ALL } from '../constants/TodoFilters'

// * 6. Reducers specify how the application's state changes in response to actions sent to the store
const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      // always return state even if no changes applied
      return state
  }
}

export default visibilityFilter