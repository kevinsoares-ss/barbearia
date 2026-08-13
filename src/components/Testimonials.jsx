import { useEffect } from 'react'
import { Star, MapPin, CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { initials: 'AN', name: 'Agnes Noronha', badge: 'Local Guide · 72 avaliações', icon: 'map', text: '"Muito bom, ótimo profissional, preço justo e ainda tem uma sinuquinha pra jogar enquanto espera a vez 😁"' },
  { initials: 'CR', name: 'Cristian Rodrigues', badge: 'Local Guide · 44 avaliações', icon: 'map', text: '"Atendimento top, e ele é muito profissional. Parabéns!"' },
  { initials: 'EB', name: 'Elenilton Bessa', badge: 'Local Guide · 105 avaliações', icon: 'map', text: '"Recomendo, o menino Japa é top!"' },
  { initials: 'YW', name: 'Yatagnan Washington', badge: 'Cliente verificado', icon: 'check', text: '"Bom atendimento e qualidade no serviço."' },
  { initials: 'WA', name: 'Wilson De Albuquerque', badge: 'Local Guide · 21 avaliações', icon: 'map', text: '"Japa se garante!"' },
  { initials: 'GS', name: 'Glaucia de Sá', badge: 'Local Guide · 27 avaliações', icon: 'map', text: '"Super recomendo!!"' },
]

export default function Testimonials() {
  useEffect(() => {
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
        }
      )
    })

    const header = document.querySelector('#testimonials .section-header')
    if (header) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' } })
      const tag = header.querySelector('.section-tag')
      const title = header.querySelector('.section-title')
      const desc = header.querySelector('.section-desc')
      if (tag) tl.fromTo(tag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      if (desc) tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
    }
  }, [])

  return (
    <section id="testimonials" className="testimonials section-pad">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Avaliações Reais</span>
          <h2 className="section-title">O Que Nossos Clientes <span className="text-accent">Dizem</span></h2>
          <p className="section-desc">Avaliações reais do Google. Sem filtros, sem enrolação.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="star-filled" fill="currentColor" />)}
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div>
                  <span className="author-name">{t.name}</span>
                  <span className="author-badge">
                    {t.icon === 'map' ? <MapPin size={12} className="badge-icon" /> : <CheckCircle size={12} className="badge-icon" />}
                    {t.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
