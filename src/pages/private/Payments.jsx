import { useState } from 'react'
import AdminTable from '../../Components/private/AdminTable'
import './Products.css'

const COLUMNS = ['ID', 'Usuario', 'Orden', 'Monto', 'Método', 'Gateway', 'Fecha', 'Estado', 'Acciones']

const pagos = [
  { id: '9aS5fdaS', usuario: 'Ana Torres',     orden: 'ENC-2024-001', monto: '2 Item(s)', metodo: 'Tarjeta crédito', gateway: 'Stripe', fecha: '2026-01-15', estado: 'Activo' },
  { id: 'X05fgH4n', usuario: 'Juan Pérez',     orden: 'ENC-2024-002', monto: '2 Item(s)', metodo: 'Tarjeta crédito', gateway: 'Stripe', fecha: '2026-01-15', estado: 'Activo' },
  { id: 'O5l8afor', usuario: 'Juan Pérez',     orden: 'ENC-2024-003', monto: '2 Item(s)', metodo: 'Tarjeta crédito', gateway: 'Stripe', fecha: '2026-01-15', estado: 'Activo' },
  { id: 'd06aiks3', usuario: 'Luis Sánchez',   orden: 'ENC-2024-004', monto: '2 Item(s)', metodo: 'Tarjeta crédito', gateway: 'Stripe', fecha: '2026-01-15', estado: 'Activo' },
  { id: 'Pq7rT2xm', usuario: 'Dubai Martínez', orden: 'ENC-2024-005', monto: '2 Item(s)', metodo: 'Tarjeta crédito', gateway: 'Stripe', fecha: '2026-01-15', estado: 'Activo' },
  { id: 'Lk3wZ9vb', usuario: 'Juan Pérez',     orden: 'ENC-2024-006', monto: '2 Item(s)', metodo: 'Tarjeta crédito', gateway: 'Stripe', fecha: '2026-01-15', estado: 'Activo' },
]

export default function Payments() {
  const [search, setSearch] = useState('')

  const filtered = pagos.filter(p =>
    p.usuario.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.orden.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Pagos</h1>
          <p>Historial y seguimiento de transacciones</p>
        </div>
        <button className="btn-export">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar
        </button>
      </div>

      <div className="search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Buscar pagos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <AdminTable columns={COLUMNS} total={55} label="pagos">
        {filtered.map((p, i) => (
          <tr key={i}>
            <td><span className="payment-id">{p.id}</span></td>
            <td>{p.usuario}</td>
            <td><span className="order-id">{p.orden}</span></td>
            <td>{p.monto}</td>
            <td>{p.metodo}</td>
            <td>{p.gateway}</td>
            <td>{p.fecha}</td>
            <td><span className="pill pill-activo">● {p.estado}</span></td>
            <td>
              <div className="actions-cell">
                <button className="action-btn act-view">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button className="action-btn act-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button className="action-btn act-delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  )
}
