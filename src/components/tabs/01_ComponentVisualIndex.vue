<template>
  <div class="space-y-6">
    <!-- 模块头部标头 / 物理档案元数据 -->
    <div class="bg-[#12161f] border border-[#232a3a] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[3px_3px_0px_#000]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono-code px-2 py-0.5 bg-[#ccff00] text-black font-extrabold uppercase">
            ARCHIVE // 01
          </span>
          <span class="text-xs font-mono-code text-[#7c889d]">COMPONENT VISUAL INDEX</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display-tech">
          组件视觉字典 (Component Visual Index)
        </h2>
        <p class="text-xs text-[#8e98a8] mt-1 max-w-2xl font-mono-code">
          标准英文名词对照与纯手写交互沙盒原型。点击大字英文名即复制，点击「+ ADD TO PROMPT」送入右侧暂存夹。
        </p>
      </div>

      <!-- 快速分类筛选标签 -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          v-for="cat in filterCategories"
          :key="cat.key"
          @click="selectedCategory = cat.key"
          class="px-2.5 py-1 text-[11px] font-mono-code border transition-colors cursor-pointer"
          :class="selectedCategory === cat.key ? 'bg-[#ccff00] text-black border-black font-bold' : 'bg-[#161b24] text-[#8e98a8] border-[#293245] hover:text-white'"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- 卡片网格 (Bento / 工程索引卡片布局) -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div
        v-for="(comp, index) in filteredComponents"
        :key="comp.id"
        class="group relative bg-[#13161f] border border-[#232938] hover:border-[#3b455b] flex flex-col transition-all duration-200 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000]"
      >
        <!-- 索引卡顶部档案条 -->
        <div class="px-4 py-2.5 bg-[#171b26] border-b border-[#232a39] flex items-center justify-between font-mono-code text-[11px] select-none">
          <div class="flex items-center gap-2">
            <!-- 打孔标记 -->
            <div class="w-2.5 h-2.5 rounded-full bg-[#0a0c10] border border-[#323b4e]"></div>
            <span class="text-[#ccff00] font-bold">#{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="text-[#64748b]">[{{ comp.category }}]</span>
          </div>

          <!-- 工业条形码微缩图形 -->
          <div class="w-14 h-3.5 barcode-strip"></div>
        </div>

        <!-- 上半部分: 原生纯手写可交互微型沙盒原型 (Micro Sandbox) -->
        <div class="p-4 bg-[#0c0e14] border-b border-[#1f2533] min-h-[160px] flex items-center justify-center relative overflow-hidden">
          <!-- 点阵底纹 -->
          <div class="absolute inset-0 dot-texture opacity-30 pointer-events-none"></div>

          <!-- 沙盒 1: Segmented Control -->
          <div v-if="comp.sandboxType === 'segmented-control'" class="w-full max-w-xs">
            <div class="bg-[#171b25] p-1 border border-[#2b3345] flex items-center relative">
              <button
                v-for="seg in ['日频', '周频', '月度']"
                :key="seg"
                @click="sandboxState.segmented = seg"
                class="flex-1 py-1.5 text-[11px] font-mono-code font-bold transition-all relative z-10 cursor-pointer text-center"
                :class="sandboxState.segmented === seg ? 'text-black' : 'text-[#8e98a8] hover:text-white'"
              >
                {{ seg }}
              </button>
              <!-- 弹性滑块胶囊指示器 -->
              <div
                class="absolute top-1 bottom-1 bg-[#ccff00] transition-all duration-200 shadow-sm"
                :style="getSegmentedPillStyle()"
              ></div>
            </div>
          </div>

          <!-- 沙盒 2: Slider / Range -->
          <div v-else-if="comp.sandboxType === 'slider-range'" class="w-full max-w-xs space-y-2">
            <div class="flex justify-between text-[11px] font-mono-code">
              <span class="text-[#7c889d]">数值阻尼调节</span>
              <span class="text-[#ccff00] font-bold">{{ sandboxState.slider }}%</span>
            </div>
            <input
              v-model="sandboxState.slider"
              type="range"
              min="0"
              max="100"
              class="w-full accent-[#ccff00] bg-[#1a202c] h-2 rounded-none cursor-pointer"
            />
            <div class="flex justify-between text-[9px] font-mono-code text-[#4a5468]">
              <span>最小: 00</span>
              <span>基准: 50</span>
              <span>满载: 100</span>
            </div>
          </div>

          <!-- 沙盒 3: Drawer / Sheet -->
          <div v-else-if="comp.sandboxType === 'drawer-sheet'" class="w-full max-w-xs text-center relative">
            <button
              @click="sandboxState.drawerOpen = !sandboxState.drawerOpen"
              class="px-3 py-1.5 bg-[#1a202d] hover:bg-[#252e40] text-xs font-mono-code text-[#cbd5e1] border border-[#343e54] cursor-pointer"
            >
              {{ sandboxState.drawerOpen ? '收起抽屉面板' : '触发边缘滑出抽屉' }}
            </button>

            <!-- 抽屉微型模拟 -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-full opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-full opacity-0"
            >
              <div
                v-if="sandboxState.drawerOpen"
                class="absolute bottom-0 inset-x-0 bg-[#161a24] border-t-2 border-[#ccff00] p-3 text-left shadow-lg font-mono-code text-xs z-20"
              >
                <div class="w-8 h-1 bg-[#475569] mx-auto rounded-full mb-2"></div>
                <div class="flex justify-between items-center text-[10px]">
                  <span class="text-[#f1f5f9] font-bold">DRAWER SHEET 内容</span>
                  <button @click="sandboxState.drawerOpen = false" class="text-[#ef4444] cursor-pointer">✕</button>
                </div>
                <p class="text-[9px] text-[#8e98a8] mt-1">带背景模糊与触觉顶部把手条的滑动面板。</p>
              </div>
            </transition>
          </div>

          <!-- 沙盒 4: Accordion -->
          <div v-else-if="comp.sandboxType === 'accordion'" class="w-full max-w-xs space-y-1.5 font-mono-code text-xs">
            <div
              v-for="(acc, i) in sandboxState.accordionItems"
              :key="i"
              class="border border-[#262f40] bg-[#141822]"
            >
              <button
                @click="acc.open = !acc.open"
                class="w-full px-2.5 py-1.5 flex items-center justify-between text-left text-[11px] text-[#e2e8f0] cursor-pointer hover:bg-[#1a202c]"
              >
                <span>{{ acc.title }}</span>
                <span class="text-[#ccff00] transition-transform duration-200" :class="{ 'rotate-90': acc.open }">›</span>
              </button>
              <div v-if="acc.open" class="px-2.5 py-1.5 bg-[#0b0e14] border-t border-[#1f2635] text-[10px] text-[#8e98a8]">
                {{ acc.content }}
              </div>
            </div>
          </div>

          <!-- 沙盒 5: Bento Grid -->
          <div v-else-if="comp.sandboxType === 'bento-grid'" class="w-full max-w-xs grid grid-cols-3 gap-1.5 text-[9px] font-mono-code">
            <div class="col-span-2 bg-[#171b26] border border-[#2b3447] p-2 hover:border-[#ccff00] transition-colors">
              <span class="text-[#ccff00] font-bold">核心指标卡</span>
              <div class="text-sm font-bold text-white mt-1">98.4%</div>
            </div>
            <div class="col-span-1 bg-[#171b26] border border-[#2b3447] p-2 flex flex-col justify-between hover:border-[#ccff00] transition-colors">
              <span class="text-[#64748b]">状态</span>
              <span class="text-white font-bold">ONLINE</span>
            </div>
            <div class="col-span-3 bg-[#131620] border border-[#242b3a] p-1.5 text-[#8e98a8] flex items-center justify-between">
              <span>跨列单元 1×3</span>
              <span class="text-[#ccff00]">BENTO</span>
            </div>
          </div>

          <!-- 沙盒 6: Popover / Tooltip -->
          <div v-else-if="comp.sandboxType === 'popover-tooltip'" class="relative text-center">
            <button
              @mouseenter="sandboxState.popoverVisible = true"
              @mouseleave="sandboxState.popoverVisible = false"
              @click="sandboxState.popoverVisible = !sandboxState.popoverVisible"
              class="px-3 py-1.5 bg-[#171c26] hover:bg-[#222938] text-xs font-mono-code text-[#f1f5f9] border border-[#2e374a] cursor-pointer"
            >
              悬浮或点击触发气泡
            </button>

            <!-- 浮动气泡浮层带小三角指示 beak -->
            <div
              v-if="sandboxState.popoverVisible"
              class="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1b2230] text-white border border-[#ccff00] px-3 py-1.5 text-[10px] font-mono-code whitespace-nowrap shadow-[3px_3px_0px_#000] z-20"
            >
              <span>定向锚定气泡浮层</span>
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1b2230] border-r border-b border-[#ccff00] rotate-45"></div>
            </div>
          </div>

          <!-- 沙盒 7: Combobox -->
          <div v-else-if="comp.sandboxType === 'combobox'" class="w-full max-w-xs relative font-mono-code text-xs">
            <div class="relative">
              <input
                v-model="sandboxState.comboboxSearch"
                type="text"
                placeholder="筛选标签 (如 vue)..."
                @focus="sandboxState.comboboxOpen = true"
                class="w-full bg-[#151924] border border-[#293245] px-2.5 py-1 text-[11px] text-white focus:outline-none focus:border-[#ccff00]"
              />
              <span class="absolute right-2 top-1 text-[#64748b] text-[10px]">▼</span>
            </div>
            <div
              v-if="sandboxState.comboboxOpen"
              class="absolute top-full left-0 right-0 mt-1 bg-[#121620] border border-[#2b3549] max-h-24 overflow-y-auto z-20 shadow-lg text-[10px]"
            >
              <div
                v-for="item in filteredComboboxItems"
                :key="item"
                @click="selectCombobox(item)"
                class="px-2 py-1 text-[#cbd5e1] hover:bg-[#ccff00] hover:text-black cursor-pointer flex justify-between"
              >
                <span>{{ item }}</span>
                <span class="text-[9px] opacity-60">选择</span>
              </div>
            </div>
          </div>

          <!-- 沙盒 8: Command Palette -->
          <div v-else-if="comp.sandboxType === 'command-palette'" class="w-full max-w-xs bg-[#151a24] border border-[#283244] p-2 text-xs font-mono-code space-y-1.5">
            <div class="flex items-center justify-between text-[10px] text-[#78859c] border-b border-[#212938] pb-1">
              <span>> 快速指令台</span>
              <kbd class="bg-[#1f2636] px-1 text-white text-[9px]">ESC</kbd>
            </div>
            <div class="bg-[#1f2638] text-[#ccff00] px-2 py-1 text-[10px] flex justify-between items-center font-bold">
              <span>跳转至设置面板</span>
              <kbd class="text-[9px] text-[#94a3b8]">↵</kbd>
            </div>
            <div class="text-[#8e98a8] px-2 py-0.5 text-[10px] flex justify-between">
              <span>切换配色模式</span>
              <span class="text-[9px] text-[#556177]">⌘T</span>
            </div>
          </div>

          <!-- 沙盒 9: Tactile Switch -->
          <div v-else-if="comp.sandboxType === 'tactile-switch'" class="flex items-center gap-4 font-mono-code">
            <span class="text-[11px]" :class="sandboxState.switchOn ? 'text-[#ccff00] font-bold' : 'text-[#64748b]'">
              状态: {{ sandboxState.switchOn ? 'ARMED // 激活' : 'STANDBY // 待命' }}
            </span>
            <button
              @click="sandboxState.switchOn = !sandboxState.switchOn"
              class="w-14 h-7 bg-[#161a24] border-2 border-[#2c3547] p-0.5 flex items-center transition-all cursor-pointer relative shadow-inner"
              :class="{ 'border-[#ccff00]': sandboxState.switchOn }"
            >
              <div
                class="w-5 h-5 transition-all duration-150 flex items-center justify-center font-extrabold text-[8px]"
                :class="[
                  sandboxState.switchOn
                    ? 'translate-x-7 bg-[#ccff00] text-black shadow-sm'
                    : 'translate-x-0 bg-[#293245] text-white'
                ]"
              >
                <div class="w-1 h-2" :class="sandboxState.switchOn ? 'bg-black' : 'bg-[#5a6780]'"></div>
              </div>
            </button>
          </div>
        </div>

        <!-- 下半部分: 组件术语、说明与 AI 精准英文描述 -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <!-- 标准英文名 (点击即复制) -->
            <button
              @click="copyEnglishName(comp.name)"
              class="group/title text-left flex items-baseline gap-2 cursor-pointer w-full"
              title="点击复制组件标准英文名"
            >
              <h3 class="text-base sm:text-lg font-extrabold text-white group-hover/title:text-[#ccff00] transition-colors font-display-tech">
                {{ comp.name }}
              </h3>
              <Copy class="w-3.5 h-3.5 text-[#5e6b82] group-hover/title:text-[#ccff00] opacity-0 group-hover/title:opacity-100 transition-opacity" />
            </button>

            <!-- 中文通用别名 -->
            <div class="text-xs text-[#94a3b8] font-mono-code mt-0.5">
              {{ comp.cnName }}
            </div>

            <!-- 功能描述 -->
            <p class="text-xs text-[#78859b] mt-2 leading-relaxed">
              {{ comp.description }}
            </p>

            <!-- AI Prompt 精准描述词框 -->
            <div class="mt-3 bg-[#0a0c10] border border-[#1d222e] p-2.5 relative group/box">
              <div class="text-[9px] font-mono-code text-[#556177] uppercase tracking-wider mb-1 flex justify-between">
                <span>AI 精准语义 PROMPT (英文对齐):</span>
                <span class="text-[#ccff00] opacity-0 group-hover/box:opacity-100 transition-opacity">点击文本直接复制</span>
              </div>
              <p
                @click="copyPromptOnly(comp.prompt)"
                class="text-[11px] font-mono-code text-[#cbd5e1] leading-relaxed cursor-pointer hover:text-white select-text"
              >
                {{ comp.prompt }}
              </p>
            </div>
          </div>

          <!-- 底部操作按钮 -->
          <div class="pt-3 border-t border-[#1f2533] flex items-center gap-2">
            <button
              @click="addToPromptDock(comp)"
              class="flex-1 py-2 px-3 bg-[#ccff00] text-black font-mono-code font-bold text-xs uppercase tracking-wide border border-black shadow-[2px_2px_0px_#000] hover:bg-[#b8e600] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>+ ADD TO PROMPT // 加入工作台</span>
            </button>

            <button
              @click="copyEnglishName(comp.name)"
              class="py-2 px-3 bg-[#191f2c] text-[#cbd5e1] hover:text-white border border-[#2b3548] font-mono-code text-xs hover:border-[#ccff00] transition-colors cursor-pointer"
              title="仅复制英文标准名"
            >
              <Copy class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { componentsData } from '../../data/componentsData';
import { usePromptDock } from '../../composables/usePromptDock';
import { Copy, Plus } from 'lucide-vue-next';

const { addItem, copyToClipboard } = usePromptDock();

const selectedCategory = ref('ALL');
const filterCategories = [
  { key: 'ALL', label: '全部组件' },
  { key: 'Navigation & Toggle', label: '导航与切换' },
  { key: 'Form & Input', label: '表单与输入' },
  { key: 'Overlay & Panels', label: '浮层与面板' },
  { key: 'Layout & Disclosure', label: '布局与折叠' },
  { key: 'Layout Architecture', label: '布局架构' }
];

// 交互沙盒状态
const sandboxState = reactive({
  segmented: '日频',
  slider: 65,
  drawerOpen: false,
  accordionItems: [
    { title: '无障碍与属性规范', content: '遵循 WAI-ARIA 规范，自定义贝塞尔曲线与键盘循环聚焦。', open: true },
    { title: '键盘交互支持', content: '支持全键盘 Tab/方向键导航，提供高对比度聚焦环指示。', open: false }
  ],
  popoverVisible: false,
  comboboxSearch: '',
  comboboxOpen: false,
  switchOn: true
});

const comboboxPool = ['Tailwind CSS', 'Vue 3 SFC', 'TypeScript', 'Lucide Icons', 'Vite Bundler'];

const filteredComboboxItems = computed(() => {
  const q = sandboxState.comboboxSearch.toLowerCase();
  return comboboxPool.filter(i => i.toLowerCase().includes(q));
});

const selectCombobox = (item) => {
  sandboxState.comboboxSearch = item;
  sandboxState.comboboxOpen = false;
};

const getSegmentedPillStyle = () => {
  if (sandboxState.segmented === '日频') return { left: '4px', width: '31%' };
  if (sandboxState.segmented === '周频') return { left: '35%', width: '31%' };
  return { left: '66%', width: '31%' };
};

const filteredComponents = computed(() => {
  if (selectedCategory.value === 'ALL') return componentsData;
  return componentsData.filter(c => c.category === selectedCategory.value);
});

const copyEnglishName = (name) => {
  copyToClipboard(name, '已复制组件标准英文名', name);
};

const copyPromptOnly = (prompt) => {
  copyToClipboard(prompt, '已复制 AI 精准提示词', prompt);
};

const addToPromptDock = (comp) => {
  addItem({
    id: `comp-${comp.id}`,
    title: comp.name,
    type: 'component',
    content: comp.prompt,
    meta: comp
  });
};
</script>
