const API_BASE = 'https://dummyjson.com'

export async function fetchUserProfile(userId) {
  const response = await fetch(`${API_BASE}/users/${userId}`)
  if (!response.ok) {
    throw new Error('Failed to load profile')
  }

  return response.json()
}

export async function updateUserProfile(userId, updates) {
  const response = await fetch(`${API_BASE}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    throw new Error('Failed to update profile')
  }

  return response.json()
}
