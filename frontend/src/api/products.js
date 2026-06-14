import { API_URL } from './config'

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`)
  if (!res.ok) throw new Error('Error al obtener los productos')
  return res.json()
}

export async function createProduct(formData) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error('Error al crear el producto')
  return res.json()
}

export async function updateProduct(id, formData) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!res.ok) throw new Error('Error al actualizar el producto')
  return res.json()
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar el producto')
  return res.json()
}
