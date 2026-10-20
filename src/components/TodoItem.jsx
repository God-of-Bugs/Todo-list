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
      } ${isEditing ? 'editing' : ''}`}
    >
      {isEditing ? (
        <div className="edit-container">
          <div className="edit-header">
            <span className="edit-badge">Editing task</span>
          </div>
          <div className="edit-field-group">
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="Edit task description"
            />
            <div className="edit-actions">
              <button
                type="button"
                className="btn-save"
                onClick={handleSave}
                disabled={!editText.trim()}
                aria-label="Save changes"
                title="Save changes (Enter)"
              >
                Save
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
                aria-label="Cancel editing"
                title="Cancel changes (Escape)"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="todo-view">
          <label className="checkbox-label" title={todo.completed ? 'Mark pending' : 'Mark completed'}>
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
            <span className="custom-checkbox" aria-hidden="true">
              {todo.completed && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </span>
          </label>

          <div className="todo-content">
            <span
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
              onDoubleClick={handleStartEdit}
              title="Double-click to edit"
            >
              {todo.text}
            </span>

            {formattedDate && (
              <div className="todo-meta">
                <span
                  className={`due-date-badge ${overdue ? 'badge-overdue' : ''}`}
                  title={overdue ? 'Task is past due date' : `Due on ${formattedDate}`}
                >
                  {overdue ? (
                    <svg className="badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  ) : (
                    <svg className="badge-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  )}
                  <span>{overdue ? `Overdue: ${formattedDate}` : formattedDate}</span>
                </span>
              </div>
            )}
          </div>

          <div className="todo-actions">
            <button
              type="button"
              className="btn-action btn-edit"
              onClick={handleStartEdit}
              aria-label={`Edit task "${todo.text}"`}
              title="Edit task"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>

            <button
              type="button"
              className="btn-action btn-delete"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete task "${todo.text}"`}
              title="Delete task"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
