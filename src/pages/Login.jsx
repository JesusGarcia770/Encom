import { useState } from 'react'
import { Link } from 'react-router'
import './AuthPages.css'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">ENCOM</div>
        <h1 className="auth-title">Inicio de sesión</h1>
        <p className="auth-sub">Bienvenido de vuelta</p>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <div className="input-icon">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button className="eye-btn" onClick={() => setShowPass(!showPass)} type="button">
              {showPass
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </div>

        <div className="auth-row">
          <a className="auth-link">¿Olvidaste tu contraseña? <span>Recuperar</span></a>
        </div>

        <button className="btn-auth">Iniciar sesión</button>

        <p className="auth-switch">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}
