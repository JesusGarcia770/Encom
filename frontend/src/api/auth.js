import { API_URL } from './config'

async function parseResponse(res) {
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Ocurrió un error')
  return data
}

export async function registerUser({ name, email, password }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return parseResponse(res)
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return parseResponse(res)
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  return parseResponse(res)
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' })
  if (res.status === 401) return null
  const data = await parseResponse(res)
  return data.user
}

export async function setupAdmin({ nombre, apellido, telefono, correo, password }) {
  const res = await fetch(`${API_URL}/auth/setup-admin`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, apellido, telefono, correo, password }),
  })
  return parseResponse(res)
}

export async function checkAdminExists() {
  const res = await fetch(`${API_URL}/auth/admin-exists`, { credentials: 'include' })
  const data = await parseResponse(res)
  return data.exists
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  return parseResponse(res)
}

export async function resetPassword(token, password) {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  })
  return parseResponse(res)
}
