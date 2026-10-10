<template>
  <header class="w-full bg-[#0a0c10] border-b border-[#1f2430] px-4 sm:px-6 py-3 select-none">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <!-- 左侧: 项目品牌与定位 -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-[#ccff00] text-black font-extrabold flex items-center justify-center font-display-tech text-sm shadow-[2px_2px_0px_#000] border border-black">
          LUI
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-base sm:text-lg font-bold text-white tracking-tight font-display-tech">
              LexiUI
            </h1>
            <span class="text-[10px] font-mono-code px-1.5 py-0.5 bg-[#171b24] text-[#ccff00] border border-[#272e3d]">
              v1.0 // 工业触觉版
            </span>
          </div>
          <p class="text-[11px] text-[#717b8f] font-mono-code hidden sm:block">
            Vibe Coding 专属 UI 审美发生器与交互组件视觉字典
          </p>
        </div>
      </div>

      <!-- 中间: 全局快速搜索框 -->
      <div class="flex-1 max-w-md relative hidden md:block">
        <div class="relative flex items-center">
          <Search class="w-4 h-4 text-[#5e697e] absolute left-3 pointer-events-none" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索组件英文名、中文别名、美学风格、动效或字体..."
            class="w-full bg-[#12151c] text-[#e2e8f0] text-xs font-mono-code pl-9 pr-16 py-2 border border-[#222836] focus:border-[#ccff00] focus:outline-none transition-colors shadow-inner placeholder:text-[#555f73]"
            @keydown.meta.k.prevent="focusSearch"
            @keydown.ctrl.k.prevent="focusSearch"
            @focus="isSearchModalOpen = true"
          />
          <div class="absolute right-2.5 flex items-center gap-1">
            <kbd class="text-[10px] font-mono-code bg-[#1a1f2b] text-[#8e98a8] border border-[#2b3345] px-1.5 py-0.5 rounded-xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <!-- 右侧: 工作台抽屉切换与状态 -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- 移动端搜索唤起按钮 -->
        <button
          @click="isSearchModalOpen = true"
          class="md:hidden p-2 bg-[#12151c] text-[#8e98a8] hover:text-white border border-[#222836]"
          title="搜索"
        >
          <Search class="w-4 h-4" />
        </button>

        <!-- Prompt 拼接工作台切换按钮 (物理便签夹隐喻) -->
        <button
          @click="isDockOpen = !isDockOpen"
          class="relative flex items-center gap-2 px-3 py-1.5 text-xs font-mono-code font-bold transition-all border cursor-pointer select-none active:translate-y-0.5"
          :class="[
            isDockOpen
              ? 'bg-[#ccff00] text-black border-black shadow-[2px_2px_0px_#000]'
              : 'bg-[#141822] text-[#e2e8f0] border-[#293144] hover:border-[#ccff00] shadow-[2px_2px_0px_#000]'
          ]"
        >
          <ClipboardList class="w-4 h-4" />
          <span class="tracking-wide">PROMPT 工作台</span>
          <span
            class="text-[10px] px-1.5 py-0.2 rounded-xs font-bold"
            :class="isDockOpen ? 'bg-black text-[#ccff00]' : 'bg-[#ccff00] text-black'"
          >
            {{ stagedItems.length }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { usePromptDock } from '../composables/usePromptDock';
import { Search, ClipboardList } from 'lucide-vue-next';

const {
  isDockOpen,
  searchQuery,
  isSearchModalOpen,
  stagedItems
} = usePromptDock();

const handleGlobalKeydown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    isSearchModalOpen.value = true;
  }
};

const focusSearch = () => {
  isSearchModalOpen.value = true;
};

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown);
});
</script>
