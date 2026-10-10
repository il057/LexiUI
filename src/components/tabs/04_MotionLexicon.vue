<template>
  <div class="space-y-6">
    <!-- 模块头部标头 -->
    <div class="bg-[#12161f] border border-[#232a3a] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[3px_3px_0px_#000]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono-code px-2 py-0.5 bg-[#10b981] text-black font-extrabold uppercase">
            ARCHIVE // 04
          </span>
          <span class="text-xs font-mono-code text-[#7c889d]">MOTION & TRANSITIONS LEXICON</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display-tech">
          交互与动效语义词典 (Motion & Transitions)
        </h2>
        <p class="text-xs text-[#8e98a8] mt-1 max-w-2xl font-mono-code">
          告别千篇一律的 `transition: all 0.3s ease`。用精准的物理阻尼参数、贝塞尔曲线与级联节奏向 AI 表达真实触觉动效。
        </p>
      </div>

      <div class="flex items-center gap-2 text-xs font-mono-code text-[#8e98a8]">
        <Activity class="w-4 h-4 text-[#10b981] animate-pulse" />
        <span>物理引擎微型沙盒 // 实时可玩</span>
      </div>
    </div>

    <!-- 动效卡片网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="motion in motionsData"
        :key="motion.id"
        class="bg-[#13161f] border border-[#232938] hover:border-[#384357] shadow-[4px_4px_0px_#000] flex flex-col justify-between transition-all"
      >
        <!-- 卡片顶部状态条 -->
        <div class="px-4 py-2.5 bg-[#171b26] border-b border-[#232a39] flex items-center justify-between font-mono-code text-[11px] select-none">
          <span class="text-[#10b981] font-bold">{{ motion.category }}</span>
          <span class="text-[#64748b] text-[10px]">{{ motion.specs }}</span>
        </div>

        <!-- 上半部分: 实时交互微动效沙盒 -->
        <div class="p-6 bg-[#0c0e14] border-b border-[#1f2533] min-h-[170px] flex items-center justify-center relative overflow-hidden select-none">
          <div class="absolute inset-0 dot-texture opacity-25 pointer-events-none"></div>

          <!-- 沙盒 1: 弹簧弹性阻尼 -->
          <div v-if="motion.sandboxType === 'spring-button'" class="text-center">
            <button
              class="px-5 py-2.5 bg-[#10b981] text-black font-mono-code font-bold text-xs uppercase border border-black shadow-[3px_3px_0px_#000] cursor-pointer transition-transform active:scale-90 duration-300 hover:scale-105"
              style="transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);"
            >
              SPRING BOUNCE // 点击测试
            </button>
            <div class="text-[10px] font-mono-code text-[#627088] mt-2">
              点击或悬浮触发物理振荡过冲
            </div>
          </div>

          <!-- 沙盒 2: 阶梯交错淡入 -->
          <div v-else-if="motion.sandboxType === 'stagger-list'" class="w-full max-w-xs space-y-1.5 font-mono-code text-xs">
            <div class="flex justify-between items-center mb-1">
              <span class="text-[10px] text-[#717d93]">级联入场序列</span>
              <button
                @click="replayStagger"
                class="text-[9px] text-[#10b981] hover:underline cursor-pointer"
              >
                ↻ 重播入场
              </button>
            </div>
            <div
              v-for="(item, idx) in staggerItems"
              :key="idx"
              class="bg-[#171c26] border border-[#2b3548] px-3 py-1 text-[11px] text-[#cbd5e1] transition-all duration-300"
              :class="staggerTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              :style="{ transitionDelay: `${idx * 60}ms` }"
            >
              子项 {{ idx + 1 }} // {{ item }}
            </div>
          </div>

          <!-- 沙盒 3: 3D 悬浮视差跟手倾角 -->
          <div
            v-else-if="motion.sandboxType === 'parallax-card'"
            @mousemove="handleTiltMove"
            @mouseleave="handleTiltLeave"
            class="w-48 h-24 bg-[#181d28] border-2 border-[#10b981] p-3 flex flex-col justify-between text-xs font-mono-code cursor-pointer transition-transform duration-75 shadow-lg"
            :style="{
              transform: `perspective(600px) rotateX(${tiltState.rotateX}deg) rotateY(${tiltState.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            }"
          >
            <div class="flex justify-between text-[10px] text-[#10b981]">
              <span>3D 陀螺仪倾角</span>
              <span>800PX 景深</span>
            </div>
            <div class="text-center font-bold text-white text-[11px]">
              光标坐标实时追踪
            </div>
            <div class="text-[9px] text-[#717f96] text-right">
              X: {{ tiltState.rotateY.toFixed(1) }}° | Y: {{ tiltState.rotateX.toFixed(1) }}°
            </div>
          </div>

          <!-- 沙盒 4: 磁吸附微引力 -->
          <div v-else-if="motion.sandboxType === 'magnetic-button'" class="text-center">
            <button
              @mousemove="handleMagneticMove"
              @mouseleave="handleMagneticLeave"
              class="px-5 py-2.5 bg-[#1b2230] text-[#10b981] hover:text-white hover:border-[#10b981] font-mono-code text-xs border border-[#2d374d] cursor-pointer transition-transform duration-100"
              :style="{ transform: `translate3d(${magneticState.x}px, ${magneticState.y}px, 0)` }"
            >
              磁吸力按钮 (靠近边缘拉扯)
            </button>
            <div class="text-[10px] font-mono-code text-[#627088] mt-2">
              60PX 引力引流作用半径
            </div>
          </div>

          <!-- 沙盒 5: 机械印戳触觉按压 -->
          <div v-else-if="motion.sandboxType === 'stamp-trigger'" class="text-center">
            <button
              @click="triggerLocalStamp"
              class="relative px-5 py-2.5 bg-[#ff3b30] text-white font-mono-code font-bold text-xs uppercase border border-black shadow-[3px_3px_0px_#000] cursor-pointer active:scale-95"
              :class="{ 'animate-stamp': stampActive }"
            >
              盖印触感 // 点击触发
            </button>
            <div class="text-[10px] font-mono-code text-[#627088] mt-2">
              微角度机械冲压回弹
            </div>
          </div>

          <!-- 沙盒 6: 动力学无缝跑马灯 -->
          <div v-else-if="motion.sandboxType === 'infinite-marquee'" class="w-full overflow-hidden bg-[#141822] border border-[#262f40] py-2">
            <div class="flex whitespace-nowrap animate-marquee">
              <span
                v-for="i in 4"
                :key="i"
                class="text-[11px] font-mono-code text-[#10b981] font-bold mx-3 flex items-center gap-2"
              >
                <span>⚡ 动力学跑马灯</span>
                <span class="text-[#556379]">///</span>
                <span>KINETIC MARQUEE</span>
                <span class="text-[#556379]">///</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 下半部分: 动效技术说明与 AI 提示词 -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-baseline justify-between">
              <h3 class="text-base font-extrabold text-white font-display-tech">
                {{ motion.name }}
              </h3>
            </div>
            <div class="text-xs text-[#94a3b8] font-mono-code mt-0.5">
              {{ motion.cnName }}
            </div>

            <!-- 标签 -->
            <div class="flex items-center gap-1.5 flex-wrap mt-2">
              <span
                v-for="tag in motion.tags"
                :key="tag"
                class="text-[9px] font-mono-code px-1.5 py-0.5 bg-[#171c26] text-[#6ee7b7] border border-[#25323a]"
              >
                #{{ tag }}
              </span>
            </div>

            <!-- AI Prompt 规范框 -->
            <div class="mt-3 bg-[#0a0c10] border border-[#1d222e] p-2.5">
              <div class="flex justify-between text-[9px] font-mono-code text-[#5e6b82] mb-1">
                <span>动效时序与物理参数指令:</span>
                <button
                  @click="copySnippet(motion.prompt, '已复制动效提示词', motion.name)"
                  class="text-[#10b981] hover:underline cursor-pointer"
                >
                  复制文本
                </button>
              </div>
              <p class="text-[11px] font-mono-code text-[#cbd5e1] leading-relaxed select-text">
                {{ motion.prompt }}
              </p>
            </div>
          </div>

          <!-- 底部操作按钮 -->
          <div class="pt-3 border-t border-[#1f2533] flex items-center gap-2">
            <button
              @click="addMotionToDock(motion)"
              class="flex-1 py-2 px-3 bg-[#10b981] text-black font-mono-code font-bold text-xs uppercase tracking-wide border border-black shadow-[2px_2px_0px_#000] hover:bg-[#059669] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>+ ADD TO PROMPT // 注入动效至工作台</span>
            </button>

            <button
              @click="copySnippet(motion.cssSnippet, '已复制动效 CSS 代码', motion.name)"
              class="py-2 px-3 bg-[#191f2c] text-[#cbd5e1] hover:text-white border border-[#2b3548] font-mono-code text-xs hover:border-[#10b981] transition-colors cursor-pointer"
              title="复制 CSS 动画代码片段"
            >
              <Code class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { motionsData } from '../../data/motionsData';
import { usePromptDock } from '../../composables/usePromptDock';
import { Plus, Code, Activity } from 'lucide-vue-next';

const { addItem, copyToClipboard } = usePromptDock();

// Stagger 列表项状态
const staggerItems = ['卡片容器甲板', '遥测状态标头', '硬件指标计量表'];
const staggerTriggered = ref(true);
const replayStagger = () => {
  staggerTriggered.value = false;
  setTimeout(() => {
    staggerTriggered.value = true;
  }, 80);
};

// 3D 视差倾角状态
const tiltState = reactive({ rotateX: 0, rotateY: 0 });
const handleTiltMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  tiltState.rotateX = -(y / (rect.height / 2)) * 14;
  tiltState.rotateY = (x / (rect.width / 2)) * 14;
};
const handleTiltLeave = () => {
  tiltState.rotateX = 0;
  tiltState.rotateY = 0;
};

// 磁吸按钮状态
const magneticState = reactive({ x: 0, y: 0 });
const handleMagneticMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  magneticState.x = x * 0.35;
  magneticState.y = y * 0.35;
};
const handleMagneticLeave = () => {
  magneticState.x = 0;
  magneticState.y = 0;
};

// 盖印触觉按压状态
const stampActive = ref(false);
const triggerLocalStamp = () => {
  stampActive.value = true;
  setTimeout(() => {
    stampActive.value = false;
  }, 250);
};

const copySnippet = (text, title, sub) => {
  copyToClipboard(text, title, sub);
};

const addMotionToDock = (motion) => {
  addItem({
    id: `mot-${motion.id}`,
    title: motion.name,
    type: 'motion',
    content: motion.prompt,
    meta: motion
  });
};
</script>

<style scoped>
@keyframes marqueeScroll {
  from { transform: translateX(0%); }
  to { transform: translateX(-50%); }
}
.animate-marquee {
  display: inline-flex;
  width: max-content;
  animation: marqueeScroll 14s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
