// 页面加载完成
window.addEventListener('load', function() {
    setTimeout(() => {
        console.log("常用网站导航页加载完成");
    }, 800);
});

// ========== 主题切换功能 ==========
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

// ========== 自定义光标 + 动态光效 ==========
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

    const hoverTargets = document.querySelectorAll('a, button, .back-btn, .theme-toggle, .lang-toggle, .file-item, .download-btn, .go-btn, .mc-select, .mirror-option, .mirror-cancel, .mirror-confirm');
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

// ========== 网站列表 ==========
const sites = [
    { nameKey: 'web.s1', icon: '☁️', url: 'https://pan.huang1111.cn' },
    { nameKey: 'web.s2', icon: '💾', url: 'https://123pan.com' }
];

const fileListEl = document.getElementById('fileList');

function renderSites() {
    fileListEl.innerHTML = '';
    sites.forEach(site => {
        const li = document.createElement('li');
        li.className = 'file-item';
        li.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${site.icon}</div>
                <div class="file-name">${window.t(site.nameKey)}</div>
            </div>
            <a class="download-btn" href="${site.url}" target="_blank">${window.t('web.visit')}</a>
        `;
        fileListEl.appendChild(li);
    });
}

renderSites();
if (window.onLangChange) window.onLangChange(renderSites);

// ========== Minecraft 网页版 URL 映射 ==========
const mcjsUrls = {
    '1.8.8': {
        main: 'https://play.mcjs.cc/1.8.8',
        mirror1: 'https://playmcjscc.pages.dev/1.8.8',
        mirror2: 'https://play.mcjs.144449.xyz/1.8.8',
        mirror3: 'https://ipv6.mcjs.cc/1.8.8'
    },
    '1.8.8wasm': {
        main: 'https://play.mcjs.cc/1.8.8wasm',
        mirror1: 'https://playmcjscc.pages.dev/1.8.8wasm',
        mirror2: 'https://play.mcjs.144449.xyz/1.8.8wasm',
        mirror3: 'https://ipv6.mcjs.cc/1.8.8wasm'
    },
    '1.12.2': {
        main: 'https://play.mcjs.cc/1.12.2',
        mirror1: 'https://playmcjscc.pages.dev/1.12.2',
        mirror2: 'https://play.mcjs.144449.xyz/1.12.2',
        mirror3: 'https://ipv6.mcjs.cc/1.12.2'
    },
    '1.12.2wasm': {
        main: 'https://play.mcjs.cc/1.12.2wasm',
        mirror1: 'https://playmcjscc.pages.dev/1.12.2wasm',
        mirror2: 'https://play.mcjs.144449.xyz/1.12.2wasm',
        mirror3: 'https://ipv6.mcjs.cc/1.12.2wasm'
    }
};

// eaglercraft.ir 的 URL
const eaglerUrls = {
    '1.8.8': 'https://eaglercraft.ir/zh/play/1.8.8',
    '1.12.2': 'https://eaglercraft.ir/zh/play/1.12.2',
    '1.8.8wasm': 'https://eaglercraft.ir/zh/play/1.8.8wasm',
    '1.12.2wasm': 'https://eaglercraft.ir/zh/play/1.12.2wasm'
};

// 1.20 版 URL
const mc120Urls = {
    wasm: 'https://eaglercraft.dev/clients/EaglyMC%201.20%20WASM/index.html',
    js: 'https://eaglercraft.dev/clients/EaglyMC%201.20%20JS/index.html'
};

// ========== 镜像站弹窗 ==========
const mirrorModal = document.getElementById('mirrorModal');
const mirrorCancel = document.getElementById('mirrorCancel');
const mirrorConfirm = document.getElementById('mirrorConfirm');
let pendingMcjsUrl = null;

function showMirrorModal(urls) {
    pendingMcjsUrl = urls;
    document.querySelector('input[name="mirror"][value="main"]').checked = true;
    mirrorModal.classList.add('show');
}

function hideMirrorModal() {
    mirrorModal.classList.remove('show');
    pendingMcjsUrl = null;
}

mirrorCancel.addEventListener('click', hideMirrorModal);

mirrorModal.addEventListener('click', function(e) {
    if (e.target === mirrorModal) {
        hideMirrorModal();
    }
});

mirrorConfirm.addEventListener('click', function() {
    if (!pendingMcjsUrl) return;
    const selected = document.querySelector('input[name="mirror"]:checked');
    const mirrorKey = selected ? selected.value : 'main';
    const url = pendingMcjsUrl[mirrorKey];
    if (url) {
        window.open(url, '_blank');
    }
    hideMirrorModal();
});

// ========== 前往游玩按钮 ==========
document.getElementById('mcGoBtn').addEventListener('click', function() {
    const site = document.getElementById('mcSite').value;
    const version = document.getElementById('mcVersion').value;

    if (site === 'mcjs') {
        const urls = mcjsUrls[version];
        if (urls && urls.main) {
            showMirrorModal(urls);
        } else {
            alert(window.t('web.alert.nocfg'));
        }
    } else {
        const url = eaglerUrls[version];
        if (url) {
            window.open(url, '_blank');
        } else {
            alert(window.t('web.alert.noeagler'));
        }
    }
});

document.getElementById('mc120Btn').addEventListener('click', function() {
    const type = document.getElementById('mc120Type').value;
    const url = mc120Urls[type];
    if (url) {
        window.open(url, '_blank');
    } else {
        alert(window.t('web.alert.nomc120'));
    }
});