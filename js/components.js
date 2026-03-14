/**
 * 致安组件库 - JavaScript
 * 基于小米MIUI设计语言
 */

(function(window) {
    'use strict';

    // ========== Toast 提示 ==========
    class Toast {
        constructor() {
            this.container = null;
            this.toast = null;
            this.timer = null;
            this.init();
        }

        init() {
            // 创建容器
            this.container = document.createElement('div');
            this.container.className = 'za-toast-container';
            
            // 创建toast
            this.toast = document.createElement('div');
            this.toast.className = 'za-toast';
            
            const text = document.createElement('div');
            text.className = 'za-toast-text';
            this.toast.appendChild(text);
            
            this.container.appendChild(this.toast);
            document.body.appendChild(this.container);
        }

        show(message, duration = 2000) {
            const text = this.toast.querySelector('.za-toast-text');
            text.textContent = message;
            
            // 清除之前的定时器
            if (this.timer) {
                clearTimeout(this.timer);
            }
            
            // 移除hide类，添加show类
            this.toast.classList.remove('hide');
            this.toast.classList.add('show');
            
            // 自动隐藏
            this.timer = setTimeout(() => {
                this.hide();
            }, duration);
        }

        hide() {
            this.toast.classList.remove('show');
            this.toast.classList.add('hide');
            
            // 动画结束后移除hide类
            setTimeout(() => {
                this.toast.classList.remove('hide');
            }, 300);
        }
    }

    // 创建全局Toast实例
    const toast = new Toast();

    // ========== Modal 模态框 ==========
    class Modal {
        constructor(options = {}) {
            this.options = {
                title: options.title || '',
                content: options.content || '',
                showFooter: options.showFooter !== false,
                confirmText: options.confirmText || '确定',
                cancelText: options.cancelText || '取消',
                onConfirm: options.onConfirm || null,
                onCancel: options.onCancel || null,
                onClose: options.onClose || null
            };
            
            this.mask = null;
            this.container = null;
            this.init();
        }

        init() {
            // 创建遮罩
            this.mask = document.createElement('div');
            this.mask.className = 'za-modal-mask';
            this.mask.addEventListener('click', () => this.close());
            
            // 创建容器
            this.container = document.createElement('div');
            this.container.className = 'za-modal-container';
            this.container.addEventListener('click', (e) => e.stopPropagation());
            
            // 标题
            if (this.options.title) {
                const title = document.createElement('div');
                title.className = 'za-modal-title';
                title.innerHTML = `<div class="za-modal-title-text">${this.options.title}</div>`;
                this.container.appendChild(title);
            }
            
            // 内容
            const content = document.createElement('div');
            content.className = 'za-modal-content';
            if (typeof this.options.content === 'string') {
                content.innerHTML = this.options.content;
            } else if (this.options.content instanceof HTMLElement) {
                content.appendChild(this.options.content);
            }
            this.container.appendChild(content);
            
            // 底部按钮
            if (this.options.showFooter) {
                const footer = document.createElement('div');
                footer.className = 'za-modal-footer';
                
                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'za-button';
                cancelBtn.textContent = this.options.cancelText;
                cancelBtn.addEventListener('click', () => this.cancel());
                
                const confirmBtn = document.createElement('button');
                confirmBtn.className = 'za-button za-button-primary';
                confirmBtn.textContent = this.options.confirmText;
                confirmBtn.addEventListener('click', () => this.confirm());
                
                footer.appendChild(cancelBtn);
                footer.appendChild(confirmBtn);
                this.container.appendChild(footer);
            }
            
            document.body.appendChild(this.mask);
            document.body.appendChild(this.container);
        }

        show() {
            // 强制重绘
            this.container.offsetHeight;
            
            this.mask.classList.add('show');
            this.container.classList.add('show');
        }

        hide() {
            this.mask.classList.remove('show');
            this.mask.classList.add('hide');
            this.container.classList.remove('show');
            this.container.classList.add('hide');
            
            setTimeout(() => {
                this.destroy();
            }, 300);
        }

        confirm() {
            if (this.options.onConfirm) {
                this.options.onConfirm();
            }
            this.hide();
        }

        cancel() {
            if (this.options.onCancel) {
                this.options.onCancel();
            }
            this.hide();
        }

        close() {
            if (this.options.onClose) {
                this.options.onClose();
            }
            this.hide();
        }

        destroy() {
            if (this.mask && this.mask.parentNode) {
                this.mask.parentNode.removeChild(this.mask);
            }
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
        }
    }

    // ========== Switch 开关 ==========
    function initSwitch() {
        document.querySelectorAll('.za-switch').forEach(switchEl => {
            if (switchEl.dataset.initialized) return;
            
            switchEl.dataset.initialized = 'true';
            switchEl.addEventListener('click', function() {
                const checked = this.dataset.checked === 'true';
                this.dataset.checked = !checked;
                
                // 触发change事件
                const event = new CustomEvent('change', {
                    detail: { checked: !checked }
                });
                this.dispatchEvent(event);
            });
        });
    }

    // ========== Checkbox 复选框 ==========
    function initCheckbox() {
        document.querySelectorAll('.za-checkbox').forEach(checkbox => {
            if (checkbox.dataset.initialized) return;
            
            checkbox.dataset.initialized = 'true';
            checkbox.addEventListener('click', function() {
                const checked = this.dataset.checked === 'true';
                this.dataset.checked = !checked;
                
                const event = new CustomEvent('change', {
                    detail: { checked: !checked }
                });
                this.dispatchEvent(event);
            });
        });
    }

    // ========== Radio 单选框 ==========
    function initRadio() {
        document.querySelectorAll('.za-radio').forEach(radio => {
            if (radio.dataset.initialized) return;
            
            radio.dataset.initialized = 'true';
            radio.addEventListener('click', function() {
                const name = this.dataset.name;
                if (name) {
                    // 取消同组其他radio
                    document.querySelectorAll(`.za-radio[data-name="${name}"]`).forEach(r => {
                        r.dataset.checked = 'false';
                    });
                }
                
                this.dataset.checked = 'true';
                
                const event = new CustomEvent('change', {
                    detail: { checked: true, value: this.dataset.value }
                });
                this.dispatchEvent(event);
            });
        });
    }

    // ========== Notification 通知 ==========
    class Notification {
        constructor() {
            this.container = null;
            this.timer = null;
        }

        show(options = {}) {
            const {
                message = '',
                type = 'info',
                duration = 3000,
                closable = true,
                actionText = '',
                onAction = null
            } = options;

            // 移除旧通知
            if (this.container) {
                this.hide();
            }

            // 创建通知
            this.container = document.createElement('div');
            this.container.className = `za-notification za-notification-${type}`;
            
            // 图标
            const iconMap = {
                success: 'check_circle',
                warning: 'warning',
                error: 'error',
                info: 'info'
            };
            
            const icon = document.createElement('i');
            icon.className = 'za-icon za-icon-md za-notification-icon';
            icon.textContent = iconMap[type] || 'info';
            
            // 内容
            const content = document.createElement('div');
            content.className = 'za-notification-content';
            content.textContent = message;
            
            this.container.appendChild(icon);
            this.container.appendChild(content);
            
            // 操作按钮
            if (actionText && onAction) {
                const actionBtn = document.createElement('button');
                actionBtn.className = 'za-notification-action';
                actionBtn.textContent = actionText;
                actionBtn.addEventListener('click', () => {
                    onAction();
                    this.hide();
                });
                this.container.appendChild(actionBtn);
            }
            
            // 关闭按钮
            if (closable) {
                const closeBtn = document.createElement('i');
                closeBtn.className = 'za-icon za-icon-sm za-notification-close';
                closeBtn.textContent = 'close';
                closeBtn.addEventListener('click', () => this.hide());
                this.container.appendChild(closeBtn);
            }
            
            document.body.appendChild(this.container);
            
            // 显示动画
            setTimeout(() => {
                this.container.classList.add('show');
            }, 10);
            
            // 自动隐藏
            if (duration > 0) {
                this.timer = setTimeout(() => {
                    this.hide();
                }, duration);
            }
        }

        hide() {
            if (!this.container) return;
            
            this.container.classList.remove('show');
            
            setTimeout(() => {
                if (this.container && this.container.parentNode) {
                    this.container.parentNode.removeChild(this.container);
                }
                this.container = null;
            }, 300);
            
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        }
    }

    const notification = new Notification();

    // ========== 主题切换 ==========
    function setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('za-theme', theme);
        }
    }

    function getTheme() {
        return localStorage.getItem('za-theme') || 'light';
    }

    function toggleTheme() {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        return newTheme;
    }

    // ========== 初始化 ==========
    function init() {
        // 初始化主题
        const savedTheme = getTheme();
        setTheme(savedTheme);
        
        // 初始化组件
        initSwitch();
        initCheckbox();
        initRadio();
        initPanel();
        initSlider();
        initRipple();
        initTooltip();
        initSelect();
        initTabs();
        
        // 监听DOM变化，自动初始化新添加的组件
        const observer = new MutationObserver(() => {
            initSwitch();
            initCheckbox();
            initRadio();
            initPanel();
            initSlider();
            initRipple();
            initTooltip();
            initSelect();
            initTabs();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========== 导出API ==========
    window.ZA = {
        // Toast
        toast: (message, duration) => toast.show(message, duration),
        
        // Modal
        modal: (options) => {
            const modal = new Modal(options);
            modal.show();
            return modal;
        },
        
        // Notification
        notification: (options) => notification.show(options),
        
        // 主题
        setTheme: setTheme,
        getTheme: getTheme,
        toggleTheme: toggleTheme,
        
        // 工具
        initSwitch: initSwitch,
        initCheckbox: initCheckbox,
        initRadio: initRadio,
        initPanel: initPanel,
        initSlider: initSlider,
        initRipple: initRipple,
        initTooltip: initTooltip,
        initSelect: initSelect,
        initTabs: initTabs
    };

})(window);

    // ========== Panel 折叠面板 ==========
    function initPanel() {
        document.querySelectorAll('.za-panel-item-header').forEach(header => {
            if (header.dataset.initialized) return;
            
            header.dataset.initialized = 'true';
            header.addEventListener('click', function() {
                const item = this.parentElement;
                
                // 如果是手风琴模式，关闭其他项
                const panel = item.parentElement;
                if (panel.dataset.accordion === 'true') {
                    panel.querySelectorAll('.za-panel-item').forEach(i => {
                        if (i !== item) {
                            i.classList.remove('active');
                        }
                    });
                }
                
                // 切换当前项
                item.classList.toggle('active');
            });
        });
    }

    // ========== Slider 滑块 ==========
    function initSlider() {
        document.querySelectorAll('.za-slider').forEach(slider => {
            if (slider.dataset.initialized) return;
            
            slider.dataset.initialized = 'true';
            const thumb = slider.querySelector('.za-slider-thumb');
            const track = slider.querySelector('.za-slider-track');
            const valueDisplay = slider.querySelector('.za-slider-value');
            
            let isDragging = false;
            let min = parseFloat(slider.dataset.min || 0);
            let max = parseFloat(slider.dataset.max || 100);
            let value = parseFloat(slider.dataset.value || 50);
            
            function updateSlider(newValue) {
                value = Math.max(min, Math.min(max, newValue));
                const percent = ((value - min) / (max - min)) * 100;
                
                track.style.width = percent + '%';
                thumb.style.left = percent + '%';
                if (valueDisplay) {
                    valueDisplay.textContent = Math.round(value);
                }
                
                // 触发change事件
                const event = new CustomEvent('change', {
                    detail: { value: value }
                });
                slider.dispatchEvent(event);
            }
            
            function handleMove(clientX) {
                const rect = slider.getBoundingClientRect();
                const percent = (clientX - rect.left) / rect.width;
                const newValue = min + (max - min) * percent;
                updateSlider(newValue);
            }
            
            // 鼠标事件
            thumb.addEventListener('mousedown', () => {
                isDragging = true;
            });
            
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    handleMove(e.clientX);
                }
            });
            
            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
            
            // 触摸事件
            thumb.addEventListener('touchstart', (e) => {
                isDragging = true;
                e.preventDefault();
            });
            
            document.addEventListener('touchmove', (e) => {
                if (isDragging) {
                    handleMove(e.touches[0].clientX);
                }
            });
            
            document.addEventListener('touchend', () => {
                isDragging = false;
            });
            
            // 点击滑块直接跳转
            slider.addEventListener('click', (e) => {
                if (e.target !== thumb) {
                    handleMove(e.clientX);
                }
            });
            
            // 初始化
            updateSlider(value);
        });
    }

    // ========== Ripple 波纹效果 ==========
    function initRipple() {
        document.querySelectorAll('.za-ripple').forEach(element => {
            if (element.dataset.initialized) return;
            
            element.dataset.initialized = 'true';
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'za-ripple-wave';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ========== Tooltip 工具提示 ==========
    function initTooltip() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            if (element.dataset.initialized) return;
            
            element.dataset.initialized = 'true';
            
            // 创建tooltip容器
            if (!element.classList.contains('za-tooltip')) {
                element.classList.add('za-tooltip');
            }
            
            const tooltip = document.createElement('div');
            tooltip.className = 'za-tooltip-content';
            tooltip.textContent = element.dataset.tooltip;
            element.appendChild(tooltip);
        });
    }

    // ========== Select 下拉选择 ==========
    function initSelect() {
        document.querySelectorAll('.za-select-wrapper').forEach(wrapper => {
            if (wrapper.dataset.initialized) return;
            
            wrapper.dataset.initialized = 'true';
            
            const select = wrapper.querySelector('select');
            if (!select) return;
            
            // 创建自定义选择器
            const customSelect = document.createElement('div');
            customSelect.className = 'za-select-custom';
            
            const selectedText = document.createElement('span');
            selectedText.className = 'za-select-custom-text';
            
            const arrow = document.createElement('i');
            arrow.className = 'za-icon za-select-custom-arrow';
            arrow.textContent = 'arrow_drop_down';
            
            customSelect.appendChild(selectedText);
            customSelect.appendChild(arrow);
            
            // 创建下拉选项容器
            const dropdown = document.createElement('div');
            dropdown.className = 'za-select-dropdown';
            
            // 创建遮罩
            const mask = document.createElement('div');
            mask.className = 'za-select-mask';
            
            // 生成选项
            const options = Array.from(select.options);
            options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'za-select-option';
                optionEl.textContent = option.text;
                optionEl.dataset.value = option.value;
                optionEl.dataset.index = index;
                
                if (option.disabled) {
                    optionEl.classList.add('disabled');
                }
                
                if (option.selected) {
                    optionEl.classList.add('selected');
                    selectedText.textContent = option.text;
                }
                
                // 点击选项
                optionEl.addEventListener('click', () => {
                    if (option.disabled) return;
                    
                    // 更新选中状态
                    dropdown.querySelectorAll('.za-select-option').forEach(el => {
                        el.classList.remove('selected');
                    });
                    optionEl.classList.add('selected');
                    
                    // 更新显示文本
                    selectedText.textContent = option.text;
                    
                    // 更新原生select
                    select.selectedIndex = index;
                    
                    // 触发change事件
                    const event = new Event('change', { bubbles: true });
                    select.dispatchEvent(event);
                    
                    // 关闭下拉
                    closeDropdown();
                });
                
                dropdown.appendChild(optionEl);
            });
            
            // 如果没有选中项，显示placeholder
            if (!selectedText.textContent) {
                selectedText.textContent = select.options[0]?.text || '请选择';
                selectedText.classList.add('za-select-custom-placeholder');
            }
            
            // 打开下拉
            function openDropdown() {
                customSelect.classList.add('active');
                dropdown.classList.add('show');
                mask.classList.add('show');
            }
            
            // 关闭下拉
            function closeDropdown() {
                customSelect.classList.remove('active');
                dropdown.classList.remove('show');
                mask.classList.remove('show');
            }
            
            // 点击自定义选择器
            customSelect.addEventListener('click', (e) => {
                e.stopPropagation();
                if (dropdown.classList.contains('show')) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            });
            
            // 点击遮罩关闭
            mask.addEventListener('click', closeDropdown);
            
            // 添加到DOM
            wrapper.appendChild(customSelect);
            wrapper.appendChild(dropdown);
            document.body.appendChild(mask);
            
            // 隐藏原生select
            select.classList.add('za-select');
        });
    }

    // ========== Tab 选项卡 ==========
    function initTabs() {
        document.querySelectorAll('.za-tabs').forEach(tabs => {
            if (tabs.dataset.initialized) return;
            
            tabs.dataset.initialized = 'true';
            
            const header = tabs.querySelector('.za-tabs-header');
            const tabItems = tabs.querySelectorAll('.za-tab-item');
            const tabPanes = tabs.querySelectorAll('.za-tab-pane');
            const indicator = tabs.querySelector('.za-tabs-indicator');
            
            if (!header || tabItems.length === 0) return;
            
            // 更新指示器位置
            function updateIndicator(activeItem) {
                if (!indicator) return;
                
                const itemRect = activeItem.getBoundingClientRect();
                const headerRect = header.getBoundingClientRect();
                const left = itemRect.left - headerRect.left + header.scrollLeft;
                const width = itemRect.width;
                
                indicator.style.left = left + 'px';
                indicator.style.width = width + 'px';
            }
            
            // 切换选项卡
            function switchTab(index) {
                // 更新选项卡状态
                tabItems.forEach((item, i) => {
                    if (i === index) {
                        item.classList.add('active');
                        updateIndicator(item);
                    } else {
                        item.classList.remove('active');
                    }
                });
                
                // 更新内容面板
                tabPanes.forEach((pane, i) => {
                    if (i === index) {
                        pane.classList.add('active');
                    } else {
                        pane.classList.remove('active');
                    }
                });
                
                // 触发change事件
                const event = new CustomEvent('change', {
                    detail: { index: index }
                });
                tabs.dispatchEvent(event);
            }
            
            // 绑定点击事件
            tabItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    switchTab(index);
                });
            });
            
            // 初始化第一个选项卡
            const activeIndex = Array.from(tabItems).findIndex(item => item.classList.contains('active'));
            if (activeIndex >= 0) {
                switchTab(activeIndex);
            } else {
                switchTab(0);
            }
            
            // 窗口大小改变时更新指示器
            window.addEventListener('resize', () => {
                const activeItem = tabs.querySelector('.za-tab-item.active');
                if (activeItem) {
                    updateIndicator(activeItem);
                }
            });
        });
    }


    // ========== Page Transition 页面切换 ==========
    let pageStack = [];
    let pageIdCounter = 0;

    function showPage(contentOrElement, options = {}) {
        const {
            animation = 'slide-right',
            onEnter = null,
        } = options;

        const pageId = ++pageIdCounter;

        let page;
        if (contentOrElement instanceof HTMLElement && contentOrElement.classList.contains('za-page')) {
            // 直接使用传入的页面节点
            page = contentOrElement;
            page.setAttribute('data-page-id', pageId);
        } else {
            // 创建页面容器
            page = document.createElement('div');
            page.className = 'za-page';
            page.setAttribute('data-page-id', pageId);
            if (typeof contentOrElement === 'string') {
                page.innerHTML = contentOrElement;
            } else if (contentOrElement instanceof HTMLElement) {
                page.appendChild(contentOrElement);
            }
        }

        // 如果有当前页面，添加退出动画
        if (pageStack.length > 0) {
            const currentPage = pageStack[pageStack.length - 1];
            if (currentPage) {
                currentPage.classList.add('za-page-slide-right-exit');
            }
        }

        // 添加进入动画
        page.classList.add(`za-page-${animation}-enter`);
        document.body.appendChild(page);

        // 绑定返回按钮（DOM已在body中，直接查询）
        page.querySelectorAll('[data-page-back]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                backPage();
            });
        });

        // 添加到栈
        pageStack.push(page);

        if (onEnter) {
            setTimeout(() => onEnter(), 280);
        }

        return pageId;
    }

    function backPage(options = {}) {
        if (pageStack.length === 0) {
            if (options.onError) options.onError('没有页面');
            return false;
        }

        const currentPage = pageStack.pop();
        const previousPage = pageStack.length > 0 ? pageStack[pageStack.length - 1] : null;

        // 当前页面退出（向右滑出）
        if (currentPage) {
            currentPage.classList.remove(
                'za-page-slide-right-enter', 'za-page-fade-enter',
                'za-page-slide-up-enter', 'za-page-scale-enter',
                'za-page-slide-right-exit'
            );
            currentPage.classList.add('za-page-slide-left-exit');
            
            setTimeout(() => {
                if (currentPage.parentNode) {
                    currentPage.parentNode.removeChild(currentPage);
                }
                if (options.onExit) options.onExit();
            }, 280);
        }

        // 上一页面恢复（移除退出动画类）
        if (previousPage) {
            previousPage.classList.remove('za-page-slide-right-exit');
            previousPage.classList.add('za-page-slide-left-enter');
            // 动画结束后清理
            setTimeout(() => {
                previousPage.classList.remove('za-page-slide-left-enter');
            }, 280);
            if (options.onEnter) {
                setTimeout(() => options.onEnter(), 280);
            }
        }

        return true;
    }

    function clearPages() {
        pageStack.forEach(page => {
            if (page.parentNode) {
                page.parentNode.removeChild(page);
            }
        });
        pageStack = [];
        pageIdCounter = 0;
    }

    function getPageCount() {
        return pageStack.length;
    }

    // ========== 添加到全局API ==========
    window.ZA.showPage = showPage;
    window.ZA.backPage = backPage;
    window.ZA.clearPages = clearPages;
    window.ZA.getPageCount = getPageCount;
