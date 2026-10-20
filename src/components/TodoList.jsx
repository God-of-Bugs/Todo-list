import TodoItem from './TodoItem';

function TodoList({ todos, filter, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    let title = 'No tasks yet';
    let subtitle = 'Add your first task above to get started.';
    let icon = (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    );

    if (filter === 'pending') {
      title = "You're all caught up";
      subtitle = 'No pending tasks left to complete.';
      icon = (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      );
    } else if (filter === 'completed') {
      title = 'No completed tasks yet';
      subtitle = 'Mark tasks as finished to see them here.';
      icon = (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
      );
    }

    return (
      <div className="empty-state" role="status">
        <div className="empty-icon-wrap" aria-hidden="true">
          {icon}
        </div>
        <h3 className="empty-title">{title}</h3>
        <p className="empty-subtitle">{subtitle}</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Task list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
