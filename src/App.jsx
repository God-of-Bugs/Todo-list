import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';

function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
}

function loadInitialTodos() {
  try {
    const saved = localStorage.getItem('todos');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        id: typeof item.id === 'string' && item.id.trim() ? item.id : generateId(),
        text: typeof item.text === 'string' ? item.text : '',
        completed: Boolean(item.completed),
        dueDate: typeof item.dueDate === 'string' && item.dueDate.trim() ? item.dueDate.trim() : null,
      }))
      .filter((item) => item.text.trim().length > 0);
  } catch (err) {
    console.error('Error recovering todos from localStorage:', err);
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState(loadInitialTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (err) {
      console.error('Failed to persist todos to localStorage:', err);
    }
  }, [todos]);

  const handleAddTodo = (text, dueDate) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: generateId(),
      text: trimmed,
      completed: false,
      dueDate: dueDate || null,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id, newText) => {
    const trimmed = newText.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = totalCount - completedCount;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <header className="app-header">
        <div className="header-brand">
          <span className="header-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </span>
          <h1>Todo List</h1>
        </div>
        <p className="app-subtitle">Stay organized. Get things done.</p>
      </header>

      <main>
        <TodoForm onAdd={handleAddTodo} />

        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          totalCount={totalCount}
          pendingCount={pendingCount}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />

        <TodoList
          todos={filteredTodos}
          filter={filter}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </main>
    </div>
  );
}

export default App;
