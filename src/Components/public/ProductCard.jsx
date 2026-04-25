import { useState } from 'react'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [added, setAdded] = useState(false)

  const handleAddCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {product.badge && (
          <span className={`product-badge ${product.badge === 'Nuevo' ? 'badge-new' : 'badge-sale'}`}>
            {product.badge}
          </span>
        )}
        <div className="product-img-placeholder">
          {product.icon}
        </div>
      </div>

      <div className="product-body">
        <p className="product-name">{product.name}</p>
        <p className="product-desc">{product.desc}</p>

        <div className="product-pricing">
          <span className="price-current">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="price-old">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        {product.colors && (
          <div className="color-selector">
            {product.colors.map((c, i) => (
              <button
                key={i}
                className={`color-dot ${selectedColor === i ? 'active' : ''}`}
                style={{ background: c }}
                onClick={() => setSelectedColor(i)}
                aria-label={`Color ${i + 1}`}
              />
            ))}
          </div>
        )}

        <button
          className={`btn-cart ${added ? 'added' : ''}`}
          onClick={handleAddCart}
        >
          {added ? '✓ Agregado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}
