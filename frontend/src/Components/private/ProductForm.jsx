import { useState } from 'react'
import Modal from './Modal'
import { useCategories } from '../../hooks/useCategories'
import './CrudForm.css'

const EMPTY = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category_id: '',
}

export default function ProductForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial
      ? {
          name:        initial.name        ?? '',
          description: initial.description ?? '',
          price:       initial.price        ?? '',
          stock:       initial.stock        ?? '',
          category_id: initial.category_id?._id ?? initial.category_id ?? '',
        }
      : EMPTY
  )
  const { categories } = useCategories()
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(initial?.image ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!initial && !imageFile) {
      setError('La imagen es obligatoria')
      return
    }

    const data = new FormData()
    data.append('name', form.name)
    data.append('description', form.description)
    data.append('price', form.price)
    data.append('stock', form.stock)
    data.append('category_id', form.category_id)
    if (imageFile) data.append('image', imageFile)

    setSaving(true)
    try {
      await onSave(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title={initial ? 'Editar producto' : 'Agregar producto'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="crud-form">

        <div className="form-row">
          <div className="form-field">
            <label>Nombre <span className="req">*</span></label>
            <input
              required
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Ej: Samsung Galaxy S24 Ultra"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Descripción</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Descripción detallada del producto..."
              rows={3}
            />
          </div>
        </div>

        <div className="form-row form-row-2">
          <div className="form-field">
            <label>Precio (USD) <span className="req">*</span></label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={e => set('price', e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="form-field">
            <label>Stock</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={e => set('stock', e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Categoría <span className="req">*</span></label>
            <select
              required
              value={form.category_id}
              onChange={e => set('category_id', e.target.value)}
            >
              <option value="">Seleccionar...</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Imagen {!initial && <span className="req">*</span>}</label>
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} />
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Guardando...' : (initial ? 'Guardar cambios' : 'Agregar producto')}
          </button>
        </div>

      </form>
    </Modal>
  )
}
