import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import FormField from '../../Components/private/FormField'
import { useAuth } from '../../hooks/useAuth'
import { checkAdminExists } from '../../api/auth'
import './Setup.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginAdmin() {
  const navigate = useNavigate()
  const { login, logout } = useAuth()
  const [form, setForm] = useState({ correo: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkAdminExists()
      .then(exists => {
        if (!exists) navigate('/admin/setup')
      })
      .catch(() => {})
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!form.correo || !form.password) {
      setError('Completa todos los campos.')
      return
    }
    if (!EMAIL_REGEX.test(form.correo)) {
      setError('Correo inválido.')
      return
    }

    setLoading(true)
    try {
      const user = await login(form.correo, form.password)
      if (user.role !== 'admin') {
        await logout()
        setError('No tienes permisos de administrador.')
        return
      }
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="brand-logo">EC</div>
        <div className="brand-text">
          <h2>Encom</h2>
          <span>Admin panel</span>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-info">
          <h1>Bienvenido de<br/>vuelta <span className="accent">Encom</span></h1>
          <p>Gestiona productos, pedidos, usuarios y pagos desde un solo lugar. Accede con tus credenciales para continuar.</p>

          <ul className="auth-features">
            <li><span className="dot"></span>Dashboard con métricas en tiempo real</li>
            <li><span className="dot"></span>Gestión completa de inventario</li>
            <li><span className="dot"></span>Control de pedidos y envíos</li>
            <li><span className="dot"></span>Administración de usuarios y roles</li>
          </ul>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <p className="auth-subtitle">Bienvenido a Encom</p>

          <FormField label="Correo"     name="correo"   value={form.correo}   onChange={handleChange} placeholder="admin@gmail.com" type="email"    />
          <FormField label="Contraseña" name="password" value={form.password} onChange={handleChange} placeholder="••••••••"        type="password" />

          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Ingresando...' : 'Continuar'}
          </button>
          <Link to="/admin/forgot-password" className="auth-forgot-link">¿Olvidaste tu contraseña?</Link>
        </form>
      </div>
    </div>
  )
}
