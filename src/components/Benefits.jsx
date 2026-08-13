import { useEffect } from 'react'
import { Award, Sparkles, HeartHandshake } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Benefits() {
  useEffect(() => {
    const cards = gsap.utils.toArray('.benefit-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })

    const header = document.querySelector('#benefits .section-header')
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
    <section id="benefits" className="benefits section-pad">
      <div className="container benefits-container">
        <img src="/assets/images/tesoura.png" alt="tesoura" id="tesoura" className="tesoura floating-tool" />
        <img src="/assets/images/maquina.png" alt="maquina" id="maquina" className="maquina floating-tool" />
        <div className="section-header">
          <span className="section-tag">Por Que Nos Escolher</span>
          <h2 className="section-title">O Que Nos <span className="text-accent">Diferencia</span></h2>
          <p className="section-desc">Não é apenas um corte. É uma experiência pensada em cada detalhe para você.</p>
        </div>
        <div className="benefits-grid">
          {[
            {
              Icon: Award,
              title: 'Profissionalismo',
              desc: 'Mais de 10 anos de experiência com técnicas atualizadas e precisão em cada detalhe do seu visual.'
            },
            {
              Icon: Sparkles,
              title: 'Ambiente Premium',
              desc: 'Espaço aconchegante com sinuca, boa música e um clima que te faz relaxar enquanto espera.'
            },
            {
              Icon: HeartHandshake,
              title: 'Preço Justo',
              desc: 'Qualidade premium com preços acessíveis. O melhor custo-benefício da região, sem abrir mão do padrão.'
            }
          ].map(({ Icon, title, desc }) => (
            <div className="benefit-card" key={title}>
              <div className="benefit-icon"><Icon size={28} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
