document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for horizontal sections
    const scrollContainers = document.querySelectorAll('.horizontal-scroll');

    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'auto';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'auto';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            container.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        container.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('touchend', () => {
            isDown = false;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // Animate items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.category-block, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    // GSAP Animations for Clickable Elements
    // Targets: Buttons (CTAs), Cards, Icons (standalone or within containers)
    const animateTargets = document.querySelectorAll(
        '.icon-btn, .btn-primary, .product-card, .nav-item, .arrow-btn, .scan-btn, .grid-item, .btn-explore-all'
    );

    animateTargets.forEach(el => {
        // Targeted sub-elements to avoid animating text
        let target = el;

        if (el.classList.contains('grid-item')) {
            target = el.querySelector('.icon-circle') || el.querySelector('.icon-box');
        } else if (el.classList.contains('nav-item')) {
            target = el.querySelector('.nav-icon') || el.querySelector('.material-symbols-rounded');
        }

        if (!target) target = el;

        const handleDown = () => {
            gsap.to(target, { scale: 0.95, duration: 0.1, ease: 'power2.inOut' });
        };

        const handleUp = () => {
            gsap.to(target, { scale: 1, duration: 0.1, ease: 'power2.inOut' });
        };

        // Click and touch support
        el.addEventListener('mousedown', handleDown);
        el.addEventListener('mouseup', handleUp);
        el.addEventListener('touchstart', handleDown);
        el.addEventListener('touchend', handleUp);
    });

    // Prevent double-tap zoom
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && !e.target.closest('button') && !e.target.closest('a')) {
                e.preventDefault();
            }
        }
        lastTouchEnd = now;
    }, false);

});
