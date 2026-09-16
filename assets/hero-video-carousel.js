(() => {
  class HeroVideoCarousel {
    constructor(element) {
      this.element = element;
      this.slides = [...element.querySelectorAll('[data-hero-slide]')];
      this.dots = [...element.querySelectorAll('[data-hero-dot]')];
      this.previousButton = element.querySelector('[data-hero-previous]');
      this.nextButton = element.querySelector('[data-hero-next]');
      this.currentIndex = 0;
      this.interval = null;
      this.autoplayDelay = 7000;

      if (this.slides.length === 0) return;

      this.bindEvents();
      this.showSlide(0);
      this.startAutoplay();
    }

    bindEvents() {
      this.nextButton?.addEventListener('click', () => {
        this.showSlide(this.currentIndex + 1);
        this.restartAutoplay();
      });

      this.previousButton?.addEventListener('click', () => {
        this.showSlide(this.currentIndex - 1);
        this.restartAutoplay();
      });

      this.dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          this.showSlide(Number(dot.dataset.heroDot));
          this.restartAutoplay();
        });
      });

      this.element.addEventListener('mouseenter', () => this.stopAutoplay());
      this.element.addEventListener('mouseleave', () => this.startAutoplay());
    }

    showSlide(index) {
      const total = this.slides.length;

      this.currentIndex = (index + total) % total;

      this.slides.forEach((slide, i) => {
        const isActive = i === this.currentIndex;
        const video = slide.querySelector('video');

        slide.classList.toggle('is-active', isActive);

        if (isActive) {
          video?.play().catch(() => {});
        } else {
          video?.pause();
        }
      });

      this.dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === this.currentIndex);
        dot.setAttribute('aria-selected', String(i === this.currentIndex));
      });
    }

    startAutoplay() {
      if (this.slides.length < 2 || this.interval) return;

      this.interval = window.setInterval(() => {
        this.showSlide(this.currentIndex + 1);
      }, this.autoplayDelay);
    }

    stopAutoplay() {
      if (!this.interval) return;

      window.clearInterval(this.interval);
      this.interval = null;
    }

    restartAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  document
    .querySelectorAll('.hero-video-carousel')
    .forEach((element) => new HeroVideoCarousel(element));
})();