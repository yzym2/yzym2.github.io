// ========== 多语言切换系统 ==========
(function() {
    'use strict';

    // ========== CSS 注入 ==========
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
/* 固定定位变体（子页面） */
.lang-toggle.fixed {
    position: fixed;
    top: 20px;
    right: 74px;
    z-index: 999;
}
/* header 内联变体 */
header .lang-toggle {
    position: relative;
}
.header-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-shrink: 0;
}
/* 语言下拉菜单 */
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
    justify-content: space-between;
    gap: 10px;
    white-space: nowrap;
}
.lang-dropdown-item:hover {
    background: var(--glass-border);
}
.lang-dropdown-item.active {
    opacity: 0.5;
}
.lang-dropdown-item .check {
    font-size: 14px;
    opacity: 0.8;
}
`;
    document.head.appendChild(style);

    // ========== 语言定义 ==========
    const LANGS = ['zh-CN', 'zh-TW', 'en'];
    const LANG_ATTRS = { 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW', 'en': 'en' };
    const LANG_SHORT = { 'zh-CN': '簡', 'zh-TW': '繁', 'en': 'EN' };
    const LANG_NAMES = { 'zh-CN': '简体中文', 'zh-TW': '繁體中文', 'en': 'English' };

    // ========== 翻译字典 ==========
    const I18N = {
        'zh-CN': {
            // ---- 通用 ----
            'common.back': '← 返回首页',
            'common.dl': '前往下载',
            // ---- index.html ----
            'index.logo': '渊之鱼冥下载站',
            'index.nav.home': '首页',
            'index.nav.mc': 'Minecraft 专区',
            'index.nav.study': '学习资源',
            'index.nav.web': '常用网站',
            'index.nav.guide': '新手引导',
            'index.nav.about': '关于本站',
            'index.notice': '<span class="notice-icon">📢</span>\n<span><strong>新站上线！</strong> 所有资源已迁移至本站，后续更新请关注这里，感谢支持！</span>',
            'index.title': '渊之鱼冥文件下载站',
            'index.subhead': '—— 专为校园信息课与游戏爱好者准备 ——',
            'index.intro1': '欢迎来到 <strong>渊之鱼冥</strong> 的个人文件仓库！本站专注收录各类实用资源，核心为 <strong>Minecraft 游戏资源</strong>，同时涵盖常用工具、扩展包及校园信息课必备软件。',
            'index.intro2': '所有文件均经过精心整理，适配学校机房环境（无音频、轻量化、免安装），无需登录即可高速下载，让您的信息课体验更流畅、更自由。',
            'index.intro3': '👇 点击下方按钮，快速进入 <strong>Minecraft 资源专区</strong>，获取您需要的资源！',
            'index.faststart': '极速开始',
            'index.fasthint': '一键下载 自动下载程序(Specified).exe',
            'index.btn.mc': 'Minecraft 相关',
            'index.btn.study': '学习资源',
            'index.btn.web': '常用网站',
            'index.footer': '© 2026 YuanZhiYuMing · 站点由 <a href="https://pages.github.com/" target="_blank">Github Pages</a> 驱动',
            // ---- index.html about ----
            'index.about.title': '关于本站',
            'index.about.card1.title': '关于本站',
            'index.about.card1.text': '渊之鱼冥下载站是 GitHub 账户 YuanZhiYuMing 的 Pages 站点，专门为 SHSSIP 信息课设计，整合了启动 Minecraft 所需的全部资源，包含极域控制、多线程下载器、游戏整合包与资源包，无需登录即可高速下载。',
            'index.about.card2.title': '核心功能',
            'index.about.card2.text': '整合极域控制（JiYuTrainer）、多线程下载加速（IDM）、Minecraft 1.21.11 游戏整合包与资源包，适配学校机房环境（无音频、轻量化、免安装），让信息课体验更流畅、更自由。',
            'index.about.card3.title': '技术特性',
            'index.about.card3.text': '采用毛玻璃（Glassmorphism）界面设计，支持明暗主题自动切换与中/繁/英三语，多线程加速下载，所有文件轻量化免安装运行，由 GitHub Pages 驱动，安全可靠。',
            'index.about.card4.title': '联系作者',
            'index.about.card4.text': 'QQ：3860517347 · 微信：stardragon142857<br/>如有问题、建议或合作，欢迎随时联系！',
            // ---- minecraft.html ----
            'mc.title': 'Minecraft 1.21.11 资源下载',
            'mc.subtitle': '专为学校信息课打造',
            'mc.guide': '新手引导',
            'mc.alert': '如果您第一次来到此网站，请务必阅读新手引导',
            'mc.f1': 'SURVIVAL_hmcl_1.21.11.exe(普通整合包)',
            'mc.f2': 'idman642build63.exe(IDM 多线程下载器安装程序)',
            'mc.f3': 'JiYuTrainer(极域管理程序)',
            'mc.f4': 'Resourcepacks(资源包)',
            'mc.f5': 'Shaderpacks(光影包)',
            'mc.f6': 'Mods(模组)',
            'mc.f7': 'Datapacks(数据包)',
            'mc.f8': 'BUILDING_hmcl_1.21.11.exe(建筑党整合包)',
            'mc.f9': '1.21.11-Fabric.exe(含 Fabric 加载器的整合包)',
            // ---- study.html ----
            'study.title': '学习资源下载',
            'study.subtitle': '专为校园学习准备',
            'study.f1': '2026初高中新教材',
            // ---- website.html ----
            'web.title': '常用网站导航',
            'web.subtitle': '精选实用网站，一键直达',
            'web.section': '🎮 Minecraft 网页版',
            'web.label.site': '选择站点：',
            'web.label.version': '选择版本：',
            'web.go': '前往游玩',
            'web.visit': '前往访问',
            'web.mc120.name': 'Minecraft 1.20 网页版',
            'web.mc120.desc': '基于1.8.8版本内核，仅供体验',
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
            'web.alert.nomc120': '1.20 版网址尚未配置。',
            'web.s1': 'huang1111 网盘',
            'web.s2': '123 网盘',
            // ---- guide.html ----
            'guide.back': '← 返回上一级',
            'guide.toc': '目录',
            'guide.title': '新手引导',
            'guide.h2.read': '1. 阅读悉知',
            'guide.h3.notes': '1.1. 注意事项',
            'guide.note1': '请注意，阅读该新手引导需要一定时间。在此之前，如果您正在上信息课，请返回点击下载"JiYuTrainer.exe"和"Survival_MC1.21.11压缩包"2个文件。',
            'guide.note2': '<strong>⚠️ 如果您正在上信息课，请返回点击下载"<u>JiYuTrainer.exe</u>"和"<u>Survival_MC1.21.11压缩包</u>"2个文件。</strong>',
            'guide.h3.intro': '1.2. 介绍',
            'guide.h4.jyt': '1.2.1. 关于 JiYuTrainer',
            'guide.h4.idm': '1.2.2. 关于 IDM（Internet Download Manager）',
            'guide.h4.mc': '1.2.3. 关于 Minecraft 整合包',
            'guide.h4.huang': '1.2.4. 关于 huang1111 网盘',
            'guide.h2.download': '2. 下载安装 &amp; 使用步骤',
            'guide.h3.dlsteps': '2.1. 下载步骤',
            'guide.h4.idmsteps': '2.1.1. 使用 IDM 的下载安装步骤',
            'guide.h4.noidm': '2.1.2. 不使用 IDM 的下载步骤',
            'guide.h4.virus': '2.1.3. 报毒的解决方法',
            'guide.h3.usesteps': '2.2. 使用步骤',
            'guide.h4.jytuse': '2.2.1. JiYuTrainer 的使用步骤',
            'guide.h4.gamestart': '2.2.2. 游戏启动步骤',
            'guide.h4.resource': '2.2.3. 如何加载资源包',
            'guide.h4.datapack': '2.2.4 如何加载数据包',
            'guide.h3.upload': '2.3. 如何上传世界',
            'guide.h3.loadworld': '2.4. 如何加载世界',
            'guide.h3.server': '2.5. 如何加入服务器',
            'guide.h2.thanks': '3. 鸣谢',
            // guide feature cards (h5)
            'guide.fc1': '下载速度加速',
            'guide.fc2': '从你喜欢的网站下载文件',
            'guide.fc3': '所有流行的浏览器都被支持',
            'guide.fc4': '一键下载',
            'guide.fc5': '黑暗主题',
            'guide.fc6': '动态分割',
            'guide.fc7': '下载简历',
            'guide.fc8': '内置调度器',
            'guide.fc9': 'IDM包含网站蜘蛛和抓取器',
            'guide.fc10': '可定制界面',
            'guide.fc11': '下载分类',
            'guide.fc12': '下载全部功能',
            'guide.fc13': 'IDM是多语言的',
            'guide.fc14': '快速更新',
            'guide.fc15': '下载限制',
            'guide.fc16': '自动杀毒检查',
            'guide.fc17': '简单安装向导',
            'guide.fc18': 'IDM 支持多种类型的代理服务器',
            'guide.fc19': 'IDM 支持主要认证协议：Basic、Negotiate、NTLM 和 Kerberos',
            'guide.fc20': '拖放',
            'guide.fc21': '高级浏览器集成',
            // guide body content
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
            'guide.idm.p1': 'IDM 是 TONEC 公司的一款下载加速器，可将下载速度提升最多 8 倍，恢复下载、组织和调度下载。（<a href="https://www.internetdownloadmanager.com" target="_blank">https://www.internetdownloadmanager.com</a>）',
            'guide.idm.p2': '功能如下（依旧官网，Edge 翻译不一定准确）：',
            'guide.fc1.p': '互联网下载管理器凭借其智能动态文件分段技术，将下载速度提升最多 8 倍。与其他下载管理器和加速器不同，互联网下载管理器在下载过程中动态地下载文件， 并且它在没有额外连接和登录阶段的情况下，重新利用可用连接，以实现最佳的加速性能。',
            'guide.fc2.p': '安装"IDM集成模块"浏览器扩展后，继续上网，你会惊讶于从你喜欢的网站下载所有想要的东西是多么简单。',
            'guide.fc3.p': 'IDM 无缝集成到 Microsoft Edge、Google Chrome、Mozilla Firefox、Opera、Internet Explorer、Safari、MSN Explorer、AOL、Mozilla Firebird、Avant Browser、Maxthon 以及所有其他流行浏览器，自动处理您的下载。',
            'guide.fc4.p': '当你在浏览器中点击下载链接时，IDM会接管并加速下载过程。你不需要做什么特别的事，只要像平时一样浏览互联网就行。 IDM会捕捉你的下载并加速。IDM支持HTTP、FTP、HTTPS和MMS协议。',
            'guide.fc5.p': 'IDM暗色主题在其大部分界面上显示暗色表面。它被设计为默认（或轻量）主题的补充模式。暗色调降低了屏幕发出的亮度，同时仍能达到最低的色彩对比度。 它通过减少眼睛疲劳、根据当前光线调整亮度、便于在黑暗环境中使用屏幕同时节省电力，有助于改善视觉人体工学。',
            'guide.fc6.p': 'Internet Download Manager 优化了文件下载逻辑。IDM将下载文件动态划分为文件段，不同于其他下载加速器在下载开始前将下载文件分割一次。 动态分段显著提升下载性能。文件下载开始时，不清楚能打开多少连接。当新连接可用时，IDM会找到最大的段进行下载并将其一分为二。 因此，新连接开始从最大文件段的一半下载文件。IDM最大限度地减少了与服务器协商所需的时间，并保持所有连接的繁忙。',
            'guide.fc6.p2': '<a href="https://www.internetdownloadmanager.com/support/segmentation.html" target="_blank">更多关于动态分割的信息</a>',
            'guide.fc7.p': '互联网下载管理器会从中断处恢复未完成的下载。全面的错误恢复和恢复功能将重启因连接丢失或断开而中断的下载， 网络问题、电脑关机或意外停电。',
            'guide.fc8.p': 'Internet Download Manager可以在指定时间连接互联网，下载你想要的文件，断开连接，完成后关闭电脑。你也可以通过文件的周期性同步来同步变更。 可以创建并安排多个下载队列用于下载或同步。',
            'guide.fc9.p': 'IDM下载所有通过筛选器指定的网站文件，例如网站的所有图片、网站子集，或完整网站供离线浏览。 你可以安排多个抓取项目在指定时间运行一次，在指定时间停止，或定期运行以同步变更。',
            'guide.fc10.p': '你可以选择在主IDM窗口中显示的顺序、按钮和列。工具栏有几种不同的皮肤，按键样式各异。所有皮肤都可以从IDM主页下载。用户也可以设计自己的皮肤。',
            'guide.fc10.p2': '<a href="https://www.internetdownloadmanager.com/support/toolbar2.html" target="_blank">选择并设置新的IDM工具栏</a>',
            'guide.fc11.p': '互联网下载管理器可用于根据定义的下载类别自动组织下载。',
            'guide.fc12.p': 'IDM可以添加所有链接到当前页面的下载内容。使用这个功能很容易下载多个文件。',
            'guide.fc13.p': 'IDM已被翻译成阿尔巴尼亚语、阿拉伯语、阿塞拜疆语、波斯尼亚语、保加利亚语、中文、克罗地亚语、捷克语、丹麦语、荷兰语、波斯语、法语、德语、希腊语、希伯来语、匈牙利语、意大利语、日语、韩语、立陶宛语、马其顿语、挪威语、波兰语、葡萄牙语， 罗马尼亚语、俄罗斯语、塞尔维亚语、斯洛伐克语、斯洛文尼亚语、西班牙语等。',
            'guide.fc14.p': '快速更新可能会检查IDM的新版本，并每周更新一次IDM。快速更新功能列出所有新增到最新版本的功能，并询问用户是否想将IDM更新到最新版本。',
            'guide.fc15.p': '带配额的渐进下载功能限制下载次数为每小时定义的数兆字节。该功能对使用公平接入政策（FAP）的连接非常有用，如Direcway、Direct PC、Hughes等。',
            'guide.fc16.p': '杀毒检测让你的下载完全没有病毒和木马。IDM可以在下载完成时自动运行扫描器，如AdAware、Avast、Spybot、AVG杀毒软件、McAfee、Norton Internet Security、Norton 360、SpywareBlaster， CCleaner 等保护用户免受有害下载文件侵害。',
            'guide.fc17.p': '快速简便的安装程序会为你设置必要的设置，并在结束时检查连接情况，确保安装互联网下载管理器顺利。',
            'guide.fc18.p': '例如，IDM 可与 Microsoft ISA 和 FTP 代理服务器合作。',
            'guide.fc19.p': '因此，IDM可以通过登录名和密码访问许多互联网和代理服务器。',
            'guide.fc20.p': '你只需拖拽链接到 IDM，然后将下载文件拖拽出 Internet Download Manager。',
            'guide.fc21.p': '启用后，该功能可用于捕获任何应用程序的下载。没有任何下载管理器具备此功能。',
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
            'guide.idmsteps.p1': '你需要下载名为 <code>idm642build63.exe</code> 的安装程序。',
            'guide.idmsteps.tip': '<strong>💡 提示：如果你是新手，先不下载这个，这属于进阶操作，特别是如果你已经开始下载我的 Survival_MC1.21.11 压缩包过半了。</strong>',
            'guide.idmsteps.p2': '安装步骤如下：',
            'guide.idmsteps.l1': '<strong>下载完成后，按照提示安装，一路点击"确定""我同意"即可。</strong>',
            'guide.idmsteps.l2': '<strong>安装完成后打开，关闭提示，点击"新建任务"，将网址粘贴进去。如果你的剪贴板有网址他会自动识别。</strong>',
            'guide.idmsteps.l3': '<strong>什么 (O_o)?? 你说网址在哪里？要先下载文件，再在浏览器的下载里先右键取消下载，再右键复制下载链接啊……</strong>',
            'guide.noidm.p': '正常浏览器下载还用我教？',
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
            'guide.thanks.l1': '感谢 bwe1211 的支持（<a href="https://bwe1211.github.io" target="_blank">https://bwe1211.github.io</a>）；',
            'guide.thanks.l2': '感谢 Internet Download Manager；',
            'guide.thanks.l3': '感谢 imengyu 的 JiYuTrainer；',
            'guide.thanks.l4': '感谢 huang1111 网盘；',
            'guide.thanks.l5': '感谢 HMCL，详细使用文档见 <a href="https://docs.hmcl.net/" target="_blank">新手导航 - HMCL 文档</a>；',
            'guide.thanks.l6': '不感谢 Mojang Studios！',
        },

        'zh-TW': {
            // ---- 通用 ----
            'common.back': '← 返回首頁',
            'common.dl': '前往下載',
            // ---- index.html ----
            'index.logo': '淵之魚冥下載站',
            'index.nav.home': '首頁',
            'index.nav.mc': 'Minecraft 專區',
            'index.nav.study': '學習資源',
            'index.nav.web': '常用網站',
            'index.nav.guide': '新手引導',
            'index.nav.about': '關於本站',
            'index.notice': '<span class="notice-icon">📢</span>\n<span><strong>新站上線！</strong> 所有資源已遷移至本站，後續更新請關注這裡，感謝支持！</span>',
            'index.title': '淵之魚冥檔案下載站',
            'index.subhead': '—— 專為校園資訊課與遊戲愛好者準備 ——',
            'index.intro1': '歡迎來到 <strong>淵之魚冥</strong> 的個人檔案倉庫！本站專注收錄各類實用資源，核心為 <strong>Minecraft 遊戲資源</strong>，同時涵蓋常用工具、擴充包及校園資訊課必備軟體。',
            'index.intro2': '所有檔案均經過精心整理，適配學校機房環境（無音訊、輕量化、免安裝），無需登入即可高速下載，讓您的資訊課體驗更流暢、更自由。',
            'index.intro3': '👇 點擊下方按鈕，快速進入 <strong>Minecraft 資源專區</strong>，獲取您需要的資源！',
            'index.faststart': '極速開始',
            'index.fasthint': '一鍵下載 自動下載程式(Specified).exe',
            'index.btn.mc': 'Minecraft 相關',
            'index.btn.study': '學習資源',
            'index.btn.web': '常用網站',
            'index.footer': '© 2026 YuanZhiYuMing · 站點由 <a href="https://pages.github.com/" target="_blank">Github Pages</a> 驅動',
            // ---- index.html about ----
            'index.about.title': '關於本站',
            'index.about.card1.title': '關於本站',
            'index.about.card1.text': '淵之魚冥下載站是 GitHub 賬戶 YuanZhiYuMing 的 Pages 站點，專門為 SHSSIP 資訊課設計，整合了啟動 Minecraft 所需的全部資源，包含極域控制、多執行緒下載器、遊戲整合包與資源包，無需登入即可高速下載。',
            'index.about.card2.title': '核心功能',
            'index.about.card2.text': '整合極域控制（JiYuTrainer）、多執行緒下載加速（IDM）、Minecraft 1.21.11 遊戲整合包與資源包，適配學校機房環境（無音訊、輕量化、免安裝），讓資訊課體驗更流暢、更自由。',
            'index.about.card3.title': '技術特性',
            'index.about.card3.text': '採用毛玻璃（Glassmorphism）介面設計，支援明暗主題自動切換與中/繁/英三語，多執行緒加速下載，所有檔案輕量化免安裝執行，由 GitHub Pages 驅動，安全可靠。',
            'index.about.card4.title': '聯絡作者',
            'index.about.card4.text': 'QQ：3860517347 · 微信：stardragon142857<br/>如有問題、建議或合作，歡迎隨時聯絡！',
            // ---- minecraft.html ----
            'mc.title': 'Minecraft 1.21.11 資源下載',
            'mc.subtitle': '專為學校資訊課打造',
            'mc.guide': '新手引導',
            'mc.alert': '如果您第一次來到此網站，請務必閱讀新手引導',
            'mc.f1': 'SURVIVAL_hmcl_1.21.11.exe(普通整合包)',
            'mc.f2': 'idman642build63.exe(IDM 多執行緒下載器安裝程式)',
            'mc.f3': 'JiYuTrainer(極域管理程式)',
            'mc.f4': 'Resourcepacks(資源包)',
            'mc.f5': 'Shaderpacks(光影包)',
            'mc.f6': 'Mods(模組)',
            'mc.f7': 'Datapacks(資料包)',
            'mc.f8': 'BUILDING_hmcl_1.21.11.exe(建築黨整合包)',
            'mc.f9': '1.21.11-Fabric.exe(含 Fabric 載入器的整合包)',
            // ---- study.html ----
            'study.title': '學習資源下載',
            'study.subtitle': '專為校園學習準備',
            'study.f1': '2026初高中新教材',
            // ---- website.html ----
            'web.title': '常用網站導航',
            'web.subtitle': '精選實用網站，一鍵直達',
            'web.section': '🎮 Minecraft 網頁版',
            'web.label.site': '選擇站點：',
            'web.label.version': '選擇版本：',
            'web.go': '前往遊玩',
            'web.visit': '前往存取',
            'web.mc120.name': 'Minecraft 1.20 網頁版',
            'web.mc120.desc': '基於1.8.8版本核心，僅供體驗',
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
            'web.alert.nomc120': '1.20 版網址尚未配置。',
            'web.s1': 'huang1111 網盤',
            'web.s2': '123 網盤',
            // ---- guide.html ----
            'guide.back': '← 返回上一級',
            'guide.toc': '目錄',
            'guide.title': '新手引導',
            'guide.h2.read': '1. 閱讀悉知',
            'guide.h3.notes': '1.1. 注意事項',
            'guide.note1': '請注意，閱讀該新手引導需要一定時間。在此之前，如果您正在上資訊課，請返回點擊下載"JiYuTrainer.exe"和"Survival_MC1.21.11壓縮包"2個檔案。',
            'guide.note2': '<strong>⚠️ 如果您正在上資訊課，請返回點擊下載"<u>JiYuTrainer.exe</u>"和"<u>Survival_MC1.21.11壓縮包</u>"2個檔案。</strong>',
            'guide.h3.intro': '1.2. 介紹',
            'guide.h4.jyt': '1.2.1. 關於 JiYuTrainer',
            'guide.h4.idm': '1.2.2. 關於 IDM（Internet Download Manager）',
            'guide.h4.mc': '1.2.3. 關於 Minecraft 整合包',
            'guide.h4.huang': '1.2.4. 關於 huang1111 網盤',
            'guide.h2.download': '2. 下載安裝 &amp; 使用步驟',
            'guide.h3.dlsteps': '2.1. 下載步驟',
            'guide.h4.idmsteps': '2.1.1. 使用 IDM 的下載安裝步驟',
            'guide.h4.noidm': '2.1.2. 不使用 IDM 的下載步驟',
            'guide.h4.virus': '2.1.3. 報毒的解決方法',
            'guide.h3.usesteps': '2.2. 使用步驟',
            'guide.h4.jytuse': '2.2.1. JiYuTrainer 的使用步驟',
            'guide.h4.gamestart': '2.2.2. 遊戲啟動步驟',
            'guide.h4.resource': '2.2.3. 如何載入資源包',
            'guide.h4.datapack': '2.2.4 如何載入資料包',
            'guide.h3.upload': '2.3. 如何上傳世界',
            'guide.h3.loadworld': '2.4. 如何載入世界',
            'guide.h3.server': '2.5. 如何加入伺服器',
            'guide.h2.thanks': '3. 鳴謝',
            'guide.fc1': '下載速度加速',
            'guide.fc2': '從你喜歡的網站下載檔案',
            'guide.fc3': '所有流行的瀏覽器都被支援',
            'guide.fc4': '一鍵下載',
            'guide.fc5': '黑暗主題',
            'guide.fc6': '動態分割',
            'guide.fc7': '下載簡歷',
            'guide.fc8': '內建排程器',
            'guide.fc9': 'IDM包含網站蜘蛛和抓取器',
            'guide.fc10': '可自訂介面',
            'guide.fc11': '下載分類',
            'guide.fc12': '下載全部功能',
            'guide.fc13': 'IDM是多語言的',
            'guide.fc14': '快速更新',
            'guide.fc15': '下載限制',
            'guide.fc16': '自動防毒檢查',
            'guide.fc17': '簡單安裝精靈',
            'guide.fc18': 'IDM 支援多種類型的代理伺服器',
            'guide.fc19': 'IDM 支援主要認證協議：Basic、Negotiate、NTLM 和 Kerberos',
            'guide.fc20': '拖放',
            'guide.fc21': '進階瀏覽器整合',
            // guide body content
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
            'guide.idm.p1': 'IDM 是 TONEC 公司的一款下載加速器，可將下載速度提升最多 8 倍，恢復下載、組織和排程下載。（<a href="https://www.internetdownloadmanager.com" target="_blank">https://www.internetdownloadmanager.com</a>）',
            'guide.idm.p2': '功能如下（依舊官網，Edge 翻譯不一定準確）：',
            'guide.fc1.p': '網際網路下載管理員憑藉其智慧動態檔案分段技術，將下載速度提升最多 8 倍。與其他下載管理器和加速器不同，網際網路下載管理員在下載過程中動態地下載檔案， 並且它在沒有額外連線和登入階段的情況下，重新利用可用連線，以實現最佳的加速效能。',
            'guide.fc2.p': '安裝"IDM整合模組"瀏覽器擴充功能後，繼續上網，你會驚訝於從你喜歡的網站下載所有想要的東西是多麼簡單。',
            'guide.fc3.p': 'IDM 無縫整合到 Microsoft Edge、Google Chrome、Mozilla Firefox、Opera、Internet Explorer、Safari、MSN Explorer、AOL、Mozilla Firebird、Avant Browser、Maxthon 以及所有其他流行瀏覽器，自動處理您的下載。',
            'guide.fc4.p': '當你在瀏覽器中點擊下載連結時，IDM會接管並加速下載過程。你不需要做什麼特別的事，只要像平時一樣瀏覽網際網路就行。 IDM會捕捉你的下載並加速。IDM支援HTTP、FTP、HTTPS和MMS協議。',
            'guide.fc5.p': 'IDM暗色主題在其大部分介面上顯示暗色表面。它被設計為預設（或輕量）主題的補充模式。暗色調降低了螢幕發出的亮度，同時仍能達到最低的色彩對比度。 它透過減少眼睛疲勞、根據當前光線調整亮度、便於在黑暗環境中使用螢幕同時節省電力，有助於改善視覺人體工學。',
            'guide.fc6.p': 'Internet Download Manager 最佳化了檔案下載邏輯。IDM將下載檔案動態劃分為檔案段，不同於其他下載加速器在下載開始前將下載檔案分割一次。 動態分段顯著提升下載效能。檔案下載開始時，不清楚能開啟多少連線。當新連線可用時，IDM會找到最大的段進行下載並將其一分為二。 因此，新連線開始從最大檔案段的一半下載檔案。IDM最大限度地減少了與伺服器協商所需的時間，並保持所有連線的繁忙。',
            'guide.fc6.p2': '<a href="https://www.internetdownloadmanager.com/support/segmentation.html" target="_blank">更多關於動態分割的資訊</a>',
            'guide.fc7.p': '網際網路下載管理員會從中斷處恢復未完成的下載。全面的錯誤恢復和恢復功能將重啟因連線遺失或斷開而中斷的下載， 網路問題、電腦關機或意外停電。',
            'guide.fc8.p': 'Internet Download Manager可以在指定時間連線網際網路，下載你想要的檔案，斷開連線，完成後關閉電腦。你也可以透過檔案的週期性同步來同步變更。 可以建立並安排多個下載佇列用於下載或同步。',
            'guide.fc9.p': 'IDM下載所有透過篩選器指定的網站檔案，例如網站的所有圖片、網站子集，或完整網站供離線瀏覽。 你可以安排多個抓取項目在指定時間執行一次，在指定時間停止，或定期執行以同步變更。',
            'guide.fc10.p': '你可以選擇在主IDM視窗中顯示的順序、按鈕和欄位。工具列有幾種不同的面板，按鍵樣式各異。所有面板都可以從IDM主頁下載。使用者也可以設計自己的面板。',
            'guide.fc10.p2': '<a href="https://www.internetdownloadmanager.com/support/toolbar2.html" target="_blank">選擇並設定新的IDM工具列</a>',
            'guide.fc11.p': '網際網路下載管理員可用於根據定義的下載類別自動組織下載。',
            'guide.fc12.p': 'IDM可以新增所有連結到目前頁面的下載內容。使用這個功能很容易下載多個檔案。',
            'guide.fc13.p': 'IDM已被翻譯成阿爾巴尼亞語、阿拉伯語、亞塞拜然語、波斯尼亞語、保加利亞語、中文、克羅埃西亞語、捷克語、丹麥語、荷蘭語、波斯語、法語、德語、希臘語、希伯來語、匈牙利語、義大利語、日語、韓語、立陶宛語、馬其頓語、挪威語、波蘭語、葡萄牙語， 羅馬尼亞語、俄羅斯語、塞爾維亞語、斯洛伐克語、斯洛維尼亞語、西班牙語等。',
            'guide.fc14.p': '快速更新可能會檢查IDM的新版本，並每週更新一次IDM。快速更新功能列出所有新增到最新版本的功能，並詢問使用者是否想將IDM更新到最新版本。',
            'guide.fc15.p': '帶配額的漸進下載功能限制下載次數為每小時定義的數百萬位元組。該功能對使用公平接入政策（FAP）的連線非常有用，如Direcway、Direct PC、Hughes等。',
            'guide.fc16.p': '防毒檢測讓你的下載完全沒有病毒和木馬。IDM可以在下載完成時自動執行掃描器，如AdAware、Avast、Spybot、AVG防毒軟體、McAfee、Norton Internet Security、Norton 360、SpywareBlaster， CCleaner 等保護使用者免受有害下載檔案侵害。',
            'guide.fc17.p': '快速簡便的安裝程式會為你設定必要的設定，並在結束時檢查連線情況，確保安裝網際網路下載管理員順利。',
            'guide.fc18.p': '例如，IDM 可與 Microsoft ISA 和 FTP 代理伺服器合作。',
            'guide.fc19.p': '因此，IDM可以透過登入名和密碼存取許多網際網路和代理伺服器。',
            'guide.fc20.p': '你只需拖曳連結到 IDM，然後將下載檔案拖曳出 Internet Download Manager。',
            'guide.fc21.p': '啟用後，該功能可用於捕捉任何應用程式的下載。沒有任何下載管理員具備此功能。',
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
            'guide.idmsteps.p1': '你需要下載名為 <code>idm642build63.exe</code> 的安裝程式。',
            'guide.idmsteps.tip': '<strong>💡 提示：如果你是新手，先不下載這個，這屬於進階操作，特別是如果你已經開始下載我的 Survival_MC1.21.11 壓縮包過半了。</strong>',
            'guide.idmsteps.p2': '安裝步驟如下：',
            'guide.idmsteps.l1': '<strong>下載完成後，按照提示安裝，一路點擊"確定""我同意"即可。</strong>',
            'guide.idmsteps.l2': '<strong>安裝完成後開啟，關閉提示，點擊"新增任務"，將網址貼上進去。如果你的剪貼簿有網址他會自動識別。</strong>',
            'guide.idmsteps.l3': '<strong>什麼 (O_o)?? 你說網址在哪裡？要先下載檔案，再在瀏覽器的下載裡先右鍵取消下載，再右鍵複製下載連結啊……</strong>',
            'guide.noidm.p': '正常瀏覽器下載還用我教？',
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
            'guide.thanks.l1': '感謝 bwe1211 的支援（<a href="https://bwe1211.github.io" target="_blank">https://bwe1211.github.io</a>）；',
            'guide.thanks.l2': '感謝 Internet Download Manager；',
            'guide.thanks.l3': '感謝 imengyu 的 JiYuTrainer；',
            'guide.thanks.l4': '感謝 huang1111 網盤；',
            'guide.thanks.l5': '感謝 HMCL，詳細使用文件見 <a href="https://docs.hmcl.net/" target="_blank">新手導航 - HMCL 文件</a>；',
            'guide.thanks.l6': '不感謝 Mojang Studios！',
        },

        'en': {
            // ---- common ----
            'common.back': '← Back to Home',
            'common.dl': 'Download',
            // ---- index.html ----
            'index.logo': 'YuanZhiYuMing Downloads',
            'index.nav.home': 'Home',
            'index.nav.mc': 'Minecraft',
            'index.nav.study': 'Study Resources',
            'index.nav.web': 'Websites',
            'index.nav.guide': 'Beginner Guide',
            'index.nav.about': 'About',
            'index.notice': '<span class="notice-icon">📢</span>\n<span><strong>New site launched!</strong> All resources have been migrated here. Follow for future updates. Thanks for your support!</span>',
            'index.title': 'YuanZhiYuMing File Download Hub',
            'index.subhead': '—— For campus IT classes & game enthusiasts ——',
            'index.intro1': 'Welcome to <strong>YuanZhiYuMing</strong>\'s personal file repository! This site focuses on practical resources, primarily <strong>Minecraft game assets</strong>, along with common tools, extension packs, and essential software for campus IT classes.',
            'index.intro2': 'All files are carefully organized and optimized for school computer lab environments (no audio, lightweight, portable). No login required for high-speed downloads, making your IT class experience smoother and freer.',
            'index.intro3': '👇 Click the buttons below to quickly enter the <strong>Minecraft Resource Hub</strong> and get what you need!',
            'index.faststart': 'Quick Start',
            'index.fasthint': 'One-click download Auto Downloader (Specified).exe',
            'index.btn.mc': 'Minecraft',
            'index.btn.study': 'Study Resources',
            'index.btn.web': 'Websites',
            'index.footer': '© 2026 YuanZhiYuMing · Powered by <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>',
            // ---- index.html about ----
            'index.about.title': 'About This Site',
            'index.about.card1.title': 'About This Site',
            'index.about.card1.text': 'YuanZhiYuMing Download Centre is a GitHub Pages site designed for SHSSIP IT classes, integrating all resources needed to launch Minecraft, including JiYuTrainer, multi-thread downloader, game packs and resource packs — no login required.',
            'index.about.card2.title': 'Core Features',
            'index.about.card2.text': 'JiYuTrainer (classroom control bypass), IDM multi-thread download acceleration, Minecraft 1.21.11 game packs and resource packs. Optimized for school computer labs (no audio, lightweight, portable).',
            'index.about.card3.title': 'Tech Highlights',
            'index.about.card3.text': 'Glassmorphism UI design, dark/light theme switching, trilingual support (CN/TC/EN), multi-threaded download acceleration, portable lightweight files, powered by GitHub Pages.',
            'index.about.card4.title': 'Contact',
            'index.about.card4.text': 'QQ: 3860517347 · WeChat: stardragon142857<br/>Feel free to reach out with questions, suggestions or collaborations!',
            // ---- minecraft.html ----
            'mc.title': 'Minecraft 1.21.11 Downloads',
            'mc.subtitle': 'Built for school IT classes',
            'mc.guide': 'Beginner Guide',
            'mc.alert': 'If this is your first visit, please read the Beginner Guide.',
            'mc.f1': 'SURVIVAL_hmcl_1.21.11.exe (Standard Pack)',
            'mc.f2': 'idman642build63.exe (IDM Downloader Installer)',
            'mc.f3': 'JiYuTrainer (Classroom Control Breaker)',
            'mc.f4': 'Resourcepacks',
            'mc.f5': 'Shaderpacks',
            'mc.f6': 'Mods',
            'mc.f7': 'Datapacks',
            'mc.f8': 'BUILDING_hmcl_1.21.11.exe (Builder Pack)',
            'mc.f9': '1.21.11-Fabric.exe (Fabric Modded Pack)',
            // ---- study.html ----
            'study.title': 'Study Resources',
            'study.subtitle': 'For campus learning',
            'study.f1': '2026 Middle & High School New Textbooks',
            // ---- website.html ----
            'web.title': 'Useful Websites',
            'web.subtitle': 'Curated useful websites, one click away',
            'web.section': '🎮 Minecraft Web',
            'web.label.site': 'Select site:',
            'web.label.version': 'Select version:',
            'web.go': 'Play Now',
            'web.visit': 'Visit',
            'web.mc120.name': 'Minecraft 1.20 Web',
            'web.mc120.desc': 'Based on 1.8.8 core, for demo only',
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
            'web.alert.nomc120': '1.20 version URL not configured.',
            'web.s1': 'huang1111 Cloud',
            'web.s2': '123 Cloud',
            // ---- guide.html ----
            'guide.back': '← Back',
            'guide.toc': 'Contents',
            'guide.title': 'Beginner Guide',
            'guide.h2.read': '1. Read Me First',
            'guide.h3.notes': '1.1. Important Notes',
            'guide.note1': 'Please note that reading this guide takes some time. If you are currently in an IT class, go back and download "JiYuTrainer.exe" and "Survival_MC1.21.11" first.',
            'guide.note2': '<strong>⚠️ If you are in an IT class right now, go back and download "<u>JiYuTrainer.exe</u>" and "<u>Survival_MC1.21.11</u>" first.</strong>',
            'guide.h3.intro': '1.2. Introduction',
            'guide.h4.jyt': '1.2.1. About JiYuTrainer',
            'guide.h4.idm': '1.2.2. About IDM (Internet Download Manager)',
            'guide.h4.mc': '1.2.3. About Minecraft Modpack',
            'guide.h4.huang': '1.2.4. About huang1111 Cloud',
            'guide.h2.download': '2. Download, Install & Usage',
            'guide.h3.dlsteps': '2.1. Download Steps',
            'guide.h4.idmsteps': '2.1.1. Using IDM',
            'guide.h4.noidm': '2.1.2. Without IDM',
            'guide.h4.virus': '2.1.3. Antivirus Warnings',
            'guide.h3.usesteps': '2.2. Usage Steps',
            'guide.h4.jytuse': '2.2.1. JiYuTrainer Usage',
            'guide.h4.gamestart': '2.2.2. Game Launch Steps',
            'guide.h4.resource': '2.2.3. Loading Resource Packs',
            'guide.h4.datapack': '2.2.4. Loading Data Packs',
            'guide.h3.upload': '2.3. Uploading Worlds',
            'guide.h3.loadworld': '2.4. Loading Worlds',
            'guide.h3.server': '2.5. Joining Servers',
            'guide.h2.thanks': '3. Credits',
            'guide.fc1': 'Download Speed Acceleration',
            'guide.fc2': 'Download from Your Favorite Sites',
            'guide.fc3': 'All Popular Browsers Supported',
            'guide.fc4': 'One-Click Download',
            'guide.fc5': 'Dark Theme',
            'guide.fc6': 'Dynamic Segmentation',
            'guide.fc7': 'Download Resume',
            'guide.fc8': 'Built-in Scheduler',
            'guide.fc9': 'IDM Site Spider & Grabber',
            'guide.fc10': 'Customizable Interface',
            'guide.fc11': 'Download Categories',
            'guide.fc12': 'Download All Feature',
            'guide.fc13': 'IDM is Multilingual',
            'guide.fc14': 'Quick Update',
            'guide.fc15': 'Download Limits',
            'guide.fc16': 'Auto Antivirus Check',
            'guide.fc17': 'Simple Installation Wizard',
            'guide.fc18': 'IDM Supports Various Proxy Servers',
            'guide.fc19': 'IDM Supports Major Auth Protocols: Basic, Negotiate, NTLM, Kerberos',
            'guide.fc20': 'Drag & Drop',
            'guide.fc21': 'Advanced Browser Integration',
            // guide body content
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
            'guide.idm.p1': 'IDM is a download accelerator by TONEC that can increase download speeds by up to 8 times, resume downloads, and organize and schedule downloads. (<a href="https://www.internetdownloadmanager.com" target="_blank">https://www.internetdownloadmanager.com</a>)',
            'guide.idm.p2': 'Features are as follows (from the official website, Edge translation may not be accurate):',
            'guide.fc1.p': 'Internet Download Manager uses its intelligent dynamic file segmentation technology to increase download speeds by up to 8 times. Unlike other download managers and accelerators, Internet Download Manager dynamically downloads files during the download process, and it reuses available connections without additional connection and login phases to achieve optimal acceleration performance.',
            'guide.fc2.p': 'After installing the "IDM integration module" browser extension, continue browsing and you\'ll be amazed at how easy it is to download everything you want from your favorite websites.',
            'guide.fc3.p': 'IDM seamlessly integrates into Microsoft Edge, Google Chrome, Mozilla Firefox, Opera, Internet Explorer, Safari, MSN Explorer, AOL, Mozilla Firebird, Avant Browser, Maxthon, and all other popular browsers, automatically handling your downloads.',
            'guide.fc4.p': 'When you click a download link in your browser, IDM takes over and accelerates the download process. You don\'t need to do anything special — just browse the internet as usual. IDM will catch your downloads and accelerate them. IDM supports HTTP, FTP, HTTPS, and MMS protocols.',
            'guide.fc5.p': 'The IDM dark theme displays dark surfaces on most of its interface. It is designed as a complementary mode to the default (or light) theme. The dark tone reduces the brightness emitted by the screen while still achieving the minimum color contrast. It helps improve visual ergonomics by reducing eye strain, adjusting brightness based on current lighting, making it easier to use the screen in dark environments while saving power.',
            'guide.fc6.p': 'Internet Download Manager optimizes the file download logic. IDM dynamically divides the downloaded file into segments, unlike other download accelerators that split the file once before the download begins. Dynamic segmentation significantly improves download performance. When the file download starts, it\'s unclear how many connections can be opened. When a new connection becomes available, IDM finds the largest segment to download and splits it in two. Therefore, the new connection starts downloading from half of the largest file segment. IDM minimizes the time required to negotiate with the server and keeps all connections busy.',
            'guide.fc6.p2': '<a href="https://www.internetdownloadmanager.com/support/segmentation.html" target="_blank">More information about dynamic segmentation</a>',
            'guide.fc7.p': 'Internet Download Manager resumes unfinished downloads from where they were interrupted. Comprehensive error recovery and resume capabilities will restart downloads interrupted by lost or dropped connections, network problems, computer shutdowns, or unexpected power outages.',
            'guide.fc8.p': 'Internet Download Manager can connect to the internet at a specified time, download the files you want, disconnect, and shut down the computer when done. You can also synchronize changes through periodic file synchronization. Multiple download queues can be created and scheduled for downloading or synchronization.',
            'guide.fc9.p': 'IDM downloads all website files specified by filters, such as all images on a website, a subset of the site, or a complete website for offline browsing. You can schedule multiple grabber projects to run once at a specified time, stop at a specified time, or run periodically to synchronize changes.',
            'guide.fc10.p': 'You can choose the order, buttons, and columns displayed in the main IDM window. The toolbar comes with several different skins and various button styles. All skins can be downloaded from the IDM homepage. Users can also design their own skins.',
            'guide.fc10.p2': '<a href="https://www.internetdownloadmanager.com/support/toolbar2.html" target="_blank">Choose and set up a new IDM toolbar</a>',
            'guide.fc11.p': 'Internet Download Manager can be used to automatically organize downloads based on defined download categories.',
            'guide.fc12.p': 'IDM can add all links on the current page to downloads. This feature makes it easy to download multiple files.',
            'guide.fc13.p': 'IDM has been translated into Albanian, Arabic, Azerbaijani, Bosnian, Bulgarian, Chinese, Croatian, Czech, Danish, Dutch, Persian, French, German, Greek, Hebrew, Hungarian, Italian, Japanese, Korean, Lithuanian, Macedonian, Norwegian, Polish, Portuguese, Romanian, Russian, Serbian, Slovak, Slovenian, Spanish, and more.',
            'guide.fc14.p': 'Quick Update can check for new versions of IDM and update IDM once a week. The Quick Update feature lists all features added to the latest version and asks the user whether they want to update IDM to the latest version.',
            'guide.fc15.p': 'The progressive download with quota feature limits the number of downloads to a defined number of megabytes per hour. This feature is very useful for connections that use a Fair Access Policy (FAP), such as Direcway, Direct PC, Hughes, etc.',
            'guide.fc16.p': 'Antivirus scanning makes your downloads completely free of viruses and trojans. IDM can automatically run scanners such as AdAware, Avast, Spybot, AVG Antivirus, McAfee, Norton Internet Security, Norton 360, SpywareBlaster, CCleaner, etc. when downloads complete, protecting users from harmful downloaded files.',
            'guide.fc17.p': 'The quick and easy installer will set up the necessary settings for you and check the connection at the end to ensure a smooth installation of Internet Download Manager.',
            'guide.fc18.p': 'For example, IDM can work with Microsoft ISA and FTP proxy servers.',
            'guide.fc19.p': 'Therefore, IDM can access many internet and proxy servers via login name and password.',
            'guide.fc20.p': 'You simply drag the link to IDM, then drag the downloaded file out of Internet Download Manager.',
            'guide.fc21.p': 'Once enabled, this feature can capture downloads from any application. No other download manager has this capability.',
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
            'guide.idmsteps.p1': 'You need to download the installer named <code>idm642build63.exe</code>.',
            'guide.idmsteps.tip': '<strong>💡 Tip: If you are a beginner, don\'t download this first. This is an advanced operation, especially if you have already downloaded more than half of my Survival_MC1.21.11 zip.</strong>',
            'guide.idmsteps.p2': 'Installation steps are as follows:',
            'guide.idmsteps.l1': '<strong>After downloading, follow the prompts to install. Just keep clicking "OK" and "I Agree".</strong>',
            'guide.idmsteps.l2': '<strong>After installation, open it, dismiss the prompt, click "New Task", and paste the URL in. If your clipboard has a URL, it will be recognized automatically.</strong>',
            'guide.idmsteps.l3': '<strong>What (O_o)?? You ask where the URL is? You need to start downloading the file first, then right-click to cancel the download in your browser\'s downloads, then right-click to copy the download link...</strong>',
            'guide.noidm.p': 'Do I really need to teach you how to download with a normal browser?',
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
            'guide.thanks.l1': 'Thanks to bwe1211 for the support (<a href="https://bwe1211.github.io" target="_blank">https://bwe1211.github.io</a>);',
            'guide.thanks.l2': 'Thanks to Internet Download Manager;',
            'guide.thanks.l3': 'Thanks to imengyu for JiYuTrainer;',
            'guide.thanks.l4': 'Thanks to huang1111 Cloud;',
            'guide.thanks.l5': 'Thanks to HMCL. For detailed documentation, see <a href="https://docs.hmcl.net/" target="_blank">Beginner Guide - HMCL Documentation</a>;',
            'guide.thanks.l6': 'No thanks to Mojang Studios!',
        }
    };

    // ========== 核心函数 ==========
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

        // 更新 data-i18n 元素
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            const text = I18N[lang] && I18N[lang][key];
            if (text !== undefined) {
                el.innerHTML = text;
            }
        });

        // 更新下拉菜单高亮
        document.querySelectorAll('.lang-dropdown-item').forEach(function(item) {
            if (item.getAttribute('data-lang') === lang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 触发回调
        callbacks.forEach(function(cb) { try { cb(lang); } catch(e) {} });
    }

    // ========== 下拉菜单 ==========
    let dropdown = null;

    function createDropdown() {
        if (dropdown) return dropdown;
        dropdown = document.createElement('div');
        dropdown.className = 'lang-dropdown';

        LANGS.forEach(function(lang) {
            const item = document.createElement('div');
            item.className = 'lang-dropdown-item';
            item.setAttribute('data-lang', lang);
            item.innerHTML = '<span>' + LANG_NAMES[lang] + '</span><span class="check">\u2713</span>';
            item.addEventListener('click', function() {
                applyLang(lang);
                hideDropdown();
            });
            dropdown.appendChild(item);
        });

        document.body.appendChild(dropdown);
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

    // ========== 初始化 ==========
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

        // 点击外部关闭
        document.addEventListener('click', function(e) {
            if (dropdown && !dropdown.contains(e.target) && !e.target.closest('.lang-toggle')) {
                hideDropdown();
            }
        });

        // 滚动时关闭
        window.addEventListener('scroll', hideDropdown, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
