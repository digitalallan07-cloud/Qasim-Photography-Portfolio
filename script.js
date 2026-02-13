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
// INDUSTRY FILTER FUNCTIONALITY
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const industrySections = document.querySelectorAll('.industry-section');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value
        const filter = button.getAttribute('data-filter');

        // Show/hide sections based on filter
        industrySections.forEach(section => {
            const industry = section.getAttribute('data-industry');

            if (filter === 'all') {
                section.classList.remove('hidden');
                section.style.display = 'block';
            } else if (filter === industry) {
                section.classList.remove('hidden');
                section.style.display = 'block';
            } else {
                section.classList.add('hidden');
                section.style.display = 'none';
            }
        });

        // Re-trigger scroll animations for visible items
        setTimeout(() => {
            observeVisibleElements();
        }, 100);
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
        }
    });
};

// Create observer instance
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Function to observe all reveal elements
function observeVisibleElements() {
    const revealElements = document.querySelectorAll(
        '.reveal-text, .reveal-section, .reveal-grid-item'
    );

    revealElements.forEach(element => {
        // Check if element is visible (not in hidden section)
        const parent = element.closest('.industry-section');
        if (!parent || !parent.classList.contains('hidden')) {
            observer.observe(element);
        }
    });
}

// Initial observation
observeVisibleElements();

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
            }, index * 80);
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
// VIDEO PLAY/PAUSE FUNCTIONALITY
// ===================================

// Handle video click to play/pause
const videoWrappers = document.querySelectorAll('.video-wrapper, .reel-wrapper');

videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');

    if (video) {
        wrapper.addEventListener('click', (e) => {
            e.preventDefault();

            if (video.paused) {
                // Pause all other videos
                document.querySelectorAll('video').forEach(v => {
                    if (v !== video) {
                        v.pause();
                        v.muted = true;
                        v.currentTime = 0;
                        v.closest('.video-wrapper, .reel-wrapper').classList.remove('playing');
                    }
                });

                // On mobile, start muted first then unmute after play succeeds
                video.muted = true;
                video.play().then(() => {
                    video.muted = false;
                    video.volume = 1;
                    wrapper.classList.add('playing');
                }).catch(() => {
                    // If muted autoplay also fails, try loading the video first
                    video.load();
                    video.muted = true;
                    video.play().then(() => {
                        video.muted = false;
                        video.volume = 1;
                        wrapper.classList.add('playing');
                    }).catch(() => {});
                });
            } else {
                video.pause();
                video.muted = true;
                wrapper.classList.remove('playing');
            }
        });

        // Reset play icon when video ends
        video.addEventListener('ended', () => {
            wrapper.classList.remove('playing');
            video.muted = true;
            video.currentTime = 0;
        });
    }
});

// ===================================
// VIDEO PREVIEW ON HOVER
// ===================================

videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    let hoverTimeout;

    if (video) {
        wrapper.addEventListener('mouseenter', () => {
            // Start playing after a brief delay
            hoverTimeout = setTimeout(() => {
                if (video.paused && !wrapper.classList.contains('playing')) {
                    video.muted = true;
                    video.play().catch(() => {
                        // Autoplay prevented, do nothing
                    });
                }
            }, 300);
        });

        wrapper.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            // Pause preview if not actively playing
            if (!wrapper.classList.contains('playing')) {
                video.pause();
                video.currentTime = 0;
            }
        });
    }
});

// ===================================
// IMAGE LIGHTBOX FUNCTIONALITY
// ===================================

// Create lightbox HTML structure
const createLightbox = () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">‹</button>
            <button class="lightbox-next">›</button>
            <img src="" alt="" class="lightbox-image">
        </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
};

const lightbox = createLightbox();
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

let currentImageIndex = 0;
let allImages = [];

// Get all clickable images (not video posters)
const initializeLightbox = () => {
    const mediaItems = document.querySelectorAll('.media-item');
    allImages = [];

    mediaItems.forEach((item, index) => {
        const img = item.querySelector('.media-wrapper img');
        const video = item.querySelector('.media-wrapper video');

        // Only add images, not videos
        if (img && !video) {
            allImages.push(img);

            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentImageIndex = allImages.indexOf(img);
                openLightbox(img.src);
            });
        }
    });
};

const openLightbox = (src) => {
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    lightboxImage.src = allImages[currentImageIndex].src;
};

const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    lightboxImage.src = allImages[currentImageIndex].src;
};

// Event listeners for lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', showNextImage);
lightboxPrev.addEventListener('click', showPrevImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});

// Initialize lightbox
initializeLightbox();

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

const parallaxImages = document.querySelectorAll('.media-wrapper img');

window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = rect.top / window.innerHeight;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const translateY = scrollPercent * 30;
            img.style.transform = `translateY(${translateY}px) scale(1.1)`;
        }
    });
});

// ===================================
// MEDIA ITEM TILT EFFECT
// ===================================

const addTiltEffect = () => {
    const items = document.querySelectorAll('.media-item, .reel-item');

    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            const wrapper = item.querySelector('.media-wrapper, .reel-wrapper');
            if (wrapper) {
                wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            const wrapper = item.querySelector('.media-wrapper, .reel-wrapper');
            if (wrapper) {
                wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    });
};

// Initialize tilt effect
addTiltEffect();

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
// LAZY LOADING IMAGES AND VIDEOS
// ===================================

if ('IntersectionObserver' in window) {
    const mediaObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const media = entry.target;

                if (media.tagName === 'IMG') {
                    media.src = media.dataset.src || media.src;
                    media.classList.add('loaded');
                } else if (media.tagName === 'VIDEO') {
                    const source = media.querySelector('source');
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        media.load();
                    }
                    media.classList.add('loaded');
                }

                mediaObserver.unobserve(media);
            }
        });
    });

    const allMedia = document.querySelectorAll('img, video');
    allMedia.forEach(media => mediaObserver.observe(media));
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
// ACTIVE SECTION TRACKING
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// VIDEO VOLUME CONTROL
// ===================================

// Mute all videos by default
document.querySelectorAll('video').forEach(video => {
    video.muted = true;
    video.volume = 0;
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Pause videos that are not in viewport to save resources
const videoPerformanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        const wrapper = video.closest('.video-wrapper, .reel-wrapper');

        if (!entry.isIntersecting && !wrapper.classList.contains('playing')) {
            video.pause();
            video.currentTime = 0;
        }
    });
}, {
    threshold: 0,
    rootMargin: '100px'
});

document.querySelectorAll('video').forEach(video => {
    videoPerformanceObserver.observe(video);
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c Qasim Saidi Photography ', 'background: #0a0a0a; color: #ffffff; padding: 10px 20px; font-size: 14px;');
console.log('%c Fashion • Jewelry • Product Still Life ', 'background: #f5f5f5; color: #0a0a0a; padding: 10px 20px; font-size: 12px;');
