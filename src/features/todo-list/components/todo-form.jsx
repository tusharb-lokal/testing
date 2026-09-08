import { useState } from 'react'

function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Add
      </button>
    </form>
  )
}

export default TodoForm
