// ============================================
// STREAKER WEBSITE JAVASCRIPT
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initLoader();
    initNavigation();
    initAnimations();
    initCounters();
    initCarousel();
    initVideoModal();
    initLiveCounter();
    initScrollAnimations();
    initTiltEffect();
    initParallax();
});

// Loader
function initLoader() {
    const loader = document.getElementById('loader');

    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Number Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');

    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = counter.hasAttribute('data-decimal');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (isDecimal) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (isDecimal) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = Math.floor(target).toLocaleString();
                }
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Screenshot Carousel
function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    const items = document.querySelectorAll('.screenshot-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!carousel) return;

    let currentIndex = 0;

    function updateCarousel(index) {
        // Update active states
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Scroll to item
        const itemWidth = items[0].offsetWidth + 32; // width + gap
        carousel.scrollLeft = itemWidth * index;
    }

    // Navigation buttons
    prevBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel(currentIndex);
    });

    nextBtn?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel(currentIndex);
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    // Auto-play carousel
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel(currentIndex);
    }, 5000);
}

// Video Modal
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const watchBtn = document.getElementById('watchDemo');
    const closeBtn = document.querySelector('.modal-close');
    const video = document.getElementById('demoVideo');

    if (!modal || !watchBtn) return;

    watchBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Play video when modal opens
        if (video) video.play();
    });

    closeBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        // Pause video when modal closes
        if (video) video.pause();
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            if (video) video.pause();
        }
    });
}

// Live Counter Animation
function initLiveCounter() {
    const counter = document.getElementById('liveCounter');
    if (!counter) return;

    let count = 50432;

    // Simulate live updates
    setInterval(() => {
        const change = Math.floor(Math.random() * 10) - 3; // Random change between -3 and +6
        count = Math.max(50000, count + change); // Keep minimum at 50000
        counter.textContent = count.toLocaleString();

        // Add pulse animation
        counter.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

// Scroll Animations using GSAP
function initScrollAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.hero-title .title-line', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        delay: 0.7
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2
    });

    // Feature boxes animation
    gsap.from('.feature-box', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1
    });

    // Steps animation
    gsap.from('.step-card', {
        scrollTrigger: {
            trigger: '.how-it-works',
            start: 'top 80%',
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.2
    });

    // Achievement cards animation
    gsap.from('.achievement-card', {
        scrollTrigger: {
            trigger: '.achievements',
            start: 'top 80%',
        },
        opacity: 0,
        rotateY: 180,
        duration: 1,
        stagger: 0.1
    });

    // Progress rings animation
    const rings = document.querySelectorAll('.progress-ring');
    rings.forEach(ring => {
        const progress = ring.getAttribute('data-progress');
        const circle = ring.querySelector('.progress-ring-fill');

        if (circle) {
            const circumference = 2 * Math.PI * 25; // radius = 25
            const offset = circumference - (progress / 100) * circumference;

            gsap.to(circle, {
                scrollTrigger: {
                    trigger: ring,
                    start: 'top 80%',
                },
                strokeDashoffset: offset,
                duration: 2,
                ease: 'power2.out'
            });
        }
    });

    // Parallax effect for floating elements
    gsap.utils.toArray('.float-element').forEach(element => {
        const speed = element.getAttribute('data-speed') || 1;

        gsap.to(element, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            y: () => window.innerHeight * speed * 0.5,
            ease: 'none'
        });
    });
}

// Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Parallax Effect for Hero
function initParallax() {
    const phoneMockup = document.getElementById('phoneMockup');
    if (!phoneMockup) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;

        phoneMockup.style.transform = `perspective(1000px) rotateY(${-x}deg) rotateX(${y}deg)`;
    });
}

// Initialize AOS (Animate On Scroll) alternative
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-up animation to elements with data-aos
    document.querySelectorAll('[data-aos]').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Initialize animations
function initAnimations() {
    initAOS();

    // Animate sync lines
    const syncLines = document.querySelectorAll('.sync-line');
    syncLines.forEach(line => {
        setInterval(() => {
            line.classList.toggle('active');
        }, 2000);
    });

    // Animate feature icons on hover
    const featureIcons = document.querySelectorAll('.feature-icon-3d');
    featureIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animationPlayState = 'paused';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.animationPlayState = 'running';
        });
    });
}

// Performance optimization - lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close modal if open
        const modal = document.getElementById('videoModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        const navToggle = document.getElementById('navToggle');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add smooth reveal animation for elements
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Device-specific download handling
function initDownloadButtons() {
    const downloadBtns = document.querySelectorAll('[data-download]');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Get device type
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if (/android/i.test(userAgent)) {
                // Android device - redirect to Play Store
                window.location.href = 'https://play.google.com/store/apps/details?id=com.streaker.streaker';
            } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                // iOS device - redirect to App Store
                window.location.href = 'https://apps.apple.com/app/streaker/id123456789';
            } else {
                // Desktop - scroll to QR code
                const qrSection = document.querySelector('.qr-section');
                if (qrSection) {
                    qrSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Add highlight effect
                    qrSection.style.animation = 'pulse 1s ease-in-out 3';
                    setTimeout(() => {
                        qrSection.style.animation = '';
                    }, 3000);
                }
            }
        });
    });
}

// Initialize download buttons
initDownloadButtons();

// Add page transition effects
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Console Easter egg
console.log('%c🔥 Welcome to Streaker!', 'font-size: 24px; font-weight: bold; color: #10B981;');
console.log('%cWe\'re hiring! Join our team: careers@streaker.app', 'font-size: 14px; color: #06B6D4;');