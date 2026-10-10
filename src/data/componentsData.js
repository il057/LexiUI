// src/data/componentsData.js

export const componentsData = [
  // 1. Navigation & Toggle
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
    id: 'tabs-underline',
    name: 'Tabs / Underline Navigation',
    cnName: '选项卡导航 / 下划线滑块指示',
    category: 'Navigation & Toggle',
    description: '经典顶层视图切换组件，拥有跟随活动标签平滑位移的霓虹下划线游标、微型计数徽章 (Counter Badge) 以及规范的 WAI-ARIA tablist 结构。',
    prompt: 'Tabbed navigation bar with animated sliding underline highlight, badge count counters, keyboard ArrowLeft/ArrowRight navigation, ARIA tablist role, subtle hover states.',
    tags: ['导航', '标签页', 'Tabs', '视图切换', '滑动游标'],
    sandboxType: 'tabs-underline'
  },
  {
    id: 'stepper-wizard',
    name: 'Stepper / Wizard',
    cnName: '步骤指示器 / 阶段引导器',
    category: 'Navigation & Toggle',
    description: '用于引导用户分阶段完成复杂任务的多步指示器，包含步骤连线进度槽、完成态勾选标记、当前激活步骤脉冲外环以及阶段标题元数据。',
    prompt: 'Horizontal stepper wizard with connecting progress track, completed checkmarks, pulsing active step ring, step titles, subtitle metadata, next/previous state control.',
    tags: ['步骤条', '流程', '向导', 'Stepper', '进度指示'],
    sandboxType: 'stepper-wizard'
  },
  {
    id: 'command-palette',
    name: 'Command Palette (Cmd+K)',
    cnName: '命令面板 / 快速控制台',
    category: 'Navigation & Toggle',
    description: '专为极客与高效操作设计的键盘优先全局命令面板（Cmd+K / Ctrl+K），提供半透明背景模糊、分区动作检索、快捷键徽章与模糊匹配。',
    prompt: 'Command palette modal overlay with blur backdrop, sectioned results (Actions, Navigation, Recent), shortcut badges (Kbd tags), fuzzy search filtering.',
    tags: ['命令', '快捷键', '全局弹窗', '生产力工具'],
    sandboxType: 'command-palette'
  },

  // 2. Form & Input
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
    id: 'combobox-autocomplete',
    name: 'Combobox / Autocomplete',
    cnName: '复合自动补全框 / 快速选择器',
    category: 'Form & Input',
    description: '结合可编辑文本输入框与锚定下拉筛选列表的复合组件，支持实时防抖联想搜索、键盘上下键循环高亮与回车快速选中。',
    prompt: 'Accessible combobox input with searchable dropdown, active state highlight, keyboard cycling (Arrow keys + Enter), debounce search, clear trigger button.',
    tags: ['输入', '搜索', '组合框', '自动补全'],
    sandboxType: 'combobox'
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
  },

  // 3. Overlay & Panels
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
    id: 'modal-dialog',
    name: 'Modal / Dialog',
    cnName: '模态对话框 / 阻塞确认窗',
    category: 'Overlay & Panels',
    description: '用于阻断当前流程并请求紧急决策的关键居中浮层，提供背景深度模糊（Backdrop Blur）、焦点锁定（Focus Trap）、硬派双色按键及高对比度边框。',
    prompt: 'Accessible centered modal dialog with backdrop blur, focus trap, escape key dismiss, destructive action accent, crisp 1px borders, smooth spring entrance scale.',
    tags: ['模态框', '对话框', '弹窗', '确认框', '阻断交互'],
    sandboxType: 'modal-dialog'
  },
  {
    id: 'popover-tooltip',
    name: 'Popover / Tooltip',
    cnName: '浮动气泡 / 定位浮层',
    category: 'Overlay & Panels',
    description: '定向锚定在触发目标周围的瞬态上下文气泡浮层，带有小三角定位指向（Beak Pointer），支持视口边界自动防溢出检测与点击外部区域关闭。',
    prompt: 'Floating popover anchored to trigger button, auto-placement with subtle scale-in animation, arrow beak pointer, dismiss on outside click, high-contrast dark card.',
    tags: ['浮层', '气泡', '工具提示', '上下文信息'],
    sandboxType: 'popover-tooltip'
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu / Context Menu',
    cnName: '下拉菜单 / 上下文动作列表',
    category: 'Overlay & Panels',
    description: '点击或右键呼出的级联操作面板，包含功能分组分割线、极客快捷键徽章（Kbd tags）、危险操作高亮指示及顺畅的键盘上下键巡检支持。',
    prompt: 'Floating dropdown menu with chevron trigger, grouped section dividers, keyboard shortcut kbd badges, destructive red highlight item, click outside to close.',
    tags: ['下拉菜单', '上下文菜单', '菜单', '快捷操作', '浮层'],
    sandboxType: 'dropdown-menu'
  },

  // 4. Feedback & Notice
  {
    id: 'toast-notification',
    name: 'Toast / Sonner',
    cnName: '浮动轻通知 / 状态提示栈',
    category: 'Feedback & Notice',
    description: '瞬态轻量级通知组件栈，支持多条并发通知智能垂直层叠、动态递减倒计时进度条、语义化彩色状态条及手势轻滑解除。',
    prompt: 'Stacked toast notifications (Sonner style) with auto-dismiss progress bar, status color accent strip, swipe-to-dismiss, subtle spring pop-in.',
    tags: ['通知', '轻提示', 'Toast', '反馈', '状态栈'],
    sandboxType: 'toast-notification'
  },
  {
    id: 'status-badge',
    name: 'Status Badge / Pill',
    cnName: '状态胶囊徽章 / 脉冲指示标签',
    category: 'Feedback & Notice',
    description: '用于指示系统节点在线、降级或停机状态的微型胶囊徽章，配备高频呼吸脉冲光标（Radar Ping Dot）、语义化彩色发光边框与工业单宽排版。',
    prompt: 'Status badge pill with pulsing live radar ping dot, semantic colorways (emerald online, amber warning, rose critical), tactile micro-typography.',
    tags: ['徽章', '状态', '胶囊', '脉冲灯', '微交互'],
    sandboxType: 'status-badge'
  },

  // 5. Data & Media
  {
    id: 'avatar-stack',
    name: 'Avatar Stack / Group',
    cnName: '头像堆叠簇 / 协作成员组',
    category: 'Data & Media',
    description: '展示多人协作实体的重叠头像列表，采用带背景裁切保护环（Cutout Ring）的重叠布局，悬浮时触发柔和展开拉伸微动效并提供 +N 溢出胶囊。',
    prompt: 'Overlapping avatar stack group with cutout border rings, hover z-index lift & expand spacing, overflow count badge (+N), online status indicator dot.',
    tags: ['头像', '用户组', '协作', '堆叠', '展示'],
    sandboxType: 'avatar-stack'
  },
  {
    id: 'segmented-meter',
    name: 'Segmented Progress / Meter',
    cnName: '分段计量槽 / 动态刻度条',
    category: 'Data & Media',
    description: '灵感来源于硬件电平表与工业仪表的离散刻度槽，将连续数值量化为微型发光 LED 栅格段落，具有超量警戒阈值变色及瞬态跳动响应。',
    prompt: 'Segmented industrial meter bar with discrete LED ticks, animated fill transition, percentage readout, neon glow threshold warning.',
    tags: ['进度条', '电平表', '计量槽', '工业风', '仪表'],
    sandboxType: 'segmented-meter'
  },
  {
    id: 'kbd-keycap',
    name: 'Kbd / Keycap Badge',
    cnName: '物理键帽徽章 / 机械键盘按键',
    category: 'Data & Media',
    description: '还原机械键盘轴体物理键帽质感的微型标签，具有厚实质感的三维倒角外边框、内凹字符印刷及真实按压下陷动效，极大增强极客输入仪式感。',
    prompt: 'Skeuomorphic tactile Kbd keycap badge with 3D bottom bevel, embossed font, press-down active state transform, high-contrast monospace legends.',
    tags: ['按键', '快捷键', 'Kbd', '键帽', '微质感'],
    sandboxType: 'kbd-keycap'
  },
  {
    id: 'skeleton-shimmer',
    name: 'Skeleton / Shimmer Loader',
    cnName: '骨架屏 / 脉冲流光占位符',
    category: 'Data & Media',
    description: '在异步数据未返回时维持界面布局稳定的占位结构，通过平滑扫过的 CSS 倾斜流光渐变波（Shimmer Wave）有效缓解用户等待焦虑感。',
    prompt: 'Skeleton shimmer loading placeholder with wave gradient sweep animation, rounded avatar and multi-line content bars, smooth transition to loaded state.',
    tags: ['骨架屏', '加载占位', '流光', 'Shimmer', '性能感知'],
    sandboxType: 'skeleton-shimmer'
  },

  // 6. Layout & Hierarchy
  {
    id: 'accordion',
    name: 'Accordion',
    cnName: '手风琴折叠面板 / 伸缩列表',
    category: 'Layout & Hierarchy',
    description: '垂直堆叠的交互式可折叠面板列表，点击标题项展开或收起对应内容，并伴随指示箭头平滑旋转与 CSS Grid 0fr 到 1fr 的高度自适应过渡。',
    prompt: 'Collapsible accordion panels with chevron smooth rotation, CSS grid row 0fr to 1fr height transition, strict keyboard accessibility, tactile active indicator.',
    tags: ['布局', '手风琴', '折叠面板', '常见问答', '内容揭示'],
    sandboxType: 'accordion'
  },
  {
    id: 'bento-grid',
    name: 'Bento Grid',
    cnName: '便当盒网格 / 不对称容器组',
    category: 'Layout & Hierarchy',
    description: '源自日式便当盒灵感的模块化非对称多格布局，通过不同跨列跨行的卡片拼接实现高信息密度、硬朗细内嵌描边与层次分明的视觉组织。',
    prompt: 'Bento grid layout with variable column spans (col-span-1 to col-span-3), high visual hierarchy, clean inner gutters, subtle 1px border highlight, tactile micro-cards.',
    tags: ['网格', '便当盒', '布局', '仪表盘', '工业风'],
    sandboxType: 'bento-grid'
  },
  {
    id: 'tree-view',
    name: 'Tree View / File Explorer',
    cnName: '树形视图 / 文件目录导航树',
    category: 'Layout & Hierarchy',
    description: '用于展示层级化树形结构（如工程目录）的交互导航列表，包含折叠连接辅助线、文件夹展开微动效、文件类型徽标与行级悬停焦点反馈。',
    prompt: 'Hierarchical file tree view with collapsible folders, indent guide lines, file type icons, active row indicator, keyboard arrow navigation.',
    tags: ['树形结构', '文件树', '层级', '导航', '资源管理器'],
    sandboxType: 'tree-view'
  }
];
