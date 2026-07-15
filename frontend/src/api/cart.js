import { API_URL } from './config'

export async function getCart() {
  const res = await fetch(`${API_URL}/cart`, { credentials: 'include' })
  if (!res.ok) throw new Error('Error al obtener el carrito')
  return res.json()
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(`${API_URL}/cart/items`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId, quantity }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error al agregar el producto')
  return data
}

export async function updateCartItem(productId, action) {
  const res = await fetch(`${API_URL}/cart/items/${productId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error al actualizar la cantidad')
  return data
}

export async function removeCartItem(productId) {
  const res = await fetch(`${API_URL}/cart/items/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Error al eliminar el producto del carrito')
  return res.json()
}

export async function clearCart() {
  const res = await fetch(`${API_URL}/cart`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Error al vaciar el carrito')
  return res.json()
}
