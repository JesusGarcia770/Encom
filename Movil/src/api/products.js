import { API_URL, apiFetch } from './config'

export async function getProducts() {
  const res = await apiFetch(`${API_URL}/products`)
  if (!res.ok) throw new Error('Error al obtener los productos')
  return res.json()
}
