import { combineReducers } from 'redux'
import todos, * as fromTodos from './todos'

const reducer = combineReducers({
  todos,
})

export default reducer

export const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter)

/* Don't delete, just kept this as an example of the implement  ation of the combineReducers function */

// building combineReducers from scratch as a the result of the Array.prototype.reduce ES6 array method
// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce(
//         (nextState, key) => {
//           nextState[key] = reducers[key](
//             state[key],
//             action
//           )
//           return nextState  
//         },
//       {})
//   }
// }

// const todosApp = combineReducers({
//   todos,
//   visibilityFilter
// })

