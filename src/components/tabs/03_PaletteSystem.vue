<template>
  <div class="space-y-6">
    <!-- 模块头部标头 -->
    <div class="bg-[#12161f] border border-[#232a3a] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[3px_3px_0px_#000]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono-code px-2 py-0.5 bg-[#eab308] text-black font-extrabold uppercase">
            ARCHIVE // 03
          </span>
          <span class="text-xs font-mono-code text-[#7c889d]">COLOR PALETTE & TOKEN SYSTEM</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display-tech">
          调色板与配色系统 (Palette & CSS Variables)
        </h2>
        <p class="text-xs text-[#8e98a8] mt-1 max-w-2xl font-mono-code">
          高对比度硬件工业色带。支持 HEX、RGB 与 OKLCH 实时色彩空间切换，支持自然语言色彩 Prompt 与 CSS 变量一键导出。
        </p>
      </div>

      <!-- 单色块复制格式切换 -->
      <div class="flex items-center gap-2 bg-[#161a24] p-1 border border-[#262f40] font-mono-code text-xs">
        <span class="text-[10px] text-[#6b778c] px-2 uppercase">复制色值格式:</span>
        <button
          v-for="mode in ['HEX', 'RGB', 'OKLCH']"
          :key="mode"
          @click="colorMode = mode"
          class="px-2.5 py-1 text-[11px] cursor-pointer transition-colors"
          :class="colorMode === mode ? 'bg-[#eab308] text-black font-bold' : 'text-[#8e98a8] hover:text-white'"
        >
          {{ mode }}
        </button>
      </div>
    </div>

    <!-- 调色板卡片网格 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="palette in palettesData"
        :key="palette.id"
        class="bg-[#13161f] border border-[#232938] hover:border-[#384357] shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all"
      >
        <!-- 头部 -->
        <div class="p-4 sm:p-5 border-b border-[#1f2533]">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-white font-display-tech">
                {{ palette.name }}
              </h3>
              <p class="text-xs text-[#94a3b8] font-mono-code mt-0.5">
                {{ palette.cnName }}
              </p>
            </div>
            <span class="text-[10px] font-mono-code px-2 py-0.5 bg-[#1b2230] text-[#eab308] border border-[#2d374d]">
              五阶工业色带
            </span>
          </div>
          <p class="text-xs text-[#78859c] mt-2 leading-relaxed font-mono-code">
            {{ palette.desc }}
          </p>
        </div>

        <!-- 连续物理色带 -->
        <div class="grid grid-cols-5 h-24 border-y border-[#1f2533] select-none">
          <div
            v-for="(color, idx) in palette.colors"
            :key="idx"
            @click="copyColorValue(color)"
            class="group/swatch relative cursor-pointer flex flex-col justify-end p-2 transition-transform hover:scale-[1.03] hover:z-10"
            :style="{ backgroundColor: color.hex }"
            :title="`点击复制 ${colorMode}: ${getColorValue(color)}`"
          >
            <!-- 悬浮提示框 -->
            <div
              class="opacity-0 group-hover/swatch:opacity-100 transition-opacity bg-black/90 p-1 text-[9px] font-mono-code text-white border border-[#444] shadow-md pointer-events-none"
            >
              <div class="font-bold truncate">{{ color.name }}</div>
              <div class="text-[#ccff00]">{{ getColorValue(color) }}</div>
            </div>

            <!-- 底部标号与色值 -->
            <div
              class="text-[9px] font-mono-code font-bold truncate opacity-80"
              :class="isDarkColor(color.hex) ? 'text-white' : 'text-black'"
            >
              {{ color.hex }}
            </div>
          </div>
        </div>

        <!-- 提示词与代码预览区 -->
        <div class="p-4 sm:p-5 space-y-3 bg-[#0f1118]">
          <!-- 自然语言提示词框 -->
          <div class="bg-[#090b0e] border border-[#1b202c] p-3 space-y-1">
            <div class="flex items-center justify-between text-[10px] font-mono-code text-[#626f86]">
              <span class="uppercase">自然语言 AI 色彩描述 (英文精准对齐):</span>
              <button
                @click="copyToClipboard(palette.prompt, '已复制色彩描述词', palette.name)"
                class="text-[#eab308] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Copy class="w-3 h-3" />
                <span>复制提示词</span>
              </button>
            </div>
            <p class="text-xs font-mono-code text-[#cbd5e1] leading-relaxed select-text">
              {{ palette.prompt }}
            </p>
          </div>

          <!-- CSS 变量框 -->
          <div class="bg-[#090b0e] border border-[#1b202c] p-3 space-y-1">
            <div class="flex items-center justify-between text-[10px] font-mono-code text-[#626f86]">
              <span class="uppercase">TAILWIND / CSS 变量声明:</span>
              <button
                @click="copyToClipboard(palette.cssVariables, '已复制 CSS 变量代码', palette.name)"
                class="text-[#ccff00] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Copy class="w-3 h-3" />
                <span>复制 CSS</span>
              </button>
            </div>
            <pre class="text-[11px] font-mono-code text-[#94a3b8] leading-tight select-text overflow-x-auto p-1">{{ palette.cssVariables }}</pre>
          </div>
        </div>

        <!-- 卡片底部操作栏 -->
        <div class="p-3 bg-[#151924] border-t border-[#202636] flex items-center gap-2">
          <button
            @click="addPaletteToDock(palette)"
            class="flex-1 py-2 px-3 bg-[#eab308] text-black font-mono-code font-bold text-xs uppercase tracking-wide border border-black shadow-[2px_2px_0px_#000] hover:bg-[#ca8a04] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>+ ADD TO PROMPT // 注入配色至工作台</span>
          </button>

          <button
            @click="copyToClipboard(palette.cssVariables, '已复制 CSS 变量代码', palette.name)"
            class="py-2 px-3 bg-[#1e2533] text-[#cbd5e1] hover:text-white border border-[#2b3548] font-mono-code text-xs hover:border-[#ccff00] transition-colors cursor-pointer"
            title="快捷复制 CSS 变量"
          >
            <Code class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { palettesData } from '../../data/palettesData';
import { usePromptDock } from '../../composables/usePromptDock';
import { Plus, Copy, Code } from 'lucide-vue-next';

const { addItem, copyToClipboard } = usePromptDock();

const colorMode = ref('HEX');

const getColorValue = (color) => {
  if (colorMode.value === 'RGB') return color.rgb;
  if (colorMode.value === 'OKLCH') return color.oklch;
  return color.hex;
};

const copyColorValue = (color) => {
  const val = getColorValue(color);
  copyToClipboard(val, `已复制 ${colorMode.value} 色值`, `${color.name}: ${val}`);
};

const addPaletteToDock = (palette) => {
  addItem({
    id: `pal-${palette.id}`,
    title: palette.name,
    type: 'palette',
    content: palette.prompt,
    meta: palette
  });
};

const isDarkColor = (hex) => {
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 128;
};
</script>
