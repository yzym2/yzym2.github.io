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
    const section = document.querySelector('.fast-start-section');
    const btn = document.getElementById('fastStartBtn');
    const dlBtn = document.getElementById('fastDownloadBtn');
    const copyBtn = document.getElementById('fastCopyBtn');
    if (!section || !btn) return;

    // 完全版方式二：下载链接（蓝奏云）
    const FULL_DOWNLOAD_URL = 'https://yzym.lanzoul.com/idFSS4f102eh';

    // 复制文本（使用 Clipboard API）
    function copyText(text, onDone) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onDone).catch(function() {});
        }
    }

    function flashCopied(el, normalText) {
        el.textContent = window.t ? window.t('index.fastcode.copied') : '已复制';
        setTimeout(function() { el.textContent = normalText; }, 1500);
    }

    // 点击“极速开始”切换展开（移动端无 hover 时使用）
    btn.addEventListener('click', function() {
        section.classList.toggle('is-open');
    });

    // 方式二：点击下载自动下载程序
    if (dlBtn) {
        dlBtn.addEventListener('click', function() {
            if (!FULL_DOWNLOAD_URL) return;
            window.open(FULL_DOWNLOAD_URL, '_blank');
        });
    }

    // 方式一：复制 PowerShell 代码
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const code = document.getElementById('fastCodeText');
            copyText(code ? code.textContent : '', function() {
                flashCopied(copyBtn, window.t ? window.t('index.fastcode.copy') : '复制');
            });
        });
    }
})();

// 极速开始：鼠标移入区域时展开 PowerShell 代码面板（document 级判定，兼容合成事件环境）
(function() {
    const section = document.querySelector('.fast-start-section');
    if (!section) return;

    document.addEventListener('mouseover', function(e) {
        if (section.contains(e.target)) {
            section.classList.add('is-open');
        } else {
            section.classList.remove('is-open');
        }
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
    const historyBtn = document.getElementById('noticeHistoryToggle');
    const historyPanel = document.getElementById('noticeHistoryPanel');

    function setHistory(open) {
        if (!historyBtn || !historyPanel) return;
        historyPanel.hidden = !open;
        historyBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        historyBtn.textContent = open ? '收起历史公告' : '查看历史公告';
    }

    function open() {
        modal.hidden = false;
        document.body.classList.add('modal-open');
    }
    function close() {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        setHistory(false);
    }
    floatBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    if (historyBtn) {
        historyBtn.addEventListener('click', function() {
            setHistory(historyPanel.hidden);
        });
    }
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
})();
