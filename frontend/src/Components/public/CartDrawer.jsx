import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart'
import './CartDrawer.css'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#b0b8cc" strokeWidth="1">
    <rect x="5" y="2" width="14" height="20" rx="3"/>
    <circle cx="12" cy="17" r="1"/>
  </svg>
)

export default function CartDrawer() {
  const {
    items, itemCount, subtotal, loading, error,
    isDrawerOpen, closeDrawer,
    incrementItem, decrementItem, removeItem, isPending,
  } = useCart()

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
      />

      <aside className={`cart-drawer ${isDrawerOpen ? 'open' : ''}`} aria-hidden={!isDrawerOpen}>
        <div className="cart-drawer-header">
          <h2>Tu carrito <span>{itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}</span></h2>
          <button className="cart-drawer-close" onClick={closeDrawer} aria-label="Cerrar carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-drawer-body">
          {loading && <p className="cart-drawer-msg">Cargando carrito...</p>}
          {error && !loading && <p className="cart-drawer-msg cart-drawer-error">{error}</p>}

          {!loading && !error && items.length === 0 && (
            <p className="cart-drawer-msg">Tu carrito está vacío</p>
          )}

          {!loading && items.map(item => {
            const product = item.product_id
            const pending = isPending(product._id)
            return (
              <div className="drawer-item" key={product._id}>
                <div className="drawer-item-img">
                  {product.image ? <img src={product.image} alt={product.name} /> : <PhoneIcon />}
                </div>
                <div className="drawer-item-info">
                  <p className="drawer-item-name">{product.name}</p>
                  <p className="drawer-item-price">${product.price.toFixed(2)}</p>
                  <div className="drawer-item-qty">
                    <button
                      disabled={pending}
                      onClick={() => decrementItem(product._id)}
                      aria-label="Disminuir cantidad"
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      disabled={pending || item.quantity >= product.stock}
                      onClick={() => incrementItem(product._id)}
                      aria-label="Aumentar cantidad"
                    >+</button>
                  </div>
                </div>
                <button
                  className="drawer-item-remove"
                  disabled={pending}
                  onClick={() => removeItem(product._id)}
                  aria-label="Eliminar del carrito"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14H6L5 6"/>
                  </svg>
                </button>
              </div>
            )
          })}
        </div>

        {!loading && items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="drawer-subtotal">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link to="/cart" className="btn-drawer-checkout" onClick={closeDrawer}>
              Ver carrito y pagar
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
