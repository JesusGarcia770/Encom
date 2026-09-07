import { API_URL, apiFetch } from './config'

export async function getCategories() {
  const res = await apiFetch(`${API_URL}/categories`)
  if (!res.ok) throw new Error('Error al obtener las categorías')
  return res.json()
}
