<template>
  <Teleport to="body">
    <div
      v-if="isSearchModalOpen"
      class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4"
      @click.self="isSearchModalOpen = false"
    >
      <div class="w-full max-w-2xl bg-[#12151c] border-2 border-[#ccff00] shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
        <!-- 搜索输入条 -->
        <div class="p-3 bg-[#181c26] border-b border-[#293245] flex items-center gap-3">
          <Search class="w-5 h-5 text-[#ccff00]" />
          <input
            ref="inputRef"
            v-model="modalQuery"
            type="text"
            placeholder="键入关键词模糊检索组件、字体、美学或动效 (如 Drawer, 胶囊, Unifont, Spring...)"
            class="flex-1 bg-transparent text-sm font-mono-code text-white placeholder:text-[#5d677d] focus:outline-none"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
            @keydown.enter.prevent="selectCurrent"
            @keydown.esc="isSearchModalOpen = false"
          />
          <kbd class="text-[10px] font-mono-code px-1.5 py-0.5 bg-[#252c3c] text-[#94a3b8] border border-[#353e54]">
            ESC
          </kbd>
        </div>

        <!-- 筛选分类标签 -->
        <div class="px-3 py-2 bg-[#0c0e14] border-b border-[#1c222e] flex items-center gap-2 overflow-x-auto text-[11px] font-mono-code">
          <span class="text-[#64748b]">分类筛选:</span>
          <button
            v-for="cat in categories"
            :key="cat.key"
            @click="selectedCategory = cat.key"
            class="px-2 py-0.5 border cursor-pointer transition-colors"
            :class="selectedCategory === cat.key ? 'bg-[#ccff00] text-black border-black font-bold' : 'bg-[#151922] text-[#8e98a8] border-[#252c3c] hover:text-white'"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- 搜索结果列表 -->
        <div class="max-h-96 overflow-y-auto p-2 divide-y divide-[#1b202c]">
          <div
            v-if="filteredResults.length === 0"
            class="p-8 text-center text-xs font-mono-code text-[#6b778d]"
          >
            未检索到匹配项，换个中文别名或英文关键词试试
          </div>

          <div
            v-for="(item, idx) in filteredResults"
            :key="item.id"
            @click="handleSelect(item)"
            class="p-3 flex items-center justify-between gap-3 cursor-pointer group transition-colors"
            :class="selectedIndex === idx ? 'bg-[#1b2230] border-l-2 border-[#ccff00]' : 'hover:bg-[#161a24]'"
          >
            <div class="flex items-center gap-3 min-w-0">
              <span
                class="text-[9px] font-mono-code px-1.5 py-0.5 uppercase font-bold shrink-0"
                :class="getTypeBadge(item.type)"
              >
                {{ getTypeLabel(item.type) }}
              </span>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-white font-mono-code truncate">{{ item.title }}</span>
                  <span v-if="item.sub" class="text-[11px] text-[#717b8f] truncate">{{ item.sub }}</span>
                </div>
                <p class="text-[10px] text-[#64748b] truncate mt-0.5">{{ item.desc }}</p>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                @click.stop="quickAddToDock(item)"
                class="px-2 py-1 bg-[#232a39] hover:bg-[#ccff00] hover:text-black text-[#cbd5e1] border border-[#333c50] text-[10px] font-mono-code font-bold transition-colors cursor-pointer"
              >
                + 暂存
              </button>
            </div>
          </div>
        </div>

        <!-- 底部快捷键提示 -->
        <div class="p-2.5 bg-[#0e1017] border-t border-[#1c222e] flex items-center justify-between text-[10px] font-mono-code text-[#626e83]">
          <span>↑↓ 键切换选择 • ENTER 查看 / 跳转 • ESC 关闭</span>
          <span class="text-[#ccff00] font-bold">{{ filteredResults.length }} 项匹配</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { usePromptDock } from '../composables/usePromptDock';
import { componentsData } from '../data/componentsData';
import { aestheticsData, surfaceTextures } from '../data/aestheticsData';
import { palettesData } from '../data/palettesData';
import { motionsData } from '../data/motionsData';
import { initialFontsData } from '../data/fontsData';
import { Search } from 'lucide-vue-next';

const { isSearchModalOpen, activeTab, addItem } = usePromptDock();

const modalQuery = ref('');
const selectedCategory = ref('all');
const selectedIndex = ref(0);
const inputRef = ref(null);

const categories = [
  { key: 'all', label: '全部' },
  { key: 'component', label: '组件' },
  { key: 'font', label: '字体标本' },
  { key: 'aesthetic', label: '美学风格' },
  { key: 'palette', label: '调色板' },
  { key: 'motion', label: '动效' }
];

watch(isSearchModalOpen, (isOpen) => {
  if (isOpen) {
    modalQuery.value = '';
    selectedIndex.value = 0;
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});

// 聚合全局可搜索内容
const allItems = computed(() => {
  const list = [];

  // 组件
  componentsData.forEach(c => {
    list.push({
      id: c.id,
      type: 'component',
      title: c.name,
      sub: c.cnName,
      desc: c.description,
      prompt: c.prompt,
      tab: 'components',
      meta: c
    });
  });

  // 字体标本
  initialFontsData.forEach(f => {
    list.push({
      id: f.id,
      type: 'font',
      title: f.name,
      sub: f.cnName,
      desc: f.description,
      prompt: `Typography Rule: Apply font-family '${f.name}' for [Header/Body/Code/Monospaced metadata], imported via [${f.cdnUrl}]. Standard CSS: ${f.cssRule}`,
      tab: 'fonts',
      meta: f
    });
  });

  // 美学预设
  aestheticsData.forEach(a => {
    list.push({
      id: a.id,
      type: 'aesthetic',
      title: a.name,
      sub: a.cnName,
      desc: a.category,
      prompt: a.prompt,
      tab: 'aesthetics',
      meta: a
    });
  });

  // 表面材质
  surfaceTextures.forEach(t => {
    list.push({
      id: t.id,
      type: 'texture',
      title: t.name,
      sub: '表面修饰材质',
      desc: t.desc,
      prompt: t.prompt,
      tab: 'aesthetics',
      meta: t
    });
  });

  // 调色板
  palettesData.forEach(p => {
    list.push({
      id: p.id,
      type: 'palette',
      title: p.name,
      sub: p.cnName,
      desc: p.desc,
      prompt: p.prompt,
      tab: 'palettes',
      meta: p
    });
  });

  // 动效
  motionsData.forEach(m => {
    list.push({
      id: m.id,
      type: 'motion',
      title: m.name,
      sub: m.cnName,
      desc: m.category,
      prompt: m.prompt,
      tab: 'motions',
      meta: m
    });
  });

  return list;
});

const filteredResults = computed(() => {
  const q = modalQuery.value.trim().toLowerCase();
  return allItems.value.filter(item => {
    if (selectedCategory.value !== 'all' && item.type !== selectedCategory.value) {
      return false;
    }
    if (!q) return true;
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchSub = item.sub && item.sub.toLowerCase().includes(q);
    const matchDesc = item.desc && item.desc.toLowerCase().includes(q);
    const matchPrompt = item.prompt && item.prompt.toLowerCase().includes(q);
    return matchTitle || matchSub || matchDesc || matchPrompt;
  });
});

const navigateDown = () => {
  if (selectedIndex.value < filteredResults.value.length - 1) {
    selectedIndex.value++;
  }
};

const navigateUp = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
  }
};

const selectCurrent = () => {
  const item = filteredResults.value[selectedIndex.value];
  if (item) {
    handleSelect(item);
  }
};

const handleSelect = (item) => {
  activeTab.value = item.tab;
  isSearchModalOpen.value = false;
};

const quickAddToDock = (item) => {
  addItem({
    id: `${item.type}-${item.id}`,
    title: item.title,
    type: item.type,
    content: item.prompt,
    meta: item.meta
  });
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'component': return '组件';
    case 'aesthetic': return '美学';
    case 'palette': return '配色';
    case 'motion': return '动效';
    case 'font': return '字体';
    default: return type;
  }
};

const getTypeBadge = (type) => {
  switch (type) {
    case 'component':
      return 'bg-[#2563eb] text-white';
    case 'aesthetic':
      return 'bg-[#ec4899] text-white';
    case 'palette':
      return 'bg-[#eab308] text-black';
    case 'motion':
      return 'bg-[#10b981] text-black';
    case 'font':
      return 'bg-[#06b6d4] text-black font-bold';
    default:
      return 'bg-[#64748b] text-white';
  }
};
</script>
