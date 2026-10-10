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
          <span class="text-[10px] font-mono-code px-1.5 py-0.2 bg-[#1b2230] text-[#ccff00] border border-[#2d374a]">
            {{ filteredComponents.length }} UNITS
          </span>
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

          <!-- 1. Segmented Control -->
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
              <div
                class="absolute top-1 bottom-1 bg-[#ccff00] transition-all duration-200 shadow-sm"
                :style="getSegmentedPillStyle()"
              ></div>
            </div>
          </div>

          <!-- 2. Tabs / Underline Navigation -->
          <div v-else-if="comp.sandboxType === 'tabs-underline'" class="w-full max-w-xs space-y-3 font-mono-code">
            <div class="relative flex items-center border-b border-[#262f40] pb-1">
              <button
                v-for="tab in tabItems"
                :key="tab.key"
                @click="sandboxState.activeTab = tab.key"
                class="flex-1 py-1 text-center text-[11px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                :class="sandboxState.activeTab === tab.key ? 'text-[#ccff00]' : 'text-[#717b8f] hover:text-white'"
              >
                <span>{{ tab.label }}</span>
                <span
                  class="text-[9px] px-1 py-0.2 rounded-xs"
                  :class="sandboxState.activeTab === tab.key ? 'bg-[#ccff00]/20 text-[#ccff00]' : 'bg-[#1b212d] text-[#556177]'"
                >
                  {{ tab.count }}
                </span>
              </button>
              <!-- 荧光滑动下划线游标 -->
              <div
                class="absolute -bottom-px h-0.5 bg-[#ccff00] transition-all duration-200 shadow-[0_0_8px_#ccff00]"
                :style="getTabUnderlineStyle()"
              ></div>
            </div>
            <div class="text-[10px] text-center text-[#8e98a8] bg-[#141923] p-1.5 border border-[#222a3a]">
              ACTIVE VIEW: <span class="text-white font-bold">{{ sandboxState.activeTab }}</span>
            </div>
          </div>

          <!-- 3. Stepper / Wizard -->
          <div v-else-if="comp.sandboxType === 'stepper-wizard'" class="w-full max-w-xs space-y-3 font-mono-code">
            <!-- 步骤连线与圆环指示 -->
            <div class="relative flex items-center justify-between px-2">
              <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#232b3b] -z-0">
                <div
                  class="h-full bg-[#ccff00] transition-all duration-300"
                  :style="{ width: sandboxState.stepperStep === 1 ? '0%' : sandboxState.stepperStep === 2 ? '50%' : '100%' }"
                ></div>
              </div>

              <div
                v-for="step in [1, 2, 3]"
                :key="step"
                class="relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all"
                :class="[
                  step < sandboxState.stepperStep
                    ? 'bg-[#ccff00] text-black border-[#ccff00]'
                    : step === sandboxState.stepperStep
                    ? 'bg-[#151a24] text-[#ccff00] border-[#ccff00] ring-2 ring-[#ccff00]/40'
                    : 'bg-[#121620] text-[#64748b] border-[#293245]'
                ]"
              >
                <span v-if="step < sandboxState.stepperStep">✓</span>
                <span v-else>{{ step }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center text-[10px]">
              <span class="text-[#78859c]">
                阶段: <span class="text-white font-bold">{{ getStepTitle(sandboxState.stepperStep) }}</span>
              </span>
              <div class="flex gap-1.5">
                <button
                  @click="stepPrev"
                  :disabled="sandboxState.stepperStep === 1"
                  class="px-2 py-0.5 bg-[#171c26] border border-[#2c3547] text-[#cbd5e1] hover:text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  ‹ 上步
                </button>
                <button
                  @click="stepNext"
                  :disabled="sandboxState.stepperStep === 3"
                  class="px-2 py-0.5 bg-[#ccff00] border border-black text-black font-bold hover:bg-[#b8e600] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  下一步 ›
                </button>
              </div>
            </div>
          </div>

          <!-- 4. Command Palette -->
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

          <!-- 5. Slider / Range -->
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

          <!-- 6. Combobox -->
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

          <!-- 7. Tactile Switch -->
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

          <!-- 8. Drawer / Sheet -->
          <div v-else-if="comp.sandboxType === 'drawer-sheet'" class="w-full text-center font-mono-code">
            <button
              @click="sandboxState.drawerOpen = !sandboxState.drawerOpen"
              class="px-3 py-1.5 bg-[#1a202d] hover:bg-[#252e40] text-xs text-[#cbd5e1] border border-[#343e54] cursor-pointer"
            >
              {{ sandboxState.drawerOpen ? '收起抽屉面板' : '触发边缘滑出抽屉' }}
            </button>
            <div class="text-[9px] text-[#64748b] mt-1.5">
              点击触发底部滑入与拖拽条抽屉
            </div>

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

          <!-- 9. Modal / Dialog -->
          <div v-else-if="comp.sandboxType === 'modal-dialog'" class="w-full flex flex-col items-center justify-center font-mono-code">
            <button
              @click="sandboxState.modalOpen = true"
              class="px-3 py-1.5 bg-[#171d29] hover:bg-[#21293a] text-xs text-[#cbd5e1] border border-[#333e54] hover:border-[#ef4444] cursor-pointer"
            >
              ⚠ 呼出核心模态对话框
            </button>
            <div class="text-[9px] text-[#64748b] mt-1.5">
              点击呼出居中模态遮罩与操作浮层
            </div>

            <!-- 模态框浮层 -->
            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="sandboxState.modalOpen"
                @click.self="sandboxState.modalOpen = false"
                class="absolute inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 z-30"
              >
                <div
                  class="w-full max-w-[270px] bg-[#121620] border-2 border-[#ef4444] shadow-[4px_4px_0px_#000] p-3 flex flex-col justify-between text-left"
                >
                  <div>
                    <div class="flex items-center justify-between pb-1 border-b border-[#293245] text-[10px]">
                      <span class="text-[#ef4444] font-bold">SECURITY // 阻塞确认</span>
                      <button @click="sandboxState.modalOpen = false" class="text-[#78859c] hover:text-white cursor-pointer px-1">✕</button>
                    </div>
                    <div class="text-[10px] text-white font-bold mt-2">
                      确认重置集群网络证书？
                    </div>
                    <p class="text-[9px] text-[#8e98a8] mt-1 leading-normal">
                      此操作将中断全部活跃长链接并刷新凭证。
                    </p>
                  </div>

                  <div class="flex gap-2 justify-end pt-2 mt-2 border-t border-[#202736]">
                    <button
                      @click="sandboxState.modalOpen = false"
                      class="px-2 py-1 text-[9px] bg-[#1a212f] text-[#cbd5e1] border border-[#2d374a] hover:text-white cursor-pointer"
                    >
                      取消
                    </button>
                    <button
                      @click="sandboxState.modalOpen = false"
                      class="px-2 py-1 text-[9px] bg-[#ef4444] text-white font-bold border border-black hover:bg-[#dc2626] cursor-pointer shadow-sm"
                    >
                      确认重置
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- 10. Popover / Tooltip -->
          <div v-else-if="comp.sandboxType === 'popover-tooltip'" class="relative text-center">
            <button
              @mouseenter="sandboxState.popoverVisible = true"
              @mouseleave="sandboxState.popoverVisible = false"
              @click="sandboxState.popoverVisible = !sandboxState.popoverVisible"
              class="px-3 py-1.5 bg-[#171c26] hover:bg-[#222938] text-xs font-mono-code text-[#f1f5f9] border border-[#2e374a] cursor-pointer"
            >
              悬浮或点击触发气泡
            </button>

            <div
              v-if="sandboxState.popoverVisible"
              class="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1b2230] text-white border border-[#ccff00] px-3 py-1.5 text-[10px] font-mono-code whitespace-nowrap shadow-[3px_3px_0px_#000] z-20"
            >
              <span>定向锚定气泡浮层</span>
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1b2230] border-r border-b border-[#ccff00] rotate-45"></div>
            </div>
          </div>

          <!-- 11. Dropdown Menu -->
          <div v-else-if="comp.sandboxType === 'dropdown-menu'" class="relative font-mono-code text-xs">
            <button
              @click="sandboxState.dropdownOpen = !sandboxState.dropdownOpen"
              class="px-3 py-1.5 bg-[#171c26] hover:bg-[#21293a] text-xs text-[#f1f5f9] border border-[#2f394d] flex items-center gap-2 cursor-pointer"
            >
              <span>控制台操作菜单</span>
              <span class="text-[#ccff00] text-[9px]">{{ sandboxState.dropdownOpen ? '▲' : '▼' }}</span>
            </button>

            <!-- 浮动菜单 -->
            <div
              v-if="sandboxState.dropdownOpen"
              class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 bg-[#141822] border border-[#2d384c] shadow-[4px_4px_0px_#000] z-30 py-1 text-[10px]"
            >
              <div
                @click="selectDropdownAction('重新加载核心')"
                class="px-2.5 py-1 text-[#cbd5e1] hover:bg-[#ccff00] hover:text-black cursor-pointer flex justify-between items-center"
              >
                <span>重新加载核心</span>
                <span class="text-[9px] opacity-60">⌘R</span>
              </div>
              <div
                @click="selectDropdownAction('导出配置快照')"
                class="px-2.5 py-1 text-[#cbd5e1] hover:bg-[#ccff00] hover:text-black cursor-pointer flex justify-between items-center"
              >
                <span>导出配置快照</span>
                <span class="text-[9px] opacity-60">⌘E</span>
              </div>
              <div class="h-px bg-[#232b3b] my-1"></div>
              <div
                @click="selectDropdownAction('强制终止服务')"
                class="px-2.5 py-1 text-[#ef4444] hover:bg-[#ef4444] hover:text-white cursor-pointer flex justify-between items-center"
              >
                <span>强制终止服务</span>
                <span class="text-[9px] opacity-70">KILL</span>
              </div>
            </div>
          </div>

          <!-- 12. Toast / Sonner -->
          <div v-else-if="comp.sandboxType === 'toast-notification'" class="w-full max-w-xs relative font-mono-code">
            <div class="flex justify-between items-center mb-2">
              <span class="text-[10px] text-[#717b8f]">轻通知栈模拟</span>
              <button
                @click="triggerToast"
                class="px-2 py-0.5 bg-[#19202d] text-[#ccff00] border border-[#2d384c] text-[9px] hover:border-[#ccff00] cursor-pointer"
              >
                + 激发通知
              </button>
            </div>

            <div
              v-if="sandboxState.toastVisible"
              class="bg-[#151924] border border-[#2c374b] p-2.5 shadow-[3px_3px_0px_#000] relative overflow-hidden transition-all"
            >
              <!-- 顶部荧光条 -->
              <div class="absolute top-0 left-0 right-0 h-0.5 bg-[#ccff00]"></div>
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="text-[10px] font-bold text-white flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping"></span>
                    <span>DISPATCH // 调度完成</span>
                  </div>
                  <p class="text-[9px] text-[#8e98a8] mt-0.5">
                    边缘节点配置已成功同步 (延迟: 14ms)
                  </p>
                </div>
                <button @click="sandboxState.toastVisible = false" class="text-[#64748b] hover:text-white text-xs cursor-pointer">✕</button>
              </div>
            </div>
            <div v-else class="text-center text-[10px] text-[#556177] py-3 border border-dashed border-[#222938]">
              [ 当前无活动通知，点击上方按钮激发 ]
            </div>
          </div>

          <!-- 13. Status Badge -->
          <div v-else-if="comp.sandboxType === 'status-badge'" class="w-full max-w-xs space-y-3 font-mono-code">
            <div class="flex items-center justify-center gap-2">
              <!-- Online -->
              <button
                @click="sandboxState.badgeStatus = 'online'"
                class="px-2 py-1 text-[10px] border flex items-center gap-1.5 transition-all cursor-pointer"
                :class="sandboxState.badgeStatus === 'online' ? 'bg-[#10b981]/20 border-[#10b981] text-[#34d399]' : 'bg-[#121620] border-[#252d3d] text-[#64748b]'"
              >
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                </span>
                <span>ONLINE</span>
              </button>

              <!-- Warning -->
              <button
                @click="sandboxState.badgeStatus = 'warning'"
                class="px-2 py-1 text-[10px] border flex items-center gap-1.5 transition-all cursor-pointer"
                :class="sandboxState.badgeStatus === 'warning' ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#fbbf24]' : 'bg-[#121620] border-[#252d3d] text-[#64748b]'"
              >
                <span class="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
                <span>WARN</span>
              </button>

              <!-- Critical -->
              <button
                @click="sandboxState.badgeStatus = 'critical'"
                class="px-2 py-1 text-[10px] border flex items-center gap-1.5 transition-all cursor-pointer"
                :class="sandboxState.badgeStatus === 'critical' ? 'bg-[#ef4444]/20 border-[#ef4444] text-[#f87171]' : 'bg-[#121620] border-[#252d3d] text-[#64748b]'"
              >
                <span class="w-2 h-2 rounded-full bg-[#ef4444]"></span>
                <span>HALTED</span>
              </button>
            </div>

            <div class="text-[9px] text-center text-[#8e98a8]">
              当前节点负载监控: <span class="text-white font-bold">{{ getBadgeDescription(sandboxState.badgeStatus) }}</span>
            </div>
          </div>

          <!-- 14. Avatar Stack -->
          <div v-else-if="comp.sandboxType === 'avatar-stack'" class="space-y-3 font-mono-code text-center">
            <div
              class="flex items-center justify-center transition-all cursor-pointer"
              @click="sandboxState.avatarExpanded = !sandboxState.avatarExpanded"
            >
              <div
                v-for="(av, i) in avatarUsers"
                :key="av.id"
                class="relative transition-all duration-300 hover:-translate-y-1 group/av"
                :class="sandboxState.avatarExpanded ? 'mx-1' : '-ml-2.5 first:ml-0'"
                :style="{ zIndex: 10 - i }"
              >
                <div
                  class="w-8 h-8 rounded-full border-2 border-[#0c0e14] flex items-center justify-center text-[10px] font-bold text-black"
                  :style="{ backgroundColor: av.color }"
                >
                  {{ av.initial }}
                </div>
                <!-- 在线角标 -->
                <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10b981] border border-[#0c0e14]"></span>
              </div>

              <!-- 溢出 +5 胶囊 -->
              <div
                class="w-8 h-8 rounded-full bg-[#1e2533] border-2 border-[#0c0e14] flex items-center justify-center text-[10px] font-bold text-[#ccff00] transition-all"
                :class="sandboxState.avatarExpanded ? 'mx-1' : '-ml-2.5'"
              >
                +5
              </div>
            </div>

            <p class="text-[9px] text-[#717b8f]">
              {{ sandboxState.avatarExpanded ? '已展开间距模式 (点击收拢)' : '重叠带裁切保护环模式 (点击展开)' }}
            </p>
          </div>

          <!-- 15. Segmented Progress / Meter -->
          <div v-else-if="comp.sandboxType === 'segmented-meter'" class="w-full max-w-xs space-y-2.5 font-mono-code">
            <div class="flex justify-between items-center text-[11px]">
              <span class="text-[#717b8f]">离散电平计量槽</span>
              <span
                class="font-bold"
                :class="sandboxState.meterValue >= 80 ? 'text-[#ef4444]' : 'text-[#ccff00]'"
              >
                {{ sandboxState.meterValue }}% {{ sandboxState.meterValue >= 80 ? 'OVERLOAD' : 'NOMINAL' }}
              </span>
            </div>

            <!-- 12 栅格 LED 刻度条 -->
            <div class="grid grid-cols-12 gap-1 bg-[#131722] p-1.5 border border-[#242c3d]">
              <div
                v-for="idx in 12"
                :key="idx"
                class="h-4 transition-all duration-150"
                :class="getMeterTickClass(idx)"
              ></div>
            </div>

            <!-- 控制微调 -->
            <div class="flex justify-between items-center">
              <span class="text-[9px] text-[#556177]">阈值告警: > 80%</span>
              <div class="flex gap-1.5">
                <button
                  @click="adjustMeter(-10)"
                  class="px-2 py-0.5 bg-[#171c26] border border-[#2d3648] text-xs text-[#cbd5e1] hover:text-white cursor-pointer"
                >
                  -10%
                </button>
                <button
                  @click="adjustMeter(10)"
                  class="px-2 py-0.5 bg-[#171c26] border border-[#2d3648] text-xs text-[#ccff00] hover:border-[#ccff00] cursor-pointer"
                >
                  +10%
                </button>
              </div>
            </div>
          </div>

          <!-- 16. Kbd Keycap Badge -->
          <div v-else-if="comp.sandboxType === 'kbd-keycap'" class="w-full max-w-xs space-y-3 font-mono-code text-center">
            <div class="flex items-center justify-center gap-2">
              <button
                v-for="k in ['⌘ CMD', 'SHIFT', 'P']"
                :key="k"
                @mousedown="pressKey(k)"
                @mouseup="sandboxState.keyPressActive = false"
                class="px-3 py-1.5 bg-[#1b2230] text-[#f1f5f9] text-[11px] font-bold border-t border-l border-r border-[#3b475e] border-b-4 border-b-[#0c0f16] shadow-sm select-none transition-all cursor-pointer"
                :class="{ 'translate-y-0.5 border-b-2 bg-[#ccff00] text-black': sandboxState.lastPressedKey === k && sandboxState.keyPressActive }"
              >
                {{ k }}
              </button>
            </div>

            <div class="text-[10px] text-[#8e98a8]">
              触发复合键指令: <span class="text-[#ccff00] font-bold">PALETTE_ACTION // FOCUS</span>
            </div>
          </div>

          <!-- 17. Skeleton / Shimmer Loader -->
          <div v-else-if="comp.sandboxType === 'skeleton-shimmer'" class="w-full max-w-xs space-y-2.5 font-mono-code">
            <div class="flex justify-between items-center text-[10px]">
              <span class="text-[#717b8f]">状态: {{ sandboxState.skeletonLoading ? '骨架加载中' : '数据就绪态' }}</span>
              <button
                @click="sandboxState.skeletonLoading = !sandboxState.skeletonLoading"
                class="px-2 py-0.5 bg-[#171c26] text-[#ccff00] border border-[#283244] text-[9px] hover:border-[#ccff00] cursor-pointer"
              >
                切换加载态
              </button>
            </div>

            <!-- 加载骨架屏 -->
            <div
              v-if="sandboxState.skeletonLoading"
              class="p-2.5 bg-[#131722] border border-[#222a3a] space-y-2 animate-shimmer"
            >
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full bg-[#202738]"></div>
                <div class="space-y-1 flex-1">
                  <div class="h-2.5 bg-[#202738] w-2/3"></div>
                  <div class="h-2 bg-[#191f2c] w-1/3"></div>
                </div>
              </div>
              <div class="h-2 bg-[#1b212f] w-full"></div>
              <div class="h-2 bg-[#1b212f] w-4/5"></div>
            </div>

            <!-- 数据呈现 -->
            <div
              v-else
              class="p-2.5 bg-[#141924] border border-[#2d384d] space-y-1 text-left text-[10px]"
            >
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-[#ccff00] text-black font-bold flex items-center justify-center text-xs">
                  Ω
                </div>
                <div>
                  <div class="text-white font-bold">AGENT_SEVEN</div>
                  <div class="text-[9px] text-[#10b981]">READY // 协议就绪</div>
                </div>
              </div>
              <p class="text-[9px] text-[#8e98a8] pt-1">已成功挂载 24 个边缘推理张量核心。</p>
            </div>
          </div>

          <!-- 18. Accordion -->
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

          <!-- 19. Bento Grid -->
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

          <!-- 20. Tree View / File Explorer -->
          <div v-else-if="comp.sandboxType === 'tree-view'" class="w-full max-w-xs bg-[#121620] border border-[#263044] p-2 font-mono-code text-[10px] text-left">
            <div class="text-[#64748b] text-[9px] border-b border-[#21293a] pb-1 mb-1.5 flex justify-between">
              <span>PROJECT // WORKSPACE</span>
              <span class="text-[#ccff00]">{{ sandboxState.selectedTreeFile }}</span>
            </div>

            <!-- src 根目录 -->
            <div>
              <div
                @click="sandboxState.treeOpen.src = !sandboxState.treeOpen.src"
                class="flex items-center gap-1.5 text-[#cbd5e1] hover:text-white cursor-pointer select-none py-0.5"
              >
                <span class="text-[#ccff00] text-[9px]">{{ sandboxState.treeOpen.src ? '▼' : '▶' }}</span>
                <span class="text-[#f59e0b]">📁 src/</span>
              </div>

              <!-- src 子项 -->
              <div v-if="sandboxState.treeOpen.src" class="pl-3 border-l border-[#232b3b] ml-1.5 space-y-0.5">
                <!-- components 目录 -->
                <div>
                  <div
                    @click="sandboxState.treeOpen.components = !sandboxState.treeOpen.components"
                    class="flex items-center gap-1.5 text-[#cbd5e1] hover:text-white cursor-pointer select-none py-0.5"
                  >
                    <span class="text-[#ccff00] text-[9px]">{{ sandboxState.treeOpen.components ? '▼' : '▶' }}</span>
                    <span class="text-[#f59e0b]">📁 components/</span>
                  </div>
                  <div v-if="sandboxState.treeOpen.components" class="pl-3 border-l border-[#232b3b] ml-1.5 space-y-0.5">
                    <div
                      v-for="file in ['Header.vue', 'Sidebar.vue']"
                      :key="file"
                      @click="sandboxState.selectedTreeFile = file"
                      class="py-0.5 px-1 cursor-pointer flex items-center gap-1.5"
                      :class="sandboxState.selectedTreeFile === file ? 'bg-[#ccff00]/15 text-[#ccff00] font-bold' : 'text-[#8e98a8] hover:text-white'"
                    >
                      <span class="text-[9px]">📄</span>
                      <span>{{ file }}</span>
                    </div>
                  </div>
                </div>

                <!-- App.vue -->
                <div
                  @click="sandboxState.selectedTreeFile = 'App.vue'"
                  class="py-0.5 px-1 cursor-pointer flex items-center gap-1.5"
                  :class="sandboxState.selectedTreeFile === 'App.vue' ? 'bg-[#ccff00]/15 text-[#ccff00] font-bold' : 'text-[#8e98a8] hover:text-white'"
                >
                  <span class="text-[9px]">📄</span>
                  <span>App.vue</span>
                </div>
              </div>
            </div>
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
  { key: 'Feedback & Notice', label: '反馈与状态' },
  { key: 'Data & Media', label: '数据与标识' },
  { key: 'Layout & Hierarchy', label: '布局与层级' }
];

// 交互沙盒全局响应式状态
const sandboxState = reactive({
  // 1. segmented
  segmented: '日频',
  // 2. tabs
  activeTab: 'OVERVIEW',
  // 3. stepper
  stepperStep: 2,
  // 5. slider
  slider: 65,
  // 6. combobox
  comboboxSearch: '',
  comboboxOpen: false,
  // 7. switch
  switchOn: true,
  // 8. drawer
  drawerOpen: false,
  // 9. modal
  modalOpen: false,
  // 10. popover
  popoverVisible: false,
  // 11. dropdown
  dropdownOpen: false,
  dropdownAction: '',
  // 12. toast
  toastVisible: true,
  // 13. status-badge
  badgeStatus: 'online',
  // 14. avatar-stack
  avatarExpanded: false,
  // 15. segmented-meter
  meterValue: 70,
  // 16. kbd
  lastPressedKey: 'P',
  keyPressActive: false,
  // 17. skeleton
  skeletonLoading: true,
  // 18. accordion
  accordionItems: [
    { title: '无障碍与属性规范', content: '遵循 WAI-ARIA 规范，自定义贝塞尔曲线与键盘循环聚焦。', open: true },
    { title: '键盘交互支持', content: '支持全键盘 Tab/方向键导航，提供高对比度聚焦环指示。', open: false }
  ],
  // 20. tree-view
  treeOpen: {
    src: true,
    components: true
  },
  selectedTreeFile: 'Header.vue'
});

// Tabs 相关数据
const tabItems = [
  { key: 'OVERVIEW', label: '概览', count: '12' },
  { key: 'RUNTIME', label: '运行', count: '04' },
  { key: 'METRICS', label: '指标', count: '99+' }
];

const getTabUnderlineStyle = () => {
  if (sandboxState.activeTab === 'OVERVIEW') return { left: '4px', width: '30%' };
  if (sandboxState.activeTab === 'RUNTIME') return { left: '35%', width: '30%' };
  return { left: '66%', width: '30%' };
};

// Stepper 相关
const getStepTitle = (step) => {
  if (step === 1) return '01 拓扑配置';
  if (step === 2) return '02 容器编译';
  return '03 生产发布';
};

const stepPrev = () => {
  if (sandboxState.stepperStep > 1) sandboxState.stepperStep--;
};

const stepNext = () => {
  if (sandboxState.stepperStep < 3) sandboxState.stepperStep++;
};

// Combobox 相关
const comboboxPool = ['Tailwind CSS', 'Vue 3 SFC', 'TypeScript', 'Lucide Icons', 'Vite Bundler'];

const filteredComboboxItems = computed(() => {
  const q = sandboxState.comboboxSearch.toLowerCase();
  return comboboxPool.filter(i => i.toLowerCase().includes(q));
});

const selectCombobox = (item) => {
  sandboxState.comboboxSearch = item;
  sandboxState.comboboxOpen = false;
};

// Segmented Control 胶囊样式
const getSegmentedPillStyle = () => {
  if (sandboxState.segmented === '日频') return { left: '4px', width: '31%' };
  if (sandboxState.segmented === '周频') return { left: '35%', width: '31%' };
  return { left: '66%', width: '31%' };
};

// Dropdown Action
const selectDropdownAction = (action) => {
  sandboxState.dropdownAction = action;
  sandboxState.dropdownOpen = false;
};

// Toast
const triggerToast = () => {
  sandboxState.toastVisible = true;
};

// Status Badge
const getBadgeDescription = (status) => {
  if (status === 'online') return '99.98% SLA // 健康正常';
  if (status === 'warning') return '响应降级 (840ms) // 警告';
  return '节点熔断隔离 // 阻断停机';
};

// Avatar Stack 虚拟协作者
const avatarUsers = [
  { id: '1', initial: 'OP', color: '#ccff00' },
  { id: '2', initial: 'CY', color: '#38bdf8' },
  { id: '3', initial: 'VK', color: '#ec4899' },
  { id: '4', initial: 'AX', color: '#f59e0b' }
];

// Segmented Meter 电平格
const adjustMeter = (delta) => {
  const next = sandboxState.meterValue + delta;
  sandboxState.meterValue = Math.max(0, Math.min(100, next));
};

const getMeterTickClass = (idx) => {
  const activeCount = Math.round((sandboxState.meterValue / 100) * 12);
  const isLit = idx <= activeCount;
  if (!isLit) return 'bg-[#1a2130] border border-[#252f42]';

  if (idx <= 8) {
    return 'bg-[#ccff00] shadow-[0_0_6px_#ccff00] border border-[#ccff00]';
  } else if (idx <= 10) {
    return 'bg-[#f59e0b] shadow-[0_0_6px_#f59e0b] border border-[#f59e0b]';
  } else {
    return 'bg-[#ef4444] shadow-[0_0_6px_#ef4444] border border-[#ef4444]';
  }
};

// Kbd 按键
const pressKey = (key) => {
  sandboxState.lastPressedKey = key;
  sandboxState.keyPressActive = true;
};

// 列表过滤
const filteredComponents = computed(() => {
  if (selectedCategory.value === 'ALL') return componentsData;
  return componentsData.filter(c => c.category === selectedCategory.value);
});

// 剪贴板交互
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
