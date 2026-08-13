import { useEffect, useRef } from 'react'
import { ArrowRight, Scissors } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import gsap from 'gsap'

export default function Hero() {
  const { openBookingModal, settings } = useBooking()
  const contentRef = useRef(null)

  useEffect(() => {
    const elements = contentRef.current?.querySelectorAll('[data-animate]')
    if (!elements) return
    gsap.fromTo(elements,
      { opacity: 0, y: 60, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.3 }
    )
    gsap.fromTo('.scroll-indicator',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power2.out' }
    )
  }, [])

  function scrollToServices(e) {
    e.preventDefault()
    const el = document.getElementById('services')
    if (el) {
      const nav = document.getElementById('navbar')
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight || 80) - 20, behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-split">
        <div className="hero-left">
          <div className="hero-content" ref={contentRef}>
            <span className="hero-eyebrow" data-animate="fade-up">
              <Scissors size={16} className="eyebrow-icon" />
              Tradição &amp; Excelência desde 2017
            </span>
            <h1 className="hero-title" data-animate="fade-up">
              {settings.hero_title || 'Mais do Que Um Simples Corte.'}
            </h1>
            <p className="hero-subtitle" data-animate="fade-up">
              {settings.hero_subtitle || 'Grooming premium, ambiente acolhedor e uma experiência que transforma cada visita em um momento especial. Bem-vindo à JapaBarbearia.'}
            </p>
            <div className="hero-actions" data-animate="fade-up">
              <button className="btn-primary btn-lg" onClick={() => openBookingModal()}>
                Agendar Horário
                <ArrowRight size={18} className="btn-icon" />
              </button>
              <a href="#services" className="btn-outline btn-lg" onClick={scrollToServices}>
                Nossos Serviços
              </a>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <img src="/assets/images/hero1.png" alt="JapaBarbearia barbeiro profissional" className="hero-img" />
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
