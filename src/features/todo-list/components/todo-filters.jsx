const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function TodoFilters({ filter, onFilterChange, activeCount, onClearCompleted }) {
  return (
    <div className="flex items-center justify-between text-sm text-slate-500">
      <span>{activeCount} item{activeCount === 1 ? '' : 's'} left</span>
      <div className="flex gap-1">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            className={
              filter === value
                ? 'rounded-md bg-indigo-100 px-2 py-1 text-indigo-700'
                : 'rounded-md px-2 py-1 hover:bg-slate-100'
            }
          >
            {label}
          </button>
        ))}
      </div>
      <button type="button" onClick={onClearCompleted} className="hover:text-red-500">
        Clear completed
      </button>
    </div>
  )
}

export default TodoFilters
