// src/data/palettesData.js

export const palettesData = [
  {
    id: 'subcultural-monolith',
    name: 'Subcultural Monolith',
    cnName: '暗夜工业 / 黑色磐石',
    desc: '深邃高密度黑曜石基底，点缀高可见度信号红强冲撞点与工业冷钢边框，极致硬朗对冲。',
    colors: [
      { name: '暗影基底 (Base Void)', hex: '#0a0a0a', rgb: '10, 10, 10', oklch: '0.14 0.00 0' },
      { name: '甲板面板 (Surface Deck)', hex: '#1a1a1a', rgb: '26, 26, 26', oklch: '0.22 0.00 0' },
      { name: '警示绯红 (Signal Crimson)', hex: '#e63946', rgb: '230, 57, 70', oklch: '0.58 0.22 25' },
      { name: '纸实质感 (Paper Foreground)', hex: '#f1faee', rgb: '241, 250, 238', oklch: '0.97 0.01 140' },
      { name: '冷轧钢灰 (Muted Steel)', hex: '#457b9d', rgb: '69, 123, 157', oklch: '0.55 0.09 235' }
    ],
    prompt: 'Color palette: Ultra-dark monolith obsidian base (#0a0a0a), carbon surface deck (#1a1a1a), intense signal crimson (#e63946) high-visibility callouts, crisp off-white typography (#f1faee), cold engineering steel accents (#457b9d). High tactile contrast, zero generic pastel wash.',
    cssVariables: `:root {
  --color-bg-base: #0a0a0a;
  --color-bg-surface: #1a1a1a;
  --color-accent-signal: #e63946;
  --color-fg-primary: #f1faee;
  --color-fg-muted: #457b9d;
}`
  },
  {
    id: 'cyber-utilitarian',
    name: 'Cyber Utilitarian',
    cnName: '机能荧光 / 酸性终端',
    desc: '钛黑哑光机箱融合高电压酸性荧光黄遥测标记，散发冷峻的黑客终端与现代机能仪器质感。',
    colors: [
      { name: '虚空黑 (Void Black)', hex: '#121214', rgb: '18, 18, 20', oklch: '0.16 0.00 270' },
      { name: '容器铝板 (Container Plate)', hex: '#232326', rgb: '35, 35, 38', oklch: '0.26 0.00 280' },
      { name: '酸性荧光黄 (Acid Lime)', hex: '#ccff00', rgb: '204, 255, 0', oklch: '0.92 0.26 128' },
      { name: '遥测银灰 (Tech Secondary)', hex: '#8a8f98', rgb: '138, 143, 152', oklch: '0.64 0.02 260' },
      { name: '极光纯白 (Stark White)', hex: '#ffffff', rgb: '255, 255, 255', oklch: '1.00 0.00 0' }
    ],
    prompt: 'Color palette: Precision cyber utilitarian aesthetic. Deep matte black background (#121214), anodized aluminum dark container (#232326), high-voltage acid lime neon (#ccff00) for focus & active states, clinical telemetry silver (#8a8f98), stark optic white headers (#ffffff).',
    cssVariables: `:root {
  --color-bg-void: #121214;
  --color-bg-plate: #232326;
  --color-accent-lime: #ccff00;
  --color-text-secondary: #8a8f98;
  --color-text-primary: #ffffff;
}`
  },
  {
    id: 'swiss-modernist',
    name: 'Swiss Modernist',
    cnName: '瑞士平面排版 / 国际主义纸品',
    desc: '包豪斯与国际主义经典排版遗产，以实体哑光纸白、重墨沥青黑搭配国际警示红，秩序严明。',
    colors: [
      { name: '实体纸白 (Paper White)', hex: '#f7f7f5', rgb: '247, 247, 245', oklch: '0.98 0.00 90' },
      { name: '重铅浓黑 (Pitch Black)', hex: '#111111', rgb: '17, 17, 17', oklch: '0.18 0.00 0' },
      { name: '国际信号红 (International Red)', hex: '#ff3b30', rgb: '255, 59, 48', oklch: '0.63 0.24 29' },
      { name: '网格基线灰 (Grid Grey)', hex: '#8e8e93', rgb: '142, 142, 147', oklch: '0.66 0.01 270' }
    ],
    prompt: 'Color palette: Authentic Swiss Modernist graphic design. Raw matte paper stock white (#f7f7f5), heavy lead pitch black (#111111), legendary Swiss international signal red (#ff3b30), strict typographic grid grey (#8e8e93). High density contrast, deliberate print discipline.',
    cssVariables: `:root {
  --color-paper: #f7f7f5;
  --color-ink: #111111;
  --color-signal-red: #ff3b30;
  --color-grid: #8e8e93;
}`
  },
  {
    id: 'phosphor-terminal',
    name: 'Phosphor CRT Terminal',
    cnName: '荧光显像管 / 极客绿色微光',
    desc: '真空管显像管磷光绿穿透极深绿色机体，完美复现早期复古大型机监控终端的视觉记忆。',
    colors: [
      { name: '真空深暗 (Cathode Void)', hex: '#050a06', rgb: '5, 10, 6', oklch: '0.12 0.02 150' },
      { name: '终端机体 (Terminal Hull)', hex: '#0f1f13', rgb: '15, 31, 19', oklch: '0.21 0.04 150' },
      { name: '磷光荧绿 (Phosphor Glow)', hex: '#00ff66', rgb: '0, 255, 102', oklch: '0.86 0.28 145' },
      { name: '暗态日志绿 (Phosphor Muted)', hex: '#2e7d47', rgb: '46, 125, 71', oklch: '0.51 0.12 145' },
      { name: '扫描高亮绿 (Scanline High)', hex: '#99ffb8', rgb: '153, 255, 184', oklch: '0.93 0.14 145' }
    ],
    prompt: 'Color palette: Retro hacker CRT phosphor monitor. Vacuum deep green void (#050a06), telemetry chassis (#0f1f13), radiant high-intensity phosphor green (#00ff66), muted command log text (#2e7d47), high-contrast strobe highlights (#99ffb8).',
    cssVariables: `:root {
  --color-crt-base: #050a06;
  --color-crt-hull: #0f1f13;
  --color-crt-glow: #00ff66;
  --color-crt-muted: #2e7d47;
  --color-crt-bright: #99ffb8;
}`
  },
  {
    id: 'tokyo-neo-noir',
    name: 'Tokyo Neo-Noir',
    cnName: '东京夜行 / 霓虹暗调机能',
    desc: '潮湿雨夜沥青暗黑渗透赛博绯红与电子薰衣草紫，富有情绪张力与层次分明的暗调质感。',
    colors: [
      { name: '湿沥青夜 (Asphalt Wet)', hex: '#0e0b14', rgb: '14, 11, 20', oklch: '0.14 0.03 300' },
      { name: '午夜重紫 (Midnight Purple)', hex: '#1c152a', rgb: '28, 21, 42', oklch: '0.22 0.06 300' },
      { name: '霓虹冷玫 (Neon Rose)', hex: '#f43f5e', rgb: '244, 63, 94', oklch: '0.63 0.24 15' },
      { name: '赛博薰衣草 (Cyber Lavender)', hex: '#a78bfa', rgb: '167, 139, 250', oklch: '0.69 0.16 290' },
      { name: '高光星芒 (Vapor Starlight)', hex: '#fdf4ff', rgb: '253, 244, 255', oklch: '0.98 0.01 320' }
    ],
    prompt: 'Color palette: Tokyo neo-noir rain-drenched aesthetic. Deepest wet asphalt night (#0e0b14), moody industrial midnight purple (#1c152a), laser-sharp neon rose crimson (#f43f5e), sharp cyber lavender (#a78bfa), crisp vapor highlight (#fdf4ff).',
    cssVariables: `:root {
  --color-bg-noir: #0e0b14;
  --color-surface-noir: #1c152a;
  --color-accent-rose: #f43f5e;
  --color-accent-lavender: #a78bfa;
  --color-fg-bright: #fdf4ff;
}`
  }
];
