import React, { createContext, useReducer } from "react";

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const EDIT_TODO = 'EDIT_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const COMPLETE_ALL_TODOS = 'COMPLETE_ALL_TODOS'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

// * Context for providing app data
const TodosContext = createContext();

const initialState = [
  {
    id: 0,
    completed: false,
    text: "Use Context + Hooks"
  }
];

const TodosProvider = (props) => {
  // * useReducer for complex state like global application state
  const [todos, dispatch] = useReducer(todosReducer, initialState);

  const actions = useActions(dispatch);

  // * Provide state and methods to mutate it
  return <TodosContext.Provider value={{todos, actions}} {...props} />
}

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}

// * Hook to 'bind' dispatch
const useActions = (dispatch) => {
  const addTodo = text => dispatch({type: ADD_TODO, text});

  const deleteTodo = id => dispatch({type: DELETE_TODO, id});

  const editTodo = (id, text) => dispatch({type: EDIT_TODO, id, text});

  const toggleTodo = id => dispatch({type: TOGGLE_TODO, id});

  const toggleAllTodo = () => dispatch({type: COMPLETE_ALL_TODOS});

  const clearCompleted = () => dispatch({type: CLEAR_COMPLETED});

  return {
    addTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
    toggleAllTodo,
    clearCompleted
  }
}

export { TodosContext, TodosProvider };
