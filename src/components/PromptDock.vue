<template>
  <!-- 侧挂式便签夹容器 (硬纸板/磁吸记事板隐喻) -->
  <aside
    class="transition-all duration-200 select-none flex flex-col bg-[#11141b] border-l border-[#242b3a] z-30"
    :class="[
      isDockOpen
        ? 'w-full lg:w-96 fixed lg:static inset-y-0 right-0 max-h-screen shadow-[-8px_0_24px_rgba(0,0,0,0.6)] lg:shadow-none'
        : 'hidden'
    ]"
  >
    <!-- 便签夹金属夹顶边造型 -->
    <div class="relative bg-[#181d27] border-b border-[#293245] px-4 py-3 flex items-center justify-between">
      <!-- 实体金属夹扣视觉 -->
      <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-20 h-3 bg-[#2f384c] border border-[#4a5673] rounded-xs shadow-sm flex items-center justify-center">
        <div class="w-8 h-1 bg-[#1a1f2b] rounded-full"></div>
      </div>

      <div class="flex items-center gap-2 pt-1">
        <span class="w-2 h-2 bg-[#ccff00] rounded-xs"></span>
        <h2 class="text-xs font-mono-code font-bold tracking-wider text-white uppercase">
          PROMPT 拼接工作台 // 便签夹
        </h2>
      </div>

      <div class="flex items-center gap-1">
        <button
          v-if="stagedItems.length > 0"
          @click="clearAll"
          class="text-[10px] font-mono-code text-[#ff5c5c] hover:text-white px-2 py-1 bg-[#22171a] hover:bg-[#ff3b30] border border-[#441f23] transition-colors cursor-pointer"
          title="清空所有已暂存项"
        >
          清空
        </button>
        <button
          @click="isDockOpen = false"
          class="p-1 text-[#717b8f] hover:text-white hover:bg-[#202736] rounded-xs lg:hidden"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- 遥测数据与 Token 计数条 -->
    <div class="bg-[#0c0e13] px-4 py-2 border-b border-[#1c222e] flex items-center justify-between text-[11px] font-mono-code text-[#7d8799]">
      <div class="flex items-center gap-2">
        <span>已收录: <b class="text-[#f1f5f9]">{{ stagedItems.length }} 项</b></span>
        <span>•</span>
        <span>预估 Token: <b class="text-[#ccff00]">~{{ tokenEstimate }}</b></span>
      </div>
      <div class="flex items-center gap-1 text-[10px]">
        <span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
        <span>就绪可调度</span>
      </div>
    </div>

    <!-- 可滚动工作区内容 -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <!-- 空状态提示 -->
      <div
        v-if="stagedItems.length === 0"
        class="border border-dashed border-[#293144] p-6 text-center text-[#677388] font-mono-code text-xs space-y-3"
      >
        <div class="w-10 h-10 mx-auto rounded-none border border-[#333d54] flex items-center justify-center text-[#8e9bb0]">
          <Inbox class="w-5 h-5" />
        </div>
        <p class="font-bold text-[#8e9bb0]">暂存剪贴板目前为空</p>
        <p class="text-[11px] text-[#556073] leading-relaxed">
          从左侧任意组件卡片、美学预设、字体试样、调色板或动效中点击「+ ADD TO PROMPT」即可将标准英文术语与代码规范收集至此。
        </p>
      </div>

      <!-- 已暂存项列表 -->
      <div v-else class="space-y-3">
        <div
          v-for="item in stagedItems"
          :key="item.id"
          class="group relative bg-[#141822] border border-[#262f40] hover:border-[#3d4963] p-3 text-xs font-mono-code transition-all shadow-[2px_2px_0px_#000]"
        >
          <div class="flex items-start justify-between gap-2 mb-1.5">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span
                class="text-[9px] px-1 py-0.2 uppercase font-extrabold"
                :class="getTypeBadgeClass(item.type)"
              >
                {{ getTypeLabel(item.type) }}
              </span>
              <span class="font-bold text-[#f1f5f9] truncate max-w-[180px]">{{ item.title }}</span>
            </div>
            <button
              @click="removeItem(item.id)"
              class="text-[#556073] hover:text-[#ff4d4f] transition-colors p-0.5 cursor-pointer"
              title="删除此项"
            >
              <Trash2 class="w-3.5 h-3.5" />
            </button>
          </div>

          <p class="text-[11px] text-[#8e98a8] leading-relaxed line-clamp-3 bg-[#0c0e14] p-2 border border-[#1b212d] select-text">
            {{ item.content }}
          </p>
        </div>
      </div>

      <!-- 反 AI 模板味负向约束控制区 -->
      <div class="border border-[#293245] bg-[#12161f] p-3">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1.5">
            <ShieldAlert class="w-3.5 h-3.5 text-[#ff3b30]" />
            <span class="text-xs font-mono-code font-bold text-[#f1f5f9]">ANTI-AI 负向约束</span>
          </div>
          <span class="text-[10px] text-[#717b8f] font-mono-code">
            {{ enabledNegativeIds.length }}/{{ negativeConstraints.length }} 已启用
          </span>
        </div>
        <p class="text-[10px] text-[#6b768a] font-mono-code mb-2.5">
          默认过滤典型“AI 廉价塑料感”（如紫色渐变、过大圆角模糊阴影）
        </p>

        <div class="space-y-1.5">
          <label
            v-for="neg in negativeConstraints"
            :key="neg.id"
            class="flex items-start gap-2 p-1.5 bg-[#0b0e13] border border-[#1c222e] hover:border-[#2f394e] cursor-pointer text-[11px] font-mono-code transition-colors"
          >
            <input
              type="checkbox"
              :checked="isNegativeEnabled(neg.id)"
              @change="toggleNegative(neg.id)"
              class="mt-0.5 accent-[#ccff00] cursor-pointer"
            />
            <span class="text-[#cbd5e1] leading-tight select-none">
              {{ neg.title }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <!-- 底部操作栏: 印戳复制 -->
    <div class="p-4 bg-[#141822] border-t border-[#242b3a] space-y-2">
      <button
        @click="handleCopyFullPrompt"
        class="w-full relative overflow-hidden py-3 px-4 bg-[#ccff00] text-black font-mono-code font-extrabold text-xs tracking-wider uppercase border border-black shadow-[4px_4px_0px_#000] hover:bg-[#b8e600] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        :class="{ 'animate-stamp': isStamped }"
      >
        <Copy class="w-4 h-4" />
        <span>COPY FULL PROMPT // 复制总指令</span>
      </button>

      <button
        @click="showRawPromptModal = true"
        class="w-full py-2 px-3 bg-[#1b202c] hover:bg-[#232b3b] text-[#94a3b8] hover:text-white border border-[#2b3548] font-mono-code text-[11px] tracking-wide flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <Eye class="w-3.5 h-3.5" />
        <span>PREVIEW PROMPT // 预览完整文本</span>
      </button>
    </div>

    <!-- 完整提示词预览弹窗 -->
    <Teleport to="body">
      <div
        v-if="showRawPromptModal"
        class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
        @click.self="showRawPromptModal = false"
      >
        <div class="bg-[#11141b] border-2 border-[#ccff00] w-full max-w-2xl max-h-[85vh] flex flex-col shadow-[8px_8px_0px_#000]">
          <div class="px-4 py-3 bg-[#181d27] border-b border-[#293245] flex items-center justify-between font-mono-code">
            <span class="font-bold text-xs text-[#ccff00]">COMPILED AI SYSTEM PROMPT (已编译总指令)</span>
            <button @click="showRawPromptModal = false" class="text-[#8e98a8] hover:text-white cursor-pointer">
              <X class="w-4 h-4" />
            </button>
          </div>
          <div class="p-4 flex-1 overflow-y-auto">
            <pre class="bg-[#090b0f] p-4 text-xs font-mono-code text-[#e2e8f0] whitespace-pre-wrap border border-[#1f2635] leading-relaxed select-text">{{ compiledFullPrompt }}</pre>
          </div>
          <div class="p-4 bg-[#141822] border-t border-[#242b3a] flex justify-end gap-2">
            <button
              @click="handleCopyFullPrompt"
              class="px-4 py-2 bg-[#ccff00] text-black font-mono-code font-bold text-xs border border-black shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              一键复制到剪贴板
            </button>
            <button
              @click="showRawPromptModal = false"
              class="px-4 py-2 bg-[#1f2635] text-white font-mono-code text-xs border border-[#2f394e] cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { usePromptDock } from '../composables/usePromptDock';
import { negativeConstraints } from '../data/aestheticsData';
import {
  X,
  Trash2,
  Inbox,
  ShieldAlert,
  Copy,
  Eye
} from 'lucide-vue-next';

const {
  stagedItems,
  enabledNegativeIds,
  isDockOpen,
  compiledFullPrompt,
  tokenEstimate,
  removeItem,
  clearAll,
  toggleNegative,
  isNegativeEnabled,
  copyToClipboard
} = usePromptDock();

const showRawPromptModal = ref(false);
const isStamped = ref(false);

const handleCopyFullPrompt = async () => {
  isStamped.value = true;
  setTimeout(() => {
    isStamped.value = false;
  }, 300);
  await copyToClipboard(compiledFullPrompt.value, '已复制总指令至剪贴板', '已聚合组件、美学、字体、配色及反AI负向约束');
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'component': return '组件';
    case 'aesthetic': return '美学';
    case 'palette': return '配色';
    case 'motion': return '动效';
    case 'icon': return '图标';
    case 'font': return '字体';
    case 'texture': return '材质';
    default: return type;
  }
};

const getTypeBadgeClass = (type) => {
  switch (type) {
    case 'component':
      return 'bg-[#2563eb] text-white';
    case 'aesthetic':
      return 'bg-[#ec4899] text-white';
    case 'palette':
      return 'bg-[#eab308] text-black';
    case 'motion':
      return 'bg-[#10b981] text-black';
    case 'icon':
      return 'bg-[#8b5cf6] text-white';
    case 'font':
      return 'bg-[#06b6d4] text-black font-bold';
    default:
      return 'bg-[#64748b] text-white';
  }
};
</script>
