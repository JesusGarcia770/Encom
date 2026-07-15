import { useState } from 'react'
import { Link } from 'react-router'
import ProductCard from '../../Components/public/ProductCard'
import Footer from '../../components/public/Footer'
import Hero from '../../Components/public/Hero'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import samsungImg from '../../assets/image.png'
import './Home.css'

const HOME_PRODUCTS_LIMIT = 8

export default function Home() {
  const [activeTab, setActiveTab] = useState('destacados')
  const { products, loading, error } = useProducts()
  const { categories } = useCategories()

  const tabs = ['destacados', ...categories.map(c => c._id)]
  const tabLabels = categories.reduce(
    (acc, c) => ({ ...acc, [c._id]: c.name }),
    { destacados: 'Productos destacados' }
  )

  const visibleProducts = (
    activeTab === 'destacados'
      ? products
      : products.filter(p => p.category_id?._id === activeTab)
  ).slice(0, HOME_PRODUCTS_LIMIT)

  return (
    <main className="home">

      <Hero
        badge="Nuevo en ENCOM"
        titleLine1="Tecnología que"
        accent="transforma"
        titleLine2="tu vida"
        subtitle="Los mejores smartphones, monitores y accesorios. Calidad premium con precios accesibles para El Salvador."
        primaryBtn={{ label: 'Ver productos' }}
        secondaryBtn={{ label: 'Ventas especiales' }}
        imageSrc={samsungImg}
        imageAlt="Samsung Galaxy"
      />

      {/* FEATURES BAR */}
      <div className="features-bar">
        {[
          { label: 'Tienda oficial', sub: 'Productos garantizados', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
          { label: 'Envío gratis', sub: 'A todo El Salvador', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.6"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
          { label: 'Cuotas sin interés', sub: 'Hasta 12 meses', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.6"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
          { label: 'Compra segura', sub: '100% protegido', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
        ].map((f) => (
          <div className="feature-item" key={f.label}>
            <div className="feature-icon">{f.icon}</div>
            <div>
              <p className="feature-label">{f.label}</p>
              <p className="feature-sub">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCTS SECTION */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Novedades <span>del mes</span></h2>
          <Link to="/products" className="view-all">Ver todo →</Link>
        </div>

        <div className="tabs-row">
          {tabs.map((t) => (
            <button
              key={t}
              className={`tab-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {tabLabels[t]}
            </button>
          ))}
        </div>

        {loading && <p className="products-msg">Cargando productos...</p>}
        {error && !loading && <p className="products-msg products-msg-error">{error}</p>}
        {!loading && !error && visibleProducts.length === 0 && (
          <p className="products-msg">Aún no hay productos en esta categoría.</p>
        )}

        {!loading && !error && visibleProducts.length > 0 && (
          <div className="product-grid">
            {visibleProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* PROMO BANNERS */}
      <section className="promo-section">
        <div className="promo-card promo-blue">
          <div>
            <h3 className="promo-title">Arma tu combo</h3>
            <p className="promo-sub">Smartphone + accesorios con hasta 20% de descuento extra</p>
            <button className="promo-btn">Ver combos</button>
          </div>
          <svg className="promo-deco" viewBox="0 0 24 24" fill="white"><rect x="5" y="2" width="14" height="20" rx="3"/></svg>
        </div>
        <div className="promo-card promo-dark">
          <div>
            <h3 className="promo-title">Ventas especiales</h3>
            <p className="promo-sub">Ofertas exclusivas cada semana. Regístrate y no te pierdas ninguna.</p>
            <Link to="/register" className="promo-btn promo-btn-blue">Registrarse gratis</Link>
          </div>
          <svg className="promo-deco" viewBox="0 0 24 24" fill="white"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="about-strip">
        <div className="about-logo">ENCOM</div>
        <div className="about-text">
          <h3>Empresa salvadoreña de tecnología</h3>
          <p>
            Somos una empresa especializada en la venta de electrodomésticos y tecnología para el hogar.
            Ofrecemos innovación, eficiencia y precios competitivos para mejorar la vida diaria de nuestros
            clientes en El Salvador y Centroamérica.
          </p>
          <Link to="/about" className="about-link">Conocer más →</Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  )
}
