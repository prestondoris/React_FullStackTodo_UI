import React, { Component } from 'react';
import axios from 'axios'
import TodoList from './Todo'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newTodo: ''
    }
    this.submitTodo = this.submitTodo.bind(this);
    this.postNewTodo = this.postNewTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.baseURL = 'http://localhost:1000/'
  }

  submitTodo(e) {
    if (e.which === 13) {
      this.postNewTodo();
    }
  }

  updateTodo(e) {
    e.preventDefault()
    const clickedTodo = e.target
    const todos = [...this.state.todos]
    
    if (clickedTodo.tagName === 'LI') {
      const url = `${this.baseURL}api/todos/${clickedTodo.id}`
      const todoInd = todos.findIndex(todo => todo._id === clickedTodo.id)
      const newTodo = todos[todoInd]
      const isCompleted = !newTodo.completed
      
      axios.put(url, {completed: isCompleted})
        .then(todo => {
          todos[todoInd] = todo.data
          this.setState({ todos })
        })
        .catch(error => console.log(error))

    }
  }

  deleteTodo(e) {
    e.preventDefault()
    const todoToRemove = e.target
    const todos = this.state.todos.filter(todo => todo._id !== todoToRemove.parentElement.id)
    if (todoToRemove.tagName === 'SPAN') {
      const url = `${this.baseURL}api/todos/${todoToRemove.parentElement.id}`

      axios.delete(url)
        .then(res => this.setState({todos}))
        .catch(error => console.log(error))
    }
  }

  postNewTodo() {
    const url = `${this.baseURL}api/todos`;

    axios.post(url, {name: this.state.newTodo})
      .then(todo => {
        const todos = [...this.state.todos, todo.data]
        this.setState({ todos, newTodo: '' })
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    axios.get(`${this.baseURL}api/todos`)
      .then(todos => {
        this.setState({ todos: todos.data })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>todo<span>list</span></h1>
          <h2>A Full Stack App with React UI and Node/Express/Mongo API</h2>
          <section className="form">
            <input
              id="todoInput"
              type="text"
              name="newTodo"
              placeholder="Add a New Todo..."
              value={this.state.newTodo}
              onChange={(e) => {
                this.setState({ [e.target.name]: e.target.value });
              }}
              onKeyPress={this.submitTodo}
            /> 
          </section>
          <TodoList
            todos={this.state.todos} 
            updateTodo={this.updateTodo} 
            deleteTodo={this.deleteTodo}
          />
        </header>
      </div>
    )
  }
}

export default App;
