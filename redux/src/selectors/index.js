import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from "../constants/TodoFilters"

// * 8. Get todos from redux store by filter
export const getVisibleTodos = ({ todos, visibilityFilter }) => {
  switch (visibilityFilter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error("Unknown filter: " + visibilityFilter)
  }
};

export const getCompletedTodoCount = ({ todos }) =>
  todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0)
