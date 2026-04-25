import { useState } from 'react'
import { Link } from 'react-router'
import FormField from '../../Components/public/FormField'
import './AuthPages.css'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">ENCOM</div>
        <h1 className="auth-title">Inicio de sesión</h1>
        <p className="auth-sub">Bienvenido de vuelta</p>

        <FormField label="Correo electrónico" name="email" value={form.email} onChange={handleChange} type="email" placeholder="correo@ejemplo.com" />

        <FormField label="Contraseña">
          <div className="input-icon">
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button className="eye-btn" onClick={() => setShowPass(!showPass)} type="button">
              {showPass
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </FormField>

        <div className="auth-row">
          <Link to="/forgot-password" className="auth-link">¿Olvidaste tu contraseña? <span>Recuperar</span></Link>
        </div>

        <button className="btn-auth">Iniciar sesión</button>

        <p className="auth-switch">
          ¿No tienes una cuenta? <Link to="/Register">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}
