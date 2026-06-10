import { useState } from 'react'
import Modal from './Modal'
import './CrudForm.css'

const ROLES = ['Admin', 'Editor', 'Cliente']
const ESTADOS = ['Activo', 'Inactivo', 'Suspendido']

const EMPTY = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  phone: '',
  role: 'Cliente',
  estado: 'Activo',
  emailVerified: false,
}

export default function UserForm({ initial, onSave, onClose }) {
  const isEdit = Boolean(initial)

  const [form, setForm] = useState(
    initial
      ? { ...EMPTY, ...initial, password: '' }
      : EMPTY
  )

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal title={isEdit ? 'Editar usuario' : 'Agregar usuario'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="crud-form">

        <div className="form-row form-row-2">
          <div className="form-field">
            <label>Nombre <span className="req">*</span></label>
            <input
              required
              value={form.nombre}
              onChange={e => set('nombre', e.target.value)}
              placeholder="Juan"
            />
          </div>
          <div className="form-field">
            <label>Apellido <span className="req">*</span></label>
            <input
              required
              value={form.apellido}
              onChange={e => set('apellido', e.target.value)}
              placeholder="Pérez"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Email <span className="req">*</span></label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="usuario@ejemplo.com"
            />
          </div>
        </div>

        <div className="form-row form-row-2">
          <div className="form-field">
            <label>
              {isEdit ? 'Nueva contraseña' : 'Contraseña'}
              {!isEdit && <span className="req"> *</span>}
            </label>
            <input
              type="password"
              required={!isEdit}
              value={form.password}
              onChange={e => set('password', e.target.value)}
              placeholder={isEdit ? 'Dejar vacío para no cambiar' : '••••••••'}
            />
          </div>
          <div className="form-field">
            <label>Teléfono</label>
            <input
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder="8879-0485"
            />
          </div>
        </div>

        <div className="form-row form-row-2">
          <div className="form-field">
            <label>Rol</label>
            <select value={form.role} onChange={e => set('role', e.target.value)}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label>Estado</label>
            <select value={form.estado} onChange={e => set('estado', e.target.value)}>
              {ESTADOS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="email-verificado"
            checked={form.emailVerified}
            onChange={e => set('emailVerified', e.target.checked)}
          />
          <label htmlFor="email-verificado">Email verificado</label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-primary">
            {isEdit ? 'Guardar cambios' : 'Agregar usuario'}
          </button>
        </div>

      </form>
    </Modal>
  )
}
