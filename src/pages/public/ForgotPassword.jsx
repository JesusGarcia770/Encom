import { useState } from 'react'
import { Link } from 'react-router'
import FormField from '../../Components/public/FormField'
import './AuthPages.css'
import './ForgotPassword.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (email) setSent(true)
  }

  if (sent) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-logo">ENCOM</div>
          <div className="recovery-success">
            <div className="recovery-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h2>Revisa tu correo</h2>
            <p>Enviamos un enlace de recuperación a <strong>{email}</strong>. Puede tardar unos minutos.</p>
            <Link to="/login" className="btn-auth recovery-btn">Volver al inicio de sesión</Link>
            <button className="recovery-resend" onClick={() => setSent(false)}>
              ¿No llegó? Reenviar correo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">ENCOM</div>
        <h1 className="auth-title">Recuperar contraseña</h1>
        <p className="auth-sub">Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña</p>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Correo electrónico"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="correo@ejemplo.com"
          />
          <button type="submit" className="btn-auth">Enviar enlace</button>
        </form>

        <p className="auth-switch">
          <Link to="/login">← Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  )
}
