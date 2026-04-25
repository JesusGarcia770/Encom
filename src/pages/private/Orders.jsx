import { useState } from 'react'
import AdminTable from '../../Components/private/AdminTable'
import './Products.css'

const COLUMNS = ['Orden', 'Cliente', 'Total', 'Productos', 'Dirección', 'Fecha', 'Estado', 'Acciones']

const ordenes = [
  { id: 'ENC-2024-001', cliente: 'Juan Pérez',     total: '$320.00',   items: '2 Item(s)', direccion: 'San Salvador, SV',   fecha: '2026-01-15', estado: 'Entregado' },
  { id: 'ENC-2024-001', cliente: 'Ana Torres',     total: '$150.00',   items: '1 Item(s)', direccion: 'Santa Ana, SV',       fecha: '2026-01-15', estado: 'Cancelado' },
  { id: 'ENC-2024-001', cliente: 'Carlos López',   total: '$899.00',   items: '3 Item(s)', direccion: 'San Miguel, SV',      fecha: '2026-01-15', estado: 'Enviado'   },
  { id: 'ENC-2024-001', cliente: 'Eugenia Reyes',  total: '$275.00',   items: '1 Item(s)', direccion: 'Sonsonate, SV',       fecha: '2026-01-15', estado: 'Entregado' },
  { id: 'ENC-2024-001', cliente: 'Luis Sánchez',   total: '$1,299.00', items: '2 Item(s)', direccion: 'Usulután, SV',        fecha: '2026-01-15', estado: 'Entregado' },
  { id: 'ENC-2024-001', cliente: 'Dubai Martínez', total: '$99.00',    items: '1 Item(s)', direccion: 'Burj Khalifa, Dubai', fecha: '2026-01-15', estado: 'Enviado'   },
  { id: 'ENC-2024-001', cliente: 'María Flores',   total: '$450.00',   items: '4 Item(s)', direccion: 'Ahuachapán, SV',      fecha: '2026-01-15', estado: 'Entregado' },
  { id: 'ENC-2024-001', cliente: 'Roberto Díaz',   total: '$680.00',   items: '2 Item(s)', direccion: 'Chalatenango, SV',    fecha: '2026-01-15', estado: 'Entregado' },
]

const estadoClass = { Entregado: 'pill-entregado', Cancelado: 'pill-cancelado', Enviado: 'pill-enviado' }

export default function Orders() {
  const [search, setSearch] = useState('')

  const filtered = ordenes.filter(o =>
    o.cliente.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Órdenes</h1>
          <p>Seguimiento y gestión de pedidos</p>
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
          placeholder="Buscar órdenes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <AdminTable columns={COLUMNS} total={55} label="órdenes">
        {filtered.map((o, i) => (
          <tr key={i}>
            <td><span className="order-id">{o.id}</span></td>
            <td>{o.cliente}</td>
            <td>{o.total}</td>
            <td>{o.items}</td>
            <td>{o.direccion}</td>
            <td>{o.fecha}</td>
            <td><span className={`pill ${estadoClass[o.estado]}`}>● {o.estado}</span></td>
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
