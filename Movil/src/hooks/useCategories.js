import { useCallback, useEffect, useState } from 'react'
import { getCategories } from '../api/categories'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    setLoading(true)
    return getCategories()
      // El backend devuelve categorías Activas e Inactivas por igual; el
      // catálogo de clientes solo debe ofrecer las Activas como filtro.
      .then(data => setCategories(data.filter(c => c.status === 'Activo')))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { categories, loading, error, reload }
}
