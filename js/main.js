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

// Initialize AOS (Animate On Scroll) if you decide to use it
// document.addEventListener('DOMContentLoaded', function() {
//     AOS.init();
// });

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

// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 1; // Start with middle slide
    
    function updateCarousel() {
        slides.forEach(slide => slide.className = 'project-slide');
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Update slides
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        const nextIndex = (currentIndex + 1) % slides.length;
        
        slides[prevIndex].className = 'project-slide prev';
        slides[currentIndex].className = 'project-slide current';
        slides[nextIndex].className = 'project-slide next';
        
        // Update navigation dots
        dots[currentIndex].classList.add('active');
    }
    
    // Click handlers for slides
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('prev')) {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            } else if (slide.classList.contains('next')) {
                currentIndex = (currentIndex + 1) % slides.length;
            }
            updateCarousel();
        });
    });
    
    // Auto-rotate carousel every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 5000);
    
    // Initial setup
    updateCarousel();
});