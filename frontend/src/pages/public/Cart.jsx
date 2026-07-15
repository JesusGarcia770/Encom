import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart'
import { createCheckout } from '../../api/checkout'
import CartTable from '../../Components/public/CartTable'
import './Cart.css'

export default function Cart() {
  const {
    items, itemCount, subtotal, loading, error,
    incrementItem, decrementItem, removeItem, isPending,
  } = useCart()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const tableItems = items.map(item => ({
    id: item.product_id._id,
    name: item.product_id.name,
    desc: item.product_id.description,
    price: item.product_id.price,
    qty: item.quantity,
    image: item.product_id.image,
    maxQty: item.product_id.stock,
    pending: isPending(item.product_id._id),
  }))

  const updateQty = (id, delta) => (delta > 0 ? incrementItem(id) : decrementItem(id))

  const handleCheckout = async () => {
    setCheckoutError('')
    setCheckoutLoading(true)
    try {
      const { checkoutUrl } = await createCheckout()
      window.location.href = checkoutUrl
    } catch (err) {
      setCheckoutError(err.message)
      setCheckoutLoading(false)
    }
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Carrito <span className="cart-count">{itemCount} artículos</span></h1>
          <Link to="/products" className="continue-link">← Continuar comprando</Link>
        </div>

        {loading && <p className="cart-loading">Cargando carrito...</p>}
        {error && !loading && <p className="cart-loading cart-error">{error}</p>}

        {!loading && !error && (
          <div className="cart-layout">
            <CartTable items={tableItems} onUpdateQty={updateQty} onRemove={removeItem} />

            <div className="cart-summary">
              <h2>Resumen del pedido</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span className="free-ship">Gratis</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {checkoutError && <p className="cart-loading cart-error checkout-error">{checkoutError}</p>}
              <button
                className="btn-checkout"
                disabled={items.length === 0 || checkoutLoading}
                onClick={handleCheckout}
              >
                {checkoutLoading ? 'Redirigiendo a Wompi...' : 'Realizar compra'}
              </button>
              <div className="pay-methods">
                <span>Paga con</span>
                <div className="pay-icons">
                  {['VISA', 'MC', 'PP'].map(m => <span key={m} className="pay-badge">{m}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
