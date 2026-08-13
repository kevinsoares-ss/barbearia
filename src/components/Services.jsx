import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from '../context/BookingContext'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const { services } = useBooking()
  const activeServices = services.filter(s => s.active)

  useEffect(() => {
    if (activeServices.length === 0) return

    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, clipPath: 'inset(10% 10% 10% 10% round 24px)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 24px)',
          duration: 1, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
        }
      )
    })

    const header = document.querySelector('#services .section-header')
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

  // Helper to map default services to their original images
  function getServiceImage(id) {
    if (id === 'adulto' || id === 'corte-preciso') return '/assets/images/corte2.jpeg'
    if (id === 'infantil' || id === 'barba-esculpida') return '/assets/images/corte3.jpeg'
    if (id === 'combo' || id === 'combo-completo') return '/assets/images/corte1.jpg'
    return null
  }

  return (
    <section id="services" className="services section-pad">
      <div className="container services-container">
        <span id="tesoura-landing" className="tool-landing tool-landing-left"></span>
        <span id="maquina-landing" className="tool-landing tool-landing-right"></span>
        <div className="section-header">
          <span className="section-tag">Nossos Serviços</span>
          <h2 className="section-title">Principais <span className="text-accent">Especialidades</span></h2>
          <p className="section-desc">Cada serviço é realizado com atenção, produtos de qualidade e o cuidado que você merece.</p>
        </div>
        <div className="services-grid">
          {activeServices.length === 0 && (
             <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-text-muted)' }}>
               Nenhum serviço encontrado. Verifique a conexão com o banco de dados.
             </p>
          )}
          {activeServices.map((s, index) => {
            const imgSrc = getServiceImage(s.id)
            return (
              <div className={`service-card ${index === 0 ? 'service-card-large' : ''}`} key={s.id}>
                <div className="service-image" style={{ background: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  {imgSrc ? (
                    <img src={imgSrc} alt={s.label} loading="lazy" />
                  ) : (
                    s.icon
                  )}
                </div>
                <div className="service-info">
                  {s.popular && <div className="service-tag">Destaque</div>}
                  <h3>{s.label}</h3>
                  <p>{s.description || 'Experiência premium para você.'}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

