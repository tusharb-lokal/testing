import { useTodos } from '@/features/todo-list/hooks/use-todos'
import TodoFilters from '@/features/todo-list/components/todo-filters'
import TodoForm from '@/features/todo-list/components/todo-form'
import TodoItem from '@/features/todo-list/components/todo-item'

function TodoApp() {
  const {
    todos,
    filter,
    setFilter,
    activeCount,
    addTodo,
    toggleTodo,
    toggleImportant,
    removeTodo,
    clearCompleted,
  } = useTodos()

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Todo List</h1>
      <TodoForm onAdd={addTodo} />
      {todos.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onToggleImportant={toggleImportant}
              onRemove={removeTodo}
            />
          ))}
        </ul>
      ) : (
        <p className="py-4 text-center text-sm text-slate-400">No todos here.</p>
      )}
      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        onClearCompleted={clearCompleted}
      />
    </div>
  )
}

export default TodoApp
