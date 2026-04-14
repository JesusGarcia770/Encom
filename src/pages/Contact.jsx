import './Contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-logo">ENCOM</div>
          <h1>Contactanos</h1>
          <p>Estamos aquí para ayudarte. Escríbenos y te respondemos a la brevedad.</p>

          <div className="contact-details">
            <div className="contact-detail">
              <div className="detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="detail-label">Correo</p>
                <p className="detail-value">Encom@gmail.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.56 2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z"/>
                </svg>
              </div>
              <div>
                <p className="detail-label">Número</p>
                <p className="detail-value">8879-0485</p>
              </div>
            </div>

            <div className="contact-detail">
              <div className="detail-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="detail-label">Ubicación</p>
                <p className="detail-value">Blvd 277, altos towers, San Salvador</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>Envíanos un mensaje</h2>
          <div className="form-row-2">
            <div className="form-g">
              <label>Correo electrónico</label>
              <input type="email" placeholder="correo@ejemplo.com" />
            </div>
            <div className="form-g">
              <label>Nombre</label>
              <input type="text" placeholder="Tu nombre" />
            </div>
          </div>
          <div className="form-g">
            <label>Mensaje</label>
            <textarea placeholder="¿En qué podemos ayudarte?" rows={5} />
          </div>
          <button className="btn-send">Enviar mensaje</button>
        </div>
      </div>
    </div>
  )
}
