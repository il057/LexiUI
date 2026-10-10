<template>
  <div class="relative z-10 flex items-end gap-1 px-4 sm:px-6 pt-3 overflow-x-auto no-scrollbar border-b border-[#222733] select-none">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="activeTab = tab.id"
      class="group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-mono-code transition-all duration-150 outline-none cursor-pointer whitespace-nowrap"
      :class="[
        activeTab === tab.id
          ? 'z-20 bg-[#14171f] text-[#f8fafc] border-t-2 border-x border-[#ccff00] border-b-0 -mb-[1px] shadow-[0_-4px_12px_rgba(0,0,0,0.5)] font-bold'
          : 'z-10 bg-[#0c0e13] text-[#7d8699] hover:text-[#d1d5db] hover:bg-[#10131a] border-t border-x border-[#1c212d] border-b-transparent hover:-translate-y-0.5'
      ]"
      style="border-top-left-radius: 4px; border-top-right-radius: 4px;"
    >
      <!-- 档案耳标索引序列 -->
      <span
        class="text-[10px] px-1 py-0.2 tracking-tighter"
        :class="activeTab === tab.id ? 'bg-[#ccff00] text-black font-extrabold' : 'bg-[#1e2330] text-[#717b8f]'"
      >
        {{ tab.code }}
      </span>

      <!-- 标签标题与图标 -->
      <span class="flex items-center gap-1.5">
        <component :is="tab.icon" class="w-3.5 h-3.5" :class="activeTab === tab.id ? 'text-[#ccff00]' : 'text-[#586277] group-hover:text-[#94a3b8]'" />
        <span>{{ tab.label }}</span>
      </span>

      <!-- 工作台已收录角标 -->
      <span v-if="tab.badge" class="ml-1 text-[10px] px-1.5 py-0.2 bg-[#1f2637] text-[#93c5fd] rounded-xs font-mono">
        {{ tab.badge }}
      </span>

      <!-- 激活底部遮蔽条，确保与内页 100% 无缝连接 -->
      <div
        v-if="activeTab === tab.id"
        class="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-[#14171f]"
      ></div>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePromptDock } from '../composables/usePromptDock';
import {
  Layers,
  Sparkles,
  Palette,
  Activity,
  Search,
  Type
} from 'lucide-vue-next';

const {
  activeTab,
  componentItems,
  aestheticItems,
  paletteItems,
  motionItems,
  iconItems,
  fontItems
} = usePromptDock();

const tabs = computed(() => [
  {
    id: 'components',
    code: '01',
    label: '组件视觉字典',
    icon: Layers,
    badge: componentItems.value.length ? `${componentItems.value.length} 暂存` : null
  },
  {
    id: 'aesthetics',
    code: '02',
    label: '设计美学发生器',
    icon: Sparkles,
    badge: aestheticItems.value.length ? `${aestheticItems.value.length} 暂存` : null
  },
  {
    id: 'palettes',
    code: '03',
    label: '调色板与配色',
    icon: Palette,
    badge: paletteItems.value.length ? `${paletteItems.value.length} 暂存` : null
  },
  {
    id: 'motions',
    code: '04',
    label: '交互动效词典',
    icon: Activity,
    badge: motionItems.value.length ? `${motionItems.value.length} 暂存` : null
  },
  {
    id: 'icons',
    code: '05',
    label: 'SVG / 图标检索',
    icon: Search,
    badge: iconItems.value.length ? `${iconItems.value.length} 暂存` : null
  },
  {
    id: 'fonts',
    code: '06',
    label: '字体排版试样',
    icon: Type,
    badge: fontItems.value.length ? `${fontItems.value.length} 暂存` : null
  }
]);
</script>
