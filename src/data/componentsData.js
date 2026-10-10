// src/data/componentsData.js

export const componentsData = [
  {
    id: 'segmented-control',
    name: 'Segmented Control',
    cnName: '分段选择器 / 胶囊切换栏',
    category: 'Navigation & Toggle',
    description: '一组水平线性排列的互斥分段选项，通过带有平滑弹性动效的背景滑动胶囊指示当前激活项，支持全键盘方向键无缝切换与高对比度聚焦环。',
    prompt: 'Segmented control with animated sliding active pill, tactile border, keyboard navigable (Arrow keys), aria-selected states, high-contrast active indicator.',
    tags: ['导航', '标签页', '胶囊', '切换器', '微交互'],
    sandboxType: 'segmented-control'
  },
  {
    id: 'slider-range',
    name: 'Slider / Range',
    cnName: '滑动条 / 范围控制器',
    category: 'Form & Input',
    description: '一种水平交互滑块控制器，允许用户通过带有填充高亮进度槽与分阶滑块的轨道进行精准数值调节，并提供拖拽数值气泡与触觉阻尼反馈。',
    prompt: 'Custom styled range slider with filled accent track, stepped thumb, tooltips on drag, keyboard step control (PageUp/PageDown), haptic visual feedback.',
    tags: ['输入', '范围', '滑块', '触觉控制'],
    sandboxType: 'slider-range'
  },
  {
    id: 'drawer-sheet',
    name: 'Drawer / Sheet',
    cnName: '抽屉面板 / 侧滑工作表',
    category: 'Overlay & Panels',
    description: '从屏幕边缘（底部或侧边）平滑滑出的可扩展面板容器，具备背景毛玻璃遮罩、拖拽下滑关闭手势、焦点锁定及实体防滑把手条。',
    prompt: 'Slide-out modal drawer with backdrop blur, drag-down dismiss gesture on mobile, focus trapping, tactile header latch handle, smooth spring entrance.',
    tags: ['浮层', '弹窗', '抽屉', '面板', '移动端'],
    sandboxType: 'drawer-sheet'
  },
  {
    id: 'accordion',
    name: 'Accordion',
    cnName: '手风琴折叠面板 / 伸缩列表',
    category: 'Layout & Disclosure',
    description: '垂直堆叠的交互式可折叠面板列表，点击标题项展开或收起对应内容，并伴随指示箭头平滑旋转与 CSS Grid 0fr 到 1fr 的高度自适应过渡。',
    prompt: 'Collapsible accordion panels with chevron smooth rotation, CSS grid row 0fr to 1fr height transition, strict keyboard accessibility, tactile active indicator.',
    tags: ['布局', '手风琴', '折叠面板', '常见问答', '内容揭示'],
    sandboxType: 'accordion'
  },
  {
    id: 'bento-grid',
    name: 'Bento Grid',
    cnName: '便当盒网格 / 不对称容器组',
    category: 'Layout Architecture',
    description: '源自日式便当盒灵感的模块化非对称多格布局，通过不同跨列跨行的卡片拼接实现高信息密度、硬朗细内嵌描边与层次分明的视觉组织。',
    prompt: 'Bento grid layout with variable column spans (col-span-1 to col-span-3), high visual hierarchy, clean inner gutters, subtle 1px border highlight, tactile micro-cards.',
    tags: ['网格', '便当盒', '布局', '仪表盘', '工业风'],
    sandboxType: 'bento-grid'
  },
  {
    id: 'popover-tooltip',
    name: 'Popover / Tooltip',
    cnName: '浮动气泡 / 定位浮层',
    category: 'Feedback & Context',
    description: '定向锚定在触发目标周围的瞬态上下文气泡浮层，带有小三角定位指向（Beak Pointer），支持视口边界自动防溢出检测与点击外部区域关闭。',
    prompt: 'Floating popover anchored to trigger button, auto-placement with subtle scale-in animation, arrow beak pointer, dismiss on outside click, high-contrast dark card.',
    tags: ['浮层', '气泡', '工具提示', '上下文信息'],
    sandboxType: 'popover-tooltip'
  },
  {
    id: 'combobox-autocomplete',
    name: 'Combobox / Autocomplete',
    cnName: '复合自动补全框 / 快速选择器',
    category: 'Search & Input',
    description: '结合可编辑文本输入框与锚定下拉筛选列表的复合组件，支持实时防抖联想搜索、键盘上下键循环高亮与回车快速选中。',
    prompt: 'Accessible combobox input with searchable dropdown, active state highlight, keyboard cycling (Arrow keys + Enter), debounce search, clear trigger button.',
    tags: ['输入', '搜索', '组合框', '自动补全'],
    sandboxType: 'combobox'
  },
  {
    id: 'command-palette',
    name: 'Command Palette (Cmd+K)',
    cnName: '命令面板 / 快速控制台',
    category: 'Navigation & Shortcuts',
    description: '专为极客与高效操作设计的键盘优先全局命令面板（Cmd+K / Ctrl+K），提供半透明背景模糊、分区动作检索、快捷键徽章与模糊匹配。',
    prompt: 'Command palette modal overlay with blur backdrop, sectioned results (Actions, Navigation, Recent), shortcut badges (Kbd tags), fuzzy search filtering.',
    tags: ['命令', '快捷键', '全局弹窗', '生产力工具'],
    sandboxType: 'command-palette'
  },
  {
    id: 'tactile-toggle-switch',
    name: 'Tactile Toggle Switch',
    cnName: '工业拨动开关 / 物理拨键',
    category: 'Form & Input',
    description: '模拟电子仪器物理拨动开关的双态硬件切换键，带有机械状态指示凹槽、双色状态信号指示灯与脆实质感的弹簧回弹位移动效。',
    prompt: 'Hardware-inspired tactile toggle switch with dual-color LED status indicator, embossed bezel groove, snappy spring toggle translation, accessible switch role.',
    tags: ['开关', '拨键', '工业风', '硬件质感'],
    sandboxType: 'tactile-switch'
  }
];
