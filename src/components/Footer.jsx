import { MapPin, Phone, Mail, Instagram } from 'lucide-react'

const whatsappSvg = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const facebookSvg = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export default function Footer() {
  function scrollTo(id) {
    const el = document.querySelector(id)
    if (!el) return
    const navbar = document.getElementById('navbar')
    const offset = navbar ? navbar.offsetHeight + 20 : 80
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="nav-logo footer-logo" onClick={e => { e.preventDefault(); scrollTo('#home') }}>
              <span className="logo-text">Japa<span className="logo-accent">Barbearia</span></span>
            </a>
            <p className="footer-tagline">Tradição, estilo e precisão em cada corte. Onde o cuidado masculino encontra a excelência.</p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="WhatsApp">{whatsappSvg}</a>
              <a href="#" className="social-icon" aria-label="Facebook">{facebookSvg}</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Navegação</h4>
            <ul>
              {[['#home', 'Início'], ['#benefits', 'Diferenciais'], ['#services', 'Serviços'], ['#pricing', 'Preços']].map(([href, label]) => (
                <li key={href}><a href={href} onClick={e => { e.preventDefault(); scrollTo(href) }}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Serviços</h4>
            <ul>
              {['Corte de Cabelo', 'Barba', 'Sobrancelha', 'Combo Completo'].map(s => (
                <li key={s}><a href="#pricing" onClick={e => { e.preventDefault(); scrollTo('#pricing') }}>{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contato</h4>
            <ul>
              <li><MapPin size={14} className="footer-icon" /> Av. das Esmeraldas, 1000</li>
              <li><Phone size={14} className="footer-icon" /> (92) 99999-9999</li>
              <li><Mail size={14} className="footer-icon" /> contato@japabarbearia.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 JapaBarbearia. Todos os direitos reservados.</p>
          <p className="footer-credit">Feito com excelência.</p>
        </div>
      </div>
    </footer>
  )
}
