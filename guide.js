(function() {
    'use strict';

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

        const hoverTargets = document.querySelectorAll('a, button, .back-home-btn, .lang-toggle, .toc a');
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

    const content = document.getElementById('contentWrapper');
    const tocList = document.getElementById('tocList');
    const headings = content.querySelectorAll('h2, h3, h4');

    headings.forEach(function(h) {
        if (!h.id) {
            let raw = h.textContent.trim();
            let id = raw.replace(/[^a-zA-Z0-9一-龥]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            if (!id) id = 'section-' + Math.random().toString(36).slice(2, 8);
            h.id = id;
        }
    });

    let tocHTML = '';
    headings.forEach(function(h) {
        const level = h.tagName.toLowerCase();
        const text = h.textContent.trim();
        const id = h.id;
        let liClass = 'level-' + level;
        tocHTML += '<li><a href="#' + id + '" class="' + liClass + '" data-target="' + id + '">' + text + '</a></li>';
    });
    tocList.innerHTML = tocHTML;

    function updateTOCText() {
        tocList.querySelectorAll('a').forEach(function(link) {
            const targetId = link.getAttribute('data-target');
            const heading = document.getElementById(targetId);
            if (heading) {
                link.textContent = heading.textContent.trim();
            }
        });
    }
    if (window.onLangChange) window.onLangChange(updateTOCText);

    const tocLinks = tocList.querySelectorAll('a');
    const allHeadings = content.querySelectorAll('h2, h3, h4');

    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const offset = 20;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
                updateActiveLink(targetId);
            }
        });
    });

    function updateActiveLink(activeId) {
        tocLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === activeId) {
                link.classList.add('active');
                link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        });
    }

    let scrollTimeout = null;
    function getVisibleHeading() {
        let minDist = Infinity;
        let closest = null;
        const scrollY = window.pageYOffset + 80;
        allHeadings.forEach(function(h) {
            const rect = h.getBoundingClientRect();
            const top = rect.top + window.pageYOffset;
            const dist = Math.abs(top - scrollY);
            if (dist < minDist) {
                minDist = dist;
                closest = h;
            }
        });
        if (minDist > 300) return null;
        return closest;
    }
    function onScroll() {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            const visible = getVisibleHeading();
            if (visible) {
                updateActiveLink(visible.id);
            }
        }, 80);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    setTimeout(function() {
        const firstHeading = allHeadings[0];
        if (firstHeading) {
            updateActiveLink(firstHeading.id);
        }
    }, 100);

    console.log('✅ 新手引导页面加载完成');
})();
