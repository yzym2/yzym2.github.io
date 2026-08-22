(function() {
    const toggleBtn = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || ((new Date().getHours() >= 6 && new Date().getHours() < 18) ? 'light' : 'dark');
    html.setAttribute('data-theme', savedTheme);

    toggleBtn.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    });
})();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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

    const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-card, nav a, .theme-toggle, .lang-toggle, .btn-fast-start');
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

(function() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(function(el) { el.classList.add('is-visible'); });
        return;
    }
    const io = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(function(el) { io.observe(el); });
})();

(function() {
    const btn = document.getElementById('fastStartBtn');
    if (!btn) return;

    btn.addEventListener('click', function() {
        window.open('https://pan.huang1111.cn/s/P6y8XTm', '_blank');
    });
})();

// 意见反馈表单 —— 通过 Web3Forms 转发到邮箱
// 步骤：1. 到 https://web3forms.com 用邮箱注册，获取 Access Key
//       2. 把 KEY 填入下方常量即可启用（替换 REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY）
(function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    const hint = document.getElementById('feedbackHint');
    const ta = form.querySelector('textarea');
    const KEY = '1b9155a5-7e8d-41fa-8a28-f577cc936219';

    function tip(msg) {
        if (!hint) return;
        hint.textContent = msg;
        clearTimeout(tip._t);
        tip._t = setTimeout(function() { hint.textContent = ''; }, 3200);
    }

    // 预设问题仅作提示展示，点击不填入；用户直接在下方输入框填写

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const content = ta ? ta.value.trim() : '';
        if (!content) {
            tip(window.t ? window.t('index.feedback.empty') : '请至少填写一项内容');
            return;
        }
        const data = {
            access_key: KEY,
            subject: '意见反馈（渊之鱼冥下载站）',
            '反馈内容': content
        };
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(function(res) { return res.json(); })
        .then(function(r) {
            if (r && r.success) {
                tip(window.t ? window.t('index.feedback.thanks') : '感谢你的反馈！');
                form.reset();
            } else {
                tip(window.t ? window.t('index.feedback.fail') : '提交失败，请稍后重试');
            }
        })
        .catch(function() {
            tip(window.t ? window.t('index.feedback.fail') : '提交失败，请稍后重试');
        });
    });
})();

// 浮动公告：点击弹出详情
(function() {
    const floatBtn = document.getElementById('noticeFloat');
    const modal = document.getElementById('noticeModal');
    if (!floatBtn || !modal) return;
    const closeBtn = document.getElementById('noticeModalClose');
    const backdrop = document.getElementById('noticeModalBackdrop');
    function open() { modal.hidden = false; }
    function close() { modal.hidden = true; }
    floatBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
})();
