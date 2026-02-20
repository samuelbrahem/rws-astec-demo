// Slide presentation controller
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('slideDots');
    const nav = document.querySelector('.top-nav');
    let currentSlide = 0;

    // Create navigation dots
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => {
            slides[index].scrollIntoView({ behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Intersection Observer for slide visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const index = Array.from(slides).indexOf(entry.target);
                currentSlide = index;

                // Update dots
                dots.forEach((d, i) => d.classList.toggle('active', i === index));

                // Animate slide content
                entry.target.classList.add('slide-visible');

                // Update nav appearance
                const isDark = entry.target.classList.contains('slide-understanding') ||
                               entry.target.classList.contains('slide-solutions') ||
                               entry.target.classList.contains('slide-roi') ||
                               entry.target.classList.contains('slide-strategy') ||
                               entry.target.classList.contains('slide-team') ||
                               entry.target.classList.contains('slide-next-steps') ||
                               entry.target.classList.contains('slide-value');
                nav.classList.toggle('nav-dark', isDark);
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(slide => observer.observe(slide));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentSlide < slides.length - 1) {
                slides[currentSlide + 1].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentSlide > 0) {
                slides[currentSlide - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.2 });

    // Observe animatable elements
    document.querySelectorAll('.agenda-item, .stat-bubble, .discovery-card, .solution-card, .roi-item, .strategy-pillar, .value-card, .step-item, .team-card, .collab-feature').forEach(el => {
        animateOnScroll.observe(el);
    });

    // ROI circle animations
    const roiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circles = entry.target.querySelectorAll('.roi-progress');
                circles.forEach(circle => {
                    const percent = parseInt(circle.dataset.percent);
                    const circumference = 226;
                    const offset = circumference - (percent / 100) * circumference;
                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                    }, 300);
                });
            }
        });
    }, { threshold: 0.5 });

    const roiSection = document.querySelector('.slide-roi');
    if (roiSection) roiObserver.observe(roiSection);

    // Smooth nav link scrolling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Hide scroll indicator after first scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }, { passive: true });
    }
});
