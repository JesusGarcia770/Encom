import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router'
import { confirmCheckoutReturn } from '../../api/checkout'
import { useCart } from '../../hooks/useCart'
import './CheckoutReturn.css'

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams()
  const { reload } = useCart()
  const [state, setState] = useState({ status: 'loading', error: '' })

  useEffect(() => {
    const identificadorEnlaceComercio = searchParams.get('identificadorEnlaceComercio')
    const idTransaccion = searchParams.get('idTransaccion')
    const idEnlace = searchParams.get('idEnlace')
    const monto = searchParams.get('monto')
    const hash = searchParams.get('hash')

    if (!identificadorEnlaceComercio || !idTransaccion || !idEnlace || !monto || !hash) {
      setState({ status: 'invalid', error: '' })
      return
    }

    confirmCheckoutReturn({ identificadorEnlaceComercio, idTransaccion, idEnlace, monto, hash })
      .then(data => {
        setState({ status: data.status, error: '' })
        reload()
      })
      .catch(err => setState({ status: 'error', error: err.message }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="checkout-return-page">
      <div className="checkout-return-card">
        {state.status === 'loading' && (
          <>
            <h1>Confirmando tu pago...</h1>
            <p>Un momento mientras verificamos la transacción con Wompi.</p>
          </>
        )}

        {state.status === 'paid' && (
          <>
            <div className="checkout-icon checkout-icon-success">✓</div>
            <h1>¡Compra realizada!</h1>
            <p>Tu pago fue aprobado y tu pedido está siendo procesado.</p>
            <Link to="/products" className="checkout-return-btn">Seguir comprando</Link>
          </>
        )}

        {state.status === 'failed' && (
          <>
            <div className="checkout-icon checkout-icon-error">✕</div>
            <h1>El pago no fue aprobado</h1>
            <p>Tu transacción fue rechazada o no se completó. Puedes intentar de nuevo.</p>
            <Link to="/cart" className="checkout-return-btn">Volver al carrito</Link>
          </>
        )}

        {state.status === 'error' && (
          <>
            <div className="checkout-icon checkout-icon-error">✕</div>
            <h1>No pudimos confirmar el pago</h1>
            <p>{state.error}</p>
            <Link to="/cart" className="checkout-return-btn">Volver al carrito</Link>
          </>
        )}

        {state.status === 'invalid' && (
          <>
            <h1>Nada que confirmar</h1>
            <p>No encontramos datos de una transacción en esta página.</p>
            <Link to="/products" className="checkout-return-btn">Ir al catálogo</Link>
          </>
        )}
      </div>
    </div>
  )
}
