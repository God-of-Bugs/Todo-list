import { useState } from 'react';

function formatDisplayDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }
  return dateStr;
}

function isTaskOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  return dueDate < todayStr;
}

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleStartEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const formattedDate = formatDisplayDate(todo.dueDate);
  const overdue = isTaskOverdue(todo.dueDate, todo.completed);

  return (
    <li
      className={`todo-item ${todo.completed ? 'completed' : ''} ${
        overdue ? 'overdue' : ''
      }`}
    >
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit task text"
          />
          <div className="edit-actions">
            <button
              type="button"
              className="btn-save"
              onClick={handleSave}
              disabled={!editText.trim()}
              aria-label="Save edited task"
            >
              Save
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              aria-label="Cancel editing task"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-view">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              aria-label={
                todo.completed
                  ? `Mark "${todo.text}" as pending`
                  : `Mark "${todo.text}" as completed`
              }
            />
            <span className="custom-checkbox" aria-hidden="true"></span>
          </label>

          <span
            className={`todo-text ${todo.completed ? 'completed' : ''}`}
            onDoubleClick={handleStartEdit}
            title="Double-click to edit"
          >
            {todo.text}
          </span>

          <div className="meta-actions">
            {formattedDate && (
              <span
                className={`due-date-badge ${overdue ? 'badge-overdue' : ''}`}
                title={overdue ? 'Task is past due!' : `Due on ${formattedDate}`}
              >
                {overdue ? '⚠️ Overdue: ' : '📅 '}
                {formattedDate}
              </span>
            )}

            <button
              type="button"
              className="btn-action btn-edit"
              onClick={handleStartEdit}
              aria-label={`Edit task "${todo.text}"`}
              title="Edit task"
            >
              ✏️
            </button>

            <button
              type="button"
              className="btn-action btn-delete"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete task "${todo.text}"`}
              title="Delete task"
            >
              🗑
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
