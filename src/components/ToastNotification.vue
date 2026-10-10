<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="visible && toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#12151c] border-2 border-[#ccff00] text-white px-5 py-3.5 shadow-[6px_6px_0px_#000] font-mono-code text-xs select-none pointer-events-none"
      >
        <!-- 机械印戳红黄状态标 -->
        <div class="px-2 py-0.5 bg-[#ccff00] text-black font-extrabold tracking-wider text-[11px] uppercase">
          STAMPED // 已盖印
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-[#f1f5f9] tracking-wide">{{ toastMessage.msg }}</span>
          <span v-if="toastMessage.sub" class="text-[#8e98a8] text-[10px] truncate max-w-xs">{{ toastMessage.sub }}</span>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping ml-2"></div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePromptDock } from '../composables/usePromptDock';

const { toastMessage, toastTimestamp } = usePromptDock();
const visible = ref(false);
let timer = null;

watch(toastTimestamp, () => {
  if (toastMessage.value) {
    visible.value = true;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      visible.value = false;
    }, 2400);
  }
});
</script>
