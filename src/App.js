import React, { Component } from 'react';
import axios from 'axios'
import Todo from './Todo'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newTodo: ''
    }
    this.createTodo = this.createTodo.bind(this);
    this.submitTodo = this.submitTodo.bind(this);
    this.postNewTodo = this.postNewTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  createTodo(todo) {
    const todos = [...this.state.todos, todo]
    this.setState({todos, newTodo:''})
  }

  submitTodo(e) {
    if (e.which === 13) {
      this.postNewTodo();
    }
  }

  completeTodo() {

  }

  deleteTodo() {

  }

  postNewTodo() {
    const url = 'http://localhost:1000/api/todos';

    axios.post(url, {name: this.state.newTodo})
      .then(todo => {
        this.createTodo(todo.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    fetch('http://localhost:1000/api/todos')
      .then(data => {
        console.log('the data is: ', data)
        return data.json()
      })
      .then(todos => {
        console.log(todos);
        this.setState({ todos })
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
          <Todo todos={this.state.todos}/>
        </header>
      </div>
    )
  }
}

export default App;
