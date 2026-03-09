document.addEventListener('DOMContentLoaded', () => {
    // Bottom Nav Interaction
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('tab-active'));
            item.classList.add('tab-active');
        });
    });

    // Horizontal Scrolling functionality for smoother experience
    const horizontalScrolls = document.querySelectorAll('.banner-scroll, .horizontal-scroll, .steps-scroll');

    horizontalScrolls.forEach(scroll => {
        let isDown = false;
        let startX;
        let scrollLeft;

        scroll.addEventListener('mousedown', (e) => {
            isDown = true;
            scroll.classList.add('active');
            startX = e.pageX - scroll.offsetLeft;
            scrollLeft = scroll.scrollLeft;
        });

        scroll.addEventListener('mouseleave', () => {
            isDown = false;
            scroll.classList.remove('active');
        });

        scroll.addEventListener('mouseup', () => {
            isDown = false;
            scroll.classList.remove('active');
        });

        scroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scroll.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            scroll.scrollLeft = scrollLeft - walk;
        });
    });

    // QR floating button action
    const qrBtn = document.querySelector('.qr-float-btn');
    if (qrBtn) {
        qrBtn.addEventListener('click', () => {
            // Placeholder action for QR scanning
            console.log('QR Scanner Opened');
            qrBtn.style.transform = 'translate(-50%, 5px)';
            setTimeout(() => {
                qrBtn.style.transform = 'translate(-50%, 0)';
            }, 150);
        });
    }
});
