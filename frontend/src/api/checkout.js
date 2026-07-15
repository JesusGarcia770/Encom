import { API_URL } from './config'

export async function createCheckout() {
  const res = await fetch(`${API_URL}/checkout`, {
    method: 'POST',
    credentials: 'include',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error al iniciar el pago')
  return data
}

export async function confirmCheckoutReturn(params) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${API_URL}/checkout/return?${query}`, {
    credentials: 'include',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error al confirmar el pago')
  return data
}
