import { useState } from 'react'

function ProductFilters({ categories, category, onCategoryChange, onSearch }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(text.trim())
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Search products…"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Search
        </button>
      </form>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All categories</option>
        {categories.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductFilters
