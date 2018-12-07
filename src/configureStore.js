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

const configureStore = () => {

  const store = createStore(
    reducers, 
  )
  
  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  return store
}

export default configureStore