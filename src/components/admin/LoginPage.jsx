import { useState } from 'react'
import { Scissors, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { adminLogin } = useBooking()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const ok = adminLogin(email, password)
      if (ok) {
        navigate('/admin/dashboard')
      } else {
        setError('Email ou senha incorretos.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="admin-login-page">
      <div className="login-glow login-glow-1" />
      <div className="login-glow login-glow-2" />

      <div className="login-card">
        {/* Logo */}
        <div className="login-brand">
          <div className="login-logo-icon">
            <Scissors size={28} />
          </div>
          <div>
            <h1 className="login-logo-text">Japa<span>Barbearia</span></h1>
            <p className="login-logo-sub">Painel Administrativo</p>
          </div>
        </div>

        <h2 className="login-title">Bem-vindo de volta</h2>
        <p className="login-subtitle">Faça login para acessar seu painel</p>

        {error && (
          <div className="login-error">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label htmlFor="admin-email">
              <Mail size={14} /> Email
            </label>
            <input
              id="admin-email"
              type="email"
              placeholder="japa@barbearia.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label htmlFor="admin-password">
              <Lock size={14} /> Senha
            </label>
            <div className="password-wrapper">
              <input
                id="admin-password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block login-btn" disabled={loading}>
            {loading ? (
              <span className="login-spinner" />
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>

        <a href="/" className="login-back">← Voltar ao site</a>
      </div>
    </div>
  )
}
