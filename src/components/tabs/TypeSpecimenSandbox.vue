<template>
  <div class="space-y-6">
    <!-- 模块头部标头 / 印刷标本卡档案元数据 -->
    <div class="bg-[#12161f] border border-[#232a3a] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[3px_3px_0px_#000]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono-code px-2 py-0.5 bg-[#06b6d4] text-black font-extrabold uppercase">
            ARCHIVE // 06
          </span>
          <span class="text-xs font-mono-code text-[#7c889d]">TYPE SPECIMEN & CHINESE FONT SANDBOX</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display-tech">
          字体排版试样与 CDN 预览标本卡 (Type Specimen & Font Sandbox)
        </h2>
        <p class="text-xs text-[#8e98a8] mt-1 max-w-2xl font-mono-code leading-relaxed">
          双通道 WebFonts 免刷新按需动态加载。全量收录支持<b>完整中文（CJK）</b>的开源字体标本。支持全局或单卡加粗、斜体与字号自由调试。
        </p>
      </div>

      <!-- 快速通道筛选 -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="filter in channelFilters"
          :key="filter.key"
          @click="selectedChannel = filter.key"
          class="px-2.5 py-1 text-[11px] font-mono-code border transition-colors cursor-pointer"
          :class="selectedChannel === filter.key ? 'bg-[#06b6d4] text-black border-black font-bold' : 'bg-[#161b24] text-[#8e98a8] border-[#293245] hover:text-white'"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- 全局排版试样控制器 (文案同步、斜体/加粗/字号微调、ZeoSeven 动态导入) -->
    <div class="bg-[#131620] border border-[#222938] p-4 shadow-[3px_3px_0px_#000] space-y-4 font-mono-code">
      <!-- 控制器顶部: 标题与样式开关工具栏 (加粗、斜体、字号缩放) -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#1f2635] pb-3">
        <div class="flex items-center gap-2 text-white font-bold text-xs">
          <SlidersHorizontal class="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>全局排版样式与文案同步控制器 (LIVE TYPOGRAPHY CONTROLLER)</span>
        </div>

        <!-- 样式快速调节栏: 加粗/斜体/字号 -->
        <div class="flex items-center gap-2 flex-wrap text-xs">
          <!-- 字重控制 -->
          <div class="flex items-center bg-[#0d1017] border border-[#262f40] p-0.5">
            <span class="text-[10px] text-[#6b778d] px-2">字重:</span>
            <button
              v-for="w in weightOptions"
              :key="w.val"
              @click="globalWeight = w.val"
              class="px-2 py-0.5 text-[10px] transition-colors cursor-pointer"
              :class="globalWeight === w.val ? 'bg-[#06b6d4] text-black font-bold' : 'text-[#8e98a8] hover:text-white'"
            >
              {{ w.label }}
            </button>
          </div>

          <!-- 斜体开关 -->
          <button
            @click="globalItalic = !globalItalic"
            class="px-2.5 py-1 border text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            :class="globalItalic ? 'bg-[#ccff00] text-black border-black font-bold' : 'bg-[#0d1017] text-[#cbd5e1] border-[#262f40] hover:text-white'"
            title="切换斜体样式 (font-style: italic)"
          >
            <span class="italic font-serif font-bold text-xs">I</span>
            <span>斜体 (Italic)</span>
          </button>

          <!-- 下划线开关 -->
          <button
            @click="globalUnderline = !globalUnderline"
            class="px-2.5 py-1 border text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
            :class="globalUnderline ? 'bg-[#ccff00] text-black border-black font-bold' : 'bg-[#0d1017] text-[#cbd5e1] border-[#262f40] hover:text-white'"
            title="切换下划线样式"
          >
            <span class="underline font-bold text-xs">U</span>
            <span>下划线</span>
          </button>

          <!-- 字号倍率 -->
          <div class="flex items-center bg-[#0d1017] border border-[#262f40] p-0.5">
            <span class="text-[10px] text-[#6b778d] px-2">字号:</span>
            <button
              v-for="scale in scaleOptions"
              :key="scale.val"
              @click="globalScale = scale.val"
              class="px-2 py-0.5 text-[10px] transition-colors cursor-pointer"
              :class="globalScale === scale.val ? 'bg-[#06b6d4] text-black font-bold' : 'text-[#8e98a8] hover:text-white'"
            >
              {{ scale.label }}
            </button>
          </div>

          <!-- 重置全部 -->
          <button
            @click="resetAllControls"
            class="text-[11px] text-[#717e96] hover:text-[#06b6d4] px-1 cursor-pointer"
          >
            重置
          </button>
        </div>
      </div>

      <!-- 控制器主体: 测试文本输入与文风预设 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- 文本输入区 (大标题 & 正文段落) -->
        <div class="lg:col-span-2 space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-[10px] text-[#6b778d]">展示标题文本 (Header Text)</label>
                <div class="flex gap-1 text-[9px] text-[#556379]">
                  <button @click="applyHeaderPreset('字里行间，皆有章法。')" class="hover:text-[#06b6d4] cursor-pointer">预设1</button>
                  <span>•</span>
                  <button @click="applyHeaderPreset('落霞与孤鹜齐飞，秋水共长天一色。')" class="hover:text-[#06b6d4] cursor-pointer">预设2</button>
                </div>
              </div>
              <input
                v-model="specimenHeader"
                type="text"
                class="w-full bg-[#0a0d13] border border-[#262f40] px-2.5 py-1.5 text-white text-xs focus:border-[#06b6d4] focus:outline-none"
              />
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label class="block text-[10px] text-[#6b778d]">正文灰度段落 (Body Text)</label>
                <div class="flex gap-1 text-[9px] text-[#556379]">
                  <button @click="applyBodyPreset('排版不仅是文字的陈列，更关乎字腔开阖、行气呼吸与版面灰度。好的界面排版让人专注于内容本身，在秩序与留白之间体会字形的骨骼质感。')" class="hover:text-[#06b6d4] cursor-pointer">典雅文段</button>
                  <span>•</span>
                  <button @click="applyBodyPreset('物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。')" class="hover:text-[#06b6d4] cursor-pointer">经典古文</button>
                </div>
              </div>
              <input
                v-model="specimenBody"
                type="text"
                class="w-full bg-[#0a0d13] border border-[#262f40] px-2.5 py-1.5 text-white text-xs focus:border-[#06b6d4] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <!-- ZeoSeven 动态导入输入框 -->
        <div class="bg-[#0e1118] border border-[#232a39] p-2.5 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 text-[#ccff00] text-[11px] font-bold">
              <DownloadCloud class="w-3.5 h-3.5" />
              <span>ZEOSEVEN 字体 ID 导入</span>
            </div>
            <p class="text-[10px] text-[#717e96] mt-1 leading-tight">
              输入 ID（如 2 霞鹜臻楷、79 屏显臻宋），自动解析并动态挂载标本。
            </p>
          </div>

          <div class="flex gap-1.5 mt-2">
            <input
              v-model="customZeoId"
              type="text"
              placeholder="输入 ID (如 2)"
              class="flex-1 bg-[#090b10] border border-[#252c3c] px-2 py-1 text-white text-[11px] focus:border-[#ccff00] focus:outline-none"
              @keydown.enter="importZeoFont"
            />
            <button
              @click="importZeoFont"
              :disabled="importingZeo"
              class="px-2.5 py-1 bg-[#ccff00] text-black font-bold text-[11px] uppercase border border-black shadow-[1px_1px_0px_#000] hover:bg-[#b8e600] disabled:opacity-50 cursor-pointer flex items-center gap-1 shrink-0"
            >
              <Loader2 v-if="importingZeo" class="w-3 h-3 animate-spin" />
              <span>{{ importingZeo ? '导入' : '注入' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷样张标本卡网格 (Type Specimen Sheets Grid) -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div
        v-for="(font, index) in filteredFontList"
        :key="font.id"
        class="bg-[#13161f] border border-[#232938] hover:border-[#384357] shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all"
      >
        <!-- 标本卡顶部档案标头 -->
        <div class="px-4 py-2.5 bg-[#171b26] border-b border-[#232a39] flex items-center justify-between font-mono-code text-[11px] select-none">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full bg-[#0a0c10] border border-[#323b4e]"></div>
            <span class="text-[#06b6d4] font-bold">TYPE_SPECIMEN #{{ String(index + 1).padStart(2, '0') }}</span>
            <span
              class="text-[9px] px-1 py-0.2 font-bold uppercase"
              :class="font.channel === 'zeoseven' ? 'bg-[#15343f] text-[#38bdf8] border border-[#1e4e60]' : 'bg-[#291e3b] text-[#c084fc] border border-[#442c67]'"
            >
              {{ font.channel === 'zeoseven' ? 'ZEOSEVEN 中文切片' : 'GOOGLE FONTS 中文' }}
            </span>
          </div>

          <!-- 单卡微调快捷小工具 (可针对单卡独立切换加粗或斜体) -->
          <div class="flex items-center gap-1.5">
            <button
              @click="toggleCardWeight(font.id)"
              class="px-1.5 py-0.2 text-[9px] border cursor-pointer transition-colors"
              :class="getCardWeight(font.id) >= 700 ? 'bg-[#06b6d4] text-black font-extrabold border-black' : 'bg-[#121620] text-[#7f8ba1] border-[#262f40]'"
              title="切换此字体加粗"
            >
              B
            </button>
            <button
              @click="toggleCardItalic(font.id)"
              class="px-1.5 py-0.2 text-[9px] italic border cursor-pointer transition-colors"
              :class="isCardItalic(font.id) ? 'bg-[#ccff00] text-black font-extrabold border-black' : 'bg-[#121620] text-[#7f8ba1] border-[#262f40]'"
              title="切换此字体斜体"
            >
              I
            </button>
            <div class="w-10 h-3 barcode-strip hidden sm:block"></div>
          </div>
        </div>

        <!-- 字体基础元数据区 -->
        <div class="p-4 bg-[#10131a] border-b border-[#1e2432] flex items-start justify-between gap-3">
          <div>
            <div class="flex items-baseline gap-2 flex-wrap">
              <h3 class="text-lg font-bold text-white font-display-tech tracking-tight">
                {{ font.name }}
              </h3>
              <span class="text-xs text-[#94a3b8] font-mono-code">{{ font.cnName }}</span>
            </div>
            <p class="text-xs text-[#717d93] mt-1 font-mono-code leading-relaxed">
              {{ font.description }}
            </p>
          </div>

          <div class="shrink-0 text-right font-mono-code">
            <span class="text-[10px] px-1.5 py-0.5 bg-[#1b2230] text-[#a5b4fc] border border-[#2d3852] block">
              {{ font.role }}
            </span>
          </div>
        </div>

        <!-- 核心排版三态展示区 (Header State, Body State, Glyph Set) -->
        <div class="p-5 bg-[#0b0d12] space-y-5 border-b border-[#1f2533]">
          <!-- 状态 1: Header State (大标题展示) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-[10px] font-mono-code text-[#4d596f] border-b border-[#181d28] pb-1">
              <span>01 // HEADER STATE (大标题视觉层级 · 风格张力)</span>
              <span class="text-[#06b6d4]">DISPLAY TITLE</span>
            </div>
            <div
              class="text-white tracking-tight py-2 select-text leading-tight overflow-x-auto transition-all duration-150"
              :style="getPreviewStyle(font, 'header')"
            >
              {{ specimenHeader }}
            </div>
          </div>

          <!-- 状态 2: Body State (中文正文段落排版，行高 1.6) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-[10px] font-mono-code text-[#4d596f] border-b border-[#181d28] pb-1">
              <span>02 // BODY STATE (段落灰度与连贯阅读 · LH: 1.6)</span>
              <span class="text-[#10b981]">READABILITY & GREYSCALE</span>
            </div>
            <p
              class="text-[#cbd5e1] leading-relaxed py-1.5 select-text transition-all duration-150"
              style="line-height: 1.6;"
              :style="getPreviewStyle(font, 'body')"
            >
              {{ specimenBody }}
            </p>
          </div>

          <!-- 状态 3: Tech / Glyph Set (兰亭序字形测试、数字与标点) -->
          <div class="space-y-1">
            <div class="flex items-center justify-between text-[10px] font-mono-code text-[#4d596f] border-b border-[#181d28] pb-1">
              <span>03 // TECH & GLYPH SET (字形结构与符号对齐测试)</span>
              <span class="text-[#ccff00]">GLYPH SPECIMEN</span>
            </div>
            <div
              class="text-xs text-[#94a3b8] tracking-widest py-1.5 bg-[#12161f] px-2.5 border border-[#1b202c] select-text overflow-x-auto whitespace-nowrap transition-all duration-150"
              :style="getPreviewStyle(font, 'glyph')"
            >
              0123456789 [!@#$%^&*] 永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭。 ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
          </div>
        </div>

        <!-- 标本卡快捷工具栏与联动指令 (Copy Link, Copy Rule, Add to Workbench) -->
        <div class="p-3 bg-[#151924] flex flex-col sm:flex-row items-center gap-2">
          <!-- 添加到工作台 -->
          <button
            @click="addFontToWorkbench(font)"
            class="w-full sm:flex-1 py-2 px-3 bg-[#06b6d4] text-black font-mono-code font-bold text-xs uppercase tracking-wide border border-black shadow-[2px_2px_0px_#000] hover:bg-[#0891b2] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>+ ADD TO PROMPT // 注入工作台</span>
          </button>

          <!-- 复制 CSS Link -->
          <button
            @click="copyFontImport(font)"
            class="w-full sm:w-auto py-2 px-3 bg-[#1e2533] text-[#cbd5e1] hover:text-white border border-[#2b3548] font-mono-code text-xs hover:border-[#06b6d4] transition-colors cursor-pointer flex items-center justify-center gap-1"
            title="复制 CDN @import 引入链接"
          >
            <Link2 class="w-3.5 h-3.5" />
            <span>COPY LINK</span>
          </button>

          <!-- 复制 CSS Rule -->
          <button
            @click="copyFontRule(font)"
            class="w-full sm:w-auto py-2 px-3 bg-[#1e2533] text-[#cbd5e1] hover:text-white border border-[#2b3548] font-mono-code text-xs hover:border-[#ccff00] transition-colors cursor-pointer flex items-center justify-center gap-1"
            title="复制 font-family CSS 声明"
          >
            <Code class="w-3.5 h-3.5" />
            <span>COPY RULE</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { initialFontsData } from '../../data/fontsData';
import { usePromptDock } from '../../composables/usePromptDock';
import {
  SlidersHorizontal,
  DownloadCloud,
  Plus,
  Link2,
  Code,
  Loader2
} from 'lucide-vue-next';

const { addItem, copyToClipboard, triggerToast } = usePromptDock();

const fontList = ref([...initialFontsData]);
const selectedChannel = ref('ALL');

const channelFilters = [
  { key: 'ALL', label: '全部中文字体' },
  { key: 'zeoseven', label: 'ZeoSeven 中文切片' },
  { key: 'google', label: 'Google Fonts 权威中文' }
];

const filteredFontList = computed(() => {
  if (selectedChannel.value === 'ALL') return fontList.value;
  return fontList.value.filter(f => f.channel === selectedChannel.value);
});

// 优雅、自然、经典的中文排版测试文案
const DEFAULT_HEADER = '字里行间，皆有章法。';
const DEFAULT_BODY = '排版不仅是文字的陈列，更关乎字腔开阖、行气呼吸与版面灰度。好的界面排版让人专注于内容本身，在秩序与留白之间体会字形的骨骼质感。';

const specimenHeader = ref(DEFAULT_HEADER);
const specimenBody = ref(DEFAULT_BODY);

// 全局排版样式参数 (字重、斜体、下划线、缩放倍率)
const globalWeight = ref('400');
const globalItalic = ref(false);
const globalUnderline = ref(false);
const globalScale = ref('1');

const weightOptions = [
  { label: '常规 400', val: '400' },
  { label: '中粗 600', val: '600' },
  { label: '加粗 700', val: '700' },
  { label: '特粗 900', val: '900' }
];

const scaleOptions = [
  { label: '小 85%', val: '0.85' },
  { label: '标 100%', val: '1' },
  { label: '大 115%', val: '1.15' }
];

// 单卡独立覆盖微调状态字典 { [fontId]: { weight, italic } }
const cardOverrides = reactive({});

const getCardWeight = (fontId) => {
  return cardOverrides[fontId]?.weight || globalWeight.value;
};

const isCardItalic = (fontId) => {
  if (cardOverrides[fontId]?.italic !== undefined) {
    return cardOverrides[fontId].italic;
  }
  return globalItalic.value;
};

const toggleCardWeight = (fontId) => {
  const current = getCardWeight(fontId);
  const next = current >= '700' ? '400' : '700';
  if (!cardOverrides[fontId]) cardOverrides[fontId] = {};
  cardOverrides[fontId].weight = next;
};

const toggleCardItalic = (fontId) => {
  const current = isCardItalic(fontId);
  if (!cardOverrides[fontId]) cardOverrides[fontId] = {};
  cardOverrides[fontId].italic = !current;
};

const resetAllControls = () => {
  specimenHeader.value = DEFAULT_HEADER;
  specimenBody.value = DEFAULT_BODY;
  globalWeight.value = '400';
  globalItalic.value = false;
  globalUnderline.value = false;
  globalScale.value = '1';
  Object.keys(cardOverrides).forEach(key => delete cardOverrides[key]);
  triggerToast('已重置排版参数', '恢复默认文案与标准样式');
};

const applyHeaderPreset = (text) => {
  specimenHeader.value = text;
};

const applyBodyPreset = (text) => {
  specimenBody.value = text;
};

// 动态样式计算
const getPreviewStyle = (font, type) => {
  const weight = getCardWeight(font.id);
  const italic = isCardItalic(font.id);
  const scale = parseFloat(globalScale.value) || 1;

  let baseFontSize = '14px';
  if (type === 'header') {
    baseFontSize = `calc(32px * ${scale})`;
  } else if (type === 'body') {
    baseFontSize = `calc(14px * ${scale})`;
  } else if (type === 'glyph') {
    baseFontSize = `calc(12px * ${scale})`;
  }

  return {
    fontFamily: font.fontFamily,
    fontWeight: weight,
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: globalUnderline.value ? 'underline' : 'none',
    fontSize: baseFontSize
  };
};

// 动态注入字体 stylesheet 到 document.head
const injectFontStylesheet = (font) => {
  const linkId = `font-link-${font.id}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = font.cdnUrl;
    document.head.appendChild(link);
  }
};

// ZeoSeven 自定义字体导入
const customZeoId = ref('');
const importingZeo = ref(false);

const importZeoFont = async () => {
  const id = customZeoId.value.trim();
  if (!id) {
    triggerToast('请输入有效 ZeoSeven 字体 ID', '例如: 2 (霞鹜臻楷), 79 (屏显臻宋)');
    return;
  }

  // 避免重复导入
  const existing = fontList.value.find(f => f.zeoId === id);
  if (existing) {
    triggerToast('该字体已在试样列表中', existing.name);
    return;
  }

  importingZeo.value = true;
  const cdnUrl = `https://fontsapi.zeoseven.com/${id}/main/result.css`;

  try {
    const res = await fetch(cdnUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cssText = await res.text();

    // 正则提取 font-family: '...';
    const match = cssText.match(/font-family\s*:\s*["']?([^"';]+)/i);
    const parsedFamily = match ? match[1].trim() : `ZeoFont_${id}`;

    const newFont = {
      id: `zeo-${id}`,
      channel: 'zeoseven',
      zeoId: id,
      name: parsedFamily,
      cnName: `ZeoSeven #${id} 导入中文字体`,
      category: 'Custom / ZeoSeven WebFont',
      categoryCn: '自定义导入 / 开源网络字',
      description: `动态自 ZeoSeven CDN 切片加载的开源中文字体标本 (ID: ${id})。`,
      fontFamily: `"${parsedFamily}", sans-serif`,
      cdnUrl,
      cssImport: `@import url("${cdnUrl}");`,
      cssRule: `font-family: "${parsedFamily}", sans-serif;`,
      role: '自定义导入中文字体标本'
    };

    injectFontStylesheet(newFont);
    fontList.value.unshift(newFont);
    customZeoId.value = '';
    triggerToast('字体标本注入成功', `${parsedFamily} (ID: ${id})`);
  } catch (err) {
    console.warn('ZeoSeven 字体解析失败，采用兼容模式注入:', err);
    const fallbackFamily = `ZeoSeven_${id}`;
    const fallbackFont = {
      id: `zeo-${id}`,
      channel: 'zeoseven',
      zeoId: id,
      name: fallbackFamily,
      cnName: `ZeoSeven #${id} 兼容标本`,
      category: 'ZeoSeven WebFont',
      categoryCn: '自定义导入 / 兼容模式',
      description: `自 ZeoSeven CDN 挂载 (ID: ${id})。`,
      fontFamily: `"${fallbackFamily}", sans-serif`,
      cdnUrl,
      cssImport: `@import url("${cdnUrl}");`,
      cssRule: `font-family: "${fallbackFamily}", sans-serif;`,
      role: '自定义标本'
    };
    injectFontStylesheet(fallbackFont);
    fontList.value.unshift(fallbackFont);
    customZeoId.value = '';
    triggerToast('已以兼容模式挂载', fallbackFamily);
  } finally {
    importingZeo.value = false;
  }
};

// 复制工具操作
const copyFontImport = (font) => {
  copyToClipboard(font.cssImport, '已复制 CDN @import 引入链接', font.cssImport);
};

const copyFontRule = (font) => {
  copyToClipboard(font.cssRule, '已复制 CSS 声明规则', font.cssRule);
};

const addFontToWorkbench = (font) => {
  const weight = getCardWeight(font.id);
  const italic = isCardItalic(font.id);
  const promptText = `Typography Rule: Apply font-family '${font.name}' (weight: ${weight}, style: ${italic ? 'italic' : 'normal'}) for [Header/Body/Code/Monospaced metadata], imported via [${font.cdnUrl}]. Standard CSS: ${font.cssRule}`;
  addItem({
    id: `font-${font.id}`,
    title: `Font // ${font.name}`,
    type: 'font',
    content: promptText,
    meta: font
  });
};

onMounted(() => {
  fontList.value.forEach(font => {
    injectFontStylesheet(font);
  });
});
</script>
