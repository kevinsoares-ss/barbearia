import { useEffect } from 'react'
import { Check } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const { openBookingModal, services } = useBooking()
  const activeServices = services.filter(s => s.active)

  useEffect(() => {
    if (activeServices.length === 0) return

    gsap.utils.toArray('.pricing-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, rotateX: 5 },
        {
          opacity: 1, y: 0, rotateX: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    })

    const header = document.querySelector('#pricing .section-header')
    if (header) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' } })
      const tag = header.querySelector('.section-tag')
      const title = header.querySelector('.section-title')
      const desc = header.querySelector('.section-desc')
      if (tag) tl.fromTo(tag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      if (desc) tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    }
  }, [activeServices.length])

  return (
    <section id="pricing" className="pricing section-pad">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Tabela de Preços</span>
          <h2 className="section-title">Planos &amp; <span className="text-accent">Preços</span></h2>
          <p className="section-desc">Valores transparentes, sem surpresas. Qualidade premium com preço justo.</p>
        </div>
        <div className="pricing-grid">
          {activeServices.map(plan => (
            <div className={`pricing-card ${plan.popular ? 'pricing-card-featured' : ''}`} key={plan.id}>
              {plan.popular && <div className="pricing-badge">Mais Popular</div>}
              <div className="pricing-header">
                <span style={{ fontSize: '2rem' }}>{plan.icon}</span>
                <h3>{plan.label}</h3>
                <p className="pricing-desc">{plan.description}</p>
              </div>
              <div className="pricing-body">
                <ul className="pricing-features">
                  <li>
                    <Check size={14} className="feature-check" />
                    Duração média: {plan.duration}
                  </li>
                  <li>
                    <Check size={14} className="feature-check" />
                    Profissionais Qualificados
                  </li>
                  <li>
                    <Check size={14} className="feature-check" />
                    Ambiente Climatizado
                  </li>
                </ul>
                <div className="pricing-price" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="price-value" style={{ fontSize: '2rem' }}>{plan.price}</span>
                </div>
                <button className="btn-primary btn-block" onClick={() => openBookingModal(plan.id)}>
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

