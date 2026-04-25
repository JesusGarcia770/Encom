import { Link, useLocation } from 'react-router'
import { useState } from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-brand">
          <div className="footer-logo">ENCOM</div>
          <p className="footer-tagline">
            Tecnología que transforma tu vida.<br />
            El Salvador y Centroamérica.
          </p>
        </div>

        <div className="footer-col">
          <h4>Productos</h4>
          <Link to="/products?cat=smartphones">Smartphones</Link>
          <Link to="/products?cat=tablets">Tablets</Link>
          <Link to="/products?cat=monitores">Monitores</Link>
          <Link to="/products?cat=accesorios">Accesorios</Link>
          <Link to="/products?cat=laptops">Laptops</Link>
        </div>

        <div className="footer-col">
          <h4>Empresa</h4>
          <Link to="/about">Quiénes somos</Link>
          <Link to="/about#mision">Misión y visión</Link>
          <Link to="/contact">Contacto</Link>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <a href="mailto:Encom@gmail.com">Encom@gmail.com</a>
          <a href="tel:88790485">8879-0485</a>
          <span>Blvd 277, altos towers</span>
          <span>San Salvador, SV</span>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 ENCOM. Todos los derechos reservados.</p>
        <p>Hecho en El Salvador</p>
      </div>
    </footer>
  )
}