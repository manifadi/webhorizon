// Animations.js - Scroll-Animationen und Parallax-Effekte

document.addEventListener('DOMContentLoaded', function() {
    // Initialisiere die Animations-Beobachter
    initScrollAnimations();
    initParallaxEffects();
    
    // Hero-Sektion Animation beim Laden
    animateHeroSection();
});

// Hero-Sektion Animation beim Laden
function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Startposition für Elemente
    gsap.set(heroContent.children, { 
        y: 30, 
        opacity: 0 
    });
    
    gsap.set(heroImage, { 
        y: 30, 
        opacity: 0 
    });
    
    // Timeline für gestaffelte Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.to(heroContent.children, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2
    })
    .to(heroImage, {
        y: 0,
        opacity: 1,
        duration: 1
    }, "-=0.5");
}

// Scroll-Animationen initialisieren
function initScrollAnimations() {
    // Elemente, die animiert werden sollen
    const animatedElements = [
        '.services-container h2',
        '.services-container .section-description',
        '.service-card',
        '.references-container h2',
        '.references-container .section-description',
        '.carousel-container',
        '.faq-item',
        '.contact-section'
    ];
    
    // ScrollTrigger für jedes Element einrichten
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            // Verschiedene Animationen basierend auf dem Element-Typ
            if (selector === '.service-card') {
                gsap.set(element, { y: 50, opacity: 0 });
                
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.1
                });
            } 
            else if (selector === '.faq-item') {
                gsap.set(element, { x: -30, opacity: 0 });
                
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1
                });
            }
            else if (selector === '.contact-section') {
                gsap.set(element, { scale: 0.95, opacity: 0 });
                
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 75%",
                        toggleActions: "play none none none"
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 1
                });
            }
            else {
                gsap.set(element, { y: 30, opacity: 0 });
                
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8
                });
            }
        });
    });
    
    // Spezielle Animation für den Carousel-Container
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        gsap.to('.imac-frame', {
            scrollTrigger: {
                trigger: carousel,
                start: "top 60%",
                end: "bottom 20%",
                scrub: 1
            },
            y: -20,
            duration: 1
        });
    }
}

// Parallax-Effekte initialisieren
function initParallaxEffects() {
    // Parallax für Hintergrund-Elemente
    const parallaxElements = [
        '.gradient-circle',
        '.floating-dots',
        '.hero-image .dot-pattern',
        '.faq-contact > .dot-pattern'
    ];
    
    parallaxElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            // Verschiedene Parallax-Geschwindigkeiten für verschiedene Elemente
            let speed = 0.2;
            
            if (selector === '.gradient-circle') speed = 0.1;
            if (selector === '.floating-dots') speed = 0.15;
            
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: () => window.innerHeight * speed,
                ease: "none"
            });
        });
    });
    
    // Spezielle Parallax-Effekte für bestimmte Sektionen
    
    // Services-Sektion Parallax
    gsap.to('.services', {
        scrollTrigger: {
            trigger: '.services',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        backgroundPosition: "50% 100%",
        ease: "none"
    });
    
    // Subtile Rotation für Service-Cards beim Scrollen
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            rotateZ: direction * 2,
            ease: "none"
        });
    });
}

// Maus-Bewegungs-Parallax für Hero-Sektion
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // Subtile Bewegung für Hintergrund-Elemente basierend auf Mausposition
    gsap.to('.gradient-circle', {
        x: mouseX * 50,
        y: mouseY * 50,
        duration: 1
    });
    
    gsap.to('.floating-dots', {
        x: mouseX * -20,
        y: mouseY * -20,
        duration: 1
    });
    
    gsap.to('.hero-image', {
        x: mouseX * 25,
        y: mouseY * 25,
        duration: 1
    });
});

// Smooth Scroll mit GSAP ScrollToPlugin
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: offsetPosition,
                    autoKill: false
                },
                ease: "power3.inOut"
            });
        }
    });
});

// Animierte Zahlen für Service-Cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    // Füge Zahl hinzu
    const number = document.createElement('div');
    number.classList.add('service-number');
    number.textContent = `0${index + 1}`;
    card.appendChild(number);
    
    // Animation beim Hover
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -10,
            boxShadow: "0 15px 30px rgba(45, 127, 249, 0.15)",
            duration: 0.3
        });
        
        gsap.to(this.querySelector('.service-icon'), {
            scale: 1.1,
            rotation: 5,
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            duration: 0.3
        });
        
        gsap.to(this.querySelector('.service-icon'), {
            scale: 1,
            rotation: 0,
            duration: 0.3
        });
    });
});