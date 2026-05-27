import { useState } from 'react'
import AdminTable from '../../Components/private/AdminTable'
import './Products.css'
import './Users.css'

const COLUMNS = ['Usuario', 'Email', 'Teléfono', 'Rol', 'Verificado', 'Estado', 'Acciones']

const usuarios = [
  { nombre: 'Jesus',   apellido: 'Garcia',   email: 'jesus@encom.com',    phone: '8879-0485', role: 'Admin',   emailVerified: true,  estado: 'Activo'     },
  { nombre: 'Ana',     apellido: 'Torres',   email: 'ana@gmail.com',      phone: '7732-1190', role: 'Cliente', emailVerified: true,  estado: 'Activo'     },
  { nombre: 'Juan',    apellido: 'Pérez',    email: 'juan@gmail.com',     phone: '6614-3302', role: 'Cliente', emailVerified: false, estado: 'Activo'     },
  { nombre: 'Carlos',  apellido: 'López',    email: 'carlos@gmail.com',   phone: '7890-2245', role: 'Editor',  emailVerified: true,  estado: 'Activo'     },
  { nombre: 'María',   apellido: 'Flores',   email: 'maria@gmail.com',    phone: '6623-8810', role: 'Cliente', emailVerified: true,  estado: 'Inactivo'   },
  { nombre: 'Eugenia', apellido: 'Reyes',    email: 'eugenia@gmail.com',  phone: '7701-5543', role: 'Cliente', emailVerified: false, estado: 'Activo'     },
  { nombre: 'Luis',    apellido: 'Sánchez',  email: 'luis@gmail.com',     phone: '8845-6677', role: 'Editor',  emailVerified: true,  estado: 'Activo'     },
  { nombre: 'Roberto', apellido: 'Díaz',     email: 'roberto@gmail.com',  phone: '7712-9934', role: 'Cliente', emailVerified: false, estado: 'Suspendido' },
  { nombre: 'Dubai',   apellido: 'Martínez', email: 'dubai@gmail.com',    phone: '6698-0021', role: 'Cliente', emailVerified: true,  estado: 'Inactivo'   },
  { nombre: 'Sofía',   apellido: 'Ramírez',  email: 'sofia@gmail.com',    phone: '7756-4488', role: 'Editor',  emailVerified: true,  estado: 'Activo'     },
]

const roleClass  = { Admin: 'pill-admin', Editor: 'pill-editor', Cliente: 'pill-cliente' }
const estadoClass = { Activo: 'pill-entregado', Inactivo: 'pill-inactivo', Suspendido: 'pill-cancelado' }

function Avatar({ nombre, apellido }) {
  return <div className="user-avatar-cell">{(nombre[0] + apellido[0]).toUpperCase()}</div>
}

export default function Users() {
  const [search, setSearch] = useState('')

  const filtered = usuarios.filter(u =>
    `${u.nombre} ${u.apellido} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Usuarios</h1>
          <p>Gestión de cuentas y roles</p>
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
          placeholder="Buscar usuarios..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <AdminTable columns={COLUMNS} total={usuarios.length} label="usuarios">
        {filtered.map((u, i) => (
          <tr key={i}>
            <td>
              <div className="product-cell">
                <Avatar nombre={u.nombre} apellido={u.apellido} />
                <strong>{u.nombre} {u.apellido}</strong>
              </div>
            </td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td><span className={`pill ${roleClass[u.role]}`}>{u.role}</span></td>
            <td>
              {u.emailVerified
                ? <span className="pill pill-entregado">✓ Verificado</span>
                : <span className="pill pill-inactivo">✗ Pendiente</span>
              }
            </td>
            <td><span className={`pill ${estadoClass[u.estado]}`}>● {u.estado}</span></td>
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
