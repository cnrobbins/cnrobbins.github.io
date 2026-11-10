// Site-wide behavior: loading screen, entrance + scroll animations, and
// in-page anchor scrolling. GSAP and ScrollTrigger load from the CDN in
// Layout.astro and are used here as globals.

const NAV_OFFSET = 100; // px; keeps anchor targets clear of the fixed nav

class PortfolioApp {
  constructor() {
    this.loadingScreen = null;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.initThemeToggle();
    this.initVideos();
    this.initScrollAnimations();
    this.setupEventListeners();

    // The loading screen plays once per browser session.
    if (sessionStorage.getItem('hasLoaded')) {
      this.finishLoading(false);
      this.scheduleScrollToHash();
    } else {
      setTimeout(() => this.finishLoading(), 800);
    }
  }

  /**
   * Dark-mode toggle. The initial theme is set before first paint by the inline
   * script in Layout.astro; this handles clicks and remembers the choice.
   */
  initThemeToggle() {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return; // palette without dark mode

    const root = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    const apply = (theme) => {
      root.dataset.theme = theme;
      if (meta?.dataset[theme]) meta.content = meta.dataset[theme];
    };
    const saved = () => {
      try { return localStorage.getItem('theme'); } catch { return null; }
    };

    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch { /* private mode: not remembered */ }
    });

    // Until the visitor picks a theme, follow live changes to the system setting.
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!saved()) apply(e.matches ? 'dark' : 'light');
    });
  }

  /**
   * Muted looping videos (video[data-lazy-autoplay]) play only while on screen,
   * and load nothing until then (preload="none"). Visitors who prefer reduced
   * motion get player controls instead of autoplay.
   */
  initVideos() {
    const videos = document.querySelectorAll('video[data-lazy-autoplay]');
    if (!videos.length) return;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videos.forEach((video) => { video.controls = true; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target: video, isIntersecting }) => {
        if (isIntersecting) {
          video.play().catch(() => { video.controls = true; }); // autoplay blocked: let the visitor start it
        } else {
          video.pause();
        }
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach((video) => observer.observe(video));
  }

  finishLoading(animate = true) {
    if (!this.loadingScreen) return;

    sessionStorage.setItem('hasLoaded', 'true');

    if (!animate) {
      this.loadingScreen.style.display = 'none';
      this.animatePageIn();
      return;
    }

    gsap.to(this.loadingScreen, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        this.loadingScreen.style.display = 'none';
        this.animatePageIn();
        this.scheduleScrollToHash();
      },
    });
  }

  animatePageIn() {
    gsap.fromTo('.nav', { y: -100, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      // Scroll again in case the nav animation's reflow reset the position.
      onComplete: () => this.scrollToHash(),
    });

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      gsap.fromTo(heroSubtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power3.out' });
    }
  }

  /** Run scrollToHash after layout is ready (avoids a wrong position when called too early). */
  scheduleScrollToHash() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.scrollToHash());
    });
  }

  /** Scroll to an element, accounting for the fixed nav height. */
  scrollToElement(el, behavior = 'smooth') {
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, left: 0, behavior });
  }

  /** Scroll to the URL hash target on load (e.g. /projects#current-work). */
  scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;
    this.scrollToElement(document.getElementById(hash.slice(1)), 'auto');
  }

  initScrollAnimations() {
    document.querySelectorAll('.fade-in').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    });

    document.querySelectorAll('.section-title').forEach((title) => {
      gsap.fromTo(title, { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    });
  }

  setupEventListeners() {
    // Smooth-scroll links that point to a hash on the current page (e.g. /#about
    // while already on the homepage). Links to other pages, mailto:, and external
    // URLs fall through to default behavior.
    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const url = new URL(anchor.getAttribute('href'), window.location.href);
        if (url.pathname !== window.location.pathname || !url.hash) return;
        const el = document.getElementById(url.hash.slice(1));
        if (!el) return;
        e.preventDefault();
        history.pushState(null, '', url.hash);
        this.scrollToElement(el);
      });
    });
  }
}

new PortfolioApp();
