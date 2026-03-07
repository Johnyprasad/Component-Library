// Simple touch feedback animation exactly like normal mobile native apps
document.querySelectorAll('.action-btn, .other-card-bg').forEach(element => {
    element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.97)';
        element.style.opacity = '0.9';
    }, { passive: true });

    const resetStyle = () => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    };

    element.addEventListener('touchend', resetStyle);
    element.addEventListener('touchcancel', resetStyle);
});


