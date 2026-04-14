import { useState } from 'react'
import { Link } from 'react-router'
import './AuthPages.css'

export default function Register() {
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">ENCOM</div>
        <h1 className="auth-title">Regístrate</h1>
        <p className="auth-sub">Crea tu cuenta y empieza a comprar</p>

        <div className="form-row">
          <div className="form-group">
            <label>Nombre de usuario</label>
            <input type="text" placeholder="Tu nombre" />
          </div>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" placeholder="correo@ejemplo.com" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Contraseña</label>
            <div className="input-icon">
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" />
              <button className="eye-btn" onClick={() => setShowPass(!showPass)} type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <div className="input-icon">
              <input type={showConfirm ? 'text' : 'password'} placeholder="••••••••" />
              <button className="eye-btn" onClick={() => setShowConfirm(!showConfirm)} type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button className="btn-auth">Registrarse</button>

        <p className="auth-switch">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}
