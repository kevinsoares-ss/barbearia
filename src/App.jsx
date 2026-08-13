import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import BookingModal from './components/BookingModal'

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
        <BookingModal />
      </BookingProvider>
    </BrowserRouter>
  )
}
