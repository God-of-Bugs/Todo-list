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
      <div className="input-group">
        <label htmlFor="todo-input" className="sr-only">
          Task Description
        </label>
        <input
          id="todo-input"
          type="text"
          className="todo-input"
          placeholder="What needs to be done? Press Enter to add"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoComplete="off"
        />

        <div className="action-group">
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

          <button
            type="submit"
            className="btn-add"
            aria-label="Add task"
            title="Add task"
          >
            +
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
