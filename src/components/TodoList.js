import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Todo from './Todo'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers'
import ErrorMessage from './ErrorMessage'


const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map(todo => 
        <Todo
          key={todo.id}
          onClick= {() => onTodoClick(todo.id)}
          {...todo}
        />
      )}
    </ul>
  )
}

class VisibleTodoList extends Component {
  render () {
    const {toggleTodo, todos, isFetching, errorMessage} = this.props
    
    if (errorMessage && !todos.length) {
      return (
        <ErrorMessage
          onRetry={() => this.fetchData()}
          message={errorMessage}
        />
      )
    }

    if (isFetching && !todos.length) {
      return (
        <p>Loading...</p>
      )
    }

    return (
      <TodoList 
        todos={todos}
        onTodoClick={toggleTodo}
      />
    )
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData()
    }
  }
  
  fetchData() {
    const { filter, fetchTodos } = this.props
    fetchTodos(filter)
  }

}

/* params comes from the route by the router */
const mapStateToTodoListProps = (state, { match: { params } }) => { 
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter,
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter)
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps, 
  /* this is a special case when the param passed to  
    callback within mapDispatchToTodoListProps is the same as the 
    param passed to the dispatch function, it can be
    specified like below, a special object {theCallback : theActionObject}
  */
 actions 
)(VisibleTodoList))

export default VisibleTodoList

// const mapDispatchToTodoListProps = (dispatch) => ({
//     onTodoClick(id) { 
//       dispatch(toggleTodo(id))
//     },
// })
/* withRouter higher order component injects the route params as props to the wrapped component 
  which can be handled as own component props, cool, doesn't it?
*/