import { useState } from 'react'

const STORAGE_KEY = 'todo-list:todos'

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // ignore write failures (storage full, private browsing, etc.)
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')

  // Persist synchronously with the state update itself (rather than in a
  // useEffect keyed on `todos`) so a refresh right after an edit can never
  // race ahead of the write and load stale data from localStorage.
  function persistTodos(next) {
    setTodos(next)
    saveTodos(next)
  }

  function addTodo(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    persistTodos([
      ...todos,
      { id: crypto.randomUUID(), text: trimmed, completed: false, important: false },
    ])
  }

  function toggleTodo(id) {
    persistTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }

  function toggleImportant(id) {
    persistTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, important: !todo.important } : todo)),
    )
  }

  function removeTodo(id) {
    persistTodos(todos.filter((todo) => todo.id !== id))
  }

  function clearCompleted() {
    persistTodos(todos.filter((todo) => !todo.completed))
  }

  const visibleTodos = todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed
      if (filter === 'completed') return todo.completed
      return true
    })
    .sort((a, b) => Number(b.important) - Number(a.important))

  const activeCount = todos.filter((todo) => !todo.completed).length

  return {
    todos: visibleTodos,
    filter,
    setFilter,
    activeCount,
    addTodo,
    toggleTodo,
    toggleImportant,
    removeTodo,
    clearCompleted,
  }
}
