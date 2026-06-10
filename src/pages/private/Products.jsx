import { useState } from 'react'
import AdminTable from '../../Components/private/AdminTable'
import ProductForm from '../../Components/private/ProductForm'
import ConfirmDialog from '../../Components/private/ConfirmDialog'
import './Products.css'

const COLUMNS = ['Productos', 'Precio', 'Stock', 'Categoria', 'Marca', 'Fecha', 'Estado', 'Acciones']

const INIT = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  nombre: 'Samsung Galaxy S24 Ultra',
  descripcion: 'Smartphone flagship de Samsung con pantalla Dynamic AMOLED 2X.',
  precio: 150,
  stock: 175,
  categoria: 'Smartphones',
  marca: 'Samsung',
  fecha: '2026-01-15',
  estado: 'Activo',
  imagenes: '',
}))

const estadoClass = {
  Activo: 'pill-activo',
  Inactivo: 'pill-inactivo',
  Descontinuado: 'pill-cancelado',
}

export default function Products() {
  const [productos, setProductos] = useState(INIT)
  const [search, setSearch]       = useState('')
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState(null)
  const [toDelete, setToDelete]   = useState(null)

  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd()  { setEditing(null); setShowForm(true) }
  function openEdit(p){ setEditing(p);    setShowForm(true) }
  function closeForm(){ setShowForm(false); setEditing(null) }

  function handleSave(data) {
    if (editing) {
      setProductos(ps => ps.map(p => p.id === editing.id ? { ...p, ...data } : p))
    } else {
      const newId = Math.max(0, ...productos.map(p => p.id)) + 1
      const fecha = new Date().toISOString().split('T')[0]
      setProductos(ps => [...ps, { id: newId, fecha, ...data }])
    }
    closeForm()
  }

  function handleDelete() {
    setProductos(ps => ps.filter(p => p.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Gestiona el catálogo de Encom</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Agregar producto</button>
      </div>

      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <AdminTable columns={COLUMNS} total={productos.length} label="productos">
        {filtered.map(p => (
          <tr key={p.id}>
            <td>
              <div className="product-cell">
                <div className="product-thumb">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <circle cx="12" cy="18" r="1"/>
                  </svg>
                </div>
                <div>
                  <strong>{p.nombre}</strong>
                  <span>{p.marca} · {p.categoria}</span>
                </div>
              </div>
            </td>
            <td>${p.precio}</td>
            <td>{p.stock}</td>
            <td>{p.categoria}</td>
            <td>{p.marca}</td>
            <td>{p.fecha}</td>
            <td>
              <span className={`pill ${estadoClass[p.estado] ?? 'pill-inactivo'}`}>
                ● {p.estado}
              </span>
            </td>
            <td>
              <div className="actions-cell">
                <button className="action-btn act-view" title="Ver">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button className="action-btn act-edit" title="Editar" onClick={() => openEdit(p)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button className="action-btn act-delete" title="Eliminar" onClick={() => setToDelete(p)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {showForm && (
        <ProductForm initial={editing} onSave={handleSave} onClose={closeForm} />
      )}

      {toDelete && (
        <ConfirmDialog
          message={`¿Eliminar el producto "${toDelete.nombre}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
