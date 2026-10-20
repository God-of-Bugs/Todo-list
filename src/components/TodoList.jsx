import TodoItem from './TodoItem';

function TodoList({ todos, filter, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    let emptyMessage = 'No tasks yet. Add a task above to get started!';
    let emptyIcon = '📝';

    if (filter === 'pending') {
      emptyMessage = 'No pending tasks! All caught up. 🎉';
      emptyIcon = '✨';
    } else if (filter === 'completed') {
      emptyMessage = 'No completed tasks yet.';
      emptyIcon = '⏳';
    }

    return (
      <div className="empty-state" role="status">
        <span className="empty-icon" aria-hidden="true">{emptyIcon}</span>
        <p className="empty-text">{emptyMessage}</p>
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
