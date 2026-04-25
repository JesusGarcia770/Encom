import { Link, useLocation } from 'react-router'
import { useState } from 'react'
import './Nav.css'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <div className="topbar">
        Regístrate y empieza a pedir eso que más deseas —&nbsp;<strong>Envío gratis</strong>&nbsp;en compras mayores a $50
      </div>

      <nav className="navbar">
        <Link to="/" className="nav-logo">ENCOM</Link>

        <div className="nav-icons">
          <button className="icon-btn" aria-label="Buscar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7"/><path d="m16 16 3 3"/>
            </svg>
          </button>

          <Link to="/cart" className="icon-btn cart-btn" aria-label="Carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="cart-badge">2</span>
          </Link>

          <Link to="/login" className="icon-btn" aria-label="Usuario">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </Link>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>
    </>
  )
}
