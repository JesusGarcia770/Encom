import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import FormField from '../../Components/private/FormField'
import './Setup.css'
import './ForgotPasswordAdmin.css'

export default function ForgotPasswordAdmin() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ correo: '', telefono: '' })
  const [newPass, setNewPass] = useState({ password: '', confirmar: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handlePassChange = e => setNewPass({ ...newPass, [e.target.name]: e.target.value })

  const handleVerify = e => {
    e.preventDefault()
    const admin = JSON.parse(localStorage.getItem('encom_admin') || '{}')
    if (form.correo === admin.correo && form.telefono === admin.telefono) {
      setError('')
      setStep(2)
    } else {
      setError('Los datos no coinciden con ningún administrador.')
    }
  }

  const handleReset = e => {
    e.preventDefault()
    if (newPass.password !== newPass.confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (newPass.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    const admin = JSON.parse(localStorage.getItem('encom_admin'))
    localStorage.setItem('encom_admin', JSON.stringify({ ...admin, password: newPass.password }))
    setStep(3)
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

        {/* PASO 1 — verificar identidad */}
        {step === 1 && (
          <form className="auth-card" onSubmit={handleVerify}>
            <div className="forgot-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3>Recuperar acceso</h3>
            <p className="auth-subtitle">Ingresa el correo y teléfono registrados para verificar tu identidad.</p>

            <FormField label="Correo"    name="correo"   value={form.correo}   onChange={handleChange} placeholder="admin@gmail.com" type="email" />
            <FormField label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="8879-0485"       />

            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn">Verificar identidad</button>
            <Link to="/admin/login" className="forgot-back">← Volver al login</Link>
          </form>
        )}

        {/* PASO 2 — nueva contraseña */}
        {step === 2 && (
          <form className="auth-card" onSubmit={handleReset}>
            <div className="forgot-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Nueva contraseña</h3>
            <p className="auth-subtitle">Elige una contraseña segura para tu cuenta de administrador.</p>

            <FormField label="Nueva contraseña"    name="password"  value={newPass.password}  onChange={handlePassChange} type="password" placeholder="••••••••" />
            <FormField label="Confirmar contraseña" name="confirmar" value={newPass.confirmar} onChange={handlePassChange} type="password" placeholder="••••••••" />

            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn">Restablecer contraseña</button>
          </form>
        )}

        {/* PASO 3 — éxito */}
        {step === 3 && (
          <div className="auth-card forgot-success">
            <div className="forgot-icon forgot-icon-ok">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Contraseña restablecida</h3>
            <p className="auth-subtitle">Tu contraseña fue actualizada correctamente. Ya puedes iniciar sesión.</p>
            <button className="auth-btn" onClick={() => navigate('/admin/login')}>Ir al login</button>
          </div>
        )}

      </div>
    </div>
  )
}
