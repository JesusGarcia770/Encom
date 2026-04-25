import { useState } from 'react'
import { Link } from 'react-router'
import './Cart.css'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#b0b8cc" strokeWidth="1">
    <rect x="5" y="2" width="14" height="20" rx="3"/>
    <circle cx="12" cy="17" r="1"/>
  </svg>
)

const initialItems = [
  { id: 1, name: 'Aether Pro 250GB', desc: '6.7" AMOLED · 200MP · Negro', price: 740, qty: 2, icon: <PhoneIcon /> },
  { id: 2, name: 'Aether Lite 128GB', desc: '6.4" LCD · 64MP · Azul', price: 499, qty: 1, icon: <PhoneIcon /> },
]

export default function Cart() {
  const [items, setItems] = useState(initialItems)

  const updateQty = (id, delta) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Carrito <span className="cart-count">{items.reduce((a,i)=>a+i.qty,0)} artículos</span></h1>
          <Link to="/" className="continue-link">← Continuar comprando</Link>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            <div className="items-header">
              <span>Producto</span>
              <span>Precio</span>
              <span>Cantidad</span>
              <span>Total</span>
              <span></span>
            </div>

            {items.map((item, idx) => (
              <div className="cart-item" key={item.id}>
                <div className="item-num">{idx + 1}</div>
                <div className="item-img">{item.icon}</div>
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-desc">{item.desc}</p>
                </div>
                <div className="item-price">${item.price.toFixed(2)}</div>
                <div className="item-qty">
                  <button onClick={() => updateQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, +1)}>+</button>
                </div>
                <div className="item-total">${(item.price * item.qty).toFixed(2)}</div>
                <button className="item-remove" onClick={() => removeItem(item.id)} aria-label="Eliminar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <div className="cart-empty">
                <p>Tu carrito está vacío</p>
                <Link to="/" className="btn-auth" style={{display:'inline-block',textDecoration:'none',padding:'12px 28px',borderRadius:'10px',background:'#0057D9',color:'#fff',fontWeight:'700',fontSize:'14px'}}>Ver productos</Link>
              </div>
            )}
          </div>

          {/* Summary */}
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
                {['VISA', 'MC', 'PP'].map(m => (
                  <span key={m} className="pay-badge">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
