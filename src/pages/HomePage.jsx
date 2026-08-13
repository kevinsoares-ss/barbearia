import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  useEffect(() => {
    // Tool crossing animation
    initToolAnimation()
    // Hero parallax
    gsap.to('.hero-img', {
      y: 60, scale: 1.05, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    })
    gsap.to('.hero-content', {
      opacity: 0, y: -50, ease: 'power2.in',
      scrollTrigger: { trigger: '.hero', start: '60% top', end: 'bottom top', scrub: 1 }
    })
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Benefits />
      <Services />
      <Testimonials />
      <Pricing />
      <Gallery />
      <Location />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

function initToolAnimation() {
  const tesoura = document.getElementById('tesoura')
  const maquina = document.getElementById('maquina')
  const benefitsSection = document.getElementById('benefits')
  const servicesSection = document.getElementById('services')

  if (!tesoura || !maquina || !benefitsSection || !servicesSection) return

  const toolTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: benefitsSection,
      start: 'top 60%',
      endTrigger: servicesSection,
      end: 'top 40%',
      scrub: 1.5,
      onEnter: () => gsap.set([tesoura, maquina], { position: 'fixed' }),
      onLeaveBack: () => gsap.set([tesoura, maquina], { position: 'absolute' })
    }
  })

  toolTimeline
    .fromTo(tesoura, { top: '30%', left: '10%', rotation: -15, scale: 1, opacity: 1 }, { top: '50%', left: '35%', rotation: 5, scale: 0.9, duration: 0.35, ease: 'none' }, 0)
    .fromTo(maquina, { top: '30%', left: '80%', rotation: 15, scale: 1, opacity: 1 }, { top: '50%', left: '55%', rotation: -5, scale: 0.9, duration: 0.35, ease: 'none' }, 0)
    .to(tesoura, { top: '55%', left: '65%', rotation: 20, scale: 0.85, duration: 0.3, ease: 'none' }, 0.35)
    .to(maquina, { top: '55%', left: '25%', rotation: -20, scale: 0.85, duration: 0.3, ease: 'none' }, 0.35)
    .to(tesoura, { top: '40vh', left: '10vw', rotation: -8, scale: 0.7, opacity: 0.9, duration: 0.35, ease: 'power1.inOut' }, 0.65)
    .to(maquina, { top: '40vh', left: '80vw', rotation: 8, scale: 0.7, opacity: 0.9, duration: 0.35, ease: 'power1.inOut' }, 0.65)

  gsap.to([tesoura, maquina], {
    opacity: 0, scale: 0.4, duration: 0.5, ease: 'power2.in',
    scrollTrigger: { trigger: servicesSection, start: 'top 20%', end: 'top -5%', scrub: 1 }
  })
}
