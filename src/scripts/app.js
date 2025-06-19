// Import animation modules (these will be loaded via CDN for now)
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { TextPlugin } from 'gsap/TextPlugin';

// App class to manage all interactions
class PortfolioApp {
  constructor() {
    this.isLoaded = false;
    this.cursor = null;
    this.cursorFollower = null;
    this.loadingScreen = null;
    
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.initializeComponents();
    this.setupEventListeners();

    if (sessionStorage.getItem('hasLoaded')) {
      this.finishLoading(false); // Skip animation
    } else {
      this.startLoadingAnimation();
    }
  }

  initializeComponents() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.cursor = document.getElementById('cursor');
    this.cursorFollower = document.getElementById('cursor-follower');
    
    // Initialize each component
    this.initCustomCursor();
    this.initScrollAnimations();
    this.initProjectHovers();
  }

  initCustomCursor() {
    if (!this.cursor || !this.cursorFollower) return;
    
    const hoverElements = document.querySelectorAll('a, button, .project-card');
    
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      gsap.to(this.cursor, {
        x: x,
        y: y,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(this.cursorFollower, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(this.cursor, { scale: 2, duration: 0.3 });
        gsap.to(this.cursorFollower, { scale: 1.5, duration: 0.3 });
        this.cursor.classList.add('on-hover');
        this.cursorFollower.classList.add('on-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(this.cursor, { scale: 1, duration: 0.3 });
        gsap.to(this.cursorFollower, { scale: 1, duration: 0.3 });
        this.cursor.classList.remove('on-hover');
        this.cursorFollower.classList.remove('on-hover');
      });
    });
  }

  startLoadingAnimation() {
    setTimeout(() => this.finishLoading(), 1500); // Wait 1.5s
  }

  finishLoading(animate = true) {
    if (!this.loadingScreen) return;
    
    sessionStorage.setItem('hasLoaded', 'true');

    if (!animate) {
      this.loadingScreen.style.display = 'none';
      this.isLoaded = true;
      this.animatePageIn();
      return;
    }
    
    gsap.to(this.loadingScreen, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        this.loadingScreen.style.display = 'none';
        this.isLoaded = true;
        this.animatePageIn();
      }
    });
  }

  animatePageIn() {
    gsap.fromTo('.nav', {
      y: -100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    });

    this.animateHeroContent();
  }

  animateHeroContent() {
    const heroWords = document.querySelectorAll('.hero-word');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCTA = document.querySelector('.hero-cta');

    heroWords.forEach((word, index) => {
      const chars = word.textContent.split('').map(char => `<span style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      word.innerHTML = chars;
      const charElements = word.querySelectorAll('span');
      
      gsap.fromTo(charElements, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        delay: index * 0.2 + 1, // Start after loading
        ease: 'back.out(1.7)'
      });
    });

    if (heroSubtitle) {
      gsap.fromTo(heroSubtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power3.out' });
    }
    if (heroCTA) {
      gsap.fromTo(heroCTA, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.7, ease: 'power3.out' });
    }
  }

  initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    });

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      gsap.fromTo(title, { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    });
  }

  initProjectHovers() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const overlay = card.querySelector('.project-overlay');
      const img = card.querySelector('.project-img');
      if (!overlay || !img) return;

      card.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.1, duration: 0.4, ease: 'power2.out' });
        gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  setupEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => { gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out' }); });
      btn.addEventListener('mouseleave', () => { gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' }); });
    });
  }
}

// Initialize the app
new PortfolioApp(); 