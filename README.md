# 致安组件库 (ZaUI)

基于小米 MIUI 设计语言的轻量级前端组件库。零依赖，纯 CSS + JS，完整亮色/暗色主题，使用 `vw` 单位实现精准响应式布局。

---

## 特性

- 🎨 **小米MIUI设计** - 完全对齐小米设计规范
- 🚀 **零依赖** - 纯CSS + 原生JavaScript
- 🌓 **完整主题** - 亮色/暗色主题自动切换
- 📱 **响应式** - vw单位 + 3个断点（手机/平板/桌面）
- 🎭 **Material Icons** - Material Symbols Rounded 图标系统
- ⚡ **流畅动画** - 统一的缓动函数和交互反馈

---

## 快速开始

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/components-extra.css">
</head>
<body>
    <!-- 你的内容 -->
    <button class="za-button za-button-primary">按钮</button>
    
    <script src="js/components.js"></script>
</body>
</html>
```

主题切换：修改 `<html data-theme="light">` 为 `dark` 或使用 `ZA.toggleTheme()`

---

## 文件结构

```
组件库/
├── css/
│   ├── base.css              # CSS变量、主题、字体、全局重置
│   ├── icons.css             # Material Symbols Rounded 图标
│   ├── components.css        # 核心组件样式
│   └── components-extra.css  # 扩展组件样式
├── js/
│   └── components.js         # 组件逻辑（暴露 ZA 全局对象）
├── demo.html                 # 完整组件演示
└── page-transition-test.html # 页面切换动画测试
```

---

## 响应式断点

| 设备 | 断点 | 单位 |
|------|------|------|
| 手机 | < 670px | vw |
| 平板 | 670px - 900px | vw（缩小） |
| 桌面 | > 900px | px |

---

## 核心组件

### Button 按钮

```html
<button class="za-button">默认按钮</button>
<button class="za-button za-button-primary">主要按钮</button>
<button class="za-button za-button-small">小按钮</button>
<button class="za-button za-button-disable">禁用按钮</button>
```

---

### Icon 图标

基于 **Material Symbols Rounded**，本地字体无需联网。

```html
<!-- 基础用法 -->
<i class="za-icon za-icon-md">home</i>
<i class="za-icon za-icon-md">arrow_back</i>
<i class="za-icon za-icon-md">close</i>
```

**尺寸**

| 类名 | 手机 | 桌面 |
|------|------|------|
| `za-icon-xxs` | 3.7vw | 12px |
| `za-icon-xs` | 5.6vw | 16px |
| `za-icon-sm` | 7.4vw | 20px |
| `za-icon-md` | 9.3vw | 24px |
| `za-icon-lg` | 11.1vw | 28px |

**颜色修饰符**

```html
<i class="za-icon za-icon-md za-icon-primary">star</i>
<i class="za-icon za-icon-md za-icon-success">check_circle</i>
<i class="za-icon za-icon-md za-icon-warning">warning</i>
<i class="za-icon za-icon-md za-icon-danger">cancel</i>
<i class="za-icon za-icon-md za-icon-muted">info</i>
<i class="za-icon za-icon-md za-icon-white">close</i>
```

**填充样式（实心）**

```html
<i class="za-icon za-icon-md za-icon-filled">favorite</i>
```

**加载动画**

```html
<i class="za-icon za-icon-md za-icon-loading">refresh</i>
```

**图标按钮**

```html
<button class="za-icon-button">
    <i class="za-icon za-icon-md">arrow_back</i>
</button>

<button class="za-icon-button za-icon-button-primary">
    <i class="za-icon za-icon-md za-icon-white">check</i>
</button>
```

**常用图标**

| 用途 | 图标名 | 用途 | 图标名 |
|------|--------|------|--------|
| 返回 | `arrow_back` | 右箭头 | `chevron_right` |
| 关闭 | `close` | 确认 | `check` |
| 添加 | `add` | 删除 | `delete` |
| 编辑 | `edit` | 更多 | `more_vert` |
| 搜索 | `search` | 菜单 | `menu` |
| 首页 | `home` | 设置 | `settings` |
| 用户 | `person` | 通知 | `notifications` |
| 拍照 | `camera_alt` | 上传 | `upload` |
| 刷新 | `refresh` | 收藏 | `favorite` |

完整图标：[fonts.google.com/icons](https://fonts.google.com/icons?icon.style=Rounded)

---

### Card 卡片

```html
<div class="za-card">
    <div class="za-card-title">标题</div>
    <div class="za-card-content">内容文字</div>
</div>
```

---

### ListItem 列表项

```html
<div class="za-list-item" onclick="...">
    <div class="za-list-item-label-wrap">
        <div class="za-list-item-label">标题</div>
        <div class="za-list-item-desc">描述文字</div>
    </div>
    <div class="za-list-item-slot">右侧内容</div>
    <img class="za-list-item-arrow" src="..." alt="">
</div>
```

---

### Switch 开关

```html
<div class="za-switch" data-checked="false">
    <div class="za-switch-point"></div>
</div>
```

监听变化：

```javascript
switchEl.addEventListener('change', (e) => {
    console.log(e.detail.checked); // true / false
});
```

---

### Input 输入框

```html
<div class="za-input-group">
    <label class="za-input-label">用户名</label>
    <input type="text" class="za-input" placeholder="请输入用户名">
</div>
```

---

### Checkbox 复选框

```html
<label class="za-checkbox" data-checked="false">
    <div class="za-checkbox-input"></div>
    <span class="za-checkbox-label">选项</span>
</label>
```

---

### Radio 单选框

```html
<label class="za-radio" data-name="group1" data-value="a" data-checked="true">
    <div class="za-radio-input"></div>
    <span class="za-radio-label">选项 A</span>
</label>
```

---

### Tag 标签

```html
<span class="za-tag">默认</span>
<span class="za-tag za-tag-primary">主要</span>
<span class="za-tag za-tag-success">成功</span>
<span class="za-tag za-tag-warning">警告</span>
<span class="za-tag za-tag-danger">危险</span>

<!-- 可关闭 -->
<span class="za-tag za-tag-primary">
    标签
    <i class="za-icon za-tag-close" onclick="this.parentElement.remove()">close</i>
</span>
```

---

### Progress 进度条

```html
<div class="za-progress">
    <div class="za-progress-bar" style="width: 70%;"></div>
</div>
<div class="za-progress-text">70%</div>
```

---

### Badge 徽章

```html
<!-- 圆点 -->
<div class="za-badge">
    <button class="za-icon-button">
        <i class="za-icon za-icon-md">notifications</i>
    </button>
    <span class="za-badge-dot"></span>
</div>

<!-- 数字 -->
<div class="za-badge">
    <button class="za-icon-button">
        <i class="za-icon za-icon-md">message</i>
    </button>
    <span class="za-badge-count">99+</span>
</div>
```

---

### Divider 分割线

```html
<hr class="za-divider">
<div class="za-divider-text">分割文字</div>
```

---

### Navbar 导航栏

```html
<div class="za-navbar">
    <div class="za-navbar-left">
        <button class="za-icon-button">
            <i class="za-icon za-icon-md">arrow_back</i>
        </button>
    </div>
    <div class="za-navbar-title">页面标题</div>
    <div class="za-navbar-right">
        <button class="za-icon-button">
            <i class="za-icon za-icon-md">more_vert</i>
        </button>
    </div>
</div>
```

---

### Loading 加载

```html
<!-- 简单三点加载 -->
<div class="za-loading">
    <div class="za-loading-point"></div>
</div>

<!-- 彩色圆形加载 -->
<div class="za-spinner za-spinner-colorful">
    <div class="za-spinner-layer"><div class="za-spinner-circle"></div></div>
    <div class="za-spinner-layer"><div class="za-spinner-circle"></div></div>
    <div class="za-spinner-layer"><div class="za-spinner-circle"></div></div>
    <div class="za-spinner-layer"><div class="za-spinner-circle"></div></div>
</div>
```

---

## 扩展组件

### Tabs 选项卡

```html
<div class="za-tabs">
    <div class="za-tabs-header">
        <div class="za-tab-item">首页</div>
        <div class="za-tab-item">发现</div>
        <div class="za-tab-item">我的</div>
        <div class="za-tabs-indicator"></div>
    </div>
    <div class="za-tabs-content">
        <div class="za-tab-pane">首页内容</div>
        <div class="za-tab-pane">发现内容</div>
        <div class="za-tab-pane">我的内容</div>
    </div>
</div>
```

**变体**

```html
<!-- 卡片式 -->
<div class="za-tabs card">...</div>

<!-- 可滚动 -->
<div class="za-tabs-header scrollable">...</div>

<!-- 带图标 -->
<div class="za-tab-item">
    <div class="za-tab-item-icon">
        <i class="za-icon">home</i>
        <span>首页</span>
    </div>
</div>
```

---

### Panel 折叠面板

```html
<div class="za-panel" data-accordion="true">
    <div class="za-panel-item">
        <div class="za-panel-item-header">标题</div>
        <div class="za-panel-item-body">
            <div class="za-panel-item-body-inner">内容</div>
        </div>
    </div>
</div>
```

---

### Slider 滑块

```html
<div class="za-slider" data-min="0" data-max="100" data-value="50">
    <div class="za-slider-track"></div>
    <div class="za-slider-thumb"></div>
</div>
<div class="za-slider-value">50</div>
```

---

### Grid 栅格

```html
<div class="za-container">
    <div class="za-row">
        <div class="za-col za-col-12 za-col-sm-6 za-col-md-4">列 1</div>
        <div class="za-col za-col-12 za-col-sm-6 za-col-md-4">列 2</div>
        <div class="za-col za-col-12 za-col-sm-6 za-col-md-4">列 3</div>
    </div>
</div>
```

---

## JavaScript API

### ZA.toast()

```javascript
ZA.toast('消息内容');
ZA.toast('消息内容', 3000); // 自定义持续时间（ms）
```

---

### ZA.modal()

```javascript
ZA.modal({
    title: '提示',
    content: '内容文字',          // 字符串或 DOM 元素
    confirmText: '确定',
    cancelText: '取消',
    showFooter: true,
    onConfirm: () => {},
    onCancel: () => {},
    onClose: () => {}
});
```

---

### ZA.notification()

```javascript
ZA.notification({
    message: '操作成功',
    type: 'success',    // 'info' | 'success' | 'warning' | 'error'
    duration: 3000,     // ms，0 = 不自动关闭
    closable: true,
    actionText: '撤销',
    onAction: () => {}
});
```

---

### ZA.showPage() / ZA.backPage()

页面切换动画系统。

```javascript
// 推入新页面
ZA.showPage('<div>页面内容</div>', {
    animation: 'slide-right', // 'fade' | 'slide-right' | 'slide-up' | 'scale'
    onEnter: () => {}
});

// 返回上一页
ZA.backPage({
    onExit: () => {}
});

// 清空所有页面
ZA.clearPages();

// 获取页面层数
const count = ZA.getPageCount();
```

页面内返回按钮：

```html
<button class="za-icon-button" data-page-back>
    <i class="za-icon za-icon-md">arrow_back</i>
</button>
```

---

### ZA.setTheme() / ZA.toggleTheme()

```javascript
ZA.setTheme('dark');      // 'light' | 'dark'
ZA.setTheme('light');
ZA.toggleTheme();         // 切换主题，返回新主题名
const theme = ZA.getTheme(); // 获取当前主题
```

---

## CSS 变量

主要变量定义在 `base.css`，可自定义覆盖：

```css
:root {
    --theme-color: #0d84ff;          /* 主题色 */
    --background-color: #fff;        /* 页面背景 */
    --text-title-color: #000;        /* 标题文字 */
    --text-secondary-color: #666;    /* 次要文字 */
    --divider-color: #e8e8e8;        /* 分割线 */
    --icon-color: #333;              /* 图标颜色 */
}
```

---

## 设计规范

- **缓动函数**: `cubic-bezier(0.3, 0, 0, 1)`
- **按压反馈**: `scale(0.98)` 或 `scale(0.95)`
- **圆角**: 卡片 `3.7vw` / 按钮 `9.3vw` (手机)
- **字体**: `mipro-medium, miui-bold, mipro, miui, "PingFang SC", "Microsoft YaHei", sans-serif`

---

## 浏览器支持

- Chrome / Edge (最新)
- Safari (最新)
- Firefox (最新)
- 移动端浏览器

---

## 许可证

MIT License
