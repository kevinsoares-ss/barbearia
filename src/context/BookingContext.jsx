import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)

  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem('japaBarber_admin') === 'true'
  })

  const [bookingModal, setBookingModal] = useState({
    open: false,
    preSelectedService: null
  })

  useEffect(() => {
    fetchAllData()
  }, [])

  async function fetchAllData() {
    setLoading(true)
    try {
      await Promise.all([
        fetchBookings(),
        fetchServices(),
        fetchSettings()
      ])
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true })

    if (error) throw error
    
    const formattedData = data.map(b => ({
      id: b.id,
      service: b.service,
      serviceId: b.service_id,
      price: b.price,
      date: b.date,
      time: b.time,
      clientName: b.client_name,
      clientPhone: b.client_phone,
      status: b.status,
      createdAt: b.created_at
    }))
    
    setBookings(formattedData)
  }

  async function fetchServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    setServices(data)
  }

  async function fetchSettings() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')

    if (error) throw error
    
    // Convert array to object { key: value }
    const settingsObj = data.reduce((acc, curr) => {
      acc[curr.key] = curr.value
      return acc
    }, {})
    
    setSettings(settingsObj)
  }

  // --- BOOKINGS ---
  async function addBooking(booking) {
    try {
      const dbBooking = {
        service: booking.service,
        service_id: booking.serviceId,
        price: booking.price,
        date: booking.date,
        time: booking.time,
        client_name: booking.clientName,
        client_phone: booking.clientPhone,
        status: 'pending'
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert([dbBooking])
        .select()
        .single()

      if (error) throw error
      await fetchBookings()
      return data
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error)
      return null
    }
  }

  async function updateBookingStatus(id, status) {
    try {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
      if (error) throw error
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      fetchBookings()
    }
  }

  async function deleteBooking(id) {
    try {
      setBookings(prev => prev.filter(b => b.id !== id))
      const { error } = await supabase.from('bookings').delete().eq('id', id)
      if (error) throw error
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error)
      fetchBookings()
    }
  }

  // --- SERVICES CMS ---
  async function addService(service) {
    try {
      const { error } = await supabase.from('services').insert([service])
      if (error) throw error
      await fetchServices()
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error)
      throw error
    }
  }

  async function updateService(id, updates) {
    try {
      const { error } = await supabase.from('services').update(updates).eq('id', id)
      if (error) throw error
      await fetchServices()
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error)
      throw error
    }
  }

  async function deleteService(id) {
    try {
      const { error } = await supabase.from('services').delete().eq('id', id)
      if (error) throw error
      await fetchServices()
    } catch (error) {
      console.error('Erro ao deletar serviço:', error)
      throw error
    }
  }

  // --- SETTINGS CMS ---
  async function updateSetting(key, value) {
    try {
      const { error } = await supabase.from('settings').upsert({ key, value })
      if (error) throw error
      setSettings(prev => ({ ...prev, [key]: value }))
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error)
      throw error
    }
  }

  async function uploadImage(file) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('uploads').getPublicUrl(filePath)
      return data.publicUrl
    } catch (error) {
      console.error('Erro no upload:', error)
      throw error
    }
  }

  // --- AUTH & MODAL ---
  function adminLogin(email, password) {
    if (email === 'japa@barbearia.com' && password === 'japa2026') {
      setIsAdminAuth(true)
      sessionStorage.setItem('japaBarber_admin', 'true')
      return true
    }
    return false
  }

  function adminLogout() {
    setIsAdminAuth(false)
    sessionStorage.removeItem('japaBarber_admin')
  }

  function openBookingModal(service = null) {
    setBookingModal({ open: true, preSelectedService: service })
  }

  function closeBookingModal() {
    setBookingModal({ open: false, preSelectedService: null })
  }

  return (
    <BookingContext.Provider value={{
      bookings,
      services,
      settings,
      loading,
      addBooking,
      updateBookingStatus,
      deleteBooking,
      addService,
      updateService,
      deleteService,
      updateSetting,
      uploadImage,
      isAdminAuth,
      adminLogin,
      adminLogout,
      bookingModal,
      openBookingModal,
      closeBookingModal,
      fetchAllData
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be inside BookingProvider')
  return ctx
}
