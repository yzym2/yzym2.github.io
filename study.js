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

    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX - 4 + 'px';
        dot.style.top = e.clientY - 4 + 'px';
        outline.style.left = e.clientX + 'px';
        outline.style.top = e.clientY + 'px';
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    const hoverTargets = document.querySelectorAll('a, button, .back-btn, .lang-toggle, .file-item, .download-btn');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hover'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
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

const files = [
    { nameKey: 'study.f1', icon: '📚', url: 'https://pan.huang1111.cn/s/75EEjhg' }
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
            <span class="dl-actions">
                <button type="button" class="dl-btn dl-copy" data-url="${file.url}" title="${window.t('common.copy')}" aria-label="${window.t('common.copy')}"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
                <a class="dl-btn" href="${file.url}" target="_blank" title="${window.t('common.dl')}" aria-label="${window.t('common.dl')}"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg></a>
            </span>
        `;
        fileListEl.appendChild(li);
    });
}

renderFiles();
if (window.onLangChange) window.onLangChange(renderFiles);
