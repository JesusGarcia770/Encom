import { useState } from 'react'
import Modal from './Modal'
import './CrudForm.css'

const ESTADOS = ['Activo', 'Inactivo']

export default function CategoryForm({ initial, onSave, onClose }) {
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState(
    initial
      ? {
          name:          initial.name          ?? '',
          description:     initial.description     ?? '',
          status:          initial.status          ?? 'Activo',
        }
      : {
          name: '',
          description: '',
          status: 'Activo',
        }
  )

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e) {
  e.preventDefault()

  setSaving(true)

  try {
    await onSave(form)
  } catch (err) {
    setError(err.message)
  } finally {
    setSaving(false)
  }
}

  return (
    <Modal title={initial ? 'Editar categoría' : 'Agregar categoría'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="crud-form">

        <div className="form-row">
          <div className="form-field">
            <label>Nombre <span className="req">*</span></label>
            <input
              required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Ej: Smartphones"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Descripción</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Describe la categoría..."
              rows={3}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Estado</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              {ESTADOS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : (initial ? 'Guardar cambios' : 'Agregar categoría')}
          </button>
        </div>

      </form>
    </Modal>
  )
}
