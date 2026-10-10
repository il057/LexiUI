// src/data/fontsData.js

export const initialFontsData = [
  // ==========================================
  // 通道 1: ZeoSeven WebFonts CDN（开源中文字体切片通道）
  // ==========================================
  {
    id: 'zeo-572',
    channel: 'zeoseven',
    zeoId: '572',
    name: 'Unifont',
    cnName: '点阵泛用等宽像素体 (全字集中文)',
    category: 'Pixel / Monospace / CJK',
    categoryCn: '点阵像素 / 极客全字集',
    description: '经典等宽点阵像素字体，包含完整中文字符集与多语言符号，适用于复古工业、复古终端与极简极客 UI。',
    fontFamily: '"Unifont", monospace',
    cdnUrl: 'https://fontsapi.zeoseven.com/572/main/result.css',
    cssImport: '@import url("https://fontsapi.zeoseven.com/572/main/result.css");',
    cssRule: 'font-family: "Unifont", monospace;',
    role: '复古终端与点阵界面 (Retro Terminal)'
  },
  {
    id: 'zeo-2',
    channel: 'zeoseven',
    zeoId: '2',
    name: 'LXGW ZhenKai',
    cnName: '霞鹜臻楷 (中文高可读正文)',
    category: 'Humanist Serif / Editorial CJK',
    categoryCn: '人文楷宋 / 优美正文灰度',
    description: '极负盛名的开源中文臻楷体，融合楷书温润笔致与印刷宋体结构，在正文排版中具备极佳灰度与阅读节奏。',
    fontFamily: '"LXGW ZhenKai", "霞鹜臻楷", serif',
    cdnUrl: 'https://fontsapi.zeoseven.com/2/main/result.css',
    cssImport: '@import url("https://fontsapi.zeoseven.com/2/main/result.css");',
    cssRule: 'font-family: "LXGW ZhenKai", "霞鹜臻楷", serif;',
    role: '长文排版与人文典籍 (Editorial & Body)'
  },
  {
    id: 'zeo-79',
    channel: 'zeoseven',
    zeoId: '79',
    name: 'Clear Han Serif',
    cnName: '屏显臻宋 (屏显优化中文宋体)',
    category: 'Screen Serif / High Contrast',
    categoryCn: '高清宋体 / 屏幕阅读优化',
    description: '专为现代高清数字屏幕优化的中文宋体，横竖笔画比例经过微调，彻底解决传统宋体屏显过细发虚的问题。',
    fontFamily: '"Clear Han Serif", "屏显臻宋", serif',
    cdnUrl: 'https://fontsapi.zeoseven.com/79/main/result.css',
    cssImport: '@import url("https://fontsapi.zeoseven.com/79/main/result.css");',
    cssRule: 'font-family: "Clear Han Serif", "屏显臻宋", serif;',
    role: '高对比度标题与雅致界面 (High-contrast UI)'
  },
  {
    id: 'zeo-136',
    channel: 'zeoseven',
    zeoId: '136',
    name: 'Judou Sans Hans',
    cnName: '句读黑体 (现代极简高密度)',
    category: 'Geometric Sans / Utilitarian CJK',
    categoryCn: '机能黑体 / 工业信息密度',
    description: '现代高密度极简中文黑体，字面方正、布白均匀紧凑，非常契合工程仪表台、技术参数与数据监控界面。',
    fontFamily: '"Judou Sans Hans", "句读 Sans", sans-serif',
    cdnUrl: 'https://fontsapi.zeoseven.com/136/main/result.css',
    cssImport: '@import url("https://fontsapi.zeoseven.com/136/main/result.css");',
    cssRule: 'font-family: "Judou Sans Hans", "句读 Sans", sans-serif;',
    role: '仪表元数据与工业卡片 (Industrial Telemetry)'
  },

  // ==========================================
  // 通道 2: Google Fonts 精选通道（权威开源中文字体通道）
  // ==========================================
  {
    id: 'gf-noto-sans-sc',
    channel: 'google',
    name: 'Noto Sans SC',
    cnName: '思源黑体 (全字重现代界面中文)',
    category: 'Modern UI Sans / Complete CJK',
    categoryCn: '现代无衬线 / 中文界面基石',
    description: 'Google 与 Adobe 联合打造的中文界面工业级标杆无衬线体，笔形利落严谨、全字重支持，绝无系统默认字体的廉价感。',
    fontFamily: '"Noto Sans SC", sans-serif',
    cdnUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap',
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700;900&display=swap");',
    cssRule: 'font-family: "Noto Sans SC", sans-serif;',
    role: '现代通用界面正文与标题 (Modern Clean UI)'
  },
  {
    id: 'gf-noto-serif-sc',
    channel: 'google',
    name: 'Noto Serif SC',
    cnName: '思源宋体 (典雅人文中文宋体)',
    category: 'Classical Serif / Complete CJK',
    categoryCn: '权威宋体 / 典雅文学高级感',
    description: '权威开源中文衬线体，融合雕版印刷传统刀意与现代几何骨架，为标题与段落赋予极具质感的出版物级庄重感。',
    fontFamily: '"Noto Serif SC", serif',
    cdnUrl: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&display=swap',
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&display=swap");',
    cssRule: 'font-family: "Noto Serif SC", serif;',
    role: '典藏排版与仪式感大标题 (Luxury & Editorial)'
  },
  {
    id: 'gf-zcool-qingke-huangyou',
    channel: 'google',
    name: 'ZCOOL QingKe HuangYou',
    cnName: '站酷庆科黄油体 (复古工业圆角中文)',
    category: 'Retro Industrial / Bold Headline',
    categoryCn: '复古机能 / 工业厚实大字',
    description: '具有明显圆角特征的厚重工业中文粗体，末端方圆相济，极具复古招牌、科幻重工与先锋机能海报的强烈视觉张力。',
    fontFamily: '"ZCOOL QingKe HuangYou", cursive, sans-serif',
    cdnUrl: 'https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap',
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&display=swap");',
    cssRule: 'font-family: "ZCOOL QingKe HuangYou", cursive, sans-serif;',
    role: '硬核工业标题与机能徽章 (Heavy Industrial Poster)'
  },
  {
    id: 'gf-zcool-xiaowei',
    channel: 'google',
    name: 'ZCOOL XiaoWei',
    cnName: '站酷小薇体 (清冷细长古典艺术体)',
    category: 'Artistic Slender Serif',
    categoryCn: '修长清冷 / 文艺先锋设计',
    description: '笔画纤细、字腔收紧的高冷古风中文艺术体，横细竖粗，排版呈现超凡脱俗的气质，适合高端品牌与艺术化界面。',
    fontFamily: '"ZCOOL XiaoWei", serif',
    cdnUrl: 'https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap',
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap");',
    cssRule: 'font-family: "ZCOOL XiaoWei", serif;',
    role: '先锋艺术与极简高冷展标 (Avant-Garde Display)'
  },
  {
    id: 'gf-ma-shan-zheng',
    channel: 'google',
    name: 'Ma Shan Zheng',
    cnName: '马善政毛笔楷书 (苍劲中式书法)',
    category: 'Traditional Brush Calligraphy',
    categoryCn: '书法毛笔 / 苍劲国风力道',
    description: '刚劲浑厚的中国传统书法手书字体，笔力沉郁连贯，打破 AI 生成界面的工业冰冷感，适合国风机能与文化点睛。',
    fontFamily: '"Ma Shan Zheng", cursive',
    cdnUrl: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap',
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap");',
    cssRule: 'font-family: "Ma Shan Zheng", cursive;',
    role: '新国风机能与个性手书 (Neo-Traditional Calligraphy)'
  },
  {
    id: 'gf-jetbrains-mono',
    channel: 'google',
    name: 'JetBrains Mono',
    cnName: '工业机能代码等宽 (西文+中文无缝混排)',
    category: 'Monospace / Code Hardware',
    categoryCn: '代码等宽 / 仪器硬件连字',
    description: '业界公认的顶尖等宽编程字体，英数呈现高辨识度硬件仪器感，中文无缝平滑回退至思源黑体，混排层次分明。',
    fontFamily: '"JetBrains Mono", "Noto Sans SC", monospace',
    cdnUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
    cssImport: '@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap");',
    cssRule: 'font-family: "JetBrains Mono", "Noto Sans SC", monospace;',
    role: '终端代码与技术元数据 (Developer Terminal)'
  }
];
