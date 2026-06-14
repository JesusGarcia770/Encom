import { useState } from 'react'
import AdminTable from '../../Components/private/AdminTable'
import ProductForm from '../../Components/private/ProductForm'
import ConfirmDialog from '../../Components/private/ConfirmDialog'
import { useProducts } from '../../hooks/useProducts'
import './Products.css'

const COLUMNS = ['Producto', 'Precio', 'Stock', 'Categoría', 'Fecha', 'Acciones']

export default function Products() {
  const { products: productos, loading, error, setError, addProduct, editProduct, removeProduct } = useProducts()
  const [search, setSearch]       = useState('')
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState(null)
  const [toDelete, setToDelete]   = useState(null)

  const filtered = productos.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd()  { setEditing(null); setShowForm(true) }
  function openEdit(p){ setEditing(p);    setShowForm(true) }
  function closeForm(){ setShowForm(false); setEditing(null) }

  async function handleSave(formData) {
    if (editing) {
      await editProduct(editing._id, formData)
    } else {
      await addProduct(formData)
    }
    closeForm()
  }

  async function handleDelete() {
    try {
      await removeProduct(toDelete._id)
      setToDelete(null)
    } catch (err) {
      setError(err.message)
      setToDelete(null)
    }
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

      {error && <p className="form-error">{error}</p>}

      <AdminTable columns={COLUMNS} total={productos.length} label="productos">
        {loading ? (
          <tr><td colSpan={COLUMNS.length}>Cargando...</td></tr>
        ) : filtered.map(p => (
          <tr key={p._id}>
            <td>
              <div className="product-cell">
                <div className="product-thumb">
                  {p.image
                    ? <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                    : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                        <rect x="5" y="2" width="14" height="20" rx="2"/>
                        <circle cx="12" cy="18" r="1"/>
                      </svg>
                    )
                  }
                </div>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.category_id?.name ?? 'Sin categoría'}</span>
                </div>
              </div>
            </td>
            <td>${p.price}</td>
            <td>{p.stock}</td>
            <td>{p.category_id?.name ?? '-'}</td>
            <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '-'}</td>
            <td>
              <div className="actions-cell">
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
          message={`¿Eliminar el producto "${toDelete.name}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </div>
  )
}
