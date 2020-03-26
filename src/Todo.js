import React from 'react'
import PropTypes from 'prop-types'
import './Todo.css';

const TodoItem = props => {
  const styles = props.todo.completed ? 'task done' : 'task'
  
  return (
    <li id={props.todo._id} className={styles} onClick={props.updateTodo} >{props.todo.name} <span onClick={props.deleteTodo}>X</span> </li>
  )
}

const TodoList = props => {
  const todos = props.todos.map( todo => (
    <TodoItem todo={todo} updateTodo={props.updateTodo} deleteTodo={props.deleteTodo} key={todo._id}/>
  ))

  return (
    <ul className="list">{todos}</ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TodoList;