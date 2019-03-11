import reducers from './reducers'
import { createStore } from 'redux'

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch

  if (!console.group) {
    return rawDispatch
  }
  return (action) => {
    console.group(action.type)
    console.log('%c previous state', 'color: gray' , store.getState())
    console.log('%c action: ', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state: ', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  } 
}

const addPromiseSupportToStore = (store) => {
  const rawDispatch = store.dispatch

  return (action) => {
    if (typeof action.then ===  'function') {
      return action.then(rawDispatch)
    }

    return rawDispatch(action)
  }
}

const configureStore = () => {

  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  )
  
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  store.dispatch = addPromiseSupportToStore(store)

  return store
}

export default configureStore