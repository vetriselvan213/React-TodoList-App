import React from 'react';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      newTodo: '',
    };

    this.addTodo = this.addTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  componentDidMount() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    this.setState({
      todoList: todoList,
    });
  }

  componentDidUpdate() {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
  }

  addTodo() {
    if (this.state.newTodo === '') {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: this.state.newTodo,
      completed: false,
    };

    this.setState(prevState => ({
      newTodo: '',
      todoList: [...prevState.todoList, newTodo],
    }));
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  removeTodo (id) {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id),
    }));
  }

  toggleTodo (id) {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    const { todoList, newTodo } = this.state;

    return (
      <div className='text-center mx-width'>
        <h1>Todo App</h1>
        <div className='text'>
          <input type="text" name="newTodo" value={newTodo} onChange={this.handleInputChange} placeholder="Enter new todo..." />
          <button className='btn' onClick={this.addTodo}><i className="fa-solid fa-list"></i> Add</button>
        </div>
        <ul>
          {todoList.map(todo => (
            <li className='flex-jcsb' key={todo.id}>
              <div>
              <i className="fa-solid fa-rocket"></i>
              <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</span>
              </div>
              <div>
              <button className='btn btn-update' onClick={() => this.toggleTodo(todo.id)}>{todo.completed ? 'unmark' : 'mark' }</button>
              <button className='btn' onClick={() => this.removeTodo(todo.id)}><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp