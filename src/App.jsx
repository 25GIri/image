import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('react_todos');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Learn React', completed: true },
      { id: 2, text: 'Build a Todo Application', completed: false },
      { id: 3, text: 'Deploy to GitHub', completed: false }
    ];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('react_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
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
    <div className="app-container">
      <div className="todo-card">
        <h1>📝 Todo List</h1>
        
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add</button>
        </form>

        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">No tasks found.</p>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <span onClick={() => toggleTodo(todo.id)}>
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">×</button>
              </li>
            ))
          )}
        </ul>

        <div className="todo-footer">
          <span>{todos.filter(t => !t.completed).length} items left</span>
        </div>
      </div>
    </div>
  );
}

export default App;
