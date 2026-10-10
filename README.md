# LexiUI // Vibe Coding 专属 UI 审美发生器与组件视觉字典

> **LexiUI (Lexicon UI)** 是专为 Vibe Coding 与现代化前端交互设计的纯前端静态工具站。  
> 专门解决日常编程中“忘记前端组件标准英文名”、“AI 生成的界面缺乏质感、充满通用 AI 味（Generic AI Aesthetic）”以及“缺乏高级字体排版试样标本”的问题。

---

## ⚡ 核心定位与视觉隐喻

LexiUI 整体采用 **暗色高对比度物理档案夹 (Tactile Folder & Archive Metaphor)** 交互造型系统：
- **档案夹耳朵标签 (Chamfered Folder Tabs)**：主标签导航在顶部错落排布，未激活项在后层叠，激活项顶置并与内页无缝拼接。
- **工程索引卡片 (Index Cards)**：组件与调色板均带有硬朗的实体描边、打孔记号、工业条形码与状态指示。
- **侧挂硬纸板便签夹 (Attached Clipboard)**：右侧常驻/抽屉式 Prompt 拼接工作台，收集组件术语、字体排版规则、负向约束、调色板 CSS 变量与矢量图标，点击复制触发触觉盖印 (Stamp) 反馈。
- **杜绝 AI 塑料味 (Anti-AI Aesthetic)**：拒绝无边界留白、千篇一律的紫色/蓝粉渐变与 24px 大圆角毛玻璃，以实体硬轮廓、机械压痕 (Inset Shadows) 与高对比度工业荧光表达极客质感。

---

## 🗂️ 六大核心功能模块

### 1. 组件视觉字典 (Component Visual Index)
- 包含 `Segmented Control`、`Slider / Range`、`Drawer / Sheet`、`Accordion`、`Bento Grid`、`Popover / Tooltip`、`Combobox / Autocomplete`、`Command Palette`、`Tactile Toggle Switch` 等标准组件。
- 每个卡片集成纯手写原生 HTML/Tailwind **可交互微型沙盒原型 (Micro Sandbox)**。
- 大字英文名点击即复制，提供无障碍/键盘交互与布局专用的精准 AI Semantic Prompt。

### 2. 设计美学发生器 (UI Aesthetics & Anti-AI Presets)
- 内置 **Neo-Brutalism (新粗野主义)**、**Subcultural Dark (暗色亚文化触感)**、**Swiss Modernist (瑞士平面排版)**、**Cyber Utilitarian (机能终端)**。
- 默认搭载 **Anti-AI Negative Constraints (反 AI 模板味负向约束开关)**，一键编译 `[AVOID]` 负向提示词。
- 材质表面修饰库：微噪点 (Micro Noise)、扫描线 (CRT Scanlines)、机械金属内嵌压痕、工程点阵。

### 3. 调色板与配色系统 (Palette & CSS Variables)
- 硬件工业连续色带卡片，支持悬浮查看与一键复制 HEX / RGB / OKLCH 色值。
- 双格式输出：自然语言色彩描述 Prompt 与 `:root { --color-*: ... }` CSS 变量。

### 4. 交互与动效语义词典 (Motion & Transitions)
- 包含弹簧弹性阻尼 (Spring Physics, stiffness: 420, damping: 28)、阶梯交错淡入 (Stagger Reveal)、3D 跟手视差 (Parallax Tilt)、磁吸力 (Magnetic Snap) 与动力学无缝跑马灯 (Kinetic Marquee)。
- 内置实时可玩的物理动效交互沙盒。

### 5. SVG / 图标搜索 (Iconify Live Search)
- 直连 Iconify 开放接口 (`api.iconify.design`)，零后端依赖。
- 支持复制 Raw SVG Code、标准图标名与 Vue / JSX 组件标签代码，可一键送入 Prompt 工作台。

### 6. 字体排版试样与 CDN 预览标本卡 (Type Specimen & Font Sandbox)
- **双通道 WebFonts 免刷新动态加载**：
  1. **ZeoSeven WebFonts CDN（中文/小众开源通道）**：
     - 首发内置预设：ID: `572` | `Unifont` 点阵泛用等宽像素体。
     - **扩展能力**：支持自定义输入 ZeoSeven 字体 ID，动态请求 `result.css` 并自动提取 `font-family` 注入标本卡。
  2. **Google Fonts 精选通道（西文/现代排版通道）**：
     - 精选 6 款反 AI 质感免版权字体：`JetBrains Mono`（工业机能代码风）、`Space Grotesk`（怪诞现代无衬线）、`Syne`（激进实验性展示标题）、`Cinzel`（古典罗马衬线）、`Plus Jakarta Sans`（利落现代界面几何体）、`Silkscreen`（复古 8-bit 点阵）。
- **标本卡三态排版显示**：
  - **Header State (32px-40px 大字号视觉层级)**
  - **Body State (14px 正文灰度与多行混排，行高 1.6)**
  - **Tech / Glyph Set (符号、数字与多语言假名对齐测试)**
  - 支持顶部**全局测试文本实时同步修改**！
- **快捷复制与 Prompt 联动**：
  - 一键复制 CDN `@import` 链接、复制 `font-family` CSS 声明规则。
  - 一键加入 Prompt 工作台追加排版指导约束。

---

## 🚀 本地开发与打包部署

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地开发服务
```bash
npm run dev
```

### 3. 构建静态生产包（适配 GitHub Pages）
```bash
npm run build
```
打包输出位于 `dist/` 目录，已配置 `base: './'` 相对路径，可直接部署于 GitHub Pages 或任意静态 Web 托管服务。

---

## 🛠️ 技术栈
- **项目名称**：LexiUI
- **前端框架**：Vue 3 (Composition API / `<script setup>`)
- **构建工具**：Vite 8
- **样式方案**：Tailwind CSS v4 + 纯手写工业触觉设计系统
- **字体与 CDN**：Google Fonts + ZeoSeven WebFonts CDN
- **图标**：@lucide/vue + Iconify REST API
- **持久化**：原生 LocalStorage 自动记忆暂存状态
