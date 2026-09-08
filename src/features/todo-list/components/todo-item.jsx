function TodoItem({ todo, onToggle, onToggleImportant, onRemove }) {
  return (
    <li
      className={
        todo.important
          ? 'flex items-center gap-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2'
          : 'flex items-center gap-3 rounded-md border border-slate-200 px-3 py-2'
      }
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 accent-indigo-600"
      />
      <span
        className={
          todo.completed
            ? 'flex-1 text-sm text-slate-400 line-through'
            : 'flex-1 text-sm text-slate-800'
        }
      >
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => onToggleImportant(todo.id)}
        aria-pressed={todo.important}
        aria-label={
          todo.important ? `Unmark "${todo.text}" as important` : `Mark "${todo.text}" as important`
        }
        className={
          todo.important
            ? 'text-lg leading-none text-amber-500 hover:text-amber-600'
            : 'text-lg leading-none text-slate-300 hover:text-amber-500'
        }
      >
        ★
      </button>
      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        className="text-sm text-slate-400 hover:text-red-500"
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem
