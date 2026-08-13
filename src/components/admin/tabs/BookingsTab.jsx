import { useState, useMemo } from 'react'
import { Calendar, Clock, Phone, Trash2, Check, X, ChevronDown, Search, BarChart2 } from 'lucide-react'
import { useBooking } from '../../../context/BookingContext'

const STATUS_CONFIG = {
  pending:   { label: 'Pendente',   color: 'status-pending' },
  confirmed: { label: 'Confirmado', color: 'status-confirmed' },
  cancelled: { label: 'Cancelado',  color: 'status-cancelled' },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-').map(Number)
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const date = new Date(y, m - 1, d)
  return `${days[date.getDay()]}, ${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`
}

function getTodayStr() {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}

export default function BookingsTab() {
  const { bookings, updateBookingStatus, deleteBooking } = useBooking()
  const [filterDate, setFilterDate] = useState(getTodayStr())
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')

  const todayStr = getTodayStr()

  const todayCount = bookings.filter(b => b.date === todayStr && b.status !== 'cancelled').length
  const totalCount = bookings.filter(b => b.status !== 'cancelled').length
  const pendingCount = bookings.filter(b => b.status === 'pending').length

  const filtered = useMemo(() => {
    return bookings
      .filter(b => {
        const matchDate = !filterDate || b.date === filterDate
        const matchStatus = filterStatus === 'all' || b.status === filterStatus
        const matchSearch = !search ||
          b.clientName?.toLowerCase().includes(search.toLowerCase()) ||
          b.clientPhone?.includes(search)
        return matchDate && matchStatus && matchSearch
      })
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date)
        return a.time.localeCompare(b.time)
      })
  }, [bookings, filterDate, filterStatus, search])

  return (
    <div>
      <div className="dashboard-topbar">
        <div>
          <h1 className="dashboard-page-title">Agendamentos</h1>
          <p className="dashboard-page-sub">Gerencie todos os horários da barbearia</p>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon stat-icon-blue"><Calendar size={20} /></div>
          <div>
            <span className="stat-value">{todayCount}</span>
            <span className="stat-label">Hoje</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-gold"><BarChart2 size={20} /></div>
          <div>
            <span className="stat-value">{totalCount}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-icon-amber"><Clock size={20} /></div>
          <div>
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-label">Pendentes</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="dashboard-filters">
        <div className="filter-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-date">
          <Calendar size={16} />
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>
        <div className="filter-status">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">Todos os status</option>
            <option value="pending">Pendente</option>
            <option value="confirmed">Confirmado</option>
            <option value="cancelled">Cancelado</option>
          </select>
          <ChevronDown size={14} />
        </div>
        {filterDate && (
          <button className="filter-clear" onClick={() => setFilterDate('')}>
            Limpar data
          </button>
        )}
      </div>

      {/* Table */}
      <div className="dashboard-table-wrapper">
        {filtered.length === 0 ? (
          <div className="table-empty">
            <Calendar size={48} />
            <p>Nenhum agendamento encontrado</p>
            <span>Tente ajustar os filtros ou aguarde novos agendamentos.</span>
          </div>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Data &amp; Hora</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className={`table-row ${b.status}`}>
                  <td>
                    <div className="client-cell">
                      <div className="client-avatar">{b.clientName?.[0]?.toUpperCase() || '?'}</div>
                      <div>
                        <span className="client-name">{b.clientName}</span>
                        <span className="client-phone">
                          <Phone size={11} /> {b.clientPhone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="service-badge">{b.service}</span>
                  </td>
                  <td>
                    <div className="datetime-cell">
                      <span className="datetime-date"><Calendar size={12} /> {formatDate(b.date)}</span>
                      <span className="datetime-time"><Clock size={12} /> {b.time}</span>
                    </div>
                  </td>
                  <td>
                    <span className="price-cell">{b.price}</span>
                  </td>
                  <td>
                    <select
                      className={`status-select ${STATUS_CONFIG[b.status]?.color}`}
                      value={b.status}
                      onChange={e => updateBookingStatus(b.id, e.target.value)}
                    >
                      <option value="pending">Pendente</option>
                      <option value="confirmed">Confirmado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                  <td>
                    <div className="actions-cell">
                      {b.status !== 'confirmed' && (
                        <button
                          className="action-btn action-confirm"
                          title="Confirmar"
                          onClick={() => updateBookingStatus(b.id, 'confirmed')}
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button
                          className="action-btn action-cancel"
                          title="Cancelar"
                          onClick={() => updateBookingStatus(b.id, 'cancelled')}
                        >
                          <X size={14} />
                        </button>
                      )}
                      <button
                        className="action-btn action-delete"
                        title="Excluir"
                        onClick={() => {
                          if (window.confirm('Excluir este agendamento?')) deleteBooking(b.id)
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
