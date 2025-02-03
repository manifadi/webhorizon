class ProjectCarousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        this.slides = Array.from(document.querySelectorAll('.project-slide'));
        this.dotsContainer = document.querySelector('.carousel-nav');
        this.currentIndex = 1;
        this.isAnimating = false;
        
        // Touch-Events Variablen
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        
        // Initialisierung
        this.init();
    }

    init() {
        if (!this.container || !this.slides.length) return;
        
        this.createNavigationDots();
        
        // Click Events - nur auf die Slides
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.handleSlideClick(index));
        });

        // Touch Events
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Initial Update
        this.updateCarousel();
    }

    // Neue Touch-Event Handler
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        this.touchEndX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        if (!this.touchStartX || !this.touchEndX) return;

        const swipeDistance = this.touchEndX - this.touchStartX;
        const isSignificantSwipe = Math.abs(swipeDistance) > this.minSwipeDistance;

        if (isSignificantSwipe) {
            if (swipeDistance > 0) {
                // Swipe nach rechts - vorherige Slide
                this.goToPrevSlide();
            } else {
                // Swipe nach links - nächste Slide
                this.goToNextSlide();
            }
        }

        // Reset touch values
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    createNavigationDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = Array.from(this.dotsContainer.querySelectorAll('.nav-dot'));
    }

    handleSlideClick(clickedIndex) {
        if (this.isAnimating) return;
        
        const clickedSlide = this.slides[clickedIndex];
        
        // Wenn das geklickte Slide das aktuelle ist, öffne den Link
        if (clickedSlide.classList.contains('current')) {
            const url = clickedSlide.dataset.url;
            if (url) {
                window.open(url, '_blank');
            }
            return;
        }
        
        // Wenn es nicht das aktuelle Slide ist, nur Navigation ausführen
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

        this.slides.forEach(slide => {
            slide.classList.remove('prev', 'current', 'next');
            slide.style.transition = animate ? 'all 0.5s ease-in-out' : 'none';
        });

        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        const nextIndex = (this.currentIndex + 1) % this.slides.length;

        this.slides[prevIndex].classList.add('prev');
        this.slides[this.currentIndex].classList.add('current');
        this.slides[nextIndex].classList.add('next');

        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        document.dispatchEvent(new CustomEvent('slideChanged'));
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
    const carousel = new ProjectCarousel();
});

// Hover-Mauszeiger-Projekt-Positionierung
document.addEventListener('DOMContentLoaded', function() {
    const hoverBox = document.querySelector('.project-hover-box');
    const carouselContainer = document.querySelector('.carousel-container');
    let isHovering = false;
    let lastMouseEvent = null; // Speichert das letzte MouseEvent

    // Mausposition-Tracking mit Berücksichtigung des Scrolls und der Container-Position
    function updateHoverBoxPosition(e) {
        // Wenn ein Event übergeben wurde, speichere es
        if (e) {
            lastMouseEvent = e;
        } else if (!lastMouseEvent) {
            return; // Wenn kein Event verfügbar ist, beende die Funktion
        }

        // Verwende das aktuelle oder das letzte Event
        const currentEvent = e || lastMouseEvent;

        // Prüfe, ob der Mauszeiger über dem aktuellen Slide ist
        const currentSlide = document.querySelector('.project-slide.current');
        const slideRect = currentSlide.getBoundingClientRect();
        const isOverCurrentSlide = (
            currentEvent.clientX >= slideRect.left &&
            currentEvent.clientX <= slideRect.right &&
            currentEvent.clientY >= slideRect.top &&
            currentEvent.clientY <= slideRect.bottom
        );

        // Aktualisiere isHovering basierend auf der Position
        isHovering = isOverCurrentSlide;
        hoverBox.style.opacity = isHovering ? '1' : '0';
        
        if (!isHovering) return;
        
        // Hole die Position und Dimensionen des Carousel-Containers
        const containerRect = carouselContainer.getBoundingClientRect();
        
        // Berechne die relative Position innerhalb des Containers
        const relativeX = currentEvent.clientX + window.scrollX - containerRect.left;
        const relativeY = currentEvent.clientY + window.scrollY - containerRect.top;
        
        const offset = 10; // Abstand zum Mauszeiger

        // Setze die Position relativ zum Carousel-Container
        hoverBox.style.left = `${relativeX + offset}px`;
        hoverBox.style.top = `${currentEvent.clientY - containerRect.top + offset}px`;
    }

    // Mousemove-Event nur innerhalb des Carousel-Containers
    carouselContainer.addEventListener('mousemove', updateHoverBoxPosition);

    // Scroll-Event für die gesamte Seite
    window.addEventListener('scroll', () => {
        if (isHovering) {
            updateHoverBoxPosition(); // Aktualisiere Position beim Scrollen
        }
    });

    // Initial Hover-Listener setzen und nach Slide-Wechsel aktualisieren
    document.addEventListener('slideChanged', () => {
        isHovering = false;
        hoverBox.style.opacity = '0';
    });
});