import reducers from './reducers'
import { createStore } from 'redux'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const configureStore = () => {

  const persitedSate = loadState()

  const store = createStore(
    reducers, 
    persitedSate
  )

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos
    })
  },1000))

  return store
}

export default configureStore