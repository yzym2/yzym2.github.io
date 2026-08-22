const toggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || ((new Date().getHours() >= 6 && new Date().getHours() < 18) ? 'light' : 'dark');
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

    const HOVER_SEL = 'a, button, .back-btn, .theme-toggle, .lang-toggle, .file-item, .dl-btn, .av-select, .av-search-input, .av-playlist-item';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(HOVER_SEL)) outline.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(HOVER_SEL)) outline.classList.remove('hover');
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

let songs = [];
let activeTag = '';
let azMode = 'zh';

const CATEGORY_KEYS = {
    '纯音乐': 'av.cat.pure',
    '英语': 'av.cat.en',
    '国语': 'av.cat.mandarin',
    '日语': 'av.cat.ja',
    '俄语': 'av.cat.ru',
    '葡萄牙语': 'av.cat.pt',
    '粤语': 'av.cat.cantonese'
};

const PY_INIT = {
    '一':'Y','七':'Q','万':'W','上':'S','下':'X','不':'B','丑':'C','世':'S','东':'D','亲':'Q',
    '人':'R','伤':'S','伪':'W','伯':'B','你':'N','修':'X','倒':'D','偏':'P','像':'X','光':'G',
    '兰':'L','关':'G','再':'Z','凄':'Q','凡':'F','凤':'F','刀':'D','刚':'G','剑':'J','勇':'Y',
    '勋':'X','匆':'C','化':'H','十':'S','千':'Q','半':'B','卡':'K','去':'Q','反':'F','发':'F',
    '句':'J','只':'Z','可':'K','后':'H','听':'T','告':'G','和':'H','咖':'K','唯':'W','四':'S',
    '土':'T','城':'C','夏':'X','外':'W','多':'D','夜':'Y','大':'D','天':'T','太':'T','失':'S',
    '奔':'B','套':'T','奢':'S','如':'R','姑':'G','孤':'G','宁':'N','寂':'J','富':'F','对':'D',
    '小':'X','少':'S','就':'J','左':'Z','平':'P','年':'N','当':'D','微':'W','快':'K','怒':'N',
    '恋':'L','悬':'X','感':'G','愿':'Y','成':'C','我':'W','手':'S','护':'H','挪':'N','搁':'G',
    '改':'G','断':'D','无':'W','日':'R','早':'Z','明':'M','星':'X','春':'C','晴':'Q','暖':'N',
    '暮':'M','曹':'C','曾':'Z','最':'Z','月':'Y','有':'Y','朋':'P','本':'B','李':'L','来':'L',
    '枫':'F','桃':'T','桥':'Q','梦':'M','欧':'O','水':'S','江':'J','沉':'C','沙':'S','泡':'P',
    '活':'H','浪':'L','海':'H','消':'X','涛':'T','淋':'L','清':'Q','游':'Y','漂':'P','演':'Y',
    '潇':'X','火':'H','烟':'Y','燕':'Y','爱':'A','父':'F','特':'T','狂':'K','琵':'P','璀':'C',
    '甜':'T','生':'S','痴':'C','白':'B','皇':'H','盗':'D','相':'X','真':'Z','破':'P','离':'L',
    '秋':'Q','秒':'M','稻':'D','童':'T','笑':'X','笼':'L','篇':'P','红':'H','绽':'Z','绿':'L',
    '膨':'P','自':'Z','芒':'M','花':'H','若':'R','荣':'R','荷':'H','莫':'M','萱':'X','落':'L',
    '蓝':'L','虚':'X','虞':'Y','西':'X','触':'C','让':'R','讲':'J','说':'S','谪':'Z','贝':'B',
    '起':'Q','越':'Y','跳':'T','踏':'T','辞':'C','还':'H','这':'Z','远':'Y','追':'Z','送':'S',
    '逆':'N','遇':'Y','那':'N','野':'Y','阳':'Y','阿':'A','隐':'Y','雨':'Y','雪':'X','青':'Q',
    '风':'F','飞':'F','骄':'J','鬼':'G','麻':'M','黄':'H'
};

const KANA_INIT = (function() {
    const rows = [
        ['あいうえお', 'A'], ['かきくけこ', 'K'], ['がぎぐげご', 'G'],
        ['さしすせそ', 'S'], ['ざじずぜぞ', 'Z'], ['たちつてと', 'T'], ['だぢづでど', 'D'],
        ['なにぬねの', 'N'], ['はひふへほ', 'H'], ['ばびぶべぼ', 'B'], ['ぱぴぷぺぽ', 'P'],
        ['まみむめも', 'M'], ['やゆよ', 'Y'], ['ゃゅょ', 'Y'], ['らりるれろ', 'R'], ['わをん', 'W']
    ];
    const map = {};
    rows.forEach(function(r) { r[0].split('').forEach(function(ch) { map[ch] = r[1]; }); });
    Object.keys(map).forEach(function(h) {
        map[String.fromCharCode(h.charCodeAt(0) + 0x60)] = map[h];
    });
    map['し'] = 'S'; map['ジ'] = 'J'; map['じ'] = 'J';
    map['ち'] = 'C'; map['チ'] = 'C';
    map['つ'] = 'T'; map['ツ'] = 'T';
    map['ふ'] = 'F'; map['フ'] = 'F';
    return map;
})();

const JA_READINGS = {
    '老人と海': 'ろうじんとうみ',
    '鳥の詩': 'とりのうた',
    '青空': 'あおぞら',
    '悪魔の子': 'あくまのこ',
    '光るなら': 'ひかるなら'
};

const AZ_LANGS = { zh: ['国语', '粤语'], en: ['英语'], ja: ['日语'] };

const ARTIST_SHORT = {
    '孙楠_韩红_黄绮珊_古巨基_陈楚生_王心凌_谭维维_胡彦斌_郁可唯_汪苏泷_周深_宋亚轩_杨坤_单依纯_何炅_李莎旻子': '孙楠/韩红等合唱'
};
function artistLabel(a) { return ARTIST_SHORT[a] || a; }

function kanaFirst(s) {
    for (let i = 0; i < s.length; i++) {
        if (KANA_INIT[s[i]]) return KANA_INIT[s[i]];
    }
    return '';
}
function latinFirst(s) {
    const m = s.match(/[A-Za-z]/);
    return m ? m[0].toUpperCase() : '';
}
function initialOf(song, mode) {
    if (mode === 'zh') {
        const c = song.title[0];
        if (/[A-Za-z]/.test(c)) return c.toUpperCase();
        return PY_INIT[c] || '#';
    }
    if (mode === 'en') {
        return latinFirst(song.title) || '#';
    }
    let rd = JA_READINGS[song.title];
    if (!rd) {
        for (const k in JA_READINGS) {
            if (song.title.indexOf(k) === 0) { rd = JA_READINGS[k]; break; }
        }
    }
    if (rd) return KANA_INIT[rd[0]] || '#';
    return kanaFirst(song.title) || latinFirst(song.title) || kanaFirst(song.artist) || '#';
}

const searchEl = document.getElementById('avSearch');
const categoryEl = document.getElementById('avCategory');
const artistEl = document.getElementById('avArtist');
const listEl = document.getElementById('avList');
const countEl = document.getElementById('avCount');
const emptyEl = document.getElementById('avEmpty');
const playlistsEl = document.getElementById('avPlaylists');
const azLangEl = document.getElementById('avAzLang');
const azLettersEl = document.getElementById('avAzLetters');

function catLabel(lang) {
    const key = CATEGORY_KEYS[lang];
    return key ? window.t(key) : lang;
}

function buildPlaylists() {
    const tags = {};
    songs.forEach(s => (s.tags || []).forEach(t => { tags[t] = (tags[t] || 0) + 1; }));
    const names = Object.keys(tags).sort((a, b) => tags[b] - tags[a] || a.localeCompare(b, 'zh'));

    playlistsEl.innerHTML = '';
    const mk = function(val, label, n) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'av-playlist-item' + (val === activeTag ? ' active' : '');
        b.innerHTML = '<span>' + escapeHtml(label) + '</span><span class="n">' + n + '</span>';
        b.addEventListener('click', function() {
            activeTag = val;
            buildPlaylists();
            render();
        });
        playlistsEl.appendChild(b);
    };
    mk('', window.t('av.playlist.all'), songs.length);
    names.forEach(n => mk(n, n, tags[n]));
}

function buildOptions() {
    const prevCat = categoryEl.value;
    const prevArtist = artistEl.value;

    const cats = {};
    songs.forEach(s => { cats[s.language] = (cats[s.language] || 0) + 1; });
    const catNames = Object.keys(cats).sort();

    const allCat = window.t('av.all');
    categoryEl.innerHTML = '<option value="">' + allCat + '</option>';
    catNames.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = catLabel(c) + ' (' + cats[c] + ')';
        categoryEl.appendChild(opt);
    });

    const artists = {};
    songs.forEach(s => { artists[s.artist] = (artists[s.artist] || 0) + 1; });
    const hot = Object.keys(artists)
        .filter(a => artists[a] >= 5)
        .sort((a, b) => artists[b] - artists[a] || a.localeCompare(b, 'zh'));
    const others = Object.keys(artists)
        .filter(a => artists[a] < 5)
        .sort((a, b) => a.localeCompare(b, 'zh'));

    const allArtist = window.t('av.artist.all');
    artistEl.innerHTML = '<option value="">' + allArtist + '</option>';

    function fillGroup(label, list) {
        if (!list.length) return;
        const og = document.createElement('optgroup');
        og.label = label;
        list.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a;
            opt.textContent = artistLabel(a) + ' (' + artists[a] + ')';
            og.appendChild(opt);
        });
        artistEl.appendChild(og);
    }
    if (hot.length) fillGroup(window.t('av.hot.artists'), hot);
    fillGroup(window.t('av.artists.other'), others);

    categoryEl.value = prevCat;
    artistEl.value = prevArtist;
}

function buildAz() {
    azLettersEl.innerHTML = '';
    const letters = ['#'].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    letters.forEach(l => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'av-az-letter';
        b.dataset.l = l;
        b.textContent = l;
        b.addEventListener('click', function() { jumpTo(l); });
        azLettersEl.appendChild(b);
    });
}

function jumpTo(letter) {
    const langs = AZ_LANGS[azMode];
    let target = null, ti = -1;
    for (let i = 0; i < songs.length; i++) {
        const s = songs[i];
        if (langs.indexOf(s.language) > -1 && initialOf(s, azMode) === letter) { target = s; ti = i; break; }
    }
    if (!target) {
        const btn = azLettersEl.querySelector('[data-l="' + letter + '"]');
        if (btn) { btn.classList.remove('miss'); void btn.offsetWidth; btn.classList.add('miss'); }
        return;
    }
    searchEl.value = '';
    artistEl.value = '';
    if (activeTag !== '') { activeTag = ''; buildPlaylists(); }
    categoryEl.value = target.language;
    render();

    const li = listEl.querySelector('[data-idx="' + ti + '"]');
    if (li) {
        li.scrollIntoView({ behavior: 'smooth', block: 'center' });
        li.classList.add('av-jump-flash');
        setTimeout(() => li.classList.remove('av-jump-flash'), 1600);
    }
}

azLangEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
        azMode = btn.dataset.mode;
        azLangEl.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
        const thumb = azLangEl.querySelector('.av-az-thumb');
        if (thumb) {
            const idx = ['zh', 'en', 'ja'].indexOf(azMode);
            if (idx > -1) thumb.style.transform = 'translateY(' + (idx * 26) + 'px)';
        }
    });
});

const SVG_COPY = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const SVG_DL = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';

function render() {
    const keyword = searchEl.value.trim().toLowerCase();
    const cat = categoryEl.value;
    const artist = artistEl.value;

    const filtered = songs.filter(s => {
        if (cat && s.language !== cat) return false;
        if (artist && s.artist !== artist) return false;
        if (activeTag && (s.tags || []).indexOf(activeTag) === -1) return false;
        if (keyword) {
            const hay = (s.title + ' ' + s.artist).toLowerCase();
            if (hay.indexOf(keyword) === -1) return false;
        }
        return true;
    });

    const playlistName = activeTag ? activeTag : window.t('av.playlist.all');
    countEl.textContent = window.t('av.playlist.current') + '：' + playlistName + ' · ' + window.t('av.count').replace('{n}', filtered.length);

    listEl.innerHTML = '';
    emptyEl.style.display = filtered.length ? 'none' : 'block';

    const copyTitle = window.t('common.copy');
    const dlTitle = window.t('av.download');

    filtered.forEach(s => {
        const li = document.createElement('li');
        li.className = 'file-item av-item';
        li.dataset.idx = songs.indexOf(s);
        const tags = (s.tags || []).map(t => '<span class="av-tag">' + escapeHtml(t) + '</span>').join('');
        li.innerHTML = `
            <div class="file-info">
                <div class="file-icon av-music-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 18V5l12-2v13"/>
                        <circle cx="6" cy="18" r="3"/>
                        <circle cx="18" cy="16" r="3"/>
                    </svg>
                </div>
                <div class="av-meta">
                    <div class="file-name">${escapeHtml(s.title)}</div>
                    <div class="av-artist">${escapeHtml(s.artist)}</div>
                    <div class="av-tags">${tags}<span class="av-tag av-era">${escapeHtml(s.era || '')}</span></div>
                </div>
            </div>
            <span class="dl-actions">
                <button type="button" class="dl-btn dl-copy" data-url="${escapeHtml(s.url)}" title="${copyTitle}" aria-label="${copyTitle}">${SVG_COPY}</button>
                <a class="dl-btn" href="${escapeHtml(s.url)}" target="_blank" title="${dlTitle}" aria-label="${dlTitle}">${SVG_DL}</a>
            </span>
        `;
        listEl.appendChild(li);
    });
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function(c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

function refreshPlaceholder() {
    searchEl.setAttribute('placeholder', window.t('av.search.placeholder'));
}

searchEl.addEventListener('input', render);
categoryEl.addEventListener('change', render);
artistEl.addEventListener('change', render);

if (window.onLangChange) {
    window.onLangChange(function() {
        buildOptions();
        buildPlaylists();
        refreshPlaceholder();
        render();
    });
}

buildAz();

fetch('songsInfo.json')
    .then(function(res) { return res.ok ? res.json() : Promise.reject(new Error('HTTP ' + res.status)); })
    .then(function(data) {
        songs = data.songs || [];
        buildOptions();
        buildPlaylists();
        refreshPlaceholder();
        render();
    })
    .catch(function(err) {
        listEl.innerHTML = '';
        emptyEl.removeAttribute('data-i18n');
        if (location.protocol === 'file:') {
            emptyEl.textContent = '歌曲数据加载失败：请通过本地服务器（如 http://localhost）或线上站点访问本页 / Failed to load songs: please open this page via a local server or the online site.';
        } else {
            emptyEl.textContent = '歌曲数据加载失败 / Failed to load songs: ' + err.message;
        }
        emptyEl.style.display = 'block';
        console.error(err);
    });
