import { useState, useEffect, useCallback } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory} from '../api/categories'

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
      setLoading(true)
      return getCategories()
        .then(setCategories)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
      reload()
    }, [reload])

    async function addCategory(data) {
        await createCategory(data)
        await reload()
      }
    
      async function editCategory(id, data) {
        await updateCategory(id, data)
        await reload()
      }
    
      async function removeCategory(id) {
        await deleteCategory(id)
        await reload()
      }

  return { categories, loading, error, setError, reload, addCategory, editCategory, removeCategory }
}
