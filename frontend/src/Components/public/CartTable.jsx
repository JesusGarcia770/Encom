const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#b0b8cc" strokeWidth="1">
    <rect x="5" y="2" width="14" height="20" rx="3"/>
    <circle cx="12" cy="17" r="1"/>
  </svg>
)

export default function CartTable({ items, onUpdateQty, onRemove }) {
  return (
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
          <div className="item-img">{item.icon ?? <PhoneIcon />}</div>
          <div className="item-info">
            <p className="item-name">{item.name}</p>
            <p className="item-desc">{item.desc}</p>
          </div>
          <div className="item-price">${item.price.toFixed(2)}</div>
          <div className="item-qty">
            <button onClick={() => onUpdateQty(item.id, -1)}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => onUpdateQty(item.id, +1)}>+</button>
          </div>
          <div className="item-total">${(item.price * item.qty).toFixed(2)}</div>
          <button className="item-remove" onClick={() => onRemove(item.id)} aria-label="Eliminar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      ))}

      {items.length === 0 && (
        <div className="cart-empty">
          <p>Tu carrito está vacío</p>
        </div>
      )}
    </div>
  )
}
