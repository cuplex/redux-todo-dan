const byId = (state = {}, action) => {
  if (action.response) {
    return ({
      ...state,
      // normalized response with normalizr
      ...action.response.entities.todos 
    })
  }
  return state
}

export default byId

export const getTodo = (state, id) => state[id]