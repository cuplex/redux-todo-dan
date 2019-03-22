import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'



const configureStore = () => {

  const middlewares = [thunk]
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

// const thunk = (store) => (next) => (action) => 
//   typeof action ===  'function' 
//   ?  action(store.dispatch, store.getState)
//   :  next(action)



// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware => {
//     store.dispatch = middleware(store)(store.dispatch)
//   })
// }
