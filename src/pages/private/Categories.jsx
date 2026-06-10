import { useState } from 'react'
import AdminTable from '../../Components/private/AdminTable'
import CategoryForm from '../../Components/private/CategoryForm'
import ConfirmDialog from '../../Components/private/ConfirmDialog'
import './Products.css'

const COLUMNS = ['Categoría', 'Descripción', 'Productos', 'Estado', 'Acciones']

const INIT = [
  { id: 1, nombre: 'Smartphones',   desc: 'Teléfonos inteligentes de última generación',   productos: 80,  estado: 'Activo'   },
  { id: 2, nombre: 'Laptops',       desc: 'Computadoras portátiles para trabajo y gaming',  productos: 45,  estado: 'Activo'   },
  { id: 3, nombre: 'Accesorios',    desc: 'Cables, cargadores y periféricos',               productos: 120, estado: 'Activo'   },
  { id: 4, nombre: 'Tablets',       desc: 'Dispositivos táctiles de mediano formato',       productos: 30,  estado: 'Activo'   },
  { id: 5, nombre: 'Audífonos',     desc: 'Auriculares y equipos de audio',                 productos: 55,  estado: 'Activo'   },
  { id: 6, nombre: 'Smart Watches', desc: 'Relojes inteligentes y wearables',               productos: 22,  estado: 'Inactivo' },
]

export default function Categories() {
  const [categorias, setCategorias] = useState(INIT)
  const [search, setSearch]         = useState('')
  const [showForm, setShowForm]     = useState(false)
  const [editing, setEditing]       = useState(null)
  const [toDelete, setToDelete]     = useState(null)

  const filtered = categorias.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd()  { setEditing(null); setShowForm(true) }
  function openEdit(c){ setEditing(c);    setShowForm(true) }
  function closeForm(){ setShowForm(false); setEditing(null) }

  function handleSave(data) {
    if (editing) {
      setCategorias(cs => cs.map(c => c.id === editing.id ? { ...c, ...data } : c))
    } else {
      const newId = Math.max(0, ...categorias.map(c => c.id)) + 1
      setCategorias(cs => [...cs, { id: newId, productos: 0, ...data }])
    }
    closeForm()
  }

  function handleDelete() {
    setCategorias(cs => cs.filter(c => c.id !== toDelete.id))
    setToDelete(null)
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Categorías</h1>
          <p>Organiza el catálogo por categorías</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Agregar categoría</button>
      </div>

      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <AdminTable columns={COLUMNS} total={categorias.length} label="categorías">
        {filtered.map(c => (
          <tr key={c.id}>
            <td><strong style={{ color: '#fff' }}>{c.nombre}</strong></td>
            <td>{c.desc}</td>
            <td>{c.productos}</td>
            <td>
              <span className={`pill ${c.estado === 'Activo' ? 'pill-activo' : 'pill-inactivo'}`}>
                ● {c.estado}
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
                <button className="action-btn act-edit" title="Editar" onClick={() => openEdit(c)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button className="action-btn act-delete" title="Eliminar" onClick={() => setToDelete(c)}>
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
        <CategoryForm initial={editing} onSave={handleSave} onClose={closeForm} />
      )}

      {toDelete && (
        <ConfirmDialog
          message={`¿Eliminar la categoría "${toDelete.nombre}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
