import { useState, useEffect } from 'react'
import { Menu, X, Scissors } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openBookingModal, settings } = useBooking()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: 'Início' },
    { href: '#benefits', label: 'Diferenciais' },
    { href: '#services', label: 'Serviços' },
    { href: '#testimonials', label: 'Avaliações' },
    { href: '#pricing', label: 'Preços' },
    { href: '#location', label: 'Localização' },
  ]

  function scrollTo(id) {
    const el = document.querySelector(id)
    if (!el) return
    const navbar = document.getElementById('navbar')
    const offset = navbar ? navbar.offsetHeight + 20 : 80
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('#home') }}>
          {settings.logo_url ? (
            <img src={settings.logo_url} className="logo-img" alt="logo" style={{ maxHeight: '40px' }} />
          ) : (
            <img src="/assets/images/logo.png" className="logo-img" alt="logo" />
          )}
        </a>

        <nav className={`nav-menu ${mobileOpen ? 'active' : ''}`} id="navMenu">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={e => { e.preventDefault(); scrollTo(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button className="btn-primary nav-cta" onClick={() => openBookingModal()}>
          Agendar Horário
        </button>

        <button
          className={`mobile-toggle ${mobileOpen ? 'active' : ''}`}
          id="mobileToggle"
          aria-label="Abrir menu de navegação"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X className="toggle-icon-close" size={22} /> : <Menu className="toggle-icon-open" size={22} />}
        </button>
      </div>
    </header>
  )
}
