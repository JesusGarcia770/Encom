import { useState, useEffect, useCallback } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    setLoading(true)
    return getProducts()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  async function addProduct(formData) {
    await createProduct(formData)
    await reload()
  }

  async function editProduct(id, formData) {
    await updateProduct(id, formData)
    await reload()
  }

  async function removeProduct(id) {
    await deleteProduct(id)
    await reload()
  }

  return { products, loading, error, setError, reload, addProduct, editProduct, removeProduct }
}
