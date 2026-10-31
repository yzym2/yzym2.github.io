(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
.lang-toggle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    color: var(--text-primary);
    cursor: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
}
.lang-toggle:hover {
    transform: scale(1.1);
    border-color: var(--accent-white);
}
.lang-toggle:active {
    transform: scale(0.95);
}
.lang-toggle svg {
    width: 20px;
    height: 20px;
}

.lang-toggle.fixed {
    position: fixed;
    top: 20px;
    right: 74px;
    z-index: 999;
}

header .lang-toggle {
    position: relative;
}
.header-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-shrink: 0;
}

.lang-dropdown {
    position: fixed;
    background: var(--glass-bg);
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 6px;
    min-width: 150px;
    z-index: 10000;
    display: none;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    animation: langFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.lang-dropdown.show {
    display: block;
}
@keyframes langFadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
}
.lang-dropdown-item {
    padding: 10px 16px;
    border-radius: 8px;
    cursor: none;
    font-size: 14px;
    color: var(--text-primary);
    transition: background 0.2s, opacity 0.2s;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
}
.lang-dropdown-item:hover {
    background: var(--glass-border);
}
.lang-dropdown-item .lang-flag {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    display: block;
    box-shadow: 0 0 0 1px var(--glass-border);
}
.lang-dropdown-item .lang-flag svg {
    width: 100%;
    height: 100%;
    display: block;
}
.lang-dropdown-item .lang-name {
    flex: 1;
}
.lang-dropdown-item .check {
    font-size: 14px;
    opacity: 0;
    color: var(--accent-white);
}
.lang-dropdown-item.active .check {
    opacity: 0.9;
}
`;
    document.head.appendChild(style);

    const LANGS = ['zh-CN', 'zh-TW', 'en'];
    const LANG_ATTRS = { 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'en': 'en' };
    const LANG_SHORT = { 'zh-CN': '簡', 'zh-TW': '繁', 'en': 'EN' };
    const LANG_NAMES = { 'zh-CN': '简体中文', 'zh-TW': '繁體中文', 'en': 'English' };
    const FLAG_CN = '<span class="lang-flag">'
        + '<svg viewBox="0 0 30 30" preserveAspectRatio="xMidYMid slice">'
        + '<rect width="30" height="30" fill="#de2910"/>'
        + '<polygon points="6,5 7.2,8.7 11,8.7 7.9,11 9.1,14.7 6,12.3 2.9,14.7 4.1,11 1,8.7 4.8,8.7" fill="#ffde00"/>'
        + '<circle cx="12" cy="3" r="0.9" fill="#ffde00"/>'
        + '<circle cx="14" cy="6" r="0.9" fill="#ffde00"/>'
        + '<circle cx="14" cy="10" r="0.9" fill="#ffde00"/>'
        + '<circle cx="12" cy="13" r="0.9" fill="#ffde00"/>'
        + '</svg></span>';
    const FLAG_EN = '<span class="lang-flag">'
        + '<svg viewBox="0 0 30 30" preserveAspectRatio="xMidYMid slice">'
        + '<rect width="30" height="30" fill="#012169"/>'
        + '<path d="M0,0 L30,30 M30,0 L0,30" stroke="#ffffff" stroke-width="6"/>'
        + '<path d="M0,0 L30,30 M30,0 L0,30" stroke="#c8102e" stroke-width="3"/>'
        + '<path d="M15,0 L15,30 M0,15 L30,15" stroke="#ffffff" stroke-width="10"/>'
        + '<path d="M15,0 L15,30 M0,15 L30,15" stroke="#c8102e" stroke-width="6"/>'
        + '</svg></span>';
    const LANG_FLAGS = { 'zh-CN': FLAG_CN, 'zh-TW': FLAG_CN, 'en': FLAG_EN };

    const I18N = {
        'zh-CN': {

            'common.back': '← 返回首页',
            'common.dl': '下载',
            'common.copy': '复制链接',
            'common.copied': '已复制',
            'common.tip.copy': '点击复制链接',
            'common.tip.dl': '点击下载',
            'common.toast.copied': '链接已复制到剪贴板',
            'index.contact.email': '邮箱',
            'index.feedback.title': '意见反馈',
            'index.feedback.desc': '你的每一条反馈都会帮助网站变得更好，感谢支持！',
            'index.feedback.q1': '你希望添加哪些歌曲？',
            'index.feedback.q2': '你遇到了哪些 bug？',
            'index.feedback.q3': '你希望新增什么内容？',
            'index.feedback.placeholder': '请写下你的反馈或建议…',
            'index.feedback.submit': '提交反馈',
            'index.feedback.thanks': '感谢你的反馈！',
            'index.feedback.empty': '请至少填写一项内容',
            'index.feedback.fail': '提交失败，请稍后重试',

            'index.logo': '渊之鱼冥下载站',
            'index.nav.home': '首页',
            'index.nav.mc': 'Minecraft 专区',
            'index.nav.study': '学习资源',
            'index.nav.web': '网址导航',
            'index.nav.av': '影音',
            'index.nav.guide': '新手引导',
            'index.nav.about': '关于本站',
            'index.notice': '<svg class="notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l15-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/><line x1="2" y1="6" x2="2" y2="18"/></svg>\n<span><strong>下载器全新升级！</strong> 网址导航新增多个实用网站！</span>',
            'index.notice.title': '公告',
            'index.title': '渊之鱼冥文件下载站',
            'index.subhead': '—— 专为校园信息课与游戏爱好者准备 ——',
            'index.intro1': '欢迎来到 <strong>渊之鱼冥</strong> 的个人文件仓库！本站专注收录各类实用资源，核心为 <strong>Minecraft 游戏资源</strong>，同时涵盖常用工具、扩展包及校园信息课必备软件。',
            'index.intro2': '所有文件均经过精心整理，适配学校机房环境（无音频、轻量化、免安装），无需登录即可高速下载，让您的信息课体验更流畅、更自由。',
            'index.intro3': '👇 点击下方<strong>「极速开始」</strong>按钮，下载自动下载程序吧！',
            'index.faststart': '极速开始',
            'index.fastcode.m1': '方式一',
            'index.fastcode.m2': '方式二',
            'index.fastcode.tip': '按住 Win+X，再按 I 打开 PowerShell，复制粘贴以下代码并运行即可',
            'index.fastcode.copy': '复制',
            'index.fastcode.copied': '已复制',
            'index.fastdownload': '点击下载 自动下载程序(Specified).exe',
            'index.btn.mc': 'Minecraft 相关',
            'index.btn.study': '学习资源',
            'index.btn.web': '网址导航',
            'index.btn.av': '影音',
            'index.footer': '© 2026 YuanZhiYuMing · 站点由 <a href="https://pages.github.com/" target="_blank">Github Pages</a> 驱动',

            'index.about.title': '关于本站',
            'index.about.card1.title': '关于本网页',
            'index.about.card1.text': '本网页是 yuanzhiyuming.github.io，是 GitHub 账户 YuanZhiYuMing 的 GitHub Pages。网页采用毛玻璃设计，简约美观。',
            'index.about.card2.title': 'Minecraft 板块',
            'index.about.card2.text': '将信息课启动 Minecraft 所要用到的全部文件进行整合，包含极域控制、多线程下载、Minecraft 游戏和资源包，专门为 SHSSIP 的信息课设计。',
            'index.about.card3.title': '学习资源',
            'index.about.card3.text': '点击“学习资源”，这里分享了 2026 初高中苏州用新教材的电子档，免费无偿分享，欢迎大家下载。',
            'index.about.card4.title': '网址导航',
            'index.about.card4.text': '包含了一些常用网站，如 huang1111 网盘、123 网盘、蓝奏云等（持续更新中），以及 Minecraft 网页版（mcjs.link、eaglercraft.ir 和多个镜像站），一个访问不上就换另一个试试。此外还有 HTML 小游戏合集，包括休闲益智、动作反应、策略经典等多种类型，Crazygames 平台首选。',
            'index.about.card5.title': '极速开始',
            'index.about.card5.text': '近期更新了“极速开始”功能，点击下载自动下载程序，运行即可开始多线程下载，速度更快。本软件目前处于测试阶段，欢迎反馈问题。仅支持 Windows 系统，下载特定资源：Minecraft 1.21.11 精简版。',
            'index.about.card6.title': '备用网站 & 联系',
            'index.about.card6.text': '若 github.io 不能访问请访问我的备用网站：https://yzym.netlify.app （更新不一定及时）。作者 QQ：3860517347，微信：stardragon142857',
            'index.about.card7.title': '影音',
            'index.about.card7.text': '点击“影音”，这里收录了精选歌曲，支持按歌曲名/歌手搜索，并可筛选类别（语种）和歌手，随时畅听下载；影视板块收录了《我的世界大电影》。',

            'mc.title': 'Minecraft 1.21.11 资源下载',
            'mc.subtitle': '专为学校信息课打造',
            'mc.guide': '新手引导',
            'mc.alert': '如果您第一次来到此网站，请务必阅读新手引导',
            'mc.f1': 'Survival-Minecraft-Tiny-OL-Fabric.7z(普通整合包)',
            'mc.f2': 'AutoParseDownloader(自动解析下载器)',
            'mc.f3': 'JiYuTrainer(极域管理程序)',
            'mc.f4': 'Resourcepacks(资源包)',
            'mc.f5': 'Shaderpacks(光影包)',
            'mc.f6': 'Mods(模组)',
            'mc.f7': 'Datapacks(数据包)',
            'mc.f8': 'BUILDING_hmcl_1.21.11.exe(建筑党整合包)',

            'study.title': '学习资源下载',
            'study.subtitle': '专为校园学习准备',
            'study.f1': '2026初高中新教材',

            'web.title': '常用网站导航',
            'web.subtitle': '精选实用网站，一键直达',
            'web.section': 'Minecraft 网页版',
            'web.label.site': '选择站点：',
            'web.label.version': '选择版本：',
            'web.mcjs.official': 'MCJS 官网',
            'web.mcjs.eagler': 'eaglercraft.ir',
            'web.mirror.number': '镜像站',
            'web.mirror.beta': '高版本镜像站',
            'web.go': '前往游玩',
            'web.visit': '前往访问',
            'web.mirror.title': '选择访问节点',
            'web.mirror.desc': '主站若无法访问请尝试镜像站',
            'web.mirror.main': '主站',
            'web.mirror.m1': '镜像站 1',
            'web.mirror.m2': '镜像站 2',
            'web.mirror.m3': '镜像站 3 (IPv6)',
            'web.mirror.cancel': '取消',
            'web.mirror.confirm': '前往游玩',
            'web.alert.nocfg': '该选项的网址尚未配置。',
            'web.alert.noeagler': 'eaglercraft.ir 的网址尚未配置。',
            'web.s1': 'huang1111 网盘',
            'web.s2': '123 网盘',
            'web.s3': '蓝奏云',
            'web.cloud': '云盘',
            'web.tools': '工具',
            'web.tools.fydrop': 'fyDrop 局域网文件传输',
            'web.mctools': 'Minecraft 工具',
            'web.mctools.chunkbase': 'ChunkBase 种子与结构定位工具',
            'web.mctools.mcsearch': 'MinecraftSearch 百科与种子地图',

            'av.title': '影视/歌曲下载',
            'av.subtitle': '精选歌曲 539 首',
            'av.movie.title': '影视',
            'av.search.placeholder': '搜索歌曲 / 歌手...',
            'av.filter.category': '类别',
            'av.filter.artist': '歌手',
            'av.all': '全部',
            'av.artist.all': '全部歌手',
            'av.count': '共 {n} 首歌曲',
            'av.result.empty': '没有找到匹配的歌曲',
            'av.download': '下载',
            'av.download.all': '下载全部',
            'av.download.folder': '下载文件夹',
            'av.download.zip': '下载.zip',
            'av.download.lyrics': '下载歌词',
            'av.faq.title': '提示',
            'av.faq.q1': 'Q1：想在线收听怎么办？',
            'av.faq.a1': 'A：点击下载全部，选择下载文件夹，在这个huang1111网盘链接页面可以预览所有歌曲并收听。',
            'av.faq.q2': 'Q2：为什么有些歌曲链接无法查看？',
            'av.faq.a2': 'A：可能蓝奏云将该歌曲封禁了，因为版权方不允许。如遇此类情况，请及时于首页反馈该曲目名称。您可以暂时在下载全部中选择下载文件夹，在页面中选择曲目下载。',
            'av.faq.q3': 'Q3：电影为什么要付费下载？',
            'av.faq.a3': 'A：下载123云盘客户端即可免费下载，不要花冤枉钱！但是每月只有10GB提取流量，只够下一部电影的哦。',
            'av.music.title': '音乐',
            'av.playlist.title': '歌单',
            'av.playlist.all': '全部歌曲',
            'av.playlist.current': '当前歌单',
            'av.hot.artists': '热门歌手',
            'av.artists.other': '其他歌手',
            'av.az.title': '首字母跳转',
            'av.az.zh': '中',
            'av.az.en': '英',
            'av.az.ja': '日',
            'av.cat.pure': '纯音乐',
            'av.cat.en': '英语',
            'av.cat.mandarin': '国语',
            'av.cat.ja': '日语',
            'av.cat.ru': '俄语',
            'av.cat.pt': '葡萄牙语',
            'av.cat.cantonese': '粤语',
            'web.game': '小游戏合集',
            'web.game.open': '开放小游戏平台',
            'web.game.crazy': 'Crazygames',
            'web.game.milkyfrog': '奶蛙游戏合集',
            'web.game.html5games': 'HTML5 Games 集合',
            'web.game.js13k': 'js13kGames 大赛作品',
            'web.game.casual': '休闲益智类',
            'web.game.2048': '2048 经典版',
            'web.game.doge2048': '2048 Doge 版',
            'web.game.solitaire': '纸牌接龙 Solitaire',
            'web.game.sudoku': '数独 Sudoku',
            'web.game.action': '动作/反应类',
            'web.game.pacman': '吃豆人 Pacman',
            'web.game.dino': '恐龙游戏 Dino Runner',
            'web.game.strategy': '策略/经典游戏',
            'web.game.chess': '国际象棋',
            'web.game.tictactoe': '井字棋 TicTacToe',
            'web.game.fun': '趣味与创新小游戏',
            'web.game.hexgl': '未来赛车 HexGL',
            'web.game.linerider': '画轨道 Line Rider',

            'guide.back': '← 返回上一级',
            'guide.home': '返回首页',
            'guide.toc': '大纲',
            'guide.title': '新手引导',
            'guide.h2.read': '1. 阅读悉知',
            'guide.h3.intro': '1.1. 介绍',
            'guide.h4.jyt': '1.1.1. 关于 JiYuTrainer',
            'guide.h4.mc': '1.1.2. 关于 Minecraft 整合包',
            'guide.h4.mod': '1.1.3. 关于模组',
            'guide.h4.resourcepack': '1.1.4. 关于资源包/光影包/数据包',
            'guide.h4.huang': '1.1.5. 关于 huang1111 网盘',
            'guide.mod.p1': '考虑到网络连接问题，于是上线模组资源下载。',
            'guide.mod.p2': '以下列举了新上线的精选模组：',
            'guide.mod.p3': '你说要模组的功能以及关系（必选/可选的支持库）吗，只能上 <a href="https://modrinth.com" target="_blank">modrinth</a> / <a href="https://www.curseforge.com" target="_blank">curseforge</a> 去查找了，不过这些模组的兼容性无须担忧哈~',
            'guide.mod.p4': '好消息是：你直接在 HMCL 上看不就行了……',
            'guide.rp.p1': '考虑到网络连接问题，于是上线资源包/光影包/数据包资源下载。',
            'guide.rp.p2': '以下列举了新上线的精选资源包：',
            'guide.rp.p3': '以下列举了新上线的精选光影包：',
            'guide.rp.p4': '以下列举了新上线的精选数据包：',
            'guide.mod.appleskin': 'AppleSkin (苹果皮)',
            'guide.mod.craftingtweaks': 'Crafting Tweaks (合成辅助)',
            'guide.mod.ferritecore': 'FerriteCore (铁氧体磁芯)',
            'guide.mod.jade': 'Jade (玉)',
            'guide.mod.jechars': 'Just Enough Characters (通用拼音搜索)',
            'guide.mod.jei': 'Just Enough Items (JEI物品管理器)',
            'guide.mod.journeymap': 'Journeymap (旅行地图)',
            'guide.mod.lambdynamiclights': 'LambDynamicLights (Lambd的动态光源)',
            'guide.mod.litematica': 'Litematica (投影)',
            'guide.mod.lithium': 'Lithium (锂)',
            'guide.mod.minihud': 'MiniHUD (迷你HUD)',
            'guide.mod.modmenu': 'Mod Menu (模组菜单)',
            'guide.mod.mousetweaks': 'Mouse Tweaks (鼠标手势)',
            'guide.mod.nochatreports': 'No Chat Reports (禁用聊天举报)',
            'guide.mod.notenoughanimations': 'NotEnoughAnimations (更多动画)',
            'guide.mod.placeholderapi': 'Placeholder API (文本占位符 API)',
            'guide.mod.reesesodium': "Reese's Sodium Options (Reese的钠视频界面)",
            'guide.mod.replaymod': 'Replay Mod (录像回放)',
            'guide.mod.sodiumextra': 'Sodium Extra (钠 · 扩展)',
            'guide.mod.sodium': 'Sodium (钠)',
            'guide.mod.veinminer': 'Veinminer (连锁采矿/矿脉矿工)',
            'guide.mod.worldedit': 'WorldEdit (创世神)',
            'guide.rp.fullbright': 'Fullbright UB（全亮）',
            'guide.rp.xkredstone': 'XK Redstone Display（XK红显）',
            'guide.rp.xray': 'Xray Ultimate（矿透）',
            'guide.rp.protecteyes': 'Protect Your Eyes（护眼大补丸）',
            'guide.rp.iterationt': 'iterationT 3.2.0（性能开销较大）',
            'guide.rp.tpa': 'TPA（传送）',
            'guide.h2.download': '2. 下载安装 &amp; 使用步骤',
            'guide.h3.dlsteps': '2.1. 下载步骤',
            'guide.h4.virus': '2.1.1. 报毒的解决方法',
            'guide.h3.usesteps': '2.2. 使用步骤',
            'guide.h4.jytuse': '2.2.1. JiYuTrainer 的使用步骤',
            'guide.h4.gamestart': '2.2.2. 游戏启动步骤',
            'guide.h4.resource': '2.2.3. 如何加载资源包',
            'guide.h4.datapack': '2.2.4 如何加载数据包',
            'guide.h3.upload': '2.3. 如何上传世界',
            'guide.h3.loadworld': '2.4. 如何加载世界',
            'guide.h3.server': '2.5. 如何加入服务器',
            'guide.h2.thanks': '3. 鸣谢',

            'guide.intro.skip': '你可以阅读本章，这对你有很大帮助。当然你也可以直接跳转到<strong>下载安装&amp;使用步骤</strong>那里。',
            'guide.jyt.p1': 'JiYuTrainer 是 imengyu（快乐的梦鱼）在 github 上的一个开源项目（<a href="https://github.com/imengyu/JiYuTrainer" target="_blank">https://github.com/imengyu/JiYuTrainer</a>）。',
            'guide.jyt.intro': '以下是原网页介绍（已停止更新）：',
            'guide.jyt.q1': '本软件研发目的就是为了对抗极域电子教室，如果您的学校机房使用极域电子教室来控制学生电脑的话，本软件很可能会帮到你。',
            'guide.jyt.q2': '讲师讲课无聊啰嗦缓慢？想自己试试操作，却被老师全屏广播控制，什么都不能干？拔掉网线后虽然自由了但是又看不到老师的演示了？',
            'guide.jyt.q3': '如果你被以上问题困扰，本软件可能是您非常想要的。',
            'guide.jyt.q4': '这是一个可以使 <strong>极域电子教室全屏广播失效</strong> 的软件，也就是说，在被老师全屏广播时，会将其自动调整为窗口模式，你不仅可以自由操作电脑，也还可以看老师的演示，自由+学习两不误，这不是很爽的事情吗？其还可以防止被老师控制（有点狠），以及自动关闭 "黑屏安静" 这种东西；由于本软件是将全屏调整为窗口，因此老师并不会发现你断线或是进行了非法操作。',
            'guide.jyt.q5': '如果你喜欢这个软件，不妨向你的好友推荐一下吧！',
            'guide.jyt.q6': '如果你觉得这个软件不错，不妨加个小星星⭐吧，你的喜欢是对我最大的支持！',
            'guide.jyt.features': '<strong>功能：</strong>',
            'guide.jyt.f1': '在不影响极域正常运行的情况下将 全屏的广播 转为 窗口广播 模式，您不仅可自己操作，也可看老师讲解课程。',
            'guide.jyt.f2': '内置强杀、启停极域 StudentMain.exe 进程功能，无需依赖其他软件。',
            'guide.jyt.f3': '内置破解极域解锁卸载密码功能，支持新版极域。',
            'guide.jyt.f4': '反监视功能，经测试，开启反监视，教师端就无法监视您所用的电脑。',
            'guide.jyt.f5': '防控制功能，防止教师通过极域控制您所用的电脑。',
            'guide.jyt.f6': '监控极域远程执行命令，您可以自由选择是否允许教师端远程执行的命令。',
            'guide.jyt.f7': '通过极域电子教室对同学的电脑远程发送信息或远程执行命令。',
            'guide.jyt.tip': '<strong>提示：</strong>由于本软件会对极域电子教室进行必要的操作（远程注入、替换模块），某些杀毒软件可能会报毒，您可能需要关闭杀毒软件或添加白名单。',
            'guide.jyt.usage': '<strong>操作方法：</strong>',
            'guide.jyt.usage.p': '本软件专为小白设计，默认情况下，您不需要修改任何参数，直接运行 exe，并最小化即可，软件会自动进行操作。',
            'guide.jyt.addition': '<strong>附加说明：</strong>本软件不依赖任何运行库，您只需复制一个 JiYuTrainer.exe 至目标电脑即可运行，本软件已将需要的 DLL 打包，它会自动进行安装。',
            'guide.mc.p1': '嗯……这里并不介绍 Minecraft 游戏，不过感谢 Mojang Studios（才怪！）（<a href="https://www.minecraft.net/" target="_blank">https://www.minecraft.net/</a>）',
            'guide.mc.p2': '该整合包的游戏版本为 1.21.11 Java 版，是 Mojang 更改版本号命名方式前的最后一个正式版，主要更新了矛这一种战斗武器（详见 <a href="https://zh.minecraft.wiki/w/Java%E7%89%881.21.11?variant=zh-cn" target="_blank">https://zh.minecraft.wiki/w/Java版1.21.11</a>），使用 Oracle 的 JRE 21。',
            'guide.mc.p3': '该整合包使用 HMCL（Hello! Minecraft Launcher）的较新版本。',
            'guide.mc.p4': '该整合包的一大亮点在于：专为信息课设计。这是一个精简包，将音频文件删除，反正信息课的电脑没有扬声器。这大大减少了下载它所需要的时间，使用 IDM 在 5 分钟以内即可下载完毕。而且这对游戏的正常游玩没有任何影响。需要注意的是，就算你把声音字幕打开，你也照样看不到任何内容。',
            'guide.mc.p5': '整合包里没有任何模组，是纯原版，只默认附带了一个 Full Bright 资源包。其他资源包敬请期待。',
            'guide.huang.p1': '声明：huang1111 网盘是最好的网盘！！！（<a href="https://pan.huang1111.cn" target="_blank">https://pan.huang1111.cn</a>）没有之一！！！',
            'guide.huang.p2': '为什么 (O_o)?? 亮点如下：',
            'guide.huang.l1': '无需登录即可下载（完爆一堆）',
            'guide.huang.l2': '网盘免费容量 35G（也够用了）',
            'guide.huang.l3': '支持上传任意格式、任意大小的文件（完爆蓝奏云）',
            'guide.huang.l4': 'UI 界面美观无广（完爆一堆）',
            'guide.huang.l5': '无提取流量限制（完爆 123）',
            'guide.huang.l6': '下载不限速（完爆一堆）',
            'guide.huang.l7': '登录无需手机验证码',
            'guide.huang.p3': '赶紧注册一个吧~',
            'guide.virus.p1': '浏览器报毒点"保留""仍然保留"。',
            'guide.virus.p2': 'Windows 报毒点"运行""仍然运行"。',
            'guide.virus.p3': '找不到按钮，通常要先点"更多信息"。',
            'guide.jytuse.p': '双击运行，会吧？点个"我同意"。',
            'guide.gamestart.l1': '双击自解压程序 SURVIVAL_hmcl_1.21.11.exe，点击 Extract 继续；',
            'guide.gamestart.l2': '解压完成后，打开文件夹，双击 HMCL.exe；',
            'guide.gamestart.l3': '跳出弹窗点击"同意"；',
            'guide.gamestart.l4': '在左侧"账户"一栏点击添加账户；',
            'guide.gamestart.l5': '点击"离线模式"，随便起一个符合要求的名字，点击"登录"；',
            'guide.gamestart.l6': '点击左上角返回键，在左侧"通用"一栏点击"设置"；',
            'guide.gamestart.l7': '在"全局游戏设置"中找到"不检查游戏完整性"并开启；',
            'guide.gamestart.l8': '返回点击"启动游戏 1.21.11"等待即可。',
            'guide.resource.l1': '进入游戏点击"选项"；',
            'guide.resource.l2': '点击"资源包"；',
            'guide.resource.l3': '将资源包文件拖入（已拖入请忽略）；',
            'guide.resource.l4': '鼠标移动到左侧"可用"一栏你将要加载的资源包图标上，点击三角形箭头移入；',
            'guide.resource.l5': '点击"完成"。',
            'guide.datapack.p': 'TPA 就是一个数据包，以下是添加方法：',
            'guide.datapack.l1': '在单人游戏里，打开创建新的世界的界面；',
            'guide.datapack.l2': '找到"更多"一栏，点击"数据包"；',
            'guide.datapack.l3': '将数据包文件拖入（已拖入请忽略）；',
            'guide.datapack.l4': '鼠标移动到左侧"可用"一栏你将要加载的数据包图标上，点击三角形箭头移入；',
            'guide.datapack.l5': '点击"完成"；',
            'guide.datapack.l6': '点击"创建新的世界"，点击"我知道我在做什么"。',
            'guide.upload.p1': '前提是你得去注册一个网盘。考虑到学校不能带手机，以下是一些不需要手机验证码的网盘：',
            'guide.upload.l1': '123 网盘（<a href="https://123pan.cn" target="_blank">https://123pan.cn</a>）',
            'guide.upload.l2': 'huang1111 网盘',
            'guide.upload.l3': '蓝奏云（<a href="https://www.lanzoui.com" target="_blank">https://www.lanzoui.com</a>）',
            'guide.upload.p2': '接下来是详细步骤：',
            'guide.upload.s1': '在单人游戏里，单击选中世界（勿进入世界）；',
            'guide.upload.s2': '点击左下角"编辑"按钮；',
            'guide.upload.s3': '点击"进行备份"；',
            'guide.upload.s4': '备份完成后，再次点击"编辑"，再点击"打开备份文件夹"；',
            'guide.upload.s5': '备份是一个 .zip 压缩文件，将该备份上传到网盘上。',
            'guide.loadworld.l1': '启动游戏；',
            'guide.loadworld.l2': '将世界文件解压后，放入 <code>/.minecraft/saves</code> 中。',
            'guide.loadworld.note': '<strong>注意：</strong>解压后确保点开文件夹就能看到 advancements 等文件夹和文件。',
            'guide.server.l1': '启动游戏后，打开"多人游戏"；',
            'guide.server.l2': '输入服务器地址并加入。',
            'guide.thanks.l1': '感谢 bwe 的支持(<a href="https://bweop.netlify.app" target="_blank">https://bweop.netlify.app</a>)；',
            'guide.thanks.l3': '感谢 imengyu 的 JiYuTrainer；',
            'guide.thanks.l4': '感谢 huang1111 网盘；',
            'guide.thanks.l6': '不感谢 Mojang Studios.',
        },

        'zh-TW': {

            'common.back': '← 返回首頁',
            'common.dl': '下載',
            'common.copy': '複製連結',
            'common.copied': '已複製',
            'common.tip.copy': '點擊複製連結',
            'common.tip.dl': '點擊下載',
            'common.toast.copied': '連結已複製到剪貼板',
            'index.contact.email': '郵箱',
            'index.feedback.title': '意見回饋',
            'index.feedback.desc': '你的每一則意見都會讓網站變得更好，感謝支持！',
            'index.feedback.q1': '你希望新增哪些歌曲？',
            'index.feedback.q2': '你遇到了哪些 bug？',
            'index.feedback.q3': '你希望新增什麼內容？',
            'index.feedback.placeholder': '請寫下你的回饋或建議…',
            'index.feedback.submit': '送出回饋',
            'index.feedback.thanks': '感謝你的回饋！',
            'index.feedback.empty': '請至少填寫一項內容',
            'index.feedback.fail': '送出失敗，請稍後再試',

            'index.logo': '淵之魚冥下載站',
            'index.nav.home': '首頁',
            'index.nav.mc': 'Minecraft 專區',
            'index.nav.study': '學習資源',
            'index.nav.web': '網址導航',
            'index.nav.av': '影音',
            'index.nav.guide': '新手引導',
            'index.nav.about': '關於本站',
            'index.notice': '<svg class="notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l15-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/><line x1="2" y1="6" x2="2" y2="18"/></svg>\n<span><strong>下載器全新升級！</strong> 網址導航新增多個實用網站！</span>',
            'index.notice.title': '公告',
            'index.title': '淵之魚冥檔案下載站',
            'index.subhead': '—— 專為校園資訊課與遊戲愛好者準備 ——',
            'index.intro1': '歡迎來到 <strong>淵之魚冥</strong> 的個人檔案倉庫！本站專注收錄各類實用資源，核心為 <strong>Minecraft 遊戲資源</strong>，同時涵蓋常用工具、擴充包及校園資訊課必備軟體。',
            'index.intro2': '所有檔案均經過精心整理，適配學校機房環境（無音訊、輕量化、免安裝），無需登入即可高速下載，讓您的資訊課體驗更流暢、更自由。',
            'index.intro3': '👇 點擊下方<strong>「極速開始」</strong>按鈕，下載自動下載程式吧！',
            'index.faststart': '極速開始',
            'index.fastcode.m1': '方式一',
            'index.fastcode.m2': '方式二',
            'index.fastcode.tip': '按住 Win+X，再按 I 打開 PowerShell，複製貼上以下程式碼並執行即可',
            'index.fastcode.copy': '複製',
            'index.fastcode.copied': '已複製',
            'index.fastdownload': '點擊下載 自動下載程式(Specified).exe',
            'index.btn.mc': 'Minecraft 相關',
            'index.btn.study': '學習資源',
            'index.btn.web': '網址導航',
            'index.btn.av': '影音',
            'index.footer': '© 2026 YuanZhiYuMing · 站點由 <a href="https://pages.github.com/" target="_blank">Github Pages</a> 驅動',

            'index.about.title': '關於本站',
            'index.about.card1.title': '關於本網頁',
            'index.about.card1.text': '本網頁是 yuanzhiyuming.github.io，是 GitHub 賬戶 YuanZhiYuMing 的 GitHub Pages。網頁採用毛玻璃設計，簡約美觀。',
            'index.about.card2.title': 'Minecraft 板塊',
            'index.about.card2.text': '將資訊課啟動 Minecraft 所要用到的全部檔案進行整合，包含極域控制、多執行緒下載、Minecraft 遊戲和資源包，專門為 SHSSIP 的資訊課設計。',
            'index.about.card3.title': '學習資源',
            'index.about.card3.text': '點擊「學習資源」，這裡分享了 2026 初高中蘇州用新教材的電子檔，免費無償分享，歡迎大家下載。',
            'index.about.card4.title': '網址導航',
            'index.about.card4.text': '包含了一些常用網站，如 huang1111 網盤、123 網盤、藍奏雲等（持續更新中），以及 Minecraft 網頁版（mcjs.link、eaglercraft.ir 和多個鏡像站），一個存取不上就換另一個試試。此外還有 HTML 小遊戲合集，包括休閒益智、動作反應、策略經典等多種類型，Crazygames 平台首選。',
            'index.about.card5.title': '極速開始',
            'index.about.card5.text': '近期更新了「極速開始」功能，點擊下載自動下載程式，執行即可開始多執行緒下載，速度更快。本軟體目前處於測試階段，歡迎回饋問題。僅支援 Windows 系統，下載特定資源：Minecraft 1.21.11 精簡版。',
            'index.about.card6.title': '備用網站 & 聯絡',
            'index.about.card6.text': '若 github.io 不能存取請存取我的備用網站：https://yzym.netlify.app （更新不一定及時）。作者 QQ：3860517347，微信：stardragon142857',
            'index.about.card7.title': '影音',
            'index.about.card7.text': '點擊「影音」，這裡收錄了精選歌曲，支援按歌曲名/歌手搜尋，並可篩選類別（語種）和歌手，隨時暢聽下載；影視板塊收錄了《我的世界大電影》。',

            'mc.title': 'Minecraft 1.21.11 資源下載',
            'mc.subtitle': '專為學校資訊課打造',
            'mc.guide': '新手引導',
            'mc.alert': '如果您第一次來到此網站，請務必閱讀新手引導',
            'mc.f1': 'Survival-Minecraft-Tiny-OL-Fabric.7z(普通整合包)',
            'mc.f2': 'AutoParseDownloader(自動解析下載器)',
            'mc.f3': 'JiYuTrainer(極域管理程式)',
            'mc.f4': 'Resourcepacks(資源包)',
            'mc.f5': 'Shaderpacks(光影包)',
            'mc.f6': 'Mods(模組)',
            'mc.f7': 'Datapacks(資料包)',
            'mc.f8': 'BUILDING_hmcl_1.21.11.exe(建築黨整合包)',

            'study.title': '學習資源下載',
            'study.subtitle': '專為校園學習準備',
            'study.f1': '2026初高中新教材',

            'web.title': '常用網站導航',
            'web.subtitle': '精選實用網站，一鍵直達',
            'web.section': 'Minecraft 網頁版',
            'web.label.site': '選擇站點：',
            'web.label.version': '選擇版本：',
            'web.mcjs.official': 'MCJS 官網',
            'web.mcjs.eagler': 'eaglercraft.ir',
            'web.mirror.number': '鏡像站',
            'web.mirror.beta': '高版本鏡像站',
            'web.go': '前往遊玩',
            'web.visit': '前往存取',
            'web.mirror.title': '選擇存取節點',
            'web.mirror.desc': '主站若無法存取請嘗試鏡像站',
            'web.mirror.main': '主站',
            'web.mirror.m1': '鏡像站 1',
            'web.mirror.m2': '鏡像站 2',
            'web.mirror.m3': '鏡像站 3 (IPv6)',
            'web.mirror.cancel': '取消',
            'web.mirror.confirm': '前往遊玩',
            'web.alert.nocfg': '該選項的網址尚未配置。',
            'web.alert.noeagler': 'eaglercraft.ir 的網址尚未配置。',
            'web.s1': 'huang1111 網盤',
            'web.s2': '123 網盤',
            'web.s3': '藍奏雲',
            'web.cloud': '雲盤',
            'web.tools': '工具',
            'web.tools.fydrop': 'fyDrop 區域網路檔案傳輸',
            'web.mctools': 'Minecraft 工具',
            'web.mctools.chunkbase': 'ChunkBase 種子與結構定位工具',
            'web.mctools.mcsearch': 'MinecraftSearch 百科與種子地圖',

            'av.title': '影視/歌曲下載',
            'av.subtitle': '精選歌曲 539 首',
            'av.movie.title': '影視',
            'av.search.placeholder': '搜尋歌曲 / 歌手...',
            'av.filter.category': '類別',
            'av.filter.artist': '歌手',
            'av.all': '全部',
            'av.artist.all': '全部歌手',
            'av.count': '共 {n} 首歌曲',
            'av.result.empty': '沒有找到相符的歌曲',
            'av.download': '下載',
            'av.download.all': '下載全部',
            'av.download.folder': '下載資料夾',
            'av.download.zip': '下載.zip',
            'av.download.lyrics': '下載歌詞',
            'av.faq.title': '提示',
            'av.faq.q1': 'Q1：想線上收聽怎麼辦？',
            'av.faq.a1': 'A：點擊下載全部，選擇下載資料夾，在這個huang1111網盤連結頁面可以預覽所有歌曲並收聽。',
            'av.faq.q2': 'Q2：為什麼有些歌曲連結無法查看？',
            'av.faq.a2': 'A：可能藍奏雲將該歌曲封禁了，因為版權方不允許。如遇此類情況，請及時於首頁回饋該曲目名稱。您可以暫時在下載全部中選擇下載資料夾，在頁面中選擇曲目下載。',
            'av.faq.q3': 'Q3：電影為什麼要付費下載？',
            'av.faq.a3': 'A：下載123雲盤用戶端即可免費下載，不要花冤枉錢！但是每月只有10GB提取流量，只夠下一部電影的哦。',
            'av.music.title': '音樂',
            'av.playlist.title': '歌單',
            'av.playlist.all': '全部歌曲',
            'av.playlist.current': '當前歌單',
            'av.hot.artists': '熱門歌手',
            'av.artists.other': '其他歌手',
            'av.az.title': '首字母跳轉',
            'av.az.zh': '中',
            'av.az.en': '英',
            'av.az.ja': '日',
            'av.cat.pure': '純音樂',
            'av.cat.en': '英語',
            'av.cat.mandarin': '國語',
            'av.cat.ja': '日語',
            'av.cat.ru': '俄語',
            'av.cat.pt': '葡萄牙語',
            'av.cat.cantonese': '粵語',
            'web.game': '小遊戲合集',
            'web.game.open': '開放小遊戲平台',
            'web.game.crazy': 'Crazygames',
            'web.game.milkyfrog': '奶蛙遊戲合集',
            'web.game.html5games': 'HTML5 Games 集合',
            'web.game.js13k': 'js13kGames 大賽作品',
            'web.game.casual': '休閒益智類',
            'web.game.2048': '2048 經典版',
            'web.game.doge2048': '2048 Doge 版',
            'web.game.solitaire': '紙牌接龍 Solitaire',
            'web.game.sudoku': '數獨 Sudoku',
            'web.game.action': '動作/反應類',
            'web.game.pacman': '吃豆人 Pacman',
            'web.game.dino': '恐龍遊戲 Dino Runner',
            'web.game.strategy': '策略/經典遊戲',
            'web.game.chess': '國際象棋',
            'web.game.tictactoe': '井字棋 TicTacToe',
            'web.game.fun': '趣味與創新小遊戲',
            'web.game.hexgl': '未來賽車 HexGL',
            'web.game.linerider': '畫軌道 Line Rider',

            'guide.back': '← 返回上一級',
            'guide.home': '返回首頁',
            'guide.toc': '大綱',
            'guide.title': '新手引導',
            'guide.h2.read': '1. 閱讀悉知',
            'guide.h3.intro': '1.1. 介紹',
            'guide.h4.jyt': '1.1.1. 關於 JiYuTrainer',
            'guide.h4.mc': '1.1.2. 關於 Minecraft 整合包',
            'guide.h4.mod': '1.1.3. 關於模組',
            'guide.h4.resourcepack': '1.1.4. 關於資源包/光影包/資料包',
            'guide.h4.huang': '1.1.5. 關於 huang1111 網盤',
            'guide.mod.p1': '考慮到網路連線問題，於是上線模組資源下載。',
            'guide.mod.p2': '以下列舉了新上線的精選模組：',
            'guide.mod.p3': '你說要模組的功能以及關係（必選/可選的支援庫）嗎，只能上 <a href="https://modrinth.com" target="_blank">modrinth</a> / <a href="https://www.curseforge.com" target="_blank">curseforge</a> 去查找了，不過這些模組的相容性無須擔憂哈~',
            'guide.mod.p4': '好消息是：你直接在 HMCL 上看不就行了……',
            'guide.rp.p1': '考慮到網路連線問題，於是上線資源包/光影包/資料包資源下載。',
            'guide.rp.p2': '以下列舉了新上線的精選資源包：',
            'guide.rp.p3': '以下列舉了新上線的精選光影包：',
            'guide.rp.p4': '以下列舉了新上線的精選資料包：',
            'guide.mod.appleskin': 'AppleSkin (蘋果皮)',
            'guide.mod.craftingtweaks': 'Crafting Tweaks (合成輔助)',
            'guide.mod.ferritecore': 'FerriteCore (鐵氧體磁芯)',
            'guide.mod.jade': 'Jade (玉)',
            'guide.mod.jechars': 'Just Enough Characters (通用拼音搜尋)',
            'guide.mod.jei': 'Just Enough Items (JEI物品管理器)',
            'guide.mod.journeymap': 'Journeymap (旅行地圖)',
            'guide.mod.lambdynamiclights': 'LambDynamicLights (Lambd的動態光源)',
            'guide.mod.litematica': 'Litematica (投影)',
            'guide.mod.lithium': 'Lithium (鋰)',
            'guide.mod.minihud': 'MiniHUD (迷你HUD)',
            'guide.mod.modmenu': 'Mod Menu (模組選單)',
            'guide.mod.mousetweaks': 'Mouse Tweaks (滑鼠手勢)',
            'guide.mod.nochatreports': 'No Chat Reports (禁用聊天檢舉)',
            'guide.mod.notenoughanimations': 'NotEnoughAnimations (更多動畫)',
            'guide.mod.placeholderapi': 'Placeholder API (文字佔位符 API)',
            'guide.mod.reesesodium': "Reese's Sodium Options (Reese的鈉影片介面)",
            'guide.mod.replaymod': 'Replay Mod (錄影回放)',
            'guide.mod.sodiumextra': 'Sodium Extra (鈉 · 擴展)',
            'guide.mod.sodium': 'Sodium (鈉)',
            'guide.mod.veinminer': 'Veinminer (連鎖採礦/礦脈礦工)',
            'guide.mod.worldedit': 'WorldEdit (創世神)',
            'guide.rp.fullbright': 'Fullbright UB（全亮）',
            'guide.rp.xkredstone': 'XK Redstone Display（XK紅顯）',
            'guide.rp.xray': 'Xray Ultimate（礦透）',
            'guide.rp.protecteyes': 'Protect Your Eyes（護眼大補丸）',
            'guide.rp.iterationt': 'iterationT 3.2.0（效能開銷較大）',
            'guide.rp.tpa': 'TPA（傳送）',
            'guide.h2.download': '2. 下載安裝 &amp; 使用步驟',
            'guide.h3.dlsteps': '2.1. 下載步驟',
            'guide.h4.virus': '2.1.1. 報毒的解決方法',
            'guide.h3.usesteps': '2.2. 使用步驟',
            'guide.h4.jytuse': '2.2.1. JiYuTrainer 的使用步驟',
            'guide.h4.gamestart': '2.2.2. 遊戲啟動步驟',
            'guide.h4.resource': '2.2.3. 如何載入資源包',
            'guide.h4.datapack': '2.2.4 如何載入資料包',
            'guide.h3.upload': '2.3. 如何上傳世界',
            'guide.h3.loadworld': '2.4. 如何載入世界',
            'guide.h3.server': '2.5. 如何加入伺服器',
            'guide.h2.thanks': '3. 鳴謝',

            'guide.intro.skip': '你可以閱讀本章，這對你有很大幫助。當然你也可以直接跳轉到<strong>下載安裝&amp;使用步驟</strong>那裡。',
            'guide.jyt.p1': 'JiYuTrainer 是 imengyu（快樂的夢魚）在 github 上的一個開源專案（<a href="https://github.com/imengyu/JiYuTrainer" target="_blank">https://github.com/imengyu/JiYuTrainer</a>）。',
            'guide.jyt.intro': '以下是原網頁介紹（已停止更新）：',
            'guide.jyt.q1': '本軟體研發目的就是為了對抗極域電子教室，如果您的學校機房使用極域電子教室來控制學生電腦的話，本軟體很可能會幫到你。',
            'guide.jyt.q2': '講師講課無聊囉嗦緩慢？想自己試試操作，卻被老師全螢幕廣播控制，什麼都不能做？拔掉網路線後雖然自由了但是又看不到老師的演示了？',
            'guide.jyt.q3': '如果你被以上問題困擾，本軟體可能是您非常想要的。',
            'guide.jyt.q4': '這是一個可以使 <strong>極域電子教室全螢幕廣播失效</strong> 的軟體，也就是說，在被老師全螢幕廣播時，會將其自動調整為視窗模式，你不僅可以自由操作電腦，也還可以看老師的演示，自由+學習兩不誤，這不是很爽的事情嗎？其還可以防止被老師控制（有點狠），以及自動關閉 "黑屏安靜" 這種東西；由於本軟體是將全螢幕調整為視窗，因此老師並不會發現你斷線或是進行了非法操作。',
            'guide.jyt.q5': '如果你喜歡這個軟體，不妨向你的好友推薦一下吧！',
            'guide.jyt.q6': '如果你覺得這個軟體不錯，不妨加個小星星⭐吧，你的喜歡是對我最大的支持！',
            'guide.jyt.features': '<strong>功能：</strong>',
            'guide.jyt.f1': '在不影響極域正常運作的情況下將 全螢幕的廣播 轉為 視窗廣播 模式，您不僅可自己操作，也可看老師講解課程。',
            'guide.jyt.f2': '內建強殺、啟停極域 StudentMain.exe 處理程序功能，無需依賴其他軟體。',
            'guide.jyt.f3': '內建破解極域解鎖卸載密碼功能，支援新版極域。',
            'guide.jyt.f4': '反監視功能，經測試，開啟反監視，教師端就無法監視您所用的電腦。',
            'guide.jyt.f5': '防控制功能，防止教師透過極域控制您所用的電腦。',
            'guide.jyt.f6': '監控極域遠端執行命令，您可以自由選擇是否允許教師端遠端執行的命令。',
            'guide.jyt.f7': '透過極域電子教室對同學的電腦遠端發送訊息或遠端執行命令。',
            'guide.jyt.tip': '<strong>提示：</strong>由於本軟體會對極域電子教室進行必要的操作（遠端注入、替換模組），某些防毒軟體可能會報毒，您可能需要關閉防毒軟體或加入白名單。',
            'guide.jyt.usage': '<strong>操作方法：</strong>',
            'guide.jyt.usage.p': '本軟體專為小白設計，預設情況下，您不需要修改任何參數，直接執行 exe，並最小化即可，軟體會自動進行操作。',
            'guide.jyt.addition': '<strong>附加說明：</strong>本軟體不依賴任何執行階段程式庫，您只需複製一個 JiYuTrainer.exe 至目標電腦即可執行，本軟體已將需要的 DLL 打包，它會自動進行安裝。',
            'guide.mc.p1': '嗯……這裡並不介紹 Minecraft 遊戲，不過感謝 Mojang Studios（才怪！）（<a href="https://www.minecraft.net/" target="_blank">https://www.minecraft.net/</a>）',
            'guide.mc.p2': '該整合包的遊戲版本為 1.21.11 Java 版，是 Mojang 更改版本號命名方式前的最後一個正式版，主要更新了矛這一種戰鬥武器（詳見 <a href="https://zh.minecraft.wiki/w/Java%E7%89%881.21.11?variant=zh-cn" target="_blank">https://zh.minecraft.wiki/w/Java版1.21.11</a>），使用 Oracle 的 JRE 21。',
            'guide.mc.p3': '該整合包使用 HMCL（Hello! Minecraft Launcher）的較新版本。',
            'guide.mc.p4': '該整合包的一大亮點在於：專為資訊課設計。這是一個精簡包，將音訊檔案刪除，反正資訊課的電腦沒有揚聲器。這大大減少了下載它所需要的時間，使用 IDM 在 5 分鐘以內即可下載完畢。而且這對遊戲的正常遊玩沒有任何影響。需要注意的是，就算你把聲音字幕開啟，你也照樣看不到任何內容。',
            'guide.mc.p5': '整合包裡沒有任何模組，是純原版，只預設附帶了一個 Full Bright 資源包。其他資源包敬請期待。',
            'guide.huang.p1': '宣告：huang1111 網盤是最好的網盤！！！（<a href="https://pan.huang1111.cn" target="_blank">https://pan.huang1111.cn</a>）沒有之一！！！',
            'guide.huang.p2': '為什麼 (O_o)?? 亮點如下：',
            'guide.huang.l1': '無需登入即可下載（完爆一堆）',
            'guide.huang.l2': '網盤免費容量 35G（也夠用了）',
            'guide.huang.l3': '支援上傳任意格式、任意大小的檔案（完爆藍奏雲）',
            'guide.huang.l4': 'UI 介面美觀無廣（完爆一堆）',
            'guide.huang.l5': '無提取流量限制（完爆 123）',
            'guide.huang.l6': '下載不限速（完爆一堆）',
            'guide.huang.l7': '登入無需手機驗證碼',
            'guide.huang.p3': '趕緊註冊一個吧~',
            'guide.virus.p1': '瀏覽器報毒點"保留""仍然保留"。',
            'guide.virus.p2': 'Windows 報毒點"執行""仍然執行"。',
            'guide.virus.p3': '找不到按鈕，通常要先點"更多資訊"。',
            'guide.jytuse.p': '雙擊執行，會吧？點個"我同意"。',
            'guide.gamestart.l1': '雙擊自解壓程式 SURVIVAL_hmcl_1.21.11.exe，點擊 Extract 繼續；',
            'guide.gamestart.l2': '解壓完成後，開啟資料夾，雙擊 HMCL.exe；',
            'guide.gamestart.l3': '跳出彈窗點擊"同意"；',
            'guide.gamestart.l4': '在左側"帳戶"一欄點擊新增帳戶；',
            'guide.gamestart.l5': '點擊"離線模式"，隨便起一個符合要求的名稱，點擊"登入"；',
            'guide.gamestart.l6': '點擊左上角返回鍵，在左側"通用"一欄點擊"設定"；',
            'guide.gamestart.l7': '在"全域遊戲設定"中找到"不檢查遊戲完整性"並開啟；',
            'guide.gamestart.l8': '返回點擊"啟動遊戲 1.21.11"等待即可。',
            'guide.resource.l1': '進入遊戲點擊"選項"；',
            'guide.resource.l2': '點擊"資源包"；',
            'guide.resource.l3': '將資源包檔案拖入（已拖入請忽略）；',
            'guide.resource.l4': '滑鼠移動到左側"可用"一欄你將要載入的資源包圖示上，點擊三角形箭頭移入；',
            'guide.resource.l5': '點擊"完成"。',
            'guide.datapack.p': 'TPA 就是一個資料包，以下是新增方法：',
            'guide.datapack.l1': '在單人遊戲裡，開啟建立新的世界的介面；',
            'guide.datapack.l2': '找到"更多"一欄，點擊"資料包"；',
            'guide.datapack.l3': '將資料包檔案拖入（已拖入請忽略）；',
            'guide.datapack.l4': '滑鼠移動到左側"可用"一欄你將要載入的資料包圖示上，點擊三角形箭頭移入；',
            'guide.datapack.l5': '點擊"完成"；',
            'guide.datapack.l6': '點擊"建立新的世界"，點擊"我知道我在做什麼"。',
            'guide.upload.p1': '前提是你得去註冊一個網盤。考慮到學校不能帶手機，以下是一些不需要手機驗證碼的網盤：',
            'guide.upload.l1': '123 網盤（<a href="https://123pan.cn" target="_blank">https://123pan.cn</a>）',
            'guide.upload.l2': 'huang1111 網盤',
            'guide.upload.l3': '藍奏雲（<a href="https://www.lanzoui.com" target="_blank">https://www.lanzoui.com</a>）',
            'guide.upload.p2': '接下來是詳細步驟：',
            'guide.upload.s1': '在單人遊戲裡，單擊選中世界（勿進入世界）；',
            'guide.upload.s2': '點擊左下角"編輯"按鈕；',
            'guide.upload.s3': '點擊"進行備份"；',
            'guide.upload.s4': '備份完成後，再次點擊"編輯"，再點擊"開啟備份資料夾"；',
            'guide.upload.s5': '備份是一個 .zip 壓縮檔案，將該備份上傳到網盤上。',
            'guide.loadworld.l1': '啟動遊戲；',
            'guide.loadworld.l2': '將世界檔案解壓後，放入 <code>/.minecraft/saves</code> 中。',
            'guide.loadworld.note': '<strong>注意：</strong>解壓後確保點開資料夾就能看到 advancements 等資料夾和檔案。',
            'guide.server.l1': '啟動遊戲後，開啟"多人遊戲"；',
            'guide.server.l2': '輸入伺服器位址並加入。',
            'guide.thanks.l1': '感謝 bwe 的支援(<a href="https://bweop.netlify.app" target="_blank">https://bweop.netlify.app</a>)；',
            'guide.thanks.l3': '感謝 imengyu 的 JiYuTrainer；',
            'guide.thanks.l4': '感謝 huang1111 網盤；',
            'guide.thanks.l6': '不感謝 Mojang Studios.',
        },

        'en': {

            'common.back': '← Back to Home',
            'common.dl': 'Download',
            'common.copy': 'Copy link',
            'common.copied': 'Copied',
            'common.tip.copy': 'Click to copy link',
            'common.tip.dl': 'Click to download',
            'common.toast.copied': 'Link copied to clipboard',
            'index.contact.title': 'Contact',
            'index.contact.email': 'Email',
            'index.feedback.title': 'Feedback',
            'index.feedback.desc': 'Your feedback helps make this site better. Thank you for your support!',
            'index.feedback.q1': 'Which songs would you like to add?',
            'index.feedback.q2': 'What bugs did you run into?',
            'index.feedback.q3': 'What content would you like to see added?',
            'index.feedback.placeholder': 'Write your feedback or suggestions…',
            'index.feedback.submit': 'Submit Feedback',
            'index.feedback.thanks': 'Thank you for your feedback!',
            'index.feedback.empty': 'Please fill in at least one item',
            'index.feedback.fail': 'Submission failed, please try again later',

            'index.logo': 'YuanZhiYuMing Downloads',
            'index.nav.home': 'Home',
            'index.nav.mc': 'Minecraft',
            'index.nav.study': 'Study Resources',
            'index.nav.web': 'Site Navigation',
            'index.nav.av': 'Media',
            'index.nav.guide': 'Beginner Guide',
            'index.nav.about': 'About',
            'index.notice': '<svg class="notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l15-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/><line x1="2" y1="6" x2="2" y2="18"/></svg>\n<span><strong>Downloader upgraded!</strong> New useful sites added to the website directory!</span>',
            'index.notice.title': 'Announcements',
            'index.title': 'YuanZhiYuMing File Download Hub',
            'index.subhead': '—— For campus IT classes & game enthusiasts ——',
            'index.intro1': 'Welcome to <strong>YuanZhiYuMing</strong>\'s personal file repository! This site focuses on practical resources, primarily <strong>Minecraft game assets</strong>, along with common tools, extension packs, and essential software for campus IT classes.',
            'index.intro2': 'All files are carefully organized and optimized for school computer lab environments (no audio, lightweight, portable). No login required for high-speed downloads, making your IT class experience smoother and freer.',
            'index.intro3': '👇 Click the <strong>"Quick Start"</strong> button below to download the auto-downloader!',
            'index.faststart': 'Quick Start',
            'index.fastcode.m1': 'Method 1',
            'index.fastcode.m2': 'Method 2',
            'index.fastcode.tip': 'Press Win+X, then I to open PowerShell. Copy, paste, and run the code below',
            'index.fastcode.copy': 'Copy',
            'index.fastcode.copied': 'Copied',
            'index.fastdownload': 'Click to download Auto Downloader (Specified).exe',
            'index.btn.mc': 'Minecraft',
            'index.btn.study': 'Study Resources',
            'index.btn.web': 'Site Navigation',
            'index.btn.av': 'Media',
            'index.footer': '© 2026 YuanZhiYuMing · Powered by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>',

            'index.about.title': 'About This Site',
            'index.about.card1.title': 'About This Site',
            'index.about.card1.text': 'This site is yuanzhiyuming.github.io, the GitHub Pages of the GitHub account YuanZhiYuMing. The site uses a glassmorphism design — clean and elegant.',
            'index.about.card2.title': 'Minecraft Section',
            'index.about.card2.text': 'Integrates all files needed to launch Minecraft in IT class, including JiYuTrainer (classroom control bypass), multi-thread download, the Minecraft game and resource packs — designed specifically for SHSSIP IT classes.',
            'index.about.card3.title': 'Study Resources',
            'index.about.card3.text': 'Click "Study Resources" to find the 2026 middle & high school new textbooks (Suzhou edition) in digital form — shared for free, everyone is welcome to download.',
            'index.about.card4.title': 'Website Directory',
            'index.about.card4.text': 'Includes common websites such as huang1111 Cloud, 123 Cloud and Lanzou Cloud, plus Minecraft web editions from mcjs.link and eaglercraft.ir with multiple mirrors to try if one is unavailable. Also features an HTML mini games collection with casual, action, strategy and classic games, with Crazygames as the top platform choice.',
            'index.about.card5.title': 'Quick Start',
            'index.about.card5.text': 'Recently added the "Quick Start" feature — click to download the auto-downloader, run it to start multi-thread downloading at higher speeds. This software is currently in beta; feedback is welcome. Windows only; downloads a specific resource: Minecraft 1.21.11 slim edition.',
            'index.about.card6.title': 'Backup Site & Contact',
            'index.about.card6.text': 'If github.io is inaccessible, visit my backup site: https://yzym.netlify.app (updates may be delayed). Author QQ: 3860517347, WeChat: stardragon142857',
            'index.about.card7.title': 'Media',
            'index.about.card7.text': 'Click "Media" to find a curated collection of songs — searchable by title/artist and filterable by category (language) and artist, ready to listen and download. The video section features "A Minecraft Movie".',

            'mc.title': 'Minecraft 1.21.11 Downloads',
            'mc.subtitle': 'Built for school IT classes',
            'mc.guide': 'Beginner Guide',
            'mc.alert': 'If this is your first visit, please read the Beginner Guide.',
            'mc.f1': 'Survival-Minecraft-Tiny-OL-Fabric.7z (Standard Pack)',
            'mc.f2': 'AutoParseDownloader (Auto Parse Downloader)',
            'mc.f3': 'JiYuTrainer (Classroom Control Breaker)',
            'mc.f4': 'Resourcepacks',
            'mc.f5': 'Shaderpacks',
            'mc.f6': 'Mods',
            'mc.f7': 'Datapacks',
            'mc.f8': 'BUILDING_hmcl_1.21.11.exe (Builder Pack)',

            'study.title': 'Study Resources',
            'study.subtitle': 'For campus learning',
            'study.f1': '2026 Middle & High School New Textbooks',

            'web.title': 'Useful Websites',
            'web.subtitle': 'Curated useful websites, one click away',
            'web.section': 'Minecraft Web',
            'web.label.site': 'Select site:',
            'web.label.version': 'Select version:',
            'web.mcjs.official': 'MCJS Official Website',
            'web.mcjs.eagler': 'eaglercraft.ir',
            'web.mirror.number': 'Mirror',
            'web.mirror.beta': 'High-version mirror',
            'web.go': 'Play Now',
            'web.visit': 'Visit',
            'web.mirror.title': 'Select Access Node',
            'web.mirror.desc': 'Try mirror sites if the main site is unavailable',
            'web.mirror.main': 'Main',
            'web.mirror.m1': 'Mirror 1',
            'web.mirror.m2': 'Mirror 2',
            'web.mirror.m3': 'Mirror 3 (IPv6)',
            'web.mirror.cancel': 'Cancel',
            'web.mirror.confirm': 'Go',
            'web.alert.nocfg': 'URL not configured for this option.',
            'web.alert.noeagler': 'eaglercraft.ir URL not configured.',
            'web.s1': 'huang1111 Cloud',
            'web.s2': '123 Cloud',
            'web.s3': 'Lanzou Cloud',
            'web.cloud': 'Cloud Storage',
            'web.tools': 'Tools',
            'web.tools.fydrop': 'fyDrop LAN File Transfer',
            'web.mctools': 'Minecraft Tools',
            'web.mctools.chunkbase': 'ChunkBase Seed & Structure Tools',
            'web.mctools.mcsearch': 'MinecraftSearch Wiki & Seed Map',

            'av.title': 'Movies/Song Downloads',
            'av.subtitle': '539 curated songs',
            'av.movie.title': 'Videos',
            'av.search.placeholder': 'Search songs / artists...',
            'av.filter.category': 'Category',
            'av.filter.artist': 'Artist',
            'av.all': 'All',
            'av.artist.all': 'All Artists',
            'av.count': '{n} songs',
            'av.result.empty': 'No matching songs found',
            'av.download': 'Download',
            'av.download.all': 'Download All',
            'av.download.folder': 'Download Folder',
            'av.download.zip': 'Download .zip',
            'av.download.lyrics': 'Download Lyrics',
            'av.faq.title': 'Tips',
            'av.faq.q1': 'Q1: How can I listen online?',
            'av.faq.a1': 'A: Click "Download All" and choose "Download Folder" — on that huang1111 page you can preview and listen to all the songs.',
            'av.faq.q2': 'Q2: Why can\'t some song links be opened?',
            'av.faq.a2': 'A: Lanzou Cloud may have blocked that song due to copyright restrictions. If so, please report the song title via the feedback form on the home page. Meanwhile, choose "Download Folder" in "Download All" and select the song on that page.',
            'av.faq.q3': 'Q3: Why does downloading movies cost money?',
            'av.faq.a3': 'A: Just install the 123 Cloud Drive app to download for free — don\'t waste your money! But note the free plan only includes 10GB per month, just enough for one movie.',
            'av.music.title': 'Music',
            'av.playlist.title': 'Playlists',
            'av.playlist.all': 'All songs',
            'av.playlist.current': 'Current playlist',
            'av.hot.artists': 'Popular artists',
            'av.artists.other': 'Other artists',
            'av.az.title': 'A–Z jump',
            'av.az.zh': 'ZH',
            'av.az.en': 'EN',
            'av.az.ja': 'JA',
            'av.cat.pure': 'Instrumental',
            'av.cat.en': 'English',
            'av.cat.mandarin': 'Mandarin',
            'av.cat.ja': 'Japanese',
            'av.cat.ru': 'Russian',
            'av.cat.pt': 'Portuguese',
            'av.cat.cantonese': 'Cantonese',
            'web.game': 'Mini Games Collection',
            'web.game.open': 'Open Game Platforms',
            'web.game.crazy': 'Crazygames',
            'web.game.milkyfrog': 'Milky Frog Games',
            'web.game.html5games': 'HTML5 Games Collection',
            'web.game.js13k': 'js13kGames Contest Entries',
            'web.game.casual': 'Casual & Puzzle',
            'web.game.2048': '2048 Classic',
            'web.game.doge2048': '2048 Doge',
            'web.game.solitaire': 'Solitaire',
            'web.game.sudoku': 'Sudoku',
            'web.game.action': 'Action & Arcade',
            'web.game.pacman': 'Pacman',
            'web.game.dino': 'Dino Runner',
            'web.game.strategy': 'Strategy & Classic',
            'web.game.chess': 'Chess',
            'web.game.tictactoe': 'TicTacToe',
            'web.game.fun': 'Fun & Innovative',
            'web.game.hexgl': 'HexGL',
            'web.game.linerider': 'Line Rider',

            'guide.back': '← Back',
            'guide.home': 'Home',
            'guide.toc': 'Outline',
            'guide.title': 'Beginner Guide',
            'guide.h2.read': '1. Read Me First',
            'guide.h3.intro': '1.1. Introduction',
            'guide.h4.jyt': '1.1.1. About JiYuTrainer',
            'guide.h4.mc': '1.1.2. About Minecraft Modpack',
            'guide.h4.mod': '1.1.3. About Mods',
            'guide.h4.resourcepack': '1.1.4. About Resource Packs/Shaders/Data Packs',
            'guide.h4.huang': '1.1.5. About huang1111 Cloud',
            'guide.mod.p1': 'Considering network connectivity issues, mod resource downloads are now available.',
            'guide.mod.p2': 'The following lists the newly available featured mods:',
            'guide.mod.p3': 'Want to know about mod features and dependencies (required/optional support libraries)? You can look them up on <a href="https://modrinth.com" target="_blank">modrinth</a> / <a href="https://www.curseforge.com" target="_blank">curseforge</a>, but don\'t worry about compatibility~',
            'guide.mod.p4': 'Good news: you can just check them directly in HMCL...',
            'guide.rp.p1': 'Considering network connectivity issues, resource pack/shader/data pack downloads are now available.',
            'guide.rp.p2': 'The following lists the newly available featured resource packs:',
            'guide.rp.p3': 'The following lists the newly available featured shaders:',
            'guide.rp.p4': 'The following lists the newly available featured data packs:',
            'guide.mod.appleskin': 'AppleSkin',
            'guide.mod.craftingtweaks': 'Crafting Tweaks',
            'guide.mod.ferritecore': 'FerriteCore',
            'guide.mod.jade': 'Jade',
            'guide.mod.jechars': 'Just Enough Characters',
            'guide.mod.jei': 'Just Enough Items',
            'guide.mod.journeymap': 'Journeymap',
            'guide.mod.lambdynamiclights': 'LambDynamicLights',
            'guide.mod.litematica': 'Litematica',
            'guide.mod.lithium': 'Lithium',
            'guide.mod.minihud': 'MiniHUD',
            'guide.mod.modmenu': 'Mod Menu',
            'guide.mod.mousetweaks': 'Mouse Tweaks',
            'guide.mod.nochatreports': 'No Chat Reports',
            'guide.mod.notenoughanimations': 'NotEnoughAnimations',
            'guide.mod.placeholderapi': 'Placeholder API',
            'guide.mod.reesesodium': "Reese's Sodium Options",
            'guide.mod.replaymod': 'Replay Mod',
            'guide.mod.sodiumextra': 'Sodium Extra',
            'guide.mod.sodium': 'Sodium',
            'guide.mod.veinminer': 'Veinminer',
            'guide.mod.worldedit': 'WorldEdit',
            'guide.rp.fullbright': 'Fullbright UB',
            'guide.rp.xkredstone': 'XK Redstone Display',
            'guide.rp.xray': 'Xray Ultimate',
            'guide.rp.protecteyes': 'Protect Your Eyes',
            'guide.rp.iterationt': 'iterationT 3.2.0 (high performance cost)',
            'guide.rp.tpa': 'TPA',
            'guide.h2.download': '2. Download, Install & Usage',
            'guide.h3.dlsteps': '2.1. Download Steps',
            'guide.h4.virus': '2.1.1. Antivirus Warnings',
            'guide.h3.usesteps': '2.2. Usage Steps',
            'guide.h4.jytuse': '2.2.1. JiYuTrainer Usage',
            'guide.h4.gamestart': '2.2.2. Game Launch Steps',
            'guide.h4.resource': '2.2.3. Loading Resource Packs',
            'guide.h4.datapack': '2.2.4. Loading Data Packs',
            'guide.h3.upload': '2.3. Uploading Worlds',
            'guide.h3.loadworld': '2.4. Loading Worlds',
            'guide.h3.server': '2.5. Joining Servers',
            'guide.h2.thanks': '3. Credits',

            'guide.intro.skip': 'You can read this chapter; it will help you a lot. Of course, you can also jump directly to the <strong>Download, Install &amp; Usage</strong> section.',
            'guide.jyt.p1': 'JiYuTrainer is an open-source project on GitHub by imengyu (Happy Dream Fish) (<a href="https://github.com/imengyu/JiYuTrainer" target="_blank">https://github.com/imengyu/JiYuTrainer</a>).',
            'guide.jyt.intro': 'The following is the description from the original webpage (no longer updated):',
            'guide.jyt.q1': 'This software was developed to counter JiYu Electronic Classroom. If your school\'s computer lab uses JiYu Electronic Classroom to control student computers, this software will likely help you.',
            'guide.jyt.q2': 'Is the lecturer\'s lesson boring, verbose, and slow? Want to try operating yourself, but get controlled by the teacher\'s full-screen broadcast, unable to do anything? After unplugging the network cable you\'re free, but you can no longer see the teacher\'s demonstration?',
            'guide.jyt.q3': 'If you are troubled by the above problems, this software may be exactly what you want.',
            'guide.jyt.q4': 'This is a software that can <strong>disable JiYu Electronic Classroom\'s full-screen broadcast</strong>. That is to say, when the teacher broadcasts full-screen, it will automatically switch it to window mode. You can not only operate the computer freely, but also watch the teacher\'s demonstration — freedom and learning both at once, isn\'t that great? It can also prevent being controlled by the teacher (a bit ruthless), and automatically close things like "Black Screen Quiet"; since this software switches full-screen to window mode, the teacher will not notice that you disconnected or did anything unauthorized.',
            'guide.jyt.q5': 'If you like this software, why not recommend it to your friends!',
            'guide.jyt.q6': 'If you think this software is good, why not add a little star ⭐ — your liking is the greatest support for me!',
            'guide.jyt.features': '<strong>Features:</strong>',
            'guide.jyt.f1': 'Without affecting the normal operation of JiYu, it switches full-screen broadcast mode to window broadcast mode. You can operate by yourself and watch the teacher\'s lesson.',
            'guide.jyt.f2': 'Built-in force kill, start/stop JiYu StudentMain.exe process function, no need to rely on other software.',
            'guide.jyt.f3': 'Built-in JiYu unlock/uninstall password cracking function, supports the new version of JiYu.',
            'guide.jyt.f4': 'Anti-surveillance function. Tested: with anti-surveillance enabled, the teacher\'s terminal cannot monitor the computer you are using.',
            'guide.jyt.f5': 'Anti-control function, prevents teachers from controlling your computer through JiYu.',
            'guide.jyt.f6': 'Monitor JiYu remote command execution. You can freely choose whether to allow commands remotely executed by the teacher\'s terminal.',
            'guide.jyt.f7': 'Remotely send messages or execute commands to classmates\' computers through JiYu Electronic Classroom.',
            'guide.jyt.tip': '<strong>Tip:</strong> Since this software performs necessary operations on JiYu Electronic Classroom (remote injection, module replacement), some antivirus software may flag it as a threat. You may need to disable your antivirus or add it to the whitelist.',
            'guide.jyt.usage': '<strong>How to use:</strong>',
            'guide.jyt.usage.p': 'This software is designed for beginners. By default, you do not need to modify any parameters. Just run the exe and minimize it, and the software will operate automatically.',
            'guide.jyt.addition': '<strong>Additional notes:</strong> This software does not depend on any runtime library. You only need to copy one JiYuTrainer.exe to the target computer to run it. The software has packaged the required DLLs and will install them automatically.',
            'guide.mc.p1': 'Hmm... this section does not introduce the Minecraft game, but thanks to Mojang Studios (yeah, right!) (<a href="https://www.minecraft.net/" target="_blank">https://www.minecraft.net/</a>)',
            'guide.mc.p2': 'The modpack\'s game version is 1.21.11 Java Edition, the last official release before Mojang changed its version numbering scheme. It mainly added the spear as a combat weapon (see <a href="https://zh.minecraft.wiki/w/Java%E7%89%881.21.11?variant=zh-cn" target="_blank">https://zh.minecraft.wiki/w/Java版1.21.11</a> for details), and uses Oracle\'s JRE 21.',
            'guide.mc.p3': 'This modpack uses a newer version of HMCL (Hello! Minecraft Launcher).',
            'guide.mc.p4': 'A major highlight of this modpack is that it\'s designed specifically for IT class. This is a slimmed-down package with audio files removed — after all, the IT class computers don\'t have speakers. This greatly reduces the download time — with IDM, it can finish downloading in under 5 minutes. And this has no impact on normal gameplay. Note that even if you turn on subtitles, you still won\'t see any content.',
            'guide.mc.p5': 'The modpack contains no mods — it\'s pure vanilla, with only a Full Bright resource pack included by default. Other resource packs are coming soon.',
            'guide.huang.p1': 'Statement: huang1111 Cloud is the best cloud storage service!!! (<a href="https://pan.huang1111.cn" target="_blank">https://pan.huang1111.cn</a>) Bar none!!!',
            'guide.huang.p2': 'Why (O_o)?? Highlights are as follows:',
            'guide.huang.l1': 'Download without login (beats a bunch of them)',
            'guide.huang.l2': '35G free cloud storage capacity (enough to use)',
            'guide.huang.l3': 'Supports uploading files of any format and any size (beats Lanzou Cloud)',
            'guide.huang.l4': 'Beautiful UI with no ads (beats a bunch of them)',
            'guide.huang.l5': 'No extraction traffic limit (beats 123 Cloud)',
            'guide.huang.l6': 'No download speed limit (beats a bunch of them)',
            'guide.huang.l7': 'Login without phone verification code',
            'guide.huang.p3': 'Hurry up and register one~',
            'guide.virus.p1': 'When the browser reports a threat, click "Keep" and "Keep anyway".',
            'guide.virus.p2': 'When Windows reports a threat, click "Run" and "Run anyway".',
            'guide.virus.p3': 'If you can\'t find the button, you usually need to click "More info" first.',
            'guide.jytuse.p': 'Double-click to run, you know how, right? Click "I Agree".',
            'guide.gamestart.l1': 'Double-click the self-extracting program SURVIVAL_hmcl_1.21.11.exe, then click Extract to continue;',
            'guide.gamestart.l2': 'After extraction is complete, open the folder and double-click HMCL.exe;',
            'guide.gamestart.l3': 'Click "Agree" on the popup;',
            'guide.gamestart.l4': 'In the "Accounts" section on the left, click to add an account;',
            'guide.gamestart.l5': 'Click "Offline Mode", enter any name that meets the requirements, then click "Login";',
            'guide.gamestart.l6': 'Click the back button in the top-left corner, then click "Settings" in the "General" section on the left;',
            'guide.gamestart.l7': 'In "Global Game Settings", find "Do not check game integrity" and enable it;',
            'guide.gamestart.l8': 'Go back and click "Launch Game 1.21.11" and wait.',
            'guide.resource.l1': 'Enter the game and click "Options";',
            'guide.resource.l2': 'Click "Resource Packs";',
            'guide.resource.l3': 'Drag the resource pack file in (ignore if already dragged in);',
            'guide.resource.l4': 'Hover over the resource pack icon you want to load in the "Available" section on the left, then click the triangle arrow to move it in;',
            'guide.resource.l5': 'Click "Done".',
            'guide.datapack.p': 'TPA is a data pack. Here is how to add it:',
            'guide.datapack.l1': 'In single-player mode, open the "Create New World" interface;',
            'guide.datapack.l2': 'Find the "More" section and click "Data Packs";',
            'guide.datapack.l3': 'Drag the data pack file in (ignore if already dragged in);',
            'guide.datapack.l4': 'Hover over the data pack icon you want to load in the "Available" section on the left, then click the triangle arrow to move it in;',
            'guide.datapack.l5': 'Click "Done";',
            'guide.datapack.l6': 'Click "Create New World", then click "I know what I\'m doing".',
            'guide.upload.p1': 'The prerequisite is that you need to register for a cloud storage service. Considering that phones are not allowed in school, here are some cloud services that don\'t require a phone verification code:',
            'guide.upload.l1': '123 Cloud (<a href="https://123pan.cn" target="_blank">https://123pan.cn</a>)',
            'guide.upload.l2': 'huang1111 Cloud',
            'guide.upload.l3': 'Lanzou Cloud (<a href="https://www.lanzoui.com" target="_blank">https://www.lanzoui.com</a>)',
            'guide.upload.p2': 'Next are the detailed steps:',
            'guide.upload.s1': 'In single-player mode, click to select the world (do not enter the world);',
            'guide.upload.s2': 'Click the "Edit" button in the bottom-left corner;',
            'guide.upload.s3': 'Click "Backup";',
            'guide.upload.s4': 'After the backup is complete, click "Edit" again, then click "Open Backup Folder";',
            'guide.upload.s5': 'The backup is a .zip compressed file. Upload this backup to the cloud storage.',
            'guide.loadworld.l1': 'Launch the game;',
            'guide.loadworld.l2': 'After extracting the world files, place them in <code>/.minecraft/saves</code>.',
            'guide.loadworld.note': '<strong>Note:</strong> After extraction, make sure that opening the folder shows the advancements folder and other files directly.',
            'guide.server.l1': 'After launching the game, open "Multiplayer";',
            'guide.server.l2': 'Enter the server address and join.',
            'guide.thanks.l1': 'Thanks to bwe for the support (<a href="https://bweop.netlify.app" target="_blank">https://bweop.netlify.app</a>);',
            'guide.thanks.l3': 'Thanks to imengyu for JiYuTrainer;',
            'guide.thanks.l4': 'Thanks to huang1111 Cloud;',
            'guide.thanks.l6': 'No thanks to Mojang Studios.',
        },

    };

    let currentLang = 'zh-CN';
    const callbacks = [];

    window.t = function(key) {
        return (I18N[currentLang] && I18N[currentLang][key]) ||
               (I18N['zh-CN'] && I18N['zh-CN'][key]) ||
               key;
    };

    window.getCurrentLang = function() { return currentLang; };

    window.onLangChange = function(cb) { callbacks.push(cb); };

    function applyLang(lang) {
        if (!LANGS.includes(lang)) lang = 'zh-CN';
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', LANG_ATTRS[lang] || 'zh-CN');

        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            const text = I18N[lang] && I18N[lang][key];
            if (text !== undefined) {
                el.innerHTML = text;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-placeholder');
            const text = I18N[lang] && I18N[lang][key];
            if (text !== undefined) {
                el.setAttribute('placeholder', text);
            }
        });

        const titleEl = document.querySelector('title[data-i18n-title]');
        if (titleEl) {
            const titleKey = titleEl.getAttribute('data-i18n-title');
            const titleText = I18N[lang] && I18N[lang][titleKey];
            if (titleText !== undefined) {
                document.title = titleText;
            }
        }

        document.querySelectorAll('.lang-dropdown-item').forEach(function(item) {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        callbacks.forEach(function(cb) { try { cb(lang); } catch(e) {} });
    }

    let dropdown = null;

    function createDropdown() {
        if (dropdown) return dropdown;
        dropdown = document.createElement('div');
        dropdown.className = 'lang-dropdown';

        LANGS.forEach(function(lang) {
            const item = document.createElement('div');
            item.className = 'lang-dropdown-item';
            item.setAttribute('data-lang', lang);
            item.innerHTML = (LANG_FLAGS[lang] || '') + '<span class="lang-name">' + LANG_NAMES[lang] + '</span><span class="check">\u2713</span>';
            item.addEventListener('click', function() {
                applyLang(lang);
                hideDropdown();
            });
            dropdown.appendChild(item);
        });

        document.body.appendChild(dropdown);
        const activeItem = dropdown.querySelector('.lang-dropdown-item[data-lang="' + currentLang + '"]');
        if (activeItem) activeItem.classList.add('active');
        return dropdown;
    }

    function showDropdown(btn) {
        const dd = createDropdown();
        const rect = btn.getBoundingClientRect();
        dd.style.top = (rect.bottom + 8) + 'px';
        dd.style.right = (window.innerWidth - rect.right) + 'px';
        dd.classList.add('show');
    }

    function hideDropdown() {
        if (dropdown) dropdown.classList.remove('show');
    }

    function init() {
        const savedLang = localStorage.getItem('lang') || 'zh-CN';
        applyLang(savedLang);

        document.querySelectorAll('.lang-toggle').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (dropdown && dropdown.classList.contains('show')) {
                    hideDropdown();
                } else {
                    showDropdown(btn);
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (dropdown && !dropdown.contains(e.target) && !e.target.closest('.lang-toggle')) {
                hideDropdown();
            }
        });

        window.addEventListener('scroll', hideDropdown, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/* ===== 全站：复制链接按钮（.dl-copy）===== */
(function() {
    const CHECK_SVG = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

    function flashCopied(btn) {
        if (btn.dataset.busy) return;
        btn.dataset.busy = '1';
        const original = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = CHECK_SVG;
        if (window.showCopyToast) window.showCopyToast();
        setTimeout(function() {
            btn.innerHTML = original;
            btn.classList.remove('copied');
            delete btn.dataset.busy;
        }, 1200);
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        return ok;
    }

    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.dl-copy');
        if (!btn) return;
        const url = btn.getAttribute('data-url') || '';
        if (!url) return;
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(function() { flashCopied(btn); }, function() {
                if (fallbackCopy(url)) flashCopied(btn);
            });
        } else if (fallbackCopy(url)) {
            flashCopied(btn);
        }
    });
})();

/* ===== 全站：按钮悬停提示 + 复制成功提示窗 ===== */
(function() {
    // 悬停提示小卡片
    const tip = document.createElement('div');
    tip.className = 'dl-tip';
    document.body.appendChild(tip);

    function showTip(el, text) {
        tip.textContent = text;
        tip.classList.add('show');
        const r = el.getBoundingClientRect();
        const w = tip.offsetWidth;
        const left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, window.innerWidth - w - 8));
        tip.style.left = left + 'px';
        tip.style.top = (r.top - tip.offsetHeight - 8) + 'px';
    }

    document.addEventListener('mouseover', function(e) {
        const btn = e.target.closest('.dl-btn, .contact-copy');
        if (!btn) return;
        const isCopy = btn.classList.contains('dl-copy');
        const key = isCopy ? 'common.tip.copy' : 'common.tip.dl';
        showTip(btn, window.t ? window.t(key) : key);
    });
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.dl-btn, .contact-copy')) tip.classList.remove('show');
    });
    window.addEventListener('scroll', function() { tip.classList.remove('show'); }, { passive: true });

    // 复制成功提示窗（绿圈对钩）
    let toastTimer = null;
    window.showCopyToast = function() {
        let toast = document.querySelector('.copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.innerHTML = '<span class="copy-toast-icon"><svg fill="none" viewBox="0 0 24 24" stroke="#2e9e44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span class="copy-toast-text"></span>';
            document.body.appendChild(toast);
        }
        toast.querySelector('.copy-toast-text').textContent = window.t ? window.t('common.toast.copied') : '链接已复制到剪贴板';
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function() { toast.classList.remove('show'); }, 2200);
    };
})();

/* ===== 首页：导航栏正中间时钟（精确到秒，点击跳转 LightTime） ===== */
(function() {
    if (!document.body.classList.contains('page-index')) return; // 仅首页显示
    function pad(n) { return n < 10 ? '0' + n : '' + n; }
    const el = document.createElement('a');
    el.className = 'site-clock';
    el.setAttribute('href', 'LightTime/index.html');
    el.setAttribute('target', '_self');
    el.setAttribute('title', 'LightTime');
    el.setAttribute('aria-label', '当前时间，点击进入 LightTime');
    document.body.appendChild(el);
    function tick() {
        const d = new Date();
        el.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    tick();
    setInterval(tick, 1000);
})();
