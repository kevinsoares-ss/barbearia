import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Check, Calendar, Clock, User, Phone, Scissors } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function isSunday(year, month, day) {
  return new Date(year, month, day).getDay() === 0
}

function isPast(year, month, day) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(year, month, day) < today
}

export default function BookingModal() {
  const { bookingModal, closeBookingModal, addBooking, bookings, services } = useBooking()
  const { open, preSelectedService } = bookingModal
  const activeServices = services.filter(s => s.active)

  const [step, setStep] = useState(1) // 1: service, 2: date, 3: time, 4: info, 5: success
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [formErrors, setFormErrors] = useState({})

  const now = new Date()
  const [calMonth, setCalMonth] = useState(now.getMonth())
  const [calYear, setCalYear] = useState(now.getFullYear())

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep(preSelectedService ? 2 : 1)
      setSelectedService(preSelectedService ? activeServices.find(s => s.id === preSelectedService) : null)
      setSelectedDate(null)
      setSelectedTime(null)
      setForm({ name: '', phone: '' })
      setFormErrors({})
      setCalMonth(now.getMonth())
      setCalYear(now.getFullYear())
    }
  }, [open, preSelectedService])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeBookingModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeBookingModal])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Get booked slots for selected date
  function getBookedSlots(date) {
    if (!date) return []
    return bookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.time)
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }

  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }

  function formatDate(dateStr) {
    if (!dateStr) return ''
    const [y, m, d] = dateStr.split('-').map(Number)
    return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`
  }

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  function validateForm() {
    const errors = {}
    if (!form.name.trim() || form.name.trim().length < 3) errors.name = 'Digite seu nome completo'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) errors.phone = 'Telefone inválido'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit() {
    if (!validateForm()) return
    await addBooking({
      service: selectedService.label,
      serviceId: selectedService.id,
      price: selectedService.price,
      date: selectedDate,
      time: selectedTime,
      clientName: form.name.trim(),
      clientPhone: form.phone
    })
    setStep(5)
  }

  const daysInMonth = getDaysInMonth(calYear, calMonth)
  const firstDay = getFirstDayOfMonth(calYear, calMonth)

  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  if (!open) return null

  return (
    <div className="booking-overlay" onClick={e => { if (e.target === e.currentTarget) closeBookingModal() }}>
      <div className="booking-modal">
        {/* Header */}
        <div className="booking-header">
          <div className="booking-title">
            <Scissors size={20} className="booking-title-icon" />
            <span>Agendar Horário</span>
          </div>
          <button className="booking-close" onClick={closeBookingModal} aria-label="Fechar">
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        {step < 5 && (
          <div className="booking-progress">
            {['Serviço', 'Data', 'Horário', 'Dados'].map((label, i) => (
              <div key={label} className={`progress-step ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                <div className="progress-dot">
                  {step > i + 1 ? <Check size={12} /> : <span>{i + 1}</span>}
                </div>
                <span className="progress-label">{label}</span>
                {i < 3 && <div className={`progress-line ${step > i + 1 ? 'done' : ''}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="booking-body">

          {/* Step 1 — Service */}
          {step === 1 && (
            <div className="booking-step">
              <h3 className="step-title">Escolha o serviço</h3>
              <div className="service-options">
                {activeServices.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>Nenhum serviço disponível no momento.</p>}
                {activeServices.map(s => (
                  <button
                    key={s.id}
                    className={`service-option ${selectedService?.id === s.id ? 'selected' : ''}`}
                    onClick={() => setSelectedService(s)}
                  >
                    {s.popular && <span className="service-option-badge">Popular</span>}
                    <span className="service-option-icon">{s.icon}</span>
                    <div className="service-option-info">
                      <span className="service-option-name">{s.label}</span>
                      <span className="service-option-meta">{s.duration}</span>
                    </div>
                    <span className="service-option-price">{s.price}</span>
                    {selectedService?.id === s.id && <Check size={16} className="service-option-check" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Date */}
          {step === 2 && (
            <div className="booking-step">
              <h3 className="step-title">Escolha a data</h3>
              <div className="calendar">
                <div className="calendar-nav">
                  <button onClick={prevMonth} className="cal-nav-btn"><ChevronLeft size={18} /></button>
                  <span className="cal-month-label">{MONTHS[calMonth]} {calYear}</span>
                  <button onClick={nextMonth} className="cal-nav-btn"><ChevronRight size={18} /></button>
                </div>
                <div className="calendar-weekdays">
                  {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="calendar-days">
                  {[...Array(firstDay)].map((_, i) => <span key={`e-${i}`} />)}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1
                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const disabled = isPast(calYear, calMonth, day) || isSunday(calYear, calMonth, day)
                    const isSelected = selectedDate === dateStr
                    const isToday = dateStr === todayStr

                    return (
                      <button
                        key={day}
                        className={`cal-day ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                        onClick={() => !disabled && setSelectedDate(dateStr)}
                        disabled={disabled}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
                <p className="cal-hint">* Domingos não disponíveis</p>
              </div>
            </div>
          )}

          {/* Step 3 — Time */}
          {step === 3 && (
            <div className="booking-step">
              <h3 className="step-title">Escolha o horário</h3>
              <p className="step-subtitle">{formatDate(selectedDate)}</p>
              <div className="time-grid">
                {TIME_SLOTS.map(slot => {
                  const booked = getBookedSlots(selectedDate).includes(slot)
                  return (
                    <button
                      key={slot}
                      className={`time-slot ${booked ? 'booked' : ''} ${selectedTime === slot ? 'selected' : ''}`}
                      onClick={() => !booked && setSelectedTime(slot)}
                      disabled={booked}
                    >
                      <Clock size={14} />
                      {slot}
                      {booked && <span className="booked-label">Ocupado</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4 — Info */}
          {step === 4 && (
            <div className="booking-step">
              <h3 className="step-title">Seus dados</h3>
              <div className="booking-summary">
                <div className="summary-item"><span>Serviço</span><strong>{selectedService?.label}</strong></div>
                <div className="summary-item"><span>Data</span><strong>{formatDate(selectedDate)}</strong></div>
                <div className="summary-item"><span>Horário</span><strong>{selectedTime}</strong></div>
                <div className="summary-item"><span>Valor</span><strong className="summary-price">{selectedService?.price}</strong></div>
              </div>
              <div className="booking-form">
                <div className={`form-field ${formErrors.name ? 'error' : ''}`}>
                  <label htmlFor="booking-name">
                    <User size={14} /> Nome completo
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                  {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                </div>
                <div className={`form-field ${formErrors.phone ? 'error' : ''}`}>
                  <label htmlFor="booking-phone">
                    <Phone size={14} /> WhatsApp / Telefone
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="(92) 99999-9999"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))}
                  />
                  {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — Success */}
          {step === 5 && (
            <div className="booking-step booking-success">
              <div className="success-icon">
                <Check size={40} />
              </div>
              <h3>Agendamento Confirmado!</h3>
              <p>Seu horário foi agendado com sucesso.</p>
              <div className="booking-summary">
                <div className="summary-item"><span>Serviço</span><strong>{selectedService?.label}</strong></div>
                <div className="summary-item"><span>Data</span><strong>{formatDate(selectedDate)}</strong></div>
                <div className="summary-item"><span>Horário</span><strong>{selectedTime}</strong></div>
                <div className="summary-item"><span>Nome</span><strong>{form.name}</strong></div>
              </div>
              <p className="success-note">Nos vemos em breve! 💈</p>
              <button className="btn-primary btn-block" onClick={closeBookingModal}>Fechar</button>
            </div>
          )}
        </div>

        {/* Footer nav */}
        {step < 5 && (
          <div className="booking-footer">
            {step > 1 ? (
              <button className="btn-back" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft size={16} /> Voltar
              </button>
            ) : <span />}
            {step < 4 ? (
              <button
                className="btn-primary"
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && !selectedDate) ||
                  (step === 3 && !selectedTime)
                }
                onClick={() => setStep(s => s + 1)}
              >
                Próximo <ChevronRight size={16} />
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit}>
                Confirmar Agendamento <Check size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
