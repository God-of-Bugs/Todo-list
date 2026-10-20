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
      <div className="segmented-control" role="group" aria-label="Filter tasks">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            className={`filter-btn ${currentFilter === key ? 'active' : ''}`}
            onClick={() => onFilterChange(key)}
            aria-pressed={currentFilter === key}
          >
            <span className="filter-label">{label}</span>
            <span
              className="filter-count"
              aria-label={`${count} ${label.toLowerCase()} tasks`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      <div className="stats-bar">
        <div className="stats-group">
          <span className="stat-chip">
            <span className="stat-dot dot-pending" aria-hidden="true"></span>
            <strong>{pendingCount}</strong> pending
          </span>
          <span className="stat-separator" aria-hidden="true">&bull;</span>
          <span className="stat-chip">
            <span className="stat-dot dot-completed" aria-hidden="true"></span>
            <strong>{completedCount}</strong> completed
          </span>
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            className="btn-clear-completed"
            onClick={onClearCompleted}
            aria-label="Clear all completed tasks"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoFilters;
