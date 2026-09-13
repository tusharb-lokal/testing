import { useState } from 'react'
import TodoApp from '@/features/todo-list/components/todo-app'
import ProductListing from '@/features/product-listing/components/product-listing'
import UserDashboard from '@/features/user-dashboard/components/user-dashboard'

const PAGES = [
  { value: 'todos', label: 'Todo List' },
  { value: 'products', label: 'Products' },
  { value: 'profile', label: 'Profile' },
]

function App() {
  const [page, setPage] = useState('todos')

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 bg-slate-50 px-6 py-12">
      <nav className="flex gap-1 rounded-md border border-slate-200 bg-white p-1">
        {PAGES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setPage(value)}
            className={
              page === value
                ? 'rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white'
                : 'rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100'
            }
          >
            {label}
          </button>
        ))}
      </nav>
      {page === 'todos' && <TodoApp />}
      {page === 'products' && <ProductListing />}
      {page === 'profile' && <UserDashboard />}
    </main>
  )
}

export default App
