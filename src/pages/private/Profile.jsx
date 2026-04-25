import { useState } from 'react'
import FormField from '../../Components/private/FormField'
import './Profile.css'

export default function Profile() {
  const [form, setForm] = useState({ nombre: 'Jesus', apellido: 'Garcia', email: 'jesus@encom.com', phone: '8879-0485' })
  const [passwords, setPasswords] = useState({ current: '', nueva: '', confirmar: '' })
  const [saved, setSaved] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handlePassChange = e => setPasswords({ ...passwords, [e.target.name]: e.target.value })

  const handleSave = e => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1>Mi Perfil</h1>
          <p>Configura tu información personal y seguridad</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-sidebar-card">
          <div className="profile-avatar-big">JG</div>
          <h3>{form.nombre} {form.apellido}</h3>
          <span className="profile-role-badge">Admin</span>

          <div className="profile-meta">
            <div className="meta-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>{form.email}</span>
            </div>
            <div className="meta-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>{form.phone}</span>
            </div>
          </div>
        </div>

        <div className="profile-forms">
          <form className="profile-card" onSubmit={handleSave}>
            <h4>Información personal</h4>
            <p className="card-sub">Actualiza tu nombre y datos de contacto</p>

            <div className="form-row-2">
              <FormField label="Nombre"   name="nombre"   value={form.nombre}   onChange={handleChange} />
              <FormField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} />
            </div>
            <FormField label="Email"     name="email"  value={form.email}  onChange={handleChange} type="email"  />
            <FormField label="Teléfono"  name="phone"  value={form.phone}  onChange={handleChange} />

            <div className="profile-card-footer">
              {saved && <span className="save-ok">✓ Cambios guardados</span>}
              <button type="submit" className="btn-save">Guardar cambios</button>
            </div>
          </form>

          <form className="profile-card" onSubmit={e => e.preventDefault()}>
            <h4>Seguridad</h4>
            <p className="card-sub">Cambia tu contraseña de acceso al panel</p>

            <FormField label="Contraseña actual"   name="current"   value={passwords.current}   onChange={handlePassChange} type="password" placeholder="••••••••" />
            <div className="form-row-2">
              <FormField label="Nueva contraseña"    name="nueva"     value={passwords.nueva}     onChange={handlePassChange} type="password" placeholder="••••••••" />
              <FormField label="Confirmar contraseña" name="confirmar" value={passwords.confirmar} onChange={handlePassChange} type="password" placeholder="••••••••" />
            </div>

            <div className="profile-card-footer">
              <button type="submit" className="btn-save">Actualizar contraseña</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
