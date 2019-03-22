import { v4 } from 'node-uuid';
import * as api from '../api'
import { getIsFetching } from '../reducers';

// Action creators
const receiveTodos = (response, filter) => ({
    type: 'RECEIVE_TODOS',
    response,
    filter
})

const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
})

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        console.log('loading in progress!')
        return Promise.resolve()
    }

    dispatch(requestTodos(filter))
    
    return api.fetchTodos(filter).then(todos => 
        dispatch(receiveTodos(todos, filter))
    )
}

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
})
export const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', id   })
