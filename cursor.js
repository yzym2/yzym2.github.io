/* 全站通用自定义光标（页面通过 body[data-cursor-hover] 指定可悬停元素） */
(function () {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    const glow = document.getElementById('cursorGlow');
    if (!dot || !outline || !glow) return;

    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        dot.style.display = 'none';
        outline.style.display = 'none';
        glow.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX - 4 + 'px';
        dot.style.top = e.clientY - 4 + 'px';
        outline.style.left = e.clientX + 'px';
        outline.style.top = e.clientY + 'px';
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    const hoverSelector = document.body.getAttribute('data-cursor-hover') || 'a, button';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelector)) outline.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
        const from = e.target.closest(hoverSelector);
        if (!from) return;
        if (e.relatedTarget && from.contains(e.relatedTarget)) return;
        outline.classList.remove('hover');
    });

    document.addEventListener('mousedown', () => {
        dot.style.transform = 'scale(0.5)';
        outline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
        dot.style.transform = 'scale(1)';
        outline.style.transform = 'translate(-50%, -50%)';
    });
})();
