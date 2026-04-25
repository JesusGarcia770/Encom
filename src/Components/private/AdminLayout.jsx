import { Link, useLocation, Outlet, useNavigate } from 'react-router'
import './AdminLayout.css'

export default function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    // aquí va la lógica de logout
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">EC</div>
          <div className="brand-text">
            <h2>Encom</h2>
            <span>Admin panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'nav-item active' : 'nav-item'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" rx="1"/>
              <rect x="14" y="3" width="7" height="5" rx="1"/>
              <rect x="14" y="12" width="7" height="9" rx="1"/>
              <rect x="3" y="16" width="7" height="5" rx="1"/>
            </svg>
            Dashboard
          </Link>

          <Link to="/admin/products" className={isActive('/admin/products') ? 'nav-item active' : 'nav-item'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            Products
          </Link>

          <Link to="/admin/categories" className={isActive('/admin/categories') ? 'nav-item active' : 'nav-item'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            Categories
          </Link>

          <Link to="/admin/Orders" className={isActive('/admin/orders') ? 'nav-item active' : 'nav-item'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Ordenes
          </Link>

          <Link to="/admin/Payments" className={isActive('/admin/payments') ? 'nav-item active' : 'nav-item'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            Pagos
          </Link>

          <Link to="/admin/users" className={isActive('/admin/users') ? 'nav-item active' : 'nav-item'}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Usuarios
          </Link>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <span>Log Out</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="admin-main">
        {/* TOP BAR */}
        <header className="admin-topbar">
          <div className="topbar-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Buscar en Encom..." />
          </div>

          <div className="topbar-actions">
            <button className="topbar-bell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <div className="topbar-user" onClick={() => navigate('/admin/profile')}>
              <div className="user-avatar">JG</div>
              <div className="user-info">
                <strong>Jesus Garcia</strong>
                <span>Admin panel</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
