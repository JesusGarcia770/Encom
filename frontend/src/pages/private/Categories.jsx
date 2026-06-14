import { useState } from 'react'
import AdminTable from '../../Components/private/AdminTable'
import CategoryForm from '../../Components/private/CategoryForm'
import ConfirmDialog from '../../Components/private/ConfirmDialog'
import { useCategories } from '../../hooks/useCategories'
import './Products.css'

const COLUMNS = ['Categoría', 'Descripción','Estado', 'Acciones']

export default function Categories() {
  const { categories: categories, loading, error, setError, reload, addCategory, editCategory, removeCategory,  } = useCategories()
  const [search, setSearch]         = useState('')
  const [showForm, setShowForm]     = useState(false)
  const [editing, setEditing]       = useState(null)
  const [toDelete, setToDelete]     = useState(null)

  const filtered = categories.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd()  { setEditing(null); setShowForm(true) }
  function openEdit(c){ setEditing(c);    setShowForm(true) }
  function closeForm(){ setShowForm(false); setEditing(null) }

  async function handleSave(data) {
    if (editing) {
      await editCategory(editing._id, data)
    } else {
      await addCategory(data)
    }
    closeForm()
  }

  async function handleDelete() {
    try {
    await removeCategory(toDelete._id)
    setToDelete(null)
  } catch (error) {
    setError(error.message)
    setToDelete(null)
  }
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

      <AdminTable columns={COLUMNS} total={categories.length} label="categorías">
        {filtered.map(c => (
          <tr key={c._id}>
            <td><strong style={{ color: '#fff' }}>{c.name}</strong></td>
            <td>{c.description}</td>
            <td>
              <span className={`pill ${c.status === 'Activo' ? 'pill-activo' : 'pill-inactivo'}`}>
                ● {c.status}
              </span>
            </td>
            <td>
              <div className="actions-cell">
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
          message={`¿Eliminar la categoría "${toDelete.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
