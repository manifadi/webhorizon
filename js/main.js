// Mobile Menu Functionality - Überarbeitete Version
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;
const header = document.querySelector('.main-header');
const mobileMenuLinks = document.querySelector('.mobile-menu .nav-links');
let menuHeight = 0;

// Berechne die tatsächliche Höhe des Menüs
function calculateMenuHeight() {
    // Temporär sichtbar machen, um Höhe zu berechnen
    mobileMenu.style.height = 'auto';
    mobileMenu.style.opacity = '0';
    mobileMenu.style.position = 'absolute';
    mobileMenu.style.visibility = 'hidden';
    mobileMenu.style.display = 'block';
    
    // Höhe berechnen
    menuHeight = mobileMenuLinks.offsetHeight + 32; // 32px für Padding (16px oben + 16px unten)
    
    // Zurücksetzen
    mobileMenu.style.height = '0';
    mobileMenu.style.opacity = '0';
    mobileMenu.style.position = 'fixed';
    mobileMenu.style.visibility = 'visible';
    mobileMenu.style.display = 'block';
}

// Berechne die Menühöhe beim Laden
window.addEventListener('DOMContentLoaded', calculateMenuHeight);
window.addEventListener('resize', calculateMenuHeight);

// Toggle-Funktion für das mobile Menü
mobileNavToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    
    if (mobileMenu.classList.contains('active')) {
        // Menü schließen
        mobileMenu.style.height = '0';
        mobileMenu.style.opacity = '0';
        mobileMenu.classList.remove('active');
        header.classList.remove('menu-active'); // Entferne die menu-active Klasse vom Header
        body.classList.remove('no-scroll');
    } else {
        // Menü öffnen
        mobileMenu.classList.add('active');
        mobileMenu.style.height = menuHeight + 'px';
        mobileMenu.style.opacity = '1';
        header.classList.add('menu-active'); // Füge die menu-active Klasse zum Header hinzu
        body.classList.add('no-scroll'); // Verhindert Scrollen im Hintergrund
    }
});

// Schließt das mobile Menü, wenn ein Link geklickt wird
document.querySelectorAll('.mobile-menu .nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        mobileNavToggle.classList.remove('active');
        mobileMenu.style.height = '0';
        mobileMenu.style.opacity = '0';
        mobileMenu.classList.remove('active');
        header.classList.remove('menu-active'); // Entferne die menu-active Klasse vom Header
        body.classList.remove('no-scroll');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll behavior - Enhanced version
let lastScrollTop = 0;
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Nur ausführen, wenn das mobile Menü nicht aktiv ist
    if (!header.classList.contains('menu-active')) {
        // Bestimme die Scroll-Richtung
        if (scrollTop > lastScrollTop) {
            // Nach unten scrollen - Header ausblenden
            header.style.transform = `translateX(-50%) translateY(-${headerHeight}px)`;
        } else {
            // Nach oben scrollen - Header einblenden
            header.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
    
    // Füge Scrolled-Klasse hinzu für zusätzliche Styling-Effekte
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Verhindert negative Scrollwerte
});

// FAQ Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form submission handling (optional)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
});

// Scroll to Top Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const progressCircle = scrollToTopBtn.querySelector('.progress-circle circle');
    const totalLength = progressCircle.getTotalLength();
    
    // Button Click Handler
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Handler
    window.addEventListener('scroll', function() {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = window.pageYOffset;
        const scrollPercentage = (scrollProgress / scrollTotal);
        
        // Update progress circle
        const offset = totalLength - (scrollPercentage * totalLength);
        progressCircle.style.strokeDashoffset = offset;
        
        // Show/hide button
        if (scrollProgress > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer für Sections
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aktiven Link im Menü markieren
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });
    
    // Alle Sections für das Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    
    // Beobachte alle Sections
    sections.forEach(section => observer.observe(section));
    
    // Smooth Scroll verbessern
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100; // Offset für fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});