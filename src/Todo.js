import React from 'react'
import PropTypes from 'prop-types';
import './Todo.css';

const Todo = props => {
  const todos = props.todos.map( todo => (
    <li className="task" key={todo._id}>{todo.name}<span>X</span></li>
  ))

  return (
    <ul className="list">{todos}</ul>
  )
}

Todo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Todo;