import { Link } from 'react-router'
import './Hero.css'

export default function Hero({
  badge,
  titleLine1,
  accent,
  titleLine2,
  subtitle,
  primaryBtn,
  secondaryBtn,
  imageSrc,
  imageAlt = ''
}) {
  return (
    <section className="hero">
      <div className="hero-content">
        {badge && <span className="hero-badge">{badge}</span>}
        <h1 className="hero-title">
          {titleLine1}
          {accent && (
            <>
              <br />
              <span className="hero-accent">{accent}</span>
              {titleLine2 && ` ${titleLine2}`}
            </>
          )}
        </h1>
        <p className="hero-sub">{subtitle}</p>
        <div className="hero-btns">
          {primaryBtn && (
            primaryBtn.to
              ? <Link to={primaryBtn.to} className="btn-hero-primary">{primaryBtn.label}</Link>
              : <button className="btn-hero-primary" onClick={primaryBtn.onClick}>{primaryBtn.label}</button>
          )}
          {secondaryBtn && (
            secondaryBtn.to
              ? <Link to={secondaryBtn.to} className="btn-hero-outline">{secondaryBtn.label}</Link>
              : <button className="btn-hero-outline" onClick={secondaryBtn.onClick}>{secondaryBtn.label}</button>
          )}
        </div>
      </div>
      <div className="hero-visual">
        {imageSrc ? (
          <div className="hero-phone-mock">
            <img src={imageSrc} alt={imageAlt} className="hero-phone-img" />
          </div>
        ) : (
          <div className="hero-logo-display">ENCOM</div>
        )}
      </div>
    </section>
  )
}
