import { v4 } from 'node-uuid';
import * as api from '../api'

// Action creators
const receiveTodos = (response, filter) => ({
    type: 'RECEIVE_TODOS',
    response,
    filter
})

export const fetchTodos = (filter) => 
    api.fetchTodos(filter)
    .then(todos => 
        receiveTodos(todos, filter)
    )

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
})
export const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', id   })
