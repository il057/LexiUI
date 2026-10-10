<template>
  <div class="space-y-8">
    <!-- 模块头部标头 -->
    <div class="bg-[#12161f] border border-[#232a3a] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[3px_3px_0px_#000]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono-code px-2 py-0.5 bg-[#ec4899] text-white font-extrabold uppercase">
            ARCHIVE // 02
          </span>
          <span class="text-xs font-mono-code text-[#7c889d]">UI AESTHETICS & ANTI-AI PRESETS</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display-tech">
          设计美学发生器 (UI Aesthetics & Anti-AI)
        </h2>
        <p class="text-xs text-[#8e98a8] mt-1 max-w-2xl font-mono-code">
          告别千篇一律的紫色渐变与无边界软阴影 AI 塑料感。选择专业高定风格预设，开启负向审美约束，定制工业材质表面。
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="addActiveAestheticsToDock"
          class="px-3 py-2 bg-[#ec4899] text-white font-mono-code font-bold text-xs uppercase border border-black shadow-[2px_2px_0px_#000] hover:bg-[#db2777] cursor-pointer flex items-center gap-1.5"
        >
          <Plus class="w-3.5 h-3.5" />
          <span>+ 注入默认风格至工作台</span>
        </button>
      </div>
    </div>

    <!-- 区块 1: 核心视觉风格预设 -->
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-[#222836] pb-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-[#ec4899]"></div>
          <h3 class="text-sm font-bold text-white font-mono-code tracking-wide">
            1. 核心视觉风格矩阵 (VISUAL STYLE MATRIX)
          </h3>
        </div>
        <span class="text-[11px] font-mono-code text-[#69758c]">选择核心美学指导基调</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          v-for="style in aestheticsData"
          :key="style.id"
          class="bg-[#13161f] border border-[#232938] hover:border-[#384357] flex flex-col justify-between shadow-[4px_4px_0px_#000] transition-all"
        >
          <!-- 风格卡头部 -->
          <div class="p-4 sm:p-5 border-b border-[#1f2533] flex items-start justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[9px] font-mono-code px-1.5 py-0.5 bg-[#252c3c] text-[#ccff00] font-bold">
                  {{ style.badge }}
                </span>
                <span class="text-xs font-mono-code text-[#717b8f]">{{ style.category }}</span>
              </div>
              <h4 class="text-base sm:text-lg font-bold text-white font-display-tech mt-1">
                {{ style.name }}
              </h4>
              <p class="text-xs text-[#94a3b8] font-mono-code">{{ style.cnName }}</p>
            </div>

            <!-- 微缩风格演示方块 -->
            <div
              class="w-24 h-16 p-2 text-[9px] font-mono-code flex flex-col justify-between select-none"
              :style="style.demoStyle"
            >
              <span class="font-bold">PREVIEW</span>
              <span class="truncate">UI_CARD</span>
            </div>
          </div>

          <!-- 风格核心特征列表 -->
          <div class="p-4 sm:p-5 space-y-3 bg-[#0f1118]">
            <div class="text-[10px] font-mono-code text-[#606c82] uppercase tracking-wider">
              风格核心特征规范 (KEY ARCHITECTURAL TRAITS):
            </div>
            <ul class="space-y-1.5">
              <li
                v-for="(trait, idx) in style.traits"
                :key="idx"
                class="text-xs text-[#cbd5e1] font-mono-code flex items-start gap-2"
              >
                <span class="text-[#ccff00] font-bold">›</span>
                <span>{{ trait }}</span>
              </li>
            </ul>

            <!-- 提示词代码框 -->
            <div class="mt-3 bg-[#0a0c10] border border-[#1b202c] p-2.5">
              <div class="flex justify-between text-[9px] font-mono-code text-[#606d84] mb-1">
                <span>AI 系统提示词片段 (英文精准指令):</span>
                <button
                  @click="copySnippet(style.prompt, '已复制风格提示词', style.name)"
                  class="text-[#ccff00] hover:underline cursor-pointer"
                >
                  复制代码
                </button>
              </div>
              <p class="text-[11px] font-mono-code text-[#e2e8f0] leading-relaxed select-text">
                {{ style.prompt }}
              </p>
            </div>
          </div>

          <!-- 卡片底部操作栏 -->
          <div class="p-3 bg-[#161a24] border-t border-[#222836] flex items-center gap-2">
            <button
              @click="addStyleToDock(style)"
              class="flex-1 py-2 px-3 bg-[#ec4899] text-white font-mono-code font-bold text-xs uppercase tracking-wide border border-black shadow-[2px_2px_0px_#000] hover:bg-[#db2777] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>+ ADD STYLE TO PROMPT // 注入工作台</span>
            </button>

            <button
              @click="copySnippet(style.cssSnippet, '已复制 CSS 规则代码', style.name)"
              class="py-2 px-3 bg-[#1f2533] text-[#cbd5e1] hover:text-white border border-[#2b3548] font-mono-code text-xs hover:border-[#ccff00] transition-colors cursor-pointer flex items-center gap-1"
              title="复制 CSS 规则代码片段"
            >
              <Code class="w-3.5 h-3.5" />
              <span>CSS</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 区块 2: 反 AI 模板味负向约束库 -->
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-[#222836] pb-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-[#ff3b30]"></div>
          <h3 class="text-sm font-bold text-white font-mono-code tracking-wide">
            2. 负向限制词约束库 (ANTI-AI NEGATIVE CONSTRAINTS)
          </h3>
        </div>
        <span class="text-[11px] font-mono-code text-[#ff3b30]">默认全向防护已就绪</span>
      </div>

      <div class="bg-[#12161f] border border-[#262e3e] p-5 shadow-[4px_4px_0px_#000] space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code">
          <p class="text-[#8e98a8]">
            勾选你希望向 AI 强调“严禁采用”的廉价视觉模式，生成提示词时会自动注入 <b>[AVOID]</b> 负向指令。
          </p>
          <div class="flex gap-2 shrink-0">
            <button
              @click="enableAllNegatives"
              class="px-2.5 py-1 bg-[#1a202d] text-[#cbd5e1] hover:text-white border border-[#2b3548] text-[11px] cursor-pointer"
            >
              全部启用
            </button>
            <button
              @click="copyAllNegativePrompts"
              class="px-2.5 py-1 bg-[#ff3b30] text-white font-bold border border-black shadow-[2px_2px_0px_#000] text-[11px] cursor-pointer flex items-center gap-1"
            >
              <Copy class="w-3 h-3" />
              <span>复制全部负向词</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div
            v-for="neg in negativeConstraints"
            :key="neg.id"
            @click="toggleNegative(neg.id)"
            class="p-3 border transition-colors cursor-pointer flex items-start gap-3"
            :class="[
              isNegativeEnabled(neg.id)
                ? 'bg-[#1a1416] border-[#ff3b30]/60 shadow-[2px_2px_0px_#000]'
                : 'bg-[#0f1117] border-[#1f2533] opacity-60'
            ]"
          >
            <input
              type="checkbox"
              :checked="isNegativeEnabled(neg.id)"
              @click.stop="toggleNegative(neg.id)"
              class="mt-1 accent-[#ff3b30] cursor-pointer"
            />
            <div class="space-y-1">
              <div class="text-xs font-bold font-mono-code text-[#f8fafc]">
                {{ neg.title }}
              </div>
              <div class="text-[11px] font-mono-code text-[#94a3b8]">
                {{ neg.en }}
              </div>
              <div class="text-[10px] text-[#ff6b6b] font-mono-code bg-[#231215] px-1.5 py-0.5 inline-block border border-[#44171b]">
                {{ neg.prompt }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 区块 3: 工业材质与表面修饰 -->
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-[#222836] pb-2">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-[#ccff00]"></div>
          <h3 class="text-sm font-bold text-white font-mono-code tracking-wide">
            3. 工业材质与表面修饰 (SURFACE TEXTURES & FINISHING)
          </h3>
        </div>
        <span class="text-[11px] font-mono-code text-[#69758c]">实体硬件物理触感</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="tex in surfaceTextures"
          :key="tex.id"
          class="bg-[#13161f] border border-[#232938] flex flex-col justify-between shadow-[3px_3px_0px_#000]"
        >
          <!-- 实时材质沙盒 -->
          <div
            class="h-28 border-b border-[#1f2533] p-3 flex items-end justify-between font-mono-code text-[10px] relative overflow-hidden"
            :style="tex.css"
          >
            <div class="bg-black/80 px-2 py-0.5 text-white border border-[#333d52]">
              实时试样
            </div>
            <div class="bg-[#ccff00] text-black font-extrabold px-1.5 py-0.5">
              CSS READY
            </div>
          </div>

          <div class="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <h5 class="text-xs font-bold text-white font-mono-code">{{ tex.name }}</h5>
              <p class="text-[11px] text-[#717d91] font-mono-code mt-1 leading-relaxed">{{ tex.desc }}</p>
            </div>

            <div class="pt-3 border-t border-[#1e2330] flex gap-1.5">
              <button
                @click="addTextureToDock(tex)"
                class="flex-1 py-1.5 px-2 bg-[#1b212d] hover:bg-[#ccff00] hover:text-black text-[#cbd5e1] border border-[#2c3649] text-[10px] font-mono-code font-bold transition-colors cursor-pointer"
              >
                + 加入工作台
              </button>
              <button
                @click="copySnippet(tex.css, '已复制材质 CSS 代码', tex.name)"
                class="py-1.5 px-2 bg-[#141822] text-[#8e98a8] hover:text-white border border-[#262f40] text-[10px] font-mono-code cursor-pointer"
                title="复制 CSS 样式代码"
              >
                CSS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { aestheticsData, negativeConstraints, surfaceTextures } from '../../data/aestheticsData';
import { usePromptDock } from '../../composables/usePromptDock';
import { Plus, Code, Copy } from 'lucide-vue-next';

const {
  addItem,
  copyToClipboard,
  enabledNegativeIds,
  toggleNegative,
  isNegativeEnabled
} = usePromptDock();

const copySnippet = (text, title, sub) => {
  copyToClipboard(text, title, sub);
};

const addStyleToDock = (style) => {
  addItem({
    id: `aes-${style.id}`,
    title: style.name,
    type: 'aesthetic',
    content: style.prompt,
    meta: style
  });
};

const addTextureToDock = (tex) => {
  addItem({
    id: `tex-${tex.id}`,
    title: tex.name,
    type: 'texture',
    content: tex.prompt,
    meta: tex
  });
};

const addActiveAestheticsToDock = () => {
  addStyleToDock(aestheticsData[0]);
};

const enableAllNegatives = () => {
  negativeConstraints.forEach(c => {
    if (!enabledNegativeIds.value.includes(c.id)) {
      enabledNegativeIds.value.push(c.id);
    }
  });
};

const copyAllNegativePrompts = () => {
  const text = negativeConstraints.map(c => `[AVOID] ${c.prompt}`).join('\n');
  copyToClipboard(text, '已复制全部负向限制词', `共 ${negativeConstraints.length} 条 Anti-AI 规则`);
};
</script>
