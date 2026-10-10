// src/data/aestheticsData.js

export const aestheticsData = [
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    cnName: '新粗野主义 / 高对比硬派',
    category: 'Expressive Modern',
    badge: 'HIGH IMPACT',
    traits: [
      '2px-3px 纯黑硬边框 (Solid black high-contrast borders)',
      '零模糊硬投影 (Hard drop shadows: 4px 4px 0px #000)',
      '复古工业纯色块点缀 (Utilitarian saturated accents: Acid Yellow, Signal Red)',
      '粗无衬线字体与大写标题 (Bold sans-serif typography, stark headers)'
    ],
    prompt: 'Neo-brutalist UI: high-contrast 2px solid black borders, hard drop shadows with zero blur offset (4px 4px 0px #000000), bold high-impact typography, retro utilitarian primary accents, zero soft gradient, crisp raw geometries, tactile stamped interaction.',
    cssSnippet: `border: 2px solid #000000;
box-shadow: 4px 4px 0px #000000;
border-radius: 0px;
font-weight: 800;`,
    demoStyle: {
      border: '2px solid #000',
      boxShadow: '4px 4px 0px #000',
      background: '#ffde59',
      color: '#000'
    }
  },
  {
    id: 'industrial-tactile',
    name: 'Subcultural Dark / Industrial Tactile',
    cnName: '暗色亚文化触感 / 工业机能',
    category: 'Hardware Aesthetic',
    badge: 'CORE THEME',
    traits: [
      '深碳灰与磨砂基底 (#0a0a0c, #14161a)',
      '等宽字体技术元数据与条形码 (Monospaced tech metadata, serial stamps)',
      '荧光红/酸性黄微弱发光信号灯 (Acid neon LED pips & high-visibility accents)',
      '实体卡槽压痕与倒角裁切 (Chamfered edge cuts, inset pressed gutters)'
    ],
    prompt: 'Dark tactical industrial aesthetic: deep charcoal base (#0c0e12), monospaced tech metadata, subtle inner stamped shadows, neon accent highlights (#ccff00, #ff3b30), physical cassette hardware vibe, chamfered edge cards, hard 1px borders (#222733).',
    cssSnippet: `background: #0f1115;
border: 1px solid #262b36;
box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.6);
font-family: 'JetBrains Mono', monospace;`,
    demoStyle: {
      border: '1px solid #2e3444',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.8)',
      background: '#12151b',
      color: '#e2e8f0'
    }
  },
  {
    id: 'swiss-modernist',
    name: 'Swiss International Style',
    cnName: '瑞士国际主义排版 / 极简秩序',
    category: 'Editorial Classic',
    badge: 'CLEAN ARCHIVE',
    traits: [
      '严谨模块化网格体系 (Strict mathematical grid alignments)',
      '单色灰阶搭配国际红 (Monochrome monochrome structure with international red #ff3b30)',
      '不对称空间层次与呼吸留白 (Asymmetrical balance and deliberate whitespace)',
      '全黑粗体无衬线字体层级 (Objective grotesque sans-serif typographic hierarchy)'
    ],
    prompt: 'Swiss International modernist layout: strict mathematical typography grid, stark black & paper-white contrast, razor-sharp asymmetric layout, international signal red (#ff3b30) micro accents, zero decorative clutter, objective functionalism.',
    cssSnippet: `background: #fbfbf9;
color: #111111;
border: 1px solid #d4d4d4;
letter-spacing: -0.03em;
font-weight: 700;`,
    demoStyle: {
      border: '1px solid #e5e5e5',
      background: '#ffffff',
      color: '#0a0a0a'
    }
  },
  {
    id: 'cyber-terminal',
    name: 'Cyber Utilitarian / Terminal',
    cnName: '机能终端极客 / 赛博监控屏',
    category: 'Sci-Fi Utilitarian',
    badge: 'TERMINAL HUD',
    traits: [
      '高密度数据仪表与坐标标识 (Telemetry stats, bracketed coordinates [SYS_OK])',
      '微细扫描线与点阵微底纹 (Micro scanlines, crt phosphors, dot matrix matrices)',
      '荧光青绿与酸性荧光黄 (Phosphor green #00ff66 or acid lime #ccff00)',
      '倒角卡槽与线框 HUD (Chamfered edge brackets and wireframe boundaries)'
    ],
    prompt: 'Cyber utilitarian telemetry terminal UI: high-density data HUD, scanline CRT matrix overlay, phosphor neon green & acid yellow accents, bracketed metadata [LAT_094], razor 1px borders, zero soft blur.',
    cssSnippet: `background: #080d0a;
border: 1px solid #00ff6633;
color: #00ff66;
text-shadow: 0 0 6px rgba(0,255,102,0.4);`,
    demoStyle: {
      border: '1px solid #00ff6655',
      background: '#060a08',
      color: '#00ff66'
    }
  }
];

export const negativeConstraints = [
  {
    id: 'neg-purple-gradient',
    title: '禁止千篇一律紫色/蓝粉渐变',
    en: 'AVOID generic purple-to-blue linear gradients',
    defaultEnabled: true,
    prompt: 'AVOID: generic purple-to-blue linear gradients, vibrant violet hero glow, cliché AI SaaS aesthetic.'
  },
  {
    id: 'neg-pill-shadow',
    title: '禁止无意义大圆角与软模糊阴影',
    en: 'AVOID overly soft rounded pill buttons with blurry drop shadows',
    defaultEnabled: true,
    prompt: 'AVOID: overly soft rounded pill buttons with blurry 24px fuzzy drop shadows, floaty unanchored elements.'
  },
  {
    id: 'neg-cookie-cutter',
    title: '禁止模版化 SaaS 居中通栏布局',
    en: 'AVOID cookie-cutter SaaS landing page hero layouts',
    defaultEnabled: true,
    prompt: 'AVOID: cookie-cutter SaaS landing page hero layouts, centered generic headline with two smiling stock illustrations.'
  },
  {
    id: 'neg-pastel-wash',
    title: '禁止低对比度粉彩灰洗脱色调',
    en: 'AVOID low-contrast washed-out pastel palettes',
    defaultEnabled: true,
    prompt: 'AVOID: pastel low-contrast color palettes, milky washed-out gray text (#9ca3af on white), unreadable accessibility.'
  },
  {
    id: 'neg-floating-blobs',
    title: '禁止无物理逻辑的悬浮 3D 彩球/气泡',
    en: 'AVOID floating meaningless 3D blobs and clayomorphic shapes',
    defaultEnabled: true,
    prompt: 'AVOID: meaningless floating 3D glass spheres, squishy clayomorphic clay balls, glossy candy bubble decorations.'
  }
];

export const surfaceTextures = [
  {
    id: 'micro-noise',
    name: 'Micro Film Noise / 胶片微噪点',
    desc: '微弱 2-4% 不透明度单色胶片微噪点，消除纯色数字塑料廉价感，赋予微观摄影表面质感。',
    prompt: 'Subtle monochromatic micro-noise grain texture (3% opacity), tactile photographic surface depth.',
    css: `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");`
  },
  {
    id: 'scanlines',
    name: 'Cathode Scanlines / 示波器扫描线',
    desc: '水平 2px 周期性 CRT 示波器阴极射线扫描线，提供半透明硬件监控与复古示波器质感。',
    prompt: 'Subtle horizontal CRT telemetry scanlines, 2px repeating pitch, translucent retro-tech monitor feel.',
    css: `background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
background-size: 100% 3px, 6px 100%;`
  },
  {
    id: 'hard-inset-border',
    name: 'Hard Inset Stamped Rim / 机械金属内嵌压痕',
    desc: '机械双轮廓内嵌工艺：外层 1px 工业深色边线与内层微弱顶部高光压痕。',
    prompt: 'Precision dual-rim industrial border with 1px dark contour and subtle inset top-edge highlight.',
    css: `border: 1px solid #232834;
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.5);`
  },
  {
    id: 'tactile-mesh-dots',
    name: 'Engineering Dot Matrix / 活页工程点阵网格',
    desc: '模块化 14px 坐标工程点阵底纹，为界面提供如实体工程图纸般的坐标网格对齐感。',
    prompt: 'Engineering drafting dot-matrix grid backing, 12px pitch, precision coordinate technical layout.',
    css: `background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
background-size: 14px 14px;`
  }
];
