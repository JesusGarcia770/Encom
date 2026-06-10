import { useState } from 'react'
import Modal from './Modal'
import './CrudForm.css'

const CATEGORIAS_PADRE = ['Electrónica', 'Tecnología', 'Moda', 'Hogar', 'Deportes']
const ESTADOS = ['Activo', 'Inactivo']

const EMPTY = {
  nombre: '',
  slug: '',
  desc: '',
  imagen: '',
  categoriaPadre: '',
  estado: 'Activo',
}

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function CategoryForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial
      ? {
          nombre:          initial.nombre          ?? '',
          slug:            toSlug(initial.nombre   ?? ''),
          desc:            initial.desc            ?? '',
          imagen:          initial.imagen          ?? '',
          categoriaPadre:  initial.categoriaPadre  ?? '',
          estado:          initial.estado          ?? 'Activo',
        }
      : EMPTY
  )

  function set(k, v) {
    if (k === 'nombre') {
      setForm(f => ({ ...f, nombre: v, slug: toSlug(v) }))
    } else {
      setForm(f => ({ ...f, [k]: v }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <Modal title={initial ? 'Editar categoría' : 'Agregar categoría'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="crud-form">

        <div className="form-row">
          <div className="form-field">
            <label>Nombre <span className="req">*</span></label>
            <input
              required
              value={form.nombre}
              onChange={e => set('nombre', e.target.value)}
              placeholder="Ej: Smartphones"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Slug</label>
            <input
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              placeholder="smartphones"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Descripción</label>
            <textarea
              value={form.desc}
              onChange={e => set('desc', e.target.value)}
              placeholder="Describe la categoría..."
              rows={3}
            />
          </div>
        </div>

        <div className="form-row form-row-2">
          <div className="form-field">
            <label>Imagen (URL)</label>
            <input
              value={form.imagen}
              onChange={e => set('imagen', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="form-field">
            <label>Categoría padre</label>
            <select
              value={form.categoriaPadre}
              onChange={e => set('categoriaPadre', e.target.value)}
            >
              <option value="">Ninguna (categoría raíz)</option>
              {CATEGORIAS_PADRE.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Estado</label>
            <select value={form.estado} onChange={e => set('estado', e.target.value)}>
              {ESTADOS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-primary">
            {initial ? 'Guardar cambios' : 'Agregar categoría'}
          </button>
        </div>

      </form>
    </Modal>
  )
}
