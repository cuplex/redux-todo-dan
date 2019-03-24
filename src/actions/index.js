import * as api from '../api'
import { getIsFetching } from '../reducers';

// Action creators
export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve()
    }

    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter
    })
    
    return api.fetchTodos(filter).then(
    todos => {
        dispatch({
            type: 'FETCH_TODOS_SUCCESS',
            todos,
            filter
        })
    },
    error => {
        dispatch({
            type: 'FETCH_TODOS_FAILURE',
            filter,
            message: error.message || 'Error fetching todos!'
        })
    })
}

export const addTodo = (text) => (dispatch) => {
    api.addTodo(text).then(todo => {
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            todo
        })
    })
}
export const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', id   })
