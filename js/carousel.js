class ProjectCarousel {
    constructor() {
        // Selektiere die DOM-Elemente
        this.container = document.querySelector('.carousel-container');
        this.slides = Array.from(document.querySelectorAll('.project-slide'));
        this.dotsContainer = document.querySelector('.carousel-nav');
        this.currentIndex = 1;
        this.isAnimating = false;
        
        // Initialisierung
        this.init();
    }

    init() {
        if (!this.container || !this.slides.length) return;
        
        // Generiere Navigationspunkte
        this.createNavigationDots();
        
        // Event Listener für Slides
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.handleSlideClick(index));
        });

        // Initial Update
        this.updateCarousel();
    }

    createNavigationDots() {
        if (!this.dotsContainer) return;
        
        // Leere den Container
        this.dotsContainer.innerHTML = '';
        
        // Erstelle Dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        // Speichere Referenz zu den Dots
        this.dots = Array.from(this.dotsContainer.querySelectorAll('.nav-dot'));
    }

    handleSlideClick(clickedIndex) {
        if (this.isAnimating) return;
        
        const clickedSlide = this.slides[clickedIndex];
        
        if (clickedSlide.classList.contains('prev')) {
            this.goToPrevSlide();
        } else if (clickedSlide.classList.contains('next')) {
            this.goToNextSlide();
        }
    }

    updateCarousel(animate = true) {
        if (this.isAnimating) return;

        if (animate) {
            this.isAnimating = true;
            setTimeout(() => { this.isAnimating = false; }, 500);
        }

        // Entferne alle Klassen
        this.slides.forEach(slide => {
            slide.classList.remove('prev', 'current', 'next');
            slide.style.transition = animate ? 'all 0.5s ease-in-out' : 'none';
        });

        // Berechne Indizes
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        const nextIndex = (this.currentIndex + 1) % this.slides.length;

        // Setze neue Klassen
        this.slides[prevIndex].classList.add('prev');
        this.slides[this.currentIndex].classList.add('current');
        this.slides[nextIndex].classList.add('next');

        // Update Navigationspunkte
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
    }

    goToNextSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }

    goToPrevSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isAnimating || this.currentIndex === index) return;
        this.currentIndex = index;
        this.updateCarousel();
    }
}

// Warte auf DOM-Load
document.addEventListener('DOMContentLoaded', () => {
    // Erstelle neue Karussell-Instanz
    const carousel = new ProjectCarousel();
});