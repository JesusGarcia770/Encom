import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import FormField from '../../Components/private/FormField'
import './Setup.css'

export default function LoginAdmin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ telefono: '', correo: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('encom_admin')) navigate('/admin/setup')
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    const admin = JSON.parse(localStorage.getItem('encom_admin') || '{}')
    if (form.correo === admin.correo && form.password === admin.password && form.telefono === admin.telefono) {
      sessionStorage.setItem('encom_admin_logged', '1')
      navigate('/admin/dashboard')
    } else {
      setError('Credenciales incorrectas.')
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

          <FormField label="Número de teléfono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="8879-0485"       />
          <FormField label="Correo"             name="correo"   value={form.correo}   onChange={handleChange} placeholder="admin@gmail.com" type="email"    />
          <FormField label="Contraseña"         name="password" value={form.password} onChange={handleChange} placeholder="••••••••"        type="password" />

          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn">Continuar</button>
          <Link to="/admin/forgot-password" className="auth-forgot-link">¿Olvidaste tu contraseña?</Link>
        </form>
      </div>
    </div>
  )
}
