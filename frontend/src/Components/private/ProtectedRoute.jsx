import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />

  return <Outlet />
}
