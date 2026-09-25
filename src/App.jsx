import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: text.trim(), dueDate, completed: false }
    ]);
    setText('');
    setDueDate('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>✨ React Todo App</h1>
      
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          title="Due Date"
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active ({todos.filter(t => !t.completed).length})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-state">No tasks found. Enjoy your day! 🎉</p>
        ) : (
          filteredTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'todo-item completed' : 'todo-item'}>
              <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {}}
                />
                <span className="text">{todo.text}</span>
                {todo.dueDate && (
                  <span className="due-date">📅 {todo.dueDate}</span>
                )}
              </div>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
