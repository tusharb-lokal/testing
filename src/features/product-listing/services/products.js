const API_BASE = 'https://dummyjson.com'

export async function fetchProducts({ limit = 12, skip = 0, category = '', query = '' } = {}) {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) })

  let url
  if (query) {
    url = `${API_BASE}/products/search?${params}&q=${encodeURIComponent(query)}`
  } else if (category) {
    url = `${API_BASE}/products/category/${encodeURIComponent(category)}?${params}`
  } else {
    url = `${API_BASE}/products?${params}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to load products')
  }

  return response.json()
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/products/categories`)
  if (!response.ok) {
    throw new Error('Failed to load categories')
  }

  const data = await response.json()
  return data.map((item) => item.slug)
}
