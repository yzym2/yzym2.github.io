window.addEventListener('load', function() {
    setTimeout(() => {
        alert(window.t('mc.alert'));
    }, 800);
});


const files = [
    { nameKey: 'mc.f1', icon: '📦', url: 'https://pan.huang1111.cn/s/ZqN7GuL' },
    { nameKey: 'mc.f2', icon: '📥', url: 'https://pan.huang1111.cn/s/WzQVkc3' },
    { nameKey: 'mc.f3', icon: '🎮', url: 'https://pan.huang1111.cn/s/we9GxfK' },
    { nameKey: 'mc.f4', icon: '🖼️', url: 'https://pan.huang1111.cn/s/YLA3QsA' },
    { nameKey: 'mc.f5', icon: '☀️', url: 'https://pan.huang1111.cn/s/aEGznTG' },
    { nameKey: 'mc.f6', icon: '🔧', url: 'https://pan.huang1111.cn/s/VLv2ntd' },
    { nameKey: 'mc.f7', icon: '📊', url: 'https://pan.huang1111.cn/s/XqbZXUl' },
    { nameKey: 'mc.f8', icon: '🏗️', url: 'https://pan.huang1111.cn/s/DVYA5f4' }
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
