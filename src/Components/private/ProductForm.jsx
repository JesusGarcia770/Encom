import { useState } from 'react'
import Modal from './Modal'
import './CrudForm.css'

const CATEGORIAS = ['Smartphones', 'Laptops', 'Accesorios', 'Tablets', 'Audífonos', 'Smart Watches']
const MARCAS = ['Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo']
const ESTADOS = ['Activo', 'Inactivo', 'Descontinuado']

const EMPTY = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria: '',
  marca: '',
  estado: 'Activo',
  imagenes: '',
  descPorcentaje: '',
  descInicio: '',
  descFin: '',
  descActivo: false,
}

export default function ProductForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial
      ? {
          nombre:        initial.nombre       ?? '',
          descripcion:   initial.descripcion  ?? '',
          precio:        initial.precio       ?? '',
          stock:         initial.stock        ?? '',
          categoria:     initial.categoria    ?? '',
          marca:         initial.marca        ?? '',
          estado:        initial.estado       ?? 'Activo',
          imagenes:      initial.imagenes     ?? '',
          descPorcentaje: initial.descPorcentaje ?? '',
          descInicio:    initial.descInicio   ?? '',
          descFin:       initial.descFin      ?? '',
          descActivo:    initial.descActivo   ?? false,
        }
      : EMPTY
  )

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      ...form,
      precio: Number(form.precio),
      stock:  Number(form.stock),
    })
  }

  return (
    <Modal title={initial ? 'Editar producto' : 'Agregar producto'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="crud-form">

        <div className="form-row">
          <div className="form-field">
            <label>Nombre <span className="req">*</span></label>
            <input
              required
              value={form.nombre}
              onChange={e => set('nombre', e.target.value)}
              placeholder="Ej: Samsung Galaxy S24 Ultra"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={e => set('descripcion', e.target.value)}
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
              value={form.precio}
              onChange={e => set('precio', e.target.value)}
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

        <div className="form-row form-row-2">
          <div className="form-field">
            <label>Categoría <span className="req">*</span></label>
            <select
              required
              value={form.categoria}
              onChange={e => set('categoria', e.target.value)}
            >
              <option value="">Seleccionar...</option>
              {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label>Marca <span className="req">*</span></label>
            <select
              required
              value={form.marca}
              onChange={e => set('marca', e.target.value)}
            >
              <option value="">Seleccionar...</option>
              {MARCAS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="form-row form-row-2">
          <div className="form-field">
            <label>Estado</label>
            <select value={form.estado} onChange={e => set('estado', e.target.value)}>
              {ESTADOS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label>Imagen (URL)</label>
            <input
              value={form.imagenes}
              onChange={e => set('imagenes', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="form-section-title">Descuento (opcional)</div>

        <div className="form-row form-row-3">
          <div className="form-field">
            <label>Porcentaje (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.descPorcentaje}
              onChange={e => set('descPorcentaje', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="form-field">
            <label>Fecha inicio</label>
            <input
              type="date"
              value={form.descInicio}
              onChange={e => set('descInicio', e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Fecha fin</label>
            <input
              type="date"
              value={form.descFin}
              onChange={e => set('descFin', e.target.value)}
            />
          </div>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="desc-activo"
            checked={form.descActivo}
            onChange={e => set('descActivo', e.target.checked)}
          />
          <label htmlFor="desc-activo">Descuento activo</label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn-primary">
            {initial ? 'Guardar cambios' : 'Agregar producto'}
          </button>
        </div>

      </form>
    </Modal>
  )
}
