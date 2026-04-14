import './AboutUs.css'

export default function AboutUs() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <div className="about-hero-text">
          <span className="about-badge">Nuestra historia</span>
          <h1>Quiénes somos</h1>
          <p>
            ENCOM es una empresa salvadoreña especializada en la venta de electrodomésticos
            y tecnología para el hogar. Nos enfocamos en ofrecer productos innovadores,
            eficientes y confiables que mejoran la calidad de vida de nuestros clientes.
          </p>
        </div>
        <div className="about-logo-big">ENCOM</div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <div className="about-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
          </div>
          <h3>Nuestra Misión</h3>
          <p>
            Brindar electrodomésticos y productos tecnológicos de alta calidad que faciliten
            la vida diaria de nuestros clientes, ofreciendo innovación, eficiencia y precios competitivos.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <h3>Nuestra Visión</h3>
          <p>
            Convertirnos en una marca líder en El Salvador y Centroamérica en el sector de productos
            tecnológicos para el hogar, destacándonos por nuestra innovación, confianza y excelencia.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0057D9" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3>Nuestro Equipo</h3>
          <p>
            Un equipo comprometido y apasionado por la tecnología, dedicado a brindar la mejor
            experiencia de compra y soporte post-venta a cada cliente.
          </p>
        </div>
      </div>

      <div className="about-image-section">
        <div className="about-img-placeholder">
          <svg viewBox="0 0 80 60" fill="none">
            <rect width="80" height="60" rx="8" fill="#EEF4FF"/>
            <rect x="10" y="10" width="26" height="18" rx="3" fill="#0057D9" opacity="0.3"/>
            <rect x="44" y="10" width="26" height="18" rx="3" fill="#0057D9" opacity="0.3"/>
            <rect x="10" y="34" width="60" height="16" rx="3" fill="#0057D9" opacity="0.15"/>
            <text x="40" y="45" textAnchor="middle" fontSize="7" fill="#0057D9" fontWeight="600">ENCOM</text>
          </svg>
        </div>
        <div className="about-values">
          <h2>Nuestros valores</h2>
          {[
            { label: 'Innovación', desc: 'Siempre buscamos las últimas tendencias tecnológicas.' },
            { label: 'Confianza', desc: 'Transparencia y honestidad en cada transacción.' },
            { label: 'Calidad', desc: 'Productos certificados con garantía oficial.' },
            { label: 'Servicio', desc: 'Atención personalizada antes y después de la compra.' },
          ].map(v => (
            <div className="value-item" key={v.label}>
              <div className="value-dot" />
              <div>
                <p className="value-label">{v.label}</p>
                <p className="value-desc">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
