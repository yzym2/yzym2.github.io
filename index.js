// ========== 明暗主题切换 ==========
(function() {
    const toggleBtn = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    toggleBtn.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    });
})();

// ========== 平滑锚点滚动 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== 导航滚动毛玻璃 ==========
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== 自定义光标 + 动态光效 ==========
(function() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    const glow = document.getElementById('cursorGlow');

    // 检测是否为触摸设备
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        dot.style.display = 'none';
        outline.style.display = 'none';
        glow.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // 小圆点直接跟随
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';

        // 光效跟随
        glow.style.left = mouseX + 'px';
        glow.style.top = mouseY + 'px';
    });

    // 外圈平滑跟随
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = outlineX - 20 + 'px';
        outline.style.top = outlineY - 20 + 'px';
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // 悬停效果
    const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-card, nav a, .theme-toggle, .lang-toggle, .btn-fast-start');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hover'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
    });

    // 点击效果
    document.addEventListener('mousedown', () => {
        dot.style.transform = 'scale(0.5)';
        outline.style.transform = 'scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
        dot.style.transform = 'scale(1)';
        outline.style.transform = 'scale(1)';
    });
})();

// ========== 卡片 3D 倾斜动态响应 ==========
(function() {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(function(card) {
        const inner = card.querySelector('.tilt-inner');
        if (!inner) return;
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            inner.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        });
        card.addEventListener('mouseleave', function() {
            inner.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
        });
    });
})();

// ========== 极速开始下载 ==========
(function() {
    const btn = document.getElementById('fastStartBtn');
    if (!btn) return;

    btn.addEventListener('click', function() {
        window.open('https://pan.huang1111.cn/s/5X7xqUl', '_blank');
    });
})();