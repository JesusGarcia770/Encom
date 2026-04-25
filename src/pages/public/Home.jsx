import { useState } from 'react'
import { Link } from 'react-router'
import ProductCard from '../../Components/public/ProductCard'
import Footer from '../../components/public/Footer'
import Hero from '../../Components/public/Hero'
import samsungImg from '../../assets/image.png'
import './Home.css'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="17" r="1"/><line x1="9" y1="6" x2="15" y2="6"/></svg>
)
const TabletIcon = () => (
  <svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg>
)
const MonitorIcon = () => (
  <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
)
const LaptopIcon = () => (
  <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M0 21h24"/></svg>
)

const products = {
  destacados: [
    {
      id: 1,
      name: 'Aether Pro 250GB',
      desc: '6.7" AMOLED · 200MP · 5000mAh',
      price: 740,
      oldPrice: 900,
      badge: '-18%',
      colors: ['#1a1a1a', '#C0C0C0', '#8B5CF6'],
      icon: <PhoneIcon />,
    },
    {
      id: 2,
      name: 'Aether Lite 128GB',
      desc: '6.4" LCD · 64MP · 4500mAh',
      price: 499,
      oldPrice: 610,
      badge: 'Nuevo',
      colors: ['#0057D9', '#E8E8E8'],
      icon: <PhoneIcon />,
    },
    {
      id: 3,
      name: 'Encom View 27"',
      desc: '4K IPS · 144Hz · HDR400',
      price: 320,
      oldPrice: 390,
      colors: ['#1a1a1a', '#fff'],
      icon: <MonitorIcon />,
    },
    {
      id: 4,
      name: 'Aether Tab Pro',
      desc: '11" AMOLED · S-Pen · 8000mAh',
      price: 580,
      oldPrice: 680,
      badge: 'Nuevo',
      colors: ['#4B5563', '#0057D9'],
      icon: <TabletIcon />,
    },
  ],
  smartphones: [
    {
      id: 5,
      name: 'Aether Pro Max',
      desc: '6.8" AMOLED · 108MP · 6000mAh',
      price: 899,
      oldPrice: 1050,
      badge: '-15%',
      colors: ['#1a1a1a', '#FFD700'],
      icon: <PhoneIcon />,
    },
    {
      id: 6,
      name: 'Aether SE',
      desc: '6.1" LCD · 48MP · 4000mAh',
      price: 299,
      colors: ['#E8E8E8', '#1a1a1a', '#FF6B6B'],
      icon: <PhoneIcon />,
    },
    {
      id: 7,
      name: 'Aether Fold',
      desc: '7.6" Plegable · AMOLED · 4400mAh',
      price: 1299,
      oldPrice: 1499,
      badge: 'Nuevo',
      colors: ['#1a1a1a', '#B8860B'],
      icon: <PhoneIcon />,
    },
    {
      id: 8,
      name: 'Aether Lite Plus',
      desc: '6.5" IPS · 64MP · 5000mAh',
      price: 380,
      oldPrice: 450,
      colors: ['#0057D9', '#E8E8E8', '#1a1a1a'],
      icon: <PhoneIcon />,
    },
  ],
  tablets: [
    {
      id: 9,
      name: 'Aether Tab S',
      desc: '10.5" IPS · 8GB RAM · 7000mAh',
      price: 380,
      oldPrice: 450,
      badge: '-15%',
      colors: ['#4B5563', '#C0C0C0'],
      icon: <TabletIcon />,
    },
    {
      id: 10,
      name: 'Aether Tab Lite',
      desc: '8" LCD · 4GB RAM · 5100mAh',
      price: 199,
      colors: ['#1a1a1a', '#E8E8E8'],
      icon: <TabletIcon />,
    },
    {
      id: 11,
      name: 'Aether Tab Pro 12',
      desc: '12.4" AMOLED · 12GB RAM · 10000mAh',
      price: 799,
      oldPrice: 950,
      badge: 'Nuevo',
      colors: ['#1a1a1a', '#0057D9'],
      icon: <TabletIcon />,
    },
    {
      id: 12,
      name: 'Aether Tab Kids',
      desc: '10" LCD · Resistente · 6000mAh',
      price: 229,
      oldPrice: 280,
      colors: ['#FF6B6B', '#4CAF50', '#0057D9'],
      icon: <TabletIcon />,
    },
  ],
  laptops: [
    {
      id: 13,
      name: 'Encom Book Pro',
      desc: '15.6" OLED · i7 · 16GB · 512GB SSD',
      price: 1099,
      oldPrice: 1299,
      badge: '-15%',
      colors: ['#1a1a1a', '#C0C0C0'],
      icon: <LaptopIcon />,
    },
    {
      id: 14,
      name: 'Encom Book Air',
      desc: '13.3" IPS · i5 · 8GB · 256GB SSD',
      price: 699,
      colors: ['#C0C0C0', '#FFD700'],
      icon: <LaptopIcon />,
    },
    {
      id: 15,
      name: 'Encom Book Max',
      desc: '17.3" 4K · i9 · 32GB · 1TB SSD',
      price: 1599,
      oldPrice: 1899,
      badge: 'Nuevo',
      colors: ['#1a1a1a'],
      icon: <LaptopIcon />,
    },
    {
      id: 16,
      name: 'Encom Book Lite',
      desc: '14" IPS · Ryzen 5 · 8GB · 256GB',
      price: 549,
      oldPrice: 650,
      colors: ['#E8E8E8', '#1a1a1a'],
      icon: <LaptopIcon />,
    },
  ],
}

const tabs = ['destacados', 'smartphones', 'tablets', 'laptops']
const tabLabels = { destacados: 'Productos destacados', smartphones: 'Smartphones', tablets: 'Tablets', laptops: 'Laptops' }

export default function Home() {
  const [activeTab, setActiveTab] = useState('destacados')

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
          <a className="view-all">Ver todo →</a>
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

        <div className="product-grid">
          {products[activeTab].map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
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
