import { useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import LoginPage from '../components/admin/LoginPage'
import Dashboard from '../components/admin/Dashboard'

function RequireAuth({ children }) {
  const { isAdminAuth } = useBooking()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAdminAuth) navigate('/admin', { replace: true })
  }, [isAdminAuth])
  return isAdminAuth ? children : null
}

export default function AdminPage() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
    </Routes>
  )
}
