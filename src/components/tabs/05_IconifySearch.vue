<template>
  <div class="space-y-6">
    <!-- 模块头部标头 -->
    <div class="bg-[#12161f] border border-[#232a3a] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[3px_3px_0px_#000]">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-mono-code px-2 py-0.5 bg-[#8b5cf6] text-white font-extrabold uppercase">
            ARCHIVE // 05
          </span>
          <span class="text-xs font-mono-code text-[#7c889d]">ICONIFY LIVE REST API SEARCH</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display-tech">
          SVG / 图标检索 (Iconify Live Search)
        </h2>
        <p class="text-xs text-[#8e98a8] mt-1 max-w-2xl font-mono-code">
          直连 Iconify 开放网络接口，即时检索 200,000+ 工业级开源矢量图标。支持一键内联 Raw SVG、Icon 名称与 Vue 组件代码复制。
        </p>
      </div>

      <div class="flex items-center gap-1.5 text-xs font-mono-code text-[#8e98a8]">
        <span class="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
        <span>开放 API: api.iconify.design</span>
      </div>
    </div>

    <!-- 搜索控制器与热门预设关键词 -->
    <div class="bg-[#131620] border border-[#222938] p-4 shadow-[3px_3px_0px_#000] space-y-3">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Search class="w-4 h-4 text-[#606d84] absolute left-3.5 top-3 pointer-events-none" />
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="输入英文图标关键词 (如 terminal, arrow, cpu, gear, shield, code)..."
            class="w-full bg-[#0d1017] text-white text-xs font-mono-code pl-10 pr-4 py-2.5 border border-[#2b3548] focus:border-[#8b5cf6] focus:outline-none transition-colors"
            @keydown.enter="triggerSearch"
          />
        </div>
        <button
          @click="triggerSearch"
          :disabled="loading"
          class="px-5 py-2.5 bg-[#8b5cf6] text-white font-mono-code font-bold text-xs uppercase tracking-wide border border-black shadow-[2px_2px_0px_#000] hover:bg-[#7c3aed] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        >
          <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
          <span>{{ loading ? '检索中...' : '实时检索' }}</span>
        </button>
      </div>

      <!-- 快捷预设标签 -->
      <div class="flex items-center gap-2 flex-wrap text-xs font-mono-code">
        <span class="text-[10px] text-[#637088] uppercase">热门预设:</span>
        <button
          v-for="kw in hotKeywords"
          :key="kw"
          @click="selectPreset(kw)"
          class="px-2 py-0.5 bg-[#171c26] text-[#cbd5e1] hover:text-[#8b5cf6] border border-[#262f40] hover:border-[#8b5cf6] text-[11px] cursor-pointer transition-colors"
        >
          {{ kw }}
        </button>
      </div>
    </div>

    <!-- 错误或回退状态 -->
    <div
      v-if="errorMessage"
      class="bg-[#211215] border border-[#4d1f25] p-4 text-xs font-mono-code text-[#ff6b6b] flex items-center justify-between"
    >
      <span>{{ errorMessage }}</span>
      <button @click="triggerSearch" class="underline cursor-pointer">重试</button>
    </div>

    <!-- 图标网格结果 -->
    <div
      v-if="!loading && iconResults.length === 0 && !errorMessage"
      class="p-12 text-center text-xs font-mono-code text-[#626e84] border border-dashed border-[#262f40]"
    >
      暂无结果，请输入英文关键词后按回车或点击「实时检索」按钮。
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
    >
      <div
        v-for="iconName in iconResults"
        :key="iconName"
        @click="openIconModal(iconName)"
        class="group relative bg-[#13161f] border border-[#222837] hover:border-[#8b5cf6] p-4 flex flex-col items-center justify-center gap-3 cursor-pointer shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-0.5"
      >
        <!-- 图标 SVG 预览 -->
        <div class="w-10 h-10 flex items-center justify-center text-[#cbd5e1] group-hover:text-[#8b5cf6] transition-colors">
          <img
            :src="getIconSvgUrl(iconName)"
            :alt="iconName"
            class="w-8 h-8 filter invert contrast-200"
            loading="lazy"
          />
        </div>

        <div class="w-full text-center">
          <div class="text-[11px] font-mono-code text-[#94a3b8] group-hover:text-white truncate font-bold">
            {{ iconName.split(':')[1] || iconName }}
          </div>
          <div class="text-[9px] font-mono-code text-[#556176] truncate">
            {{ iconName.split(':')[0] }}
          </div>
        </div>

        <!-- 悬浮角标 -->
        <div class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="text-[9px] font-mono-code bg-[#8b5cf6] text-white px-1 py-0.2">
            检视
          </span>
        </div>
      </div>
    </div>

    <!-- 图标详情与三种复制代码模式弹窗 -->
    <Teleport to="body">
      <div
        v-if="selectedIcon"
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        @click.self="selectedIcon = null"
      >
        <div class="bg-[#12151c] border-2 border-[#8b5cf6] w-full max-w-lg shadow-[8px_8px_0px_#000] flex flex-col font-mono-code">
          <!-- 弹窗标头 -->
          <div class="p-4 bg-[#181d27] border-b border-[#283244] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-[#8b5cf6]"></span>
              <span class="text-xs font-bold text-white uppercase">{{ selectedIcon }}</span>
            </div>
            <button @click="selectedIcon = null" class="text-[#7d889d] hover:text-white cursor-pointer">
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- 弹窗中心图形展示 -->
          <div class="p-6 bg-[#0c0e14] border-b border-[#1f2533] flex flex-col items-center justify-center gap-3">
            <div class="w-20 h-20 bg-[#161a24] border border-[#2d374a] flex items-center justify-center p-4">
              <img
                :src="getIconSvgUrl(selectedIcon)"
                :alt="selectedIcon"
                class="w-12 h-12 filter invert contrast-200"
              />
            </div>
            <div class="text-xs text-[#8e98a8]">
              矢量字形检视 (VECTOR GLYPH INSPECTION)
            </div>
          </div>

          <!-- 三种代码复制模式 -->
          <div class="p-5 space-y-3 bg-[#13161f]">
            <!-- 模式 1: Raw SVG 代码 -->
            <div class="space-y-1">
              <div class="flex justify-between text-[10px] text-[#6b778c]">
                <span>1. RAW 内联 SVG 原生代码</span>
                <span class="text-[#8b5cf6]">{{ fetchingSvg ? '加载中...' : '已就绪' }}</span>
              </div>
              <button
                @click="copyRawSvg"
                :disabled="fetchingSvg || !rawSvgCache[selectedIcon]"
                class="w-full py-2 px-3 bg-[#1a202c] hover:bg-[#252e3f] text-[#e2e8f0] border border-[#2d384b] hover:border-[#8b5cf6] text-xs flex items-center justify-between cursor-pointer transition-colors"
              >
                <span class="truncate max-w-[320px] text-[11px] text-[#94a3b8]">
                  {{ rawSvgCache[selectedIcon] ? rawSvgCache[selectedIcon].slice(0, 45) + '...' : '正在获取矢量代码...' }}
                </span>
                <span class="text-[#8b5cf6] font-bold text-[11px] shrink-0 ml-2">复制 SVG</span>
              </button>
            </div>

            <!-- 模式 2: 标准图标名 -->
            <div class="space-y-1">
              <div class="text-[10px] text-[#6b778c]">2. 标准图标名称标识符</div>
              <button
                @click="copySnippet(selectedIcon, '已复制图标名称', selectedIcon)"
                class="w-full py-2 px-3 bg-[#1a202c] hover:bg-[#252e3f] text-[#e2e8f0] border border-[#2d384b] hover:border-[#8b5cf6] text-xs flex items-center justify-between cursor-pointer transition-colors"
              >
                <span class="font-bold text-[#f1f5f9]">{{ selectedIcon }}</span>
                <span class="text-[#8b5cf6] font-bold text-[11px]">复制名称</span>
              </button>
            </div>

            <!-- 模式 3: Vue / JSX 组件标签 -->
            <div class="space-y-1">
              <div class="text-[10px] text-[#6b778c]">3. VUE / JSX 组件调用标签</div>
              <button
                @click="copySnippet(getVueTag(selectedIcon), '已复制 VUE 标签代码', selectedIcon)"
                class="w-full py-2 px-3 bg-[#1a202c] hover:bg-[#252e3f] text-[#e2e8f0] border border-[#2d384b] hover:border-[#8b5cf6] text-xs flex items-center justify-between cursor-pointer transition-colors"
              >
                <span class="text-[11px] text-[#38bdf8]">{{ getVueTag(selectedIcon) }}</span>
                <span class="text-[#8b5cf6] font-bold text-[11px]">复制标签</span>
              </button>
            </div>
          </div>

          <!-- 添加到工作台底部操作 -->
          <div class="p-4 bg-[#181d27] border-t border-[#252d3d] flex gap-2">
            <button
              @click="addIconToDock"
              class="flex-1 py-2.5 px-4 bg-[#8b5cf6] text-white font-bold text-xs uppercase tracking-wide border border-black shadow-[2px_2px_0px_#000] hover:bg-[#7c3aed] cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus class="w-4 h-4" />
              <span>+ ADD TO PROMPT // 注入工作台</span>
            </button>
            <button
              @click="selectedIcon = null"
              class="px-4 py-2.5 bg-[#1f2534] text-[#cbd5e1] text-xs border border-[#2d374a] cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { usePromptDock } from '../../composables/usePromptDock';
import { Search, Loader2, X, Plus } from 'lucide-vue-next';

const { addItem, copyToClipboard } = usePromptDock();

const searchKeyword = ref('terminal');
const loading = ref(false);
const iconResults = ref([]);
const errorMessage = ref(null);
const selectedIcon = ref(null);
const fetchingSvg = ref(false);
const rawSvgCache = reactive({});

const hotKeywords = ['terminal', 'arrow', 'shield', 'cpu', 'gear', 'activity', 'sparkles', 'box', 'code'];

const getIconSvgUrl = (iconName) => {
  const [prefix, name] = iconName.includes(':') ? iconName.split(':') : ['lucide', iconName];
  return `https://api.iconify.design/${prefix}/${name}.svg`;
};

const getVueTag = (iconName) => {
  return `<Icon icon="${iconName}" class="w-5 h-5 text-current" />`;
};

const triggerSearch = async () => {
  const kw = searchKeyword.value.trim();
  if (!kw) return;
  loading.value = true;
  errorMessage.value = null;

  try {
    const res = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(kw)}&limit=36`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.icons && data.icons.length > 0) {
      iconResults.value = data.icons;
    } else {
      iconResults.value = [];
    }
  } catch (err) {
    console.warn('Iconify search error:', err);
    errorMessage.value = 'Iconify 网络接口访问受限，已载入离线高频工业图标备选集。';
    iconResults.value = [
      'lucide:terminal', 'lucide:activity', 'lucide:shield', 'lucide:cpu',
      'lucide:command', 'lucide:box', 'lucide:layers', 'lucide:sliders',
      'lucide:sparkles', 'lucide:zap', 'lucide:code-2', 'lucide:crosshair'
    ];
  } finally {
    loading.value = false;
  }
};

const selectPreset = (kw) => {
  searchKeyword.value = kw;
  triggerSearch();
};

const openIconModal = async (iconName) => {
  selectedIcon.value = iconName;
  if (!rawSvgCache[iconName]) {
    fetchingSvg.value = true;
    try {
      const res = await fetch(getIconSvgUrl(iconName));
      if (res.ok) {
        const svgText = await res.text();
        rawSvgCache[iconName] = svgText;
      }
    } catch (e) {
      console.warn('获取 raw svg 失败', e);
    } finally {
      fetchingSvg.value = false;
    }
  }
};

const copySnippet = (text, title, sub) => {
  copyToClipboard(text, title, sub);
};

const copyRawSvg = () => {
  if (selectedIcon.value && rawSvgCache[selectedIcon.value]) {
    copyToClipboard(rawSvgCache[selectedIcon.value], '已复制 RAW 内联 SVG', selectedIcon.value);
  }
};

const addIconToDock = () => {
  if (!selectedIcon.value) return;
  addItem({
    id: `icon-${selectedIcon.value}`,
    title: selectedIcon.value,
    type: 'icon',
    content: `Icon glyph: ${selectedIcon.value}. Vector SVG standard tag: ${getVueTag(selectedIcon.value)}`,
    meta: { name: selectedIcon.value }
  });
  selectedIcon.value = null;
};

onMounted(() => {
  triggerSearch();
});
</script>
