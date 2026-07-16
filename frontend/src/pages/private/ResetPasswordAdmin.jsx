import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import FormField from '../../Components/private/FormField'
import { resetPassword } from '../../api/auth'
import { useAuth } from '../../hooks/useAuth'
import './Setup.css'
import './ForgotPasswordAdmin.css'

export default function ResetPasswordAdmin() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [form, setForm] = useState({ password: '', confirmar: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!form.password || !form.confirmar) {
      setError('Completa todos los campos.')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setLoading(true)
    try {
      const data = await resetPassword(token, form.password)
      setUser(data.user)
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

      <div className="forgot-center">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h3>Nueva contraseña</h3>
          <p className="auth-subtitle">Elige una contraseña segura para tu cuenta de administrador.</p>

          <FormField label="Nueva contraseña"    name="password"  value={form.password}  onChange={handleChange} type="password" placeholder="••••••••" />
          <FormField label="Confirmar contraseña" name="confirmar" value={form.confirmar} onChange={handleChange} type="password" placeholder="••••••••" />

          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Guardando...' : 'Restablecer contraseña'}
          </button>
        </form>
      </div>
    </div>
  )
}
