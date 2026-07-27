# 🐟 渊之鱼冥下载站 (YZYM Download Station)

> 专为校园信息课与游戏爱好者准备的资源仓库 —— 无需登录，高速下载

![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-驱动-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ 项目简介

渊之鱼冥下载站是 **YuanZhiYuMing** 的个人文件仓库站点，基于 **GitHub Pages** 托管运行。本站专注收录各类实用资源，核心为 **Minecraft 游戏资源**，同时涵盖常用工具、扩展包及校园信息课必备软件。

所有文件均经过精心整理，适配学校机房环境（**无音频、轻量化、免安装**），无需登录即可高速下载。

## 🎯 核心功能

| 功能 | 说明 |
|------|------|
| 🔓 **极域控制破解** | 集成 [JiYuTrainer](https://github.com/imengyu/JiYuTrainer)，对抗极域电子教室全屏广播 |
| ⚡ **多线程下载加速** | 集成 IDM（Internet Download Manager），下载速度提升最高 8 倍 |
| 🎮 **Minecraft 整合包** | Java 版 1.21.11 精简整合包（HMCL 启动器），删除音频以加速下载 |
| 🌐 **Minecraft 网页版** | 内置多站点网页版 Minecraft，支持 1.8.8 / 1.12.2 及 WASM 版本 |
| 💡 **Full Bright 资源包** | 默认附带 Full Bright 资源包，更多资源包敬请期待 |
| 🌙 **毛玻璃界面设计** | Glassmorphism 风格 UI，支持明暗主题自动切换 |
| 🌐 **多语言支持** | 支持中文（简/繁）、英文三语切换 |

## 🚀 快速开始

### 方式一：一键下载（推荐）

点击首页 **「极速开始」** 按钮，自动下载并运行 `Specified().exe` 一键安装程序。

### 方式二：手动下载

1. 前往 [Minecraft 专区](minecraft.html) 下载所需文件
2. 如需加速，先安装 [IDM](#idm-使用说明)，再复制下载链接新建任务

## 📖 使用指南

### JiYuTrainer 使用方法

> 开源项目：[imengyu/JiYuTrainer](https://github.com/imengyu/JiYuTrainer)

**功能概览：**
- 将极域全屏广播自动转为窗口模式（自由操作 + 看演示两不误）
- 内置强杀/启停极域进程功能
- 破解极域解锁卸载密码（支持新版）
- 反监视 + 防控制功能
- 监控远程执行命令

**操作步骤：**
1. 双击运行 `JiYuTrainer.exe`
2. 点击「我同意」
3. 最小化即可，软件自动运行

> ⚠️ 某些杀毒软件可能报毒，需关闭或添加白名单

### Minecraft 启动步骤

1. 双击自解压程序 `SURVIVAL_hmcl_1.21.11.exe`，点击 **Extract** 继续
2. 解压完成后打开文件夹，双击 **HMCL.exe**
3. 弹窗点击「同意」→ 左侧「账户」添加账户 → 选择 **离线模式** → 输入名字并登录
4. 左上角返回 → 「通用」→「设置」→ 开启 **不检查游戏完整性**
5. 返回点击 **启动游戏 1.21.11**

### IDM 使用说明（可选）

> 官网：[Internet Download Manager](https://www.internetdownloadmanager.com)

1. 下载并安装 `idm642build63.exe`
2. 浏览器下载目标文件 → 在浏览器下载栏右键取消下载 → 右键 **复制下载链接**
3. 打开 IDM → 点击 **新建任务** → 粘贴链接 → 开始下载

### 如何加载资源包 / 数据包

详见完整教程：[新手引导](guide.html)

## 🎮 常用网站导航

本站提供精选实用网站一键直达功能，包括：

### Minecraft 网页版

无需下载客户端，直接在浏览器中游玩 Minecraft！

| 站点 | 地址 | 说明 |
|------|------|------|
| mcjs.cc | [前往](https://mcjs.cc) | 主流网页版 Minecraft |
| eaglercraft.ir | [前往](https://eaglercraft.ir) | Eaglercraft 网页版 |

**支持的版本：**
- **1.8.8** / **1.12.2** — JavaScript 版，兼容性好
- **1.8.8 WASM** / **1.12.2 WASM** — WebAssembly 版，性能更强

此外还提供基于 1.8.8 版本内核的 **Minecraft 1.20 网页版**，仅供体验。

> 💡 若主站无法访问，可尝试镜像站（最多提供 4 个节点含 IPv6）。

### 更多导航

访问 [常用网站](website.html) 页面获取完整导航列表。

## 🎨 技术特性

- **前端技术**：纯 HTML5 + CSS3 + Vanilla JavaScript
- **UI 设计**：Glassmorphism（毛玻璃）风格，响应式布局
- **主题系统**：CSS 自定义属性实现明暗双主题无缝切换
- **交互效果**：自定义光标动画、磁性按钮、3D 卡片倾斜效果
- **部署方式**：GitHub Pages，全球 CDN 加速
- **兼容性**：现代浏览器全支持（Chrome / Edge / Firefox / Safari）

## 📦 资源说明

### Minecraft 整合包详情

| 项目 | 说明 |
|------|------|
| 游戏版本 | Java Edition **1.21.11**（版本号命名变更前最后正式版） |
| Java 运行时 | Oracle JRE 21 |
| 启动器 | HMCL（Hello! Minecraft Launcher）较新版本 |
| 模组 | 纯原版（无模组） |
| 默认资源包 | Full Bright |
| 特殊优化 | 删除音频文件（信息课无扬声器），IDM 5 分钟内可下完 |

### 推荐网盘

🏆 **huang1111 网盘**（<https://pan.huang1111.cn>）

- ✅ 无需登录即可下载
- ✅ 免费容量 35G
- ✅ 支持任意格式/大小文件上传
- ✅ UI 美观无广告
- ✅ 无提取流量限制
- ✅ 下载不限速
- ✅ 注册无需手机验证码

## 📱 页面导航

| 页面 | 路径 | 说明 |
|------|------|------|
| 🏠 首页 | `index.html` | 主入口，站点介绍与快速开始 |
| 🎮 Minecraft 专区 | `minecraft.html` | 游戏整合包与资源下载 |
| 📚 学习资源 | `study.html` | 校园学习必备软件 |
| 🔗 常用网站 | `website.html` | 实用网站导航 & MC 网页版 |
| 📖 新手引导 | `guide.html` | 详细图文使用教程 |

## 🤝 鸣谢

- [bwe1211](https://bwe1211.github.io) — 技术支持
- [imengyu](https://github.com/imengyu/JiYuTrainer) — JiYuTrainer 开源项目
- [Internet Download Manager](https://www.internetdownloadmanager.com) — 下载加速工具
- [huang1111 网盘](https://pan.huang1111.cn) — 文件托管服务
- [HMCL](https://docs.hmcl.net/) — Minecraft 启动器及文档

## 📞 联系作者

| 方式 | 信息 |
|------|------|
| QQ | 3860517347 |
| 微信 | stardragon142857 |

如有问题、建议或合作欢迎随时联系！

---

## 📄 许可证

本项目采用 MIT 许可证开源。

---

<p align="center">
  <strong>© 2026 YuanZhiYuMing · 站点由 <a href="https://pages.github.com/">Github Pages</a> 驱动</strong>
</p>
