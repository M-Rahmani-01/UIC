import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import LoadingScreen from '../components/ui/LoadingScreen'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore()
  const location = useLocation()

  if (loading) return <LoadingScreen />

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}