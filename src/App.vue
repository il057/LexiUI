<template>
  <div class="min-h-screen flex flex-col bg-[#0b0c0e] text-[#e2e8f0] font-sans selection:bg-[#ccff00] selection:text-black">
    <!-- 顶部导航栏 -->
    <HeaderNav />

    <!-- 主工作区容器: 物理档案夹与实体活页夹隐喻 -->
    <main class="flex-1 max-w-[1600px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-4 flex flex-col">
      <!-- 档案耳标 Tab 导航栏 -->
      <FolderTabs />

      <!-- 档案夹内页 / 工作台甲板 -->
      <div class="flex-1 bg-[#14171f] border-x border-b border-[#222733] shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row overflow-hidden relative">
        <!-- 顶部微弱内嵌高光线条，增加实体纸质/金属装订深度 -->
        <div class="absolute top-0 inset-x-0 h-[1px] bg-white/5 pointer-events-none"></div>

        <!-- 左侧 / 中间: 当前激活 Tab 视图内页 -->
        <div class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-140px)]">
          <transition
            mode="out-in"
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1.5"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <!-- Tab 1: 组件视觉字典 -->
            <ComponentVisualIndex v-if="activeTab === 'components'" />

            <!-- Tab 2: 设计美学发生器 -->
            <AestheticsGenerator v-else-if="activeTab === 'aesthetics'" />

            <!-- Tab 3: 调色板与配色系统 -->
            <PaletteSystem v-else-if="activeTab === 'palettes'" />

            <!-- Tab 4: 交互与动效语义词典 -->
            <MotionLexicon v-else-if="activeTab === 'motions'" />

            <!-- Tab 5: SVG / 图标检索 -->
            <IconifySearch v-else-if="activeTab === 'icons'" />

            <!-- Tab 6: 字体排版试样标本卡 -->
            <TypeSpecimenSandbox v-else-if="activeTab === 'fonts'" />
          </transition>
        </div>

        <!-- 右侧: 侧挂式便签夹 Prompt 拼接工作台 -->
        <PromptDock />
      </div>
    </main>

    <!-- 底部工业遥测状态页脚 -->
    <footer class="w-full bg-[#090b0e] border-t border-[#1a1f2b] py-2 px-4 sm:px-6 text-[10px] font-mono-code text-[#606d84] select-none">
      <div class="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div class="flex items-center gap-3">
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-[#ccff00]"></span>
            <span>LEXIUI // 工业极客引擎 1.0</span>
          </span>
          <span>•</span>
          <span>VIBE CODING 专属 UI 审美发生器</span>
          <span>•</span>
          <span class="text-[#ccff00]">触觉盖印反馈就绪</span>
        </div>

        <div class="flex items-center gap-4">
          <span>快捷键: <kbd class="text-[9px] bg-[#161a24] px-1 text-white border border-[#2b3548]">⌘K</kbd> 全局搜索</span>
          <span>•</span>
          <span>GITHUB PAGES 静态部署就绪</span>
        </div>
      </div>
    </footer>

    <!-- 全局弹窗与机械盖印 Toast -->
    <GlobalSearchModal />
    <ToastNotification />
  </div>
</template>

<script setup>
import { usePromptDock } from './composables/usePromptDock';
import HeaderNav from './components/HeaderNav.vue';
import FolderTabs from './components/FolderTabs.vue';
import PromptDock from './components/PromptDock.vue';
import GlobalSearchModal from './components/GlobalSearchModal.vue';
import ToastNotification from './components/ToastNotification.vue';

// Tab 视图组件
import ComponentVisualIndex from './components/tabs/ComponentVisualIndex.vue';
import AestheticsGenerator from './components/tabs/AestheticsGenerator.vue';
import PaletteSystem from './components/tabs/PaletteSystem.vue';
import MotionLexicon from './components/tabs/MotionLexicon.vue';
import IconifySearch from './components/tabs/IconifySearch.vue';
import TypeSpecimenSandbox from './components/tabs/TypeSpecimenSandbox.vue';

const { activeTab } = usePromptDock();
</script>
