/* =====================================================
   JapaBarbearia — GSAP Scroll Animations & Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ===== GSAP + ScrollTrigger Registration =====
    gsap.registerPlugin(ScrollTrigger);

    // Start GSAP Animations directly
    initGSAPAnimations();

    initNavbar();
    initMobileMenu();
    initWhatsAppFloat();
    initSmoothScroll();

    // ===== GSAP ANIMATIONS =====
    function initGSAPAnimations() {
        // Hero animations — staggered entrance
        const heroElements = document.querySelectorAll('.hero [data-animate]');

        gsap.fromTo(heroElements,
            {
                opacity: 0,
                y: 60,
                filter: 'blur(8px)'
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
                delay: 0.3
            }
        );

        // Scroll indicator fade
        gsap.fromTo('.scroll-indicator',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power2.out' }
        );

        // ===== Scroll-triggered animations =====
        // Fade up for all sections
        const scrollElements = document.querySelectorAll('[data-animate]:not(.hero [data-animate])');

        scrollElements.forEach(el => {
            const delay = parseFloat(el.dataset.delay) || 0;

            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        end: 'top 60%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // ===== Section-specific animations =====

        // Benefits cards — subtle scale
        gsap.utils.toArray('.benefit-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.8,
                    delay: i * 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Steps — sequential reveal with line
        gsap.utils.toArray('.step-card').forEach((card, i) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            tl.fromTo(card.querySelector('.step-number'),
                { opacity: 0, y: -30 },
                { opacity: 0.2, y: 0, duration: 0.6, ease: 'power2.out' }
            )
                .fromTo(card.querySelector('.step-line'),
                    { scaleX: 0 },
                    { scaleX: 1, duration: 0.5, ease: 'power2.out' },
                    '-=0.3'
                )
                .fromTo(card.querySelector('h3'),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                    '-=0.2'
                )
                .fromTo(card.querySelector('p'),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                    '-=0.3'
                );
        });

        // Services — image reveal with clip-path
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 60,
                    clipPath: 'inset(10% 10% 10% 10% round 24px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    clipPath: 'inset(0% 0% 0% 0% round 24px)',
                    duration: 1,
                    delay: i * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Testimonial cards — staggered fade
        gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 30, scale: 0.97 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Pricing cards — staggered entrance
        gsap.utils.toArray('.pricing-card').forEach((card, i) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50, rotateX: 5 },
                {
                    opacity: 1, y: 0, rotateX: 0,
                    duration: 0.9,
                    delay: i * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Gallery items — masonry reveal
        gsap.utils.toArray('.gallery-item').forEach((item, i) => {
            gsap.fromTo(item,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Location section parallax
        const locationMap = document.querySelector('.location-map');
        if (locationMap) {
            gsap.fromTo(locationMap,
                { opacity: 0, x: 40 },
                {
                    opacity: 1, x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: locationMap,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }

        // Section headers — text reveal
        gsap.utils.toArray('.section-header').forEach(header => {
            const tag = header.querySelector('.section-tag');
            const title = header.querySelector('.section-title');
            const desc = header.querySelector('.section-desc');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            if (tag) {
                tl.fromTo(tag,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                );
            }
            if (title) {
                tl.fromTo(title,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                    '-=0.3'
                );
            }
            if (desc) {
                tl.fromTo(desc,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                    '-=0.3'
                );
            }
        });

        // Hero parallax on scroll
        gsap.to('.hero-img', {
            y: 60,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Fade hero content on scroll
        gsap.to('.hero-content', {
            opacity: 0,
            y: -50,
            ease: 'power2.in',
            scrollTrigger: {
                trigger: '.hero',
                start: '60% top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // ===== TESOURA & MAQUINA CROSSING ANIMATION =====
        initToolAnimation();
    }

    function initToolAnimation() {
        const tesoura = document.getElementById('tesoura');
        const maquina = document.getElementById('maquina');
        const tesouraLanding = document.getElementById('tesoura-landing');
        const maquinaLanding = document.getElementById('maquina-landing');
        const benefitsSection = document.getElementById('benefits');
        const servicesSection = document.getElementById('services');

        if (!tesoura || !maquina || !tesouraLanding || !maquinaLanding || !benefitsSection || !servicesSection) return;

        // Main scroll timeline: from benefits title sides → cross → land at services title sides
        const toolTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: benefitsSection,
                start: 'top 60%',
                endTrigger: servicesSection,
                end: 'top 40%',
                scrub: 1.5,
                onEnter: () => {
                    // Switch to fixed when animation starts
                    gsap.set([tesoura, maquina], { position: 'fixed' });
                },
                onLeaveBack: () => {
                    // Reset to absolute when scrolling back
                    gsap.set([tesoura, maquina], { position: 'absolute' });
                }
            }
        });

        // Phase 1 (0% → 35%): Start from sides of "O Que Nos Diferencia", move down and inward
        toolTimeline.fromTo(tesoura, {
            top: '30%',
            left: '10%',
            rotation: -15,
            scale: 1,
            opacity: 1
        }, {
            top: '50%',
            left: '35%',
            rotation: 5,
            scale: 0.9,
            duration: 0.35,
            ease: 'none'
        }, 0);

        toolTimeline.fromTo(maquina, {
            top: '30%',
            left: '80%',
            rotation: 15,
            scale: 1,
            opacity: 1
        }, {
            top: '50%',
            left: '55%',
            rotation: -5,
            scale: 0.9,
            duration: 0.35,
            ease: 'none'
        }, 0);

        // Phase 2 (35% → 65%): THE CROSS — tesoura goes right, maquina goes left
        toolTimeline.to(tesoura, {
            top: '55%',
            left: '65%',
            rotation: 20,
            scale: 0.85,
            duration: 0.3,
            ease: 'none'
        }, 0.35);

        toolTimeline.to(maquina, {
            top: '55%',
            left: '25%',
            rotation: -20,
            scale: 0.85,
            duration: 0.3,
            ease: 'none'
        }, 0.35);

        // Phase 3 (65% → 100%): Land at final positions next to "Principais Funcionalidades"
        toolTimeline.to(tesoura, {
            top: '40vh',
            left: '10vw',
            rotation: -8,
            scale: 0.7,
            opacity: 0.9,
            duration: 0.35,
            ease: 'power1.inOut'
        }, 0.65);

        toolTimeline.to(maquina, {
            top: '40vh',
            left: '80vw',
            rotation: 8,
            scale: 0.7,
            opacity: 0.9,
            duration: 0.35,
            ease: 'power1.inOut'
        }, 0.65);

        // Fade out the tools once services section is entered
        gsap.to([tesoura, maquina], {
            opacity: 0,
            scale: 0.4,
            duration: 0.5,
            ease: 'power2.in',
            scrollTrigger: {
                trigger: servicesSection,
                start: 'top 20%',
                end: 'top -5%',
                scrub: 1
            }
        });
    }

    // ===== NAVBAR =====
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ===== MOBILE MENU =====
    function initMobileMenu() {
        const toggle = document.getElementById('mobileToggle');
        const menu = document.getElementById('navMenu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') &&
                !menu.contains(e.target) &&
                !toggle.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== WHATSAPP FLOAT =====
    function initWhatsAppFloat() {
        const btn = document.getElementById('whatsappFloat');
        if (!btn) return;

        const showAt = 400;

        window.addEventListener('scroll', () => {
            if (window.scrollY > showAt) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });
    }



    // ===== SMOOTH SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
