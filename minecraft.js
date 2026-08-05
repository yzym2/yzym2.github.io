window.addEventListener('load', function() {
    setTimeout(() => {
        alert(window.t('mc.alert'));
    }, 800);
});

const toggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

toggleBtn.addEventListener('click', function() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

(function() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    const glow = document.getElementById('cursorGlow');

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
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
        glow.style.left = mouseX + 'px';
        glow.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = outlineX - 20 + 'px';
        outline.style.top = outlineY - 20 + 'px';
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const hoverTargets = document.querySelectorAll('a, button, .back-btn, .theme-toggle, .lang-toggle, .file-item, .download-btn, .guide-btn');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hover'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
    });

    document.addEventListener('mousedown', () => {
        dot.style.transform = 'scale(0.5)';
        outline.style.transform = 'scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
        dot.style.transform = 'scale(1)';
        outline.style.transform = 'scale(1)';
    });
})();

const files = [
    { nameKey: 'mc.f1', icon: '📦', url: 'https://pan.huang1111.cn/s/byL59iY' },
    { nameKey: 'mc.f2', icon: '📥', url: 'https://pan.huang1111.cn/s/QzQgbcm' },
    { nameKey: 'mc.f3', icon: '🎮', url: 'https://pan.huang1111.cn/s/we9GxfK' },
    { nameKey: 'mc.f4', icon: '🖼️', url: 'https://pan.huang1111.cn/s/YLA3QsA' },
    { nameKey: 'mc.f5', icon: '☀️', url: 'https://pan.huang1111.cn/s/aEGznTG' },
    { nameKey: 'mc.f6', icon: '🔧', url: 'https://pan.huang1111.cn/s/VLv2ntd' },
    { nameKey: 'mc.f7', icon: '📊', url: 'https://pan.huang1111.cn/s/XqbZXUl' },
    { nameKey: 'mc.f8', icon: '🏗️', url: 'https://pan.huang1111.cn/s/DVYA5f4' },
    { nameKey: 'mc.f9', icon: '🧵', url: 'https://pan.huang1111.cn/s/6el76SN' }
];

const fileListEl = document.getElementById('fileList');

function renderFiles() {
    fileListEl.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        li.className = 'file-item';
        li.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${file.icon}</div>
                <div class="file-name">${window.t(file.nameKey)}</div>
            </div>
            <a class="download-btn" href="${file.url}" target="_blank">${window.t('common.dl')}</a>
        `;
        fileListEl.appendChild(li);
    });
}

renderFiles();
if (window.onLangChange) window.onLangChange(renderFiles);
