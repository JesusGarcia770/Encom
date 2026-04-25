import { useState } from 'react'
import { Link } from 'react-router'
import CartTable from '../../Components/public/CartTable'
import './Cart.css'

const initialItems = [
  { id: 1, name: 'Aether Pro 250GB',  desc: '6.7" AMOLED · 200MP · Negro', price: 740, qty: 2 },
  { id: 2, name: 'Aether Lite 128GB', desc: '6.4" LCD · 64MP · Azul',       price: 499, qty: 1 },
  { id: 3, name: 'Aether Pro 250GB',  desc: '6.7" AMOLED · 200MP · Negro', price: 740, qty: 2 },
  { id: 4, name: 'Aether Lite 128GB', desc: '6.4" LCD · 64MP · Azul',       price: 499, qty: 1 },
]

export default function Cart() {
  const [items, setItems] = useState(initialItems)

  const updateQty = (id, delta) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))

  const removeItem = id => setItems(prev => prev.filter(i => i.id !== id))

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const total = subtotal

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Carrito <span className="cart-count">{items.reduce((a, i) => a + i.qty, 0)} artículos</span></h1>
          <Link to="/" className="continue-link">← Continuar comprando</Link>
        </div>

        <div className="cart-layout">
          <CartTable items={items} onUpdateQty={updateQty} onRemove={removeItem} />

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
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn-checkout">Realizar compra</button>
            <div className="pay-methods">
              <span>Paga con</span>
              <div className="pay-icons">
                {['VISA', 'MC', 'PP'].map(m => <span key={m} className="pay-badge">{m}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
