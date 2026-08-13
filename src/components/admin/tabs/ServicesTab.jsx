import { useState } from 'react'
import { Scissors, Edit, Trash2, Plus, X, Save } from 'lucide-react'
import { useBooking } from '../../../context/BookingContext'

export default function ServicesTab() {
  const { services, addService, updateService, deleteService } = useBooking()
  const [isEditing, setIsEditing] = useState(false)
  const [currentService, setCurrentService] = useState(null)

  const defaultService = {
    id: '',
    label: '',
    description: '',
    price: '',
    duration: '',
    icon: '✂️',
    popular: false,
    active: true
  }

  function handleAddNew() {
    setCurrentService(defaultService)
    setIsEditing(true)
  }

  function handleEdit(service) {
    setCurrentService(service)
    setIsEditing(true)
  }

  async function handleSave(e) {
    e.preventDefault()
    if (!currentService.id) {
      // Generated ID from label if new
      currentService.id = currentService.label.toLowerCase().replace(/[^a-z0-9]/g, '-')
      await addService(currentService)
    } else {
      await updateService(currentService.id, currentService)
    }
    setIsEditing(false)
    setCurrentService(null)
  }

  async function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      await deleteService(id)
    }
  }

  return (
    <div>
      <div className="dashboard-topbar">
        <div>
          <h1 className="dashboard-page-title">Serviços</h1>
          <p className="dashboard-page-sub">Gerencie os serviços oferecidos na barbearia</p>
        </div>
        {!isEditing && (
          <button className="btn-primary" onClick={handleAddNew}>
            <Plus size={16} /> Novo Serviço
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="dashboard-table-wrapper" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3>{currentService.id ? 'Editar Serviço' : 'Novo Serviço'}</h3>
            <button className="booking-close" onClick={() => setIsEditing(false)}><X size={16} /></button>
          </div>
          
          <form className="booking-form" onSubmit={handleSave}>
            <div className="time-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="form-field">
                <label>Nome do Serviço</label>
                <input required type="text" value={currentService.label} onChange={e => setCurrentService({...currentService, label: e.target.value})} placeholder="Ex: Corte Navalhado" />
              </div>
              <div className="form-field">
                <label>Preço</label>
                <input required type="text" value={currentService.price} onChange={e => setCurrentService({...currentService, price: e.target.value})} placeholder="Ex: R$ 50" />
              </div>
              <div className="form-field">
                <label>Duração</label>
                <input required type="text" value={currentService.duration} onChange={e => setCurrentService({...currentService, duration: e.target.value})} placeholder="Ex: 45 min" />
              </div>
              <div className="form-field">
                <label>Ícone (Emoji)</label>
                <input required type="text" value={currentService.icon} onChange={e => setCurrentService({...currentService, icon: e.target.value})} placeholder="Ex: ✂️" />
              </div>
            </div>
            
            <div className="form-field" style={{ marginTop: '16px' }}>
              <label>Descrição</label>
              <input type="text" value={currentService.description} onChange={e => setCurrentService({...currentService, description: e.target.value})} placeholder="Descrição curta do serviço" />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--color-text)' }}>
                <input type="checkbox" checked={currentService.popular} onChange={e => setCurrentService({...currentService, popular: e.target.checked})} />
                Marcar como "Popular"
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--color-text)' }}>
                <input type="checkbox" checked={currentService.active} onChange={e => setCurrentService({...currentService, active: e.target.checked})} />
                Serviço Ativo
              </label>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Cancelar</button>
              <button type="submit" className="btn-primary"><Save size={16} /> Salvar Serviço</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Duração</th>
                <th>Destaque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} className="table-row" style={{ opacity: s.active ? 1 : 0.5 }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                      <span className="client-name">{s.label}</span>
                    </div>
                  </td>
                  <td>
                    <span className="client-phone" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {s.description || '-'}
                    </span>
                  </td>
                  <td><span className="price-cell">{s.price}</span></td>
                  <td><span className="datetime-time">{s.duration}</span></td>
                  <td>
                    {s.popular && <span className="service-badge">Popular</span>}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn action-confirm" title="Editar" onClick={() => handleEdit(s)}>
                        <Edit size={14} />
                      </button>
                      <button className="action-btn action-delete" title="Excluir" onClick={() => handleDelete(s.id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <div className="table-empty">
                      <Scissors size={48} />
                      <p>Nenhum serviço cadastrado</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
