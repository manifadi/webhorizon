// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll class to header for shadow effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
    // Alle Sections für das Intersection Observer
    const sections = document.querySelectorAll('section[id]');
    
    // Intersection Observer Optionen
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
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