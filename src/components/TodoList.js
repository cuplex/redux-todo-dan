import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Todo from './Todo'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../api'


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
    return (
      <TodoList {...this.props}/>
    )
  }
  componentDidMount () {
    fetchTodos(this.props.filter).then(todos => {
      console.log(this.props.filter, todos)
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      fetchTodos(this.props.filter).then(todos => {
        console.log(this.props.filter, todos)
      })
    }
  }
}

const mapStateToTodoListProps = (state, { match: { params } }) => {
  const filter = params.filter || 'all'
  console.log('params.filter', filter)
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
}
// const mapDispatchToTodoListProps = (dispatch) => ({
//     onTodoClick(id) { 
//       dispatch(toggleTodo(id))
//     },
// })
/* withRouter higher order component injects the route params as props to the wrapped component 
  which can be handled as own component props, cool, doesn't it?
*/
VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps, 
  /* this is a special case when the param passed to  
    callback within mapDispatchToTodoListProps is the same as the 
    param passed to the dispatch function, it can be
    specified like below, a special object {theCallback : theActionObject}
  */
  {onTodoClick: toggleTodo} 
)(VisibleTodoList))

export default VisibleTodoList