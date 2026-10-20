function TodoFilters({
  currentFilter,
  onFilterChange,
  totalCount,
  pendingCount,
  completedCount,
  onClearCompleted,
}) {
  const filters = [
    { key: 'all', label: 'All', count: totalCount },
    { key: 'pending', label: 'Pending', count: pendingCount },
    { key: 'completed', label: 'Completed', count: completedCount },
  ];

  return (
    <div className="filters-container">
      <div className="filter-buttons" role="group" aria-label="Filter tasks">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            className={`filter-btn ${currentFilter === key ? 'active' : ''}`}
            onClick={() => onFilterChange(key)}
            aria-pressed={currentFilter === key}
          >
            <span>{label}</span>
            <span className="filter-badge" aria-label={`${count} ${label.toLowerCase()} tasks`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      <div className="summary-bar">
        <span className="summary-text">
          <strong>{pendingCount}</strong> pending &bull; <strong>{completedCount}</strong> completed
        </span>

        {completedCount > 0 && (
          <button
            type="button"
            className="btn-clear-completed"
            onClick={onClearCompleted}
            aria-label="Clear all completed tasks"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoFilters;
