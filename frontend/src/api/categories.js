import { API_URL } from './config'

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`)
  if (!res.ok) throw new Error('Error al obtener las categorías')
  return res.json()
}

export async function createCategory(data) {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear la categoría')
  return res.json()
}

export async function updateCategory(id, data) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar la categoría')
  return res.json()
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar la categoría')
  return res.json()
}
