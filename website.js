(function() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    const glow = document.getElementById('cursorGlow');

    if (!dot || !outline || !glow) return;

    const isTouchDevice = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        dot.style.display = 'none';
        outline.style.display = 'none';
        glow.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
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

    document.querySelectorAll('a, button, .mc-select, .mirror-option').forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            outline.classList.add('hover');
        });
        element.addEventListener('mouseleave', function() {
            outline.classList.remove('hover');
        });
    });

    document.addEventListener('mousedown', function() {
        dot.style.transform = 'scale(0.5)';
        outline.style.transform = 'scale(0.8)';
    });
    document.addEventListener('mouseup', function() {
        dot.style.transform = 'scale(1)';
        outline.style.transform = 'scale(1)';
    });
})();

const sites = [
    { nameKey: 'web.s1', url: 'https://pan.huang1111.cn' },
    { nameKey: 'web.s2', url: 'https://yun.123pan.cn' },
    { nameKey: 'web.s3', url: 'https://www.lanzoui.com' }
];

const fileList = document.getElementById('fileList');
if (fileList) {
    function renderSites() {
        fileList.replaceChildren();
        sites.forEach(function(site) {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = site.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.dataset.i18n = site.nameKey;
            link.textContent = window.t ? window.t(site.nameKey) : site.nameKey;
            item.appendChild(link);
            fileList.appendChild(item);
        });
    }

    renderSites();
    if (window.onLangChange) window.onLangChange(renderSites);
}

const standardVersions = [
    { value: '1.8.8', label: '1.8.8' },
    { value: '1.8.8wasm', label: '1.8.8 WASM' },
    { value: '1.12.2', label: '1.12.2' },
    { value: '1.12.2wasm', label: '1.12.2 WASM' }
];

const betaVersions = [
    { value: '1.13.2', label: '1.13.2 WASM' },
    { value: '1.14.4', label: '1.14.4 WASM' },
    { value: '1.16.5', label: '1.16.5 WASM' },
    { value: '1.20.6', label: '1.20.6 WASM' },
    { value: '26.2', label: '26.2 WASM' },
    { value: '26.3', label: '26.3 WASM' }
];

const optimizedMirrors = [
    { number: 11, baseUrl: 'https://1.mcjslink.144449.xyz' },
    { number: 12, baseUrl: 'https://2.mcjslink.144449.xyz' },
    { number: 13, baseUrl: 'https://3.mcjslink.144449.xyz' },
    { number: 14, baseUrl: 'https://4.mcjslink.144449.xyz' },
    { number: 15, baseUrl: 'https://5.mcjslink.144449.xyz' },
    { number: 16, baseUrl: 'https://6.mcjslink.144449.xyz' },
    { number: 17, baseUrl: 'https://7.mcjslink.144449.xyz' },
    { number: 1, baseUrl: 'https://playmcjscc.pages.dev' },
    { number: 2, baseUrl: 'https://play.mcjs.144449.xyz' },
    { number: 5, baseUrl: 'https://mcjs-mirror.144449.xyz' },
    { number: 6, baseUrl: 'https://mcjs-mirror-test.144449.xyz' }
];

const betaMirrors = [
    { number: 1, baseUrl: 'https://mcjs.144449.xyz' },
    { number: 2, baseUrl: 'https://mcjs-beta.144449.xyz' }
];

const mcSite = document.getElementById('mcSite');
const mcVersion = document.getElementById('mcVersion');
const mcGoButton = document.getElementById('mcGoBtn');
const mirrorModal = document.getElementById('mirrorModal');
const mirrorOptions = document.getElementById('mirrorOptions');
const mirrorCancel = document.getElementById('mirrorCancel');
const mirrorConfirm = document.getElementById('mirrorConfirm');

let pendingMirrors = [];
let pendingVersion = '';
let previouslyFocusedElement = null;

function updateVersions() {
    if (!mcSite || !mcVersion) return;

    const availableVersions = mcSite.value === 'mcjs-beta' ? betaVersions : standardVersions;
    const selectedVersion = mcVersion.value;
    mcVersion.replaceChildren();

    availableVersions.forEach(function(version) {
        const option = document.createElement('option');
        option.value = version.value;
        option.textContent = version.label;
        mcVersion.appendChild(option);
    });

    if (availableVersions.some(function(version) {
        return version.value === selectedVersion;
    })) {
        mcVersion.value = selectedVersion;
    }
}

function hideMirrorModal() {
    if (!mirrorModal) return;
    mirrorModal.classList.remove('show');
    mirrorModal.setAttribute('aria-hidden', 'true');
    pendingMirrors = [];
    pendingVersion = '';

    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
    }
    previouslyFocusedElement = null;
}

function showMirrorModal(mirrors, version, mirrorLabelKey) {
    if (!mirrorModal || !mirrorOptions || mirrors.length === 0) return;

    pendingMirrors = mirrors;
    pendingVersion = version;
    previouslyFocusedElement = document.activeElement;
    mirrorOptions.replaceChildren();

    mirrors.forEach(function(mirror, index) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const description = document.createElement('span');
        const host = new URL(mirror.baseUrl).host;

        label.className = 'mirror-option';
        input.type = 'radio';
        input.name = 'mirror';
        input.value = String(index);
        input.checked = index === 0;
        description.className = 'mirror-label';
        const mirrorLabel = window.t ? window.t(mirrorLabelKey) : 'Mirror';
        description.textContent = mirrorLabel + ' ' + mirror.number + ' (' + host + ')';

        label.appendChild(input);
        label.appendChild(description);
        mirrorOptions.appendChild(label);
    });

    mirrorModal.classList.add('show');
    mirrorModal.setAttribute('aria-hidden', 'false');
    const firstOption = mirrorOptions.querySelector('input[name="mirror"]');
    if (firstOption) firstOption.focus();
}

function openUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

if (mcSite && mcVersion) {
    updateVersions();
    mcSite.addEventListener('change', updateVersions);
}

if (mirrorCancel) {
    mirrorCancel.addEventListener('click', hideMirrorModal);
}

if (mirrorModal) {
    mirrorModal.addEventListener('click', function(event) {
        if (event.target === mirrorModal) hideMirrorModal();
    });
}

if (mirrorConfirm) {
    mirrorConfirm.addEventListener('click', function() {
        const selectedOption = mirrorOptions && mirrorOptions.querySelector('input[name="mirror"]:checked');
        const selectedMirror = selectedOption && pendingMirrors[Number(selectedOption.value)];

        if (selectedMirror && pendingVersion) {
            openUrl(selectedMirror.baseUrl + '/' + pendingVersion);
        }
        hideMirrorModal();
    });
}

document.addEventListener('keydown', function(event) {
    if (!mirrorModal || !mirrorModal.classList.contains('show')) return;

    if (event.key === 'Escape') {
        hideMirrorModal();
        return;
    }

    if (event.key !== 'Tab') return;
    const focusableElements = mirrorModal.querySelectorAll('input:not(:disabled), button:not(:disabled)');
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
});

if (mcGoButton && mcSite && mcVersion) {
    mcGoButton.addEventListener('click', function() {
        const site = mcSite.value;
        const version = mcVersion.value;
        const availableVersions = site === 'mcjs-beta' ? betaVersions : standardVersions;

        if (!availableVersions.some(function(option) {
            return option.value === version;
        })) {
            if (window.t) window.alert(window.t('web.alert.nocfg'));
            return;
        }

        if (site === 'mcjs-mirror') {
            showMirrorModal(optimizedMirrors, version, 'web.mirror.number');
        } else if (site === 'eagler') {
            openUrl('https://eaglercraft.ir/zh/play/' + version);
        } else if (site === 'mcjs-beta') {
            showMirrorModal(betaMirrors, version, 'web.mirror.beta');
        } else if (window.t) {
            window.alert(window.t('web.alert.nocfg'));
        }
    });
}
