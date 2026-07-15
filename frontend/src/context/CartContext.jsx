import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../api/cart'
import { CartContext } from './cart-context'

const initialState = {
  cart: null,
  loading: true,
  error: '',
  isDrawerOpen: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.cart, loading: false, error: '' }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false }
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true }
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false }
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [pendingIds, setPendingIds] = useState(() => new Set())

  const withPending = useCallback(async (productId, task) => {
    setPendingIds(prev => new Set(prev).add(productId))
    try {
      const cart = await task()
      dispatch({ type: 'SET_CART', cart })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', error: err.message })
      throw err
    } finally {
      setPendingIds(prev => {
        const next = new Set(prev)
        next.delete(productId)
        return next
      })
    }
  }, [])

  const reload = useCallback(() => {
    dispatch({ type: 'SET_LOADING', loading: true })
    return getCart()
      .then(cart => dispatch({ type: 'SET_CART', cart }))
      .catch(err => dispatch({ type: 'SET_ERROR', error: err.message }))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const addItem = useCallback((productId, quantity = 1) =>
    withPending(productId, () => addToCart(productId, quantity)), [withPending])

  const incrementItem = useCallback((productId) =>
    withPending(productId, () => updateCartItem(productId, 'increment')), [withPending])

  const decrementItem = useCallback((productId) =>
    withPending(productId, () => updateCartItem(productId, 'decrement')), [withPending])

  const removeItem = useCallback((productId) =>
    withPending(productId, () => removeCartItem(productId)), [withPending])

  const emptyCart = useCallback(() =>
    withPending('cart', () => clearCart()), [withPending])

  const openDrawer = useCallback(() => dispatch({ type: 'OPEN_DRAWER' }), [])
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [])
  const toggleDrawer = useCallback(() => dispatch({ type: 'TOGGLE_DRAWER' }), [])

  const items = useMemo(
    () => (state.cart?.items || []).filter(item => item.product_id),
    [state.cart]
  )

  const itemCount = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + (i.product_id?.price || 0) * i.quantity, 0),
    [items]
  )

  const value = {
    items,
    itemCount,
    subtotal,
    loading: state.loading,
    error: state.error,
    isDrawerOpen: state.isDrawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    emptyCart,
    reload,
    isPending: (productId) => pendingIds.has(productId),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
