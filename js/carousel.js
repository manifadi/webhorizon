class ProjectCarousel {
    constructor() {
        this.slides = Array.from(document.querySelectorAll('.project-slide'));
        this.dots = Array.from(document.querySelectorAll('.nav-dot'));
        this.currentIndex = 1; // Start mit mittlerem Slide
        this.isAnimating = false;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        // Event Listener für Slides
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.handleSlideClick(index));
        });

        // Event Listener für Dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Initial Update
        this.updateCarousel();
        this.startAutoPlay();

        // Pause Autoplay on hover
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => this.pauseAutoPlay());
        document.querySelector('.carousel-container').addEventListener('mouseleave', () => this.startAutoPlay());
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
        if (animate) {
            this.isAnimating = true;
            setTimeout(() => { this.isAnimating = false; }, 500); // Match transition duration
        }

        this.slides.forEach(slide => {
            slide.classList.remove('prev', 'current', 'next');
            slide.style.transition = animate ? 'all 0.5s ease-in-out' : 'none';
        });

        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        const nextIndex = (this.currentIndex + 1) % this.slides.length;

        this.slides[prevIndex].classList.add('prev');
        this.slides[this.currentIndex].classList.add('current');
        this.slides[nextIndex].classList.add('next');

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Reset transitions after update if not animating
        if (!animate) {
            setTimeout(() => {
                this.slides.forEach(slide => {
                    slide.style.transition = 'all 0.5s ease-in-out';
                });
            }, 50);
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

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        this.autoPlayInterval = setInterval(() => this.goToNextSlide(), 5000);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialisierung nach DOM-Load
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new ProjectCarousel();
});