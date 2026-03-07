document.addEventListener('DOMContentLoaded', () => {
    // Speed up entrance animations for a snappier feel
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.4 } });

    // Header Icons
    tl.from('.profile-btn, .notif-btn', {
        scale: 0.5,
        opacity: 0,
        stagger: 0.05
    });

    // Hero Banner Content (Illustration & CTA)
    tl.from('.hero-illustration, .add-now-btn', {
        y: 20,
        opacity: 0,
        stagger: 0.05
    }, '-=0.35');

    // Announcement Cards
    tl.from('.announcement-card', {
        x: 30,
        opacity: 0,
        stagger: 0.03
    }, '-=0.35');

    // Quick Action Icons
    tl.from('.action-icon', {
        scale: 0.7,
        opacity: 0,
        stagger: 0.02,
        ease: 'back.out(1.2)'
    }, '-=0.35');

    // Passbook Container
    tl.from('.passbook-insights-container', {
        y: 15,
        opacity: 0
    }, '-=0.3');

    // Service Cards & Twin Cards
    tl.from('.zapp-account-box, .bills-card, .mycards-card, .service-card', {
        y: 15,
        opacity: 0,
        stagger: 0.02
    }, '-=0.3');

    // Offer Banners
    tl.from('.offer-banner', {
        x: 20,
        opacity: 0,
        stagger: 0.05
    }, '-=0.3');

    // Exclusively For You Cards
    tl.from('.exclusively-for-you-card, .exclusively-for-you-small-card', {
        scale: 0.98,
        opacity: 0,
        stagger: 0.05
    }, '-=0.3');

    // Bill Icons
    tl.from('.bill-icon', {
        scale: 0.5,
        opacity: 0,
        stagger: 0.015,
        ease: 'back.out(1.5)'
    }, '-=0.3');

    // Menu Items & Footer Pills
    tl.from('.menu-item, .action-pill-1, .action-pill-2, .action-pill-3', {
        y: 10,
        opacity: 0,
        stagger: 0.03
    }, '-=0.25');

    // Interactive Feedback (Scaling for all containers/icons/CTAs)
    const interactiveSelectors = [
        '.action-item',
        '.service-card',
        '.bill-item',
        '.menu-item',
        '.add-now-btn',
        '.announcement-card',
        '.announcement-pay-btn',
        '.view-all',
        '.action-pill-1',
        '.action-pill-2',
        '.action-pill-3',
        '.exclusively-for-you-small-card',
        '.exclusively-for-you-card',
        '.passbook-insights-container',
        '.zapp-account-box',
        '.bills-card',
        '.mycards-card',
        '.profile-btn',
        '.notif-btn',
        '.action-icon',
        '.passbook-chevron',
        '.bill-icon'
    ].join(',');

    const interactiveElements = document.querySelectorAll(interactiveSelectors);

    interactiveElements.forEach(el => {
        const scaleEffect = (scaleVal) => {
            gsap.to(el, {
                scale: scaleVal,
                duration: 0.2,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        };

        el.addEventListener('pointerdown', () => scaleEffect(0.92));
        el.addEventListener('pointerup', () => scaleEffect(1));
        el.addEventListener('pointerleave', () => scaleEffect(1));

        // No hover effect for desktop as requested
        /*
        el.addEventListener('mouseenter', () => {
            if (window.matchMedia('(hover: hover)').matches) {
                gsap.to(el, { y: -2, duration: 0.3, ease: 'power2.out' });
            }
        });
        el.addEventListener('mouseleave', () => {
            if (window.matchMedia('(hover: hover)').matches) {
                gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' });
            }
        });
        */
    });

    // Hero Banner Scroll & Dots logic
    const heroScroll = document.querySelector('.hero-scroll-container');
    const dots = document.querySelectorAll('.dot');

    if (heroScroll && dots.length > 0) {
        heroScroll.addEventListener('scroll', () => {
            const width = heroScroll.offsetWidth;
            const scrollLeft = heroScroll.scrollLeft;
            const index = Math.round(scrollLeft / width);

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // Horizontal Scroll with momentum-like feel
    const offersContainer = document.getElementById('offers-container');
    if (offersContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        offersContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - offersContainer.offsetLeft;
            scrollLeft = offersContainer.scrollLeft;
        });

        offersContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });

        offersContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        offersContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - offersContainer.offsetLeft;
            const walk = (x - startX) * 2;
            offersContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // Final Lockdown for native app feel (Mobile Only)
    // Prevent zooming on gestures
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });

    // Prevent pinch-to-zoom
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Ensure selection is absolutely blocked
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });
});
