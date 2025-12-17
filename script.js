// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// Callback for intersection observer
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Optionally unobserve after revealing
            // observer.unobserve(entry.target);
        }
    });
};

// Create observer instance
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all elements with reveal classes
const revealElements = document.querySelectorAll(
    '.reveal-text, .reveal-section, .reveal-grid-item'
);

revealElements.forEach(element => {
    observer.observe(element);
});

// ===================================
// STAGGERED GRID ANIMATION
// ===================================

const gridItems = document.querySelectorAll('.reveal-grid-item');

const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
            gridObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

gridItems.forEach(item => {
    gridObserver.observe(item);
});

// ===================================
// NAVIGATION SCROLL EFFECT
// ===================================

let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Add smooth transition to nav
nav.style.transition = 'transform 0.3s ease-in-out';

// ===================================
// PARALLAX EFFECT ON IMAGES
// ===================================

const parallaxImages = document.querySelectorAll('.featured-image img, .grid-image img');

window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = rect.top / window.innerHeight;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const translateY = scrollPercent * 50;
            img.style.transform = `scale(1.1) translateY(${translateY}px)`;
        }
    });
});

// ===================================
// CURSOR CUSTOM EFFECT (OPTIONAL)
// ===================================

const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, .grid-item, .featured-item');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
};

// Optional: Uncomment to enable custom cursor
// createCursorEffect();

// ===================================
// PAGE LOAD ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity for smooth fade in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===================================
// LAZY LOADING IMAGES
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// SMOOTH SCROLL BEHAVIOR ENHANCEMENT
// ===================================

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.scrollBehavior = 'auto';
}

// ===================================
// SCROLL PROGRESS INDICATOR (OPTIONAL)
// ===================================

const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Optional: Uncomment to enable scroll progress bar
// createScrollProgress();

// ===================================
// FEATURED WORK REVEAL ON HOVER
// ===================================

const featuredItems = document.querySelectorAll('.featured-item');

featuredItems.forEach(item => {
    const image = item.querySelector('.featured-image img');

    item.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// ===================================
// GRID ITEM TILT EFFECT (SUBTLE)
// ===================================

const addTiltEffect = () => {
    const items = document.querySelectorAll('.grid-item');

    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
};

// Initialize tilt effect
addTiltEffect();

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c Designed with precision and passion ', 'background: #0a0a0a; color: #ffffff; padding: 10px 20px; font-size: 14px;');
console.log('%c Portfolio 2025 ', 'background: #f5f5f5; color: #0a0a0a; padding: 10px 20px; font-size: 12px;');
