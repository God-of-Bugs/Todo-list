import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    onAdd(trimmedText, dueDate || null);
    setText('');
    setDueDate('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Add new todo">
      <div className="form-row">
        <div className="input-wrapper text-wrapper">
          <label htmlFor="todo-input" className="sr-only">
            Task Description
          </label>
          <input
            id="todo-input"
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="form-controls">
          <div className="input-wrapper date-wrapper">
            <label htmlFor="due-date-input" className="sr-only">
              Due Date (optional)
            </label>
            <input
              id="due-date-input"
              type="date"
              className="due-date-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              title="Optional due date"
              aria-label="Due date (optional)"
            />
          </div>

          <button
            type="submit"
            className="btn-add"
            disabled={!text.trim()}
            aria-label="Add task"
            title="Add task (Enter)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span className="btn-add-text">Add</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
