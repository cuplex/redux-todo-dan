import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import promise from 'redux-promise'


// const logger = (store) => (next) => {

//   if (!console.group) {
//     return next
//   }

//   return (action) => {
//     console.group(action.type)
//     console.log('%c previous state', 'color: gray' , store.getState())
//     console.log('%c action: ', 'color: blue', action)
//     const returnValue = next(action)
//     console.log('%c next state: ', 'color: green', store.getState())
//     console.groupEnd(action.type)
//     return returnValue
//   }
// } 

// const promise = (store) => (next) => (action) => {
//   if (typeof action.then ===  'function') {
//     return action.then(next)
//   }
//   return next(action)
// }


// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware => {
//     store.dispatch = middleware(store)(store.dispatch)
//   })
// }

const configureStore = () => {

  const middlewares = [promise]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }
  
return  createStore(
    reducers,
    applyMiddleware(...middlewares)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  )
}

export default configureStore