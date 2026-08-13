import { useState } from 'react'
import { Scissors, LogOut, Calendar, Settings, Image as ImageIcon } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { useNavigate } from 'react-router-dom'

import BookingsTab from './tabs/BookingsTab'
import ServicesTab from './tabs/ServicesTab'
import SettingsTab from './tabs/SettingsTab'

export default function Dashboard() {
  const { loading, adminLogout } = useBooking()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('bookings') // 'bookings', 'services', 'settings'

  function handleLogout() {
    adminLogout()
    navigate('/admin')
  }

  if (loading) {
    return (
      <div className="dashboard-page" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="login-spinner" style={{ width: 40, height: 40 }}></div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon"><Scissors size={22} /></div>
          <div>
            <span className="sidebar-logo-text">Japa<span>Barbearia</span></span>
            <span className="sidebar-logo-sub">Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`sidebar-link ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={18} /> Agendamentos
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Scissors size={18} /> Serviços
          </button>
          <button 
            className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <ImageIcon size={18} /> Aparência
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={16} /> Sair
          </button>
          <a href="/" className="sidebar-site-link">← Ver site</a>
        </div>
      </aside>

      {/* Main Area */}
      <main className="dashboard-main">
        {activeTab === 'bookings' && <BookingsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  )
}

