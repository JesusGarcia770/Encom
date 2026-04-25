import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import FormField from '../../Components/private/FormField'
import './Setup.css'

export default function Setup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', apellido: '', telefono: '', correo: '', password: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('encom_admin')) navigate('/admin/login')
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.nombre || !form.apellido || !form.telefono || !form.correo || !form.password) {
      setError('Completa todos los campos.')
      return
    }
    localStorage.setItem('encom_admin', JSON.stringify(form))
    navigate('/admin/login')
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
          <h1>Configura<br/>tu <span className="accent">tienda</span></h1>
          <p>Esta pantalla solo aparece la primera vez. Crea el administrador principal que tendrá control total sobre la plataforma Encom.</p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <span className="auth-badge">● Instalación Inicial</span>
          <h3>Crear administrador</h3>
          <p className="auth-subtitle">Este será el usuario con acceso total al sistema. Guarda las credenciales en un lugar seguro.</p>

          <div className="form-row">
            <FormField label="Nombre"   name="nombre"   value={form.nombre}   onChange={handleChange} placeholder="Jesus"  />
            <FormField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Garcia" />
          </div>

          <FormField label="Número de teléfono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="8879-0485"       />
          <FormField label="Correo"             name="correo"   value={form.correo}   onChange={handleChange} placeholder="admin@gmail.com" type="email"    />
          <FormField label="Contraseña"         name="password" value={form.password} onChange={handleChange} placeholder="••••••••"        type="password" />

          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn">Continuar</button>
        </form>
      </div>
    </div>
  )
}
