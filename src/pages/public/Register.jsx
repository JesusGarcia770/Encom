import { useState } from 'react'
import { Link } from 'react-router'
import FormField from '../../Components/public/FormField'
import './AuthPages.css'

export default function Register() {
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' })
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const EyeIcon = ({ visible }) => visible
    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">ENCOM</div>
        <h1 className="auth-title">Regístrate</h1>
        <p className="auth-sub">Crea tu cuenta y empieza a comprar</p>

        <div className="form-row">
          <FormField label="Nombre de usuario" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
          <FormField label="Correo electrónico" name="email"  value={form.email}  onChange={handleChange} placeholder="correo@ejemplo.com" type="email" />
        </div>

        <div className="form-row">
          <FormField label="Contraseña">
            <div className="input-icon">
              <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
              <button className="eye-btn" onClick={() => setShowPass(!showPass)} type="button"><EyeIcon visible={showPass} /></button>
            </div>
          </FormField>
          <FormField label="Confirmar contraseña">
            <div className="input-icon">
              <input type={showConfirm ? 'text' : 'password'} name="confirmar" value={form.confirmar} onChange={handleChange} placeholder="••••••••" />
              <button className="eye-btn" onClick={() => setShowConfirm(!showConfirm)} type="button"><EyeIcon visible={showConfirm} /></button>
            </div>
          </FormField>
        </div>

        <button className="btn-auth">Registrarse</button>

        <p className="auth-switch">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}
