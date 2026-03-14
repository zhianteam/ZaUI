# 致安组件库 (ZaUI)

基于小米 MIUI 设计语言的轻量级前端组件库。零依赖，纯 CSS + JS，支持完整亮色/暗色主题，使用 `vw` 单位实现精准响应式布局。
UI DEMO https://zaui.zhian.org/demo.html
UI 切换动画测试 https://zaui.zhian.org/page-transition-test.html
---

## 文件结构

```
组件库/
├── css/
│   ├── base.css              # CSS 变量、主题、字体、全局重置
│   ├── icons.css             # 图标系统（Material Symbols Rounded，本地字体）
│   ├── components.css        # 核心组件样式
│   └── components-extra.css  # 扩展组件样式
├── js/
│   └── components.js         # 所有组件的 JS 逻辑，暴露 ZA 全局对象
├── demo.html                 # 完整组件演示
└── page-transition-test.html # 页面切换动画专项测试
```

---

## 快速开始

```html
<html lang="zh-CN" data-theme="light">
<head>
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/icons.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/components-extra.css">
</head>
<body>
    <!-- 你的内容 -->
    <script src="js/components.js"></script>
</body>
```

主题值：`light` | `dark`，切换时修改 `<html data-theme="">` 即可。

---

## 响应式断点

| 范围 | 单位 |
|------|------|
| < 670px（手机） | `vw` |
| 670px – 900px（平板） | `vw`（缩小系数） |
| > 900px（桌面） | `px` |

---

## 组件

### Button 按钮

```html
<button class="za-button">默认</button>
<button class="za-button za-button-primary">主要</button>
<button class="za-button za-button-small">小按钮</button>
<button class="za-button za-button-disable">禁用</button>
```

---

### Icon 图标

图标系统基于 **Material Symbols Rounded**（本地字体，无需联网）。

```html
<!-- 基础用法：类名控制尺寸，文字内容为图标名 -->
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

**填充风格（实心）**

```html
<i class="za-icon za-icon-md za-icon-filled">favorite</i>
```

**旋转动画（loading）**

```html
<i class="za-icon za-icon-md za-icon-loading">refresh</i>
```

**图标按钮**

```html
<button class="za-icon-button">
    <i class="za-icon za-icon-md">arrow_back</i>
</button>

<!-- 主色背景 -->
<button class="za-icon-button za-icon-button-primary">
    <i class="za-icon za-icon-md za-icon-white">check</i>
</button>
```

**常用图标速查**

| 用途 | 图标名 |
|------|--------|
| 返回 | `arrow_back` |
| 右箭头 | `chevron_right` |
| 关闭 | `close` |
| 确认 | `check` |
| 添加 | `add` |
| 删除 | `delete` |
| 编辑 | `edit` |
| 更多 | `more_vert` |
| 搜索 | `search` |
| 菜单 | `menu` |
| 首页 | `home` |
| 设置 | `settings` |
| 用户 | `person` |
| 通知 | `notifications` |
| 拍照 | `camera_alt` |
| 上传 | `upload` |
| 刷新 | `refresh` |

完整图标列表：[fonts.google.com/icons](https://fonts.google.com/icons?icon.style=Rounded)

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
    <!-- 右箭头（SVG inline 或用 za-icon） -->
    <img class="za-list-item-arrow" src="..." alt="">
</div>
```

---

### Switch 开关

```html
<!-- data-checked 控制初始状态 -->
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
    <input type="text" class="za-input" placeholder="请输入">
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

监听变化：

```javascript
checkbox.addEventListener('change', (e) => {
    console.log(e.detail.checked);
});
```

---

### Radio 单选框

```html
<label class="za-radio" data-name="group1" data-value="a" data-checked="true">
    <div class="za-radio-input"></div>
    <span class="za-radio-label">选项 A</span>
</label>
<label class="za-radio" data-name="group1" data-value="b" data-checked="false">
    <div class="za-radio-input"></div>
    <span class="za-radio-label">选项 B</span>
</label>
```

---

### Select 下拉选择

```html
<div class="za-select-wrapper">
    <select>
        <option value="">请选择</option>
        <option value="1">选项 1</option>
    </select>
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

### Appbar 应用栏

```html
<div class="za-appbar">
    <div class="za-toolbar">
        <button class="za-icon-button">
            <i class="za-icon za-icon-md">menu</i>
        </button>
        <span class="za-toolbar-title">应用标题</span>
        <div class="za-toolbar-spacer"></div>
        <button class="za-icon-button">
            <i class="za-icon za-icon-md">search</i>
        </button>
        <button class="za-icon-button">
            <i class="za-icon za-icon-md">more_vert</i>
        </button>
    </div>
</div>
```

---

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

<!-- 可滚动（标签过多时） -->
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
<!-- data-accordion="true" 开启手风琴模式（同时只展开一个） -->
<div class="za-panel" data-accordion="true">
    <div class="za-panel-item">
        <div class="za-panel-item-header">标题</div>
        <div class="za-panel-item-body">
            <div class="za-panel-item-body-inner">
                内容
            </div>
        </div>
    </div>
</div>
```

---

### Tooltip 工具提示

```html
<div class="za-tooltip">
    <button class="za-button">悬停查看</button>
    <div class="za-tooltip-content">提示内容</div>
</div>
```

---

### Ripple 波纹效果

```html
<button class="za-button za-button-primary za-ripple">点击</button>
```

---

### Grid 栅格系统

12 列栅格，支持响应式断点后缀 `-sm`（670px+）、`-md`（900px+）。

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

### Loading / Spinner

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

### 动画工具类

```html
<div class="za-animate-fade-in">淡入</div>
<div class="za-animate-slide-up">上滑进入</div>
<div class="za-animate-scale-in">缩放进入</div>

<!-- 列表项依次进入（自动计算延迟） -->
<div class="za-list-item za-list-item-animate">项目 1</div>
<div class="za-list-item za-list-item-animate">项目 2</div>
<div class="za-list-item za-list-item-animate">项目 3</div>
```

---

## JavaScript API

### ZA.toast()

```javascript
ZA.toast('消息内容');
ZA.toast('消息内容', 3000); // 自定义持续时间（ms），默认 2000
```

---

### ZA.modal()

```javascript
ZA.modal({
    title: '提示',
    content: '内容文字',          // 字符串或 DOM 元素
    confirmText: '确定',          // 默认 '确定'
    cancelText: '取消',           // 默认 '取消'
    showFooter: true,             // 是否显示底部按钮，默认 true
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
    duration: 3000,     // ms，默认 3000，设为 0 则不自动关闭
    closable: true,     // 是否显示关闭按钮
    actionText: '撤销', // 操作按钮文字（可选）
    onAction: () => {}  // 操作按钮回调（可选）
});
```

---

### ZA.showPage() / ZA.backPage()

页面切换动画系统，支持多层页面堆叠。

```javascript
// 推入新页面
ZA.showPage('<div>页面 HTML 内容</div>', {
    animation: 'slide-right', // 'fade' | 'slide-right' | 'slide-up' | 'scale'
    onEnter: () => {}
});

// 也可以传入 DOM 元素
ZA.showPage(domElement, { animation: 'fade' });

// 返回上一页
ZA.backPage({
    onExit: () => {}
});

// 清空所有页面层
ZA.clearPages();

// 获取当前页面层数
const count = ZA.getPageCount(); // number
```

在页面 HTML 内，给返回按钮加 `data-page-back` 属性即可自动绑定返回事件：

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
ZA.toggleTheme();         // 在 light/dark 之间切换，返回新主题名
const theme = ZA.getTheme(); // 'light' | 'dark'
```

---

## CSS 变量（主题定制）

主要变量定义在 `base.css` 的 `:root` 和 `[data-theme="dark"]` 中，可覆盖：

```css
:root {
    --theme-color: #ff6900;          /* 主题色 */
    --background-color: #f5f5f5;     /* 页面背景 */
    --card-background-color: #fff;   /* 卡片背景 */
    --text-title-color: #1a1a1a;     /* 标题文字 */
    --text-secondary-color: #666;    /* 次要文字 */
    --divider-color: #e8e8e8;        /* 分割线 */
    --icon-color: #333;              /* 图标默认色 */
}
```

---

## 设计规范

- 缓动函数：`cubic-bezier(0.3, 0, 0, 1)`
- 按下反馈：`scale(0.98)` 或 `scale(0.95)`
- 圆角：卡片 `3.703704vw`（桌面 `16px`），按钮 `2.314815vw`（桌面 `10px`）
- 字体栈：`mipro-medium, miui-bold, mipro, miui, "PingFang SC", "Microsoft YaHei", sans-serif`
