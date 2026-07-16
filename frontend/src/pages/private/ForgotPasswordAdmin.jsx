import { useState } from 'react'
import { Link } from 'react-router'
import FormField from '../../Components/private/FormField'
import { forgotPassword } from '../../api/auth'
import './Setup.css'
import './ForgotPasswordAdmin.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordAdmin() {
  const [correo, setCorreo] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!correo || !EMAIL_REGEX.test(correo)) {
      setError('Ingresa un correo válido.')
      return
    }

    setLoading(true)
    try {
      await forgotPassword(correo)
      setSent(true)
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
        {!sent ? (
          <form className="auth-card" onSubmit={handleSubmit}>
            <div className="forgot-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3>Recuperar acceso</h3>
            <p className="auth-subtitle">Ingresa el correo de tu cuenta de administrador y te enviaremos un enlace para restablecer tu contraseña.</p>

            <FormField label="Correo" name="correo" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="admin@gmail.com" type="email" />

            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </button>
            <Link to="/admin/login" className="forgot-back">← Volver al login</Link>
          </form>
        ) : (
          <div className="auth-card forgot-success">
            <div className="forgot-icon forgot-icon-ok">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Revisa tu correo</h3>
            <p className="auth-subtitle">Si <strong>{correo}</strong> está registrado como administrador, te enviamos un enlace para restablecer tu contraseña.</p>
            <Link to="/admin/login" className="auth-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Volver al login</Link>
          </div>
        )}
      </div>
    </div>
  )
}
