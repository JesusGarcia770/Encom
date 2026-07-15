import { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addItem, isPending } = useCart()
  const [selectedColor, setSelectedColor] = useState(0)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  const isRealProduct = Boolean(product._id)
  const pending = isRealProduct && isPending(product._id)
  const outOfStock = isRealProduct && product.stock <= 0
  const description = product.desc ?? product.description

  const handleAddCart = async () => {
    setError('')

    if (!isRealProduct) {
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
      return
    }

    try {
      await addItem(product._id)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {product.badge && (
          <span className={`product-badge ${product.badge === 'Nuevo' ? 'badge-new' : 'badge-sale'}`}>
            {product.badge}
          </span>
        )}
        {product.image
          ? <img className="product-img" src={product.image} alt={product.name} />
          : <div className="product-img-placeholder">{product.icon}</div>
        }
      </div>

      <div className="product-body">
        <p className="product-name">{product.name}</p>
        {description && <p className="product-desc">{description}</p>}

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

        {error && <p className="product-error">{error}</p>}

        <button
          className={`btn-cart ${added ? 'added' : ''}`}
          onClick={handleAddCart}
          disabled={pending || outOfStock}
        >
          {outOfStock ? 'Agotado' : pending ? 'Agregando...' : added ? '✓ Agregado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}
