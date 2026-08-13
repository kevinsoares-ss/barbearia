import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  { src: '/assets/images/img1.jpeg', label: 'Fade Skin', alt: 'Corte fade masculino - JapaBarbearia', tall: true },
  { src: '/assets/images/img2.jpeg', label: 'Barba Esculpida', alt: 'Barba modelada - JapaBarbearia' },
  { src: '/assets/images/img3.jpeg', label: 'Pompadour', alt: 'Pompadour clássico - JapaBarbearia' },
  { src: '/assets/images/img4.jpeg', label: 'Tratamento VIP', alt: 'Tratamento VIP - JapaBarbearia', wide: true },
]

export default function Gallery() {
  const { openBookingModal } = useBooking()

  useEffect(() => {
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 0.8, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    const header = document.querySelector('#gallery .section-header')
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
    <section id="gallery" className="gallery section-pad">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Galeria de Cortes</span>
          <h2 className="section-title">Nosso <span className="text-accent">Trabalho</span></h2>
          <p className="section-desc">Cada corte é uma obra de arte. Confira alguns dos nossos trabalhos.</p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map(item => (
            <div
              key={item.label}
              className={`gallery-item${item.tall ? ' gallery-item-tall' : ''}${item.wide ? ' gallery-item-wide' : ''}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="gallery-overlay"><span>{item.label}</span></div>
            </div>
          ))}
        </div>
        <div className="gallery-cta">
          <p>Quer ser o próximo?</p>
          <button className="btn-primary btn-lg" onClick={() => openBookingModal()}>
            Agendar Meu Horário
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}
