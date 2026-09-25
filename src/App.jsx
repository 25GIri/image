import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todo_tasks')
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: 'Welcome to React Todo App!', completed: false },
      { id: 2, text: 'Build something awesome', completed: true }
    ]
  })
  
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const remainingCount = tasks.filter(task => !task.completed).length

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>✨ My Todo List (Updated)</h1>
        
        <form onSubmit={addTask} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add Task</button>
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

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty-state">No tasks found.</p>
          ) : (
            filteredTasks.map(task => (
              <li key={task.id} className={task.completed ? 'task-item completed' : 'task-item'}>
                <span onClick={() => toggleTask(task.id)} className="task-text">
                  {task.text}
                </span>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  ❌
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="todo-footer">
          <span>{remainingCount} task(s) remaining</span>
        </div>
      </div>
    </div>
  )
}

export default App
