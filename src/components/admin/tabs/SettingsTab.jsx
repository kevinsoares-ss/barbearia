import { useState } from 'react'
import { Image, Save, Type, Upload } from 'lucide-react'
import { useBooking } from '../../../context/BookingContext'

export default function SettingsTab() {
  const { settings, updateSetting, uploadImage } = useBooking()
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [heroTitle, setHeroTitle] = useState(settings.hero_title || '')
  const [heroSubtitle, setHeroSubtitle] = useState(settings.hero_subtitle || '')

  async function handleLogoUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      setUploadingLogo(true)
      const url = await uploadImage(file)
      await updateSetting('logo_url', url)
    } catch (error) {
      alert('Erro ao fazer upload da logo.')
    } finally {
      setUploadingLogo(false)
    }
  }

  async function handleSaveSettings() {
    try {
      await updateSetting('hero_title', heroTitle)
      await updateSetting('hero_subtitle', heroSubtitle)
      alert('Configurações salvas com sucesso!')
    } catch (error) {
      alert('Erro ao salvar configurações.')
    }
  }

  return (
    <div>
      <div className="dashboard-topbar">
        <div>
          <h1 className="dashboard-page-title">Aparência do Site</h1>
          <p className="dashboard-page-sub">Altere a logo e os textos principais do seu site</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        {/* Logo Card */}
        <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px', gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="stat-icon stat-icon-gold"><Image size={20} /></div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-text)' }}>Logo da Barbearia</h3>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%' }}>
            <div style={{ width: '150px', height: '60px', background: 'var(--color-bg)', border: '1px dashed var(--color-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {settings.logo_url ? (
                <img src={settings.logo_url} alt="Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Sem Logo</span>
              )}
            </div>
            
            <div>
              <input type="file" id="logoUpload" style={{ display: 'none' }} accept="image/*" onChange={handleLogoUpload} disabled={uploadingLogo} />
              <label htmlFor="logoUpload" className="btn-outline" style={{ display: 'inline-flex', cursor: uploadingLogo ? 'not-allowed' : 'pointer' }}>
                <Upload size={16} /> {uploadingLogo ? 'Enviando...' : 'Fazer Upload Nova Logo'}
              </label>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Recomendado: Fundo transparente (PNG), max 2MB.</p>
            </div>
          </div>
        </div>

        {/* Text Settings */}
        <div className="stat-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px', gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            <div className="stat-icon stat-icon-blue"><Type size={20} /></div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-text)' }}>Textos da Página Inicial (Hero)</h3>
          </div>

          <div className="booking-form" style={{ width: '100%' }}>
            <div className="form-field">
              <label>Título Principal</label>
              <input type="text" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} placeholder="Ex: A Arte da Cuidar do Seu Estilo" />
            </div>
            <div className="form-field" style={{ marginTop: '16px' }}>
              <label>Subtítulo</label>
              <input type="text" value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} placeholder="Ex: Experiência premium de barbearia..." />
            </div>

            <button className="btn-primary" style={{ marginTop: '24px', alignSelf: 'flex-start' }} onClick={handleSaveSettings}>
              <Save size={16} /> Salvar Textos
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
