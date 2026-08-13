import { useEffect } from 'react'
import { MapPin, Clock, Phone } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const whatsappSvg = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Location() {
  useEffect(() => {
    const locationMap = document.querySelector('.location-map')
    if (locationMap) {
      gsap.fromTo(locationMap,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: locationMap, start: 'top 80%', toggleActions: 'play none none none' }
        }
      )
    }

    const header = document.querySelector('#location .section-header')
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
    <section id="location" className="location section-pad">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Onde Estamos</span>
          <h2 className="section-title">Nossa <span className="text-accent">Localização</span></h2>
          <p className="section-desc">Venha nos visitar. Estamos esperando por você.</p>
        </div>
        <div className="location-grid">
          <div className="location-info">
            <div className="location-detail">
              <div className="detail-icon"><MapPin size={20} /></div>
              <div>
                <h4>Endereço</h4>
                <p>Av. das Esmeraldas, 1000<br />Centro, Manaus - AM</p>
              </div>
            </div>
            <div className="location-detail">
              <div className="detail-icon"><Clock size={20} /></div>
              <div>
                <h4>Horário de Funcionamento</h4>
                <p>Seg a Sex: 09:00 — 20:00<br />Sáb: 09:00 — 18:00<br />Dom: Fechado</p>
              </div>
            </div>
            <div className="location-detail">
              <div className="detail-icon"><Phone size={20} /></div>
              <div>
                <h4>Contato</h4>
                <p>(92) 99999-9999</p>
              </div>
            </div>
            <a
              href="https://wa.me/5592999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              {whatsappSvg}
              Chamar no WhatsApp
            </a>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.3!2d-38.4868838!3d-3.7893835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7456551b779f7%3A0xd42dc00c282dcb17!2sJapa%20Barbearia!5e0!3m2!1spt-BR!2sbr!4v1718751446000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da JapaBarbearia no mapa"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
