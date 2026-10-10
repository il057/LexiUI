// src/composables/usePromptDock.js
import { ref, computed, watch } from 'vue';
import { negativeConstraints } from '../data/aestheticsData';

const STAGING_STORAGE_KEY = 'lexiui_staged_prompts';
const NEGATIVES_STORAGE_KEY = 'lexiui_negative_constraints';

// Reactive singleton state
const stagedItems = ref([]);
const enabledNegativeIds = ref(
  negativeConstraints.filter(c => c.defaultEnabled).map(c => c.id)
);
const activeTab = ref('components'); // 'components' | 'aesthetics' | 'palettes' | 'motions' | 'icons' | 'fonts'
const isDockOpen = ref(true);
const searchQuery = ref('');
const isSearchModalOpen = ref(false);
const toastMessage = ref(null);
const toastTimestamp = ref(0);

// Initialize from localStorage
try {
  const savedStaging = localStorage.getItem(STAGING_STORAGE_KEY);
  if (savedStaging) {
    stagedItems.value = JSON.parse(savedStaging);
  }
  const savedNegatives = localStorage.getItem(NEGATIVES_STORAGE_KEY);
  if (savedNegatives) {
    enabledNegativeIds.value = JSON.parse(savedNegatives);
  }
} catch (e) {
  console.warn('LocalStorage 读取异常:', e);
}

// Watchers for persistence
watch(stagedItems, (newVal) => {
  try {
    localStorage.setItem(STAGING_STORAGE_KEY, JSON.stringify(newVal));
  } catch (e) {
    console.warn(e);
  }
}, { deep: true });

watch(enabledNegativeIds, (newVal) => {
  try {
    localStorage.setItem(NEGATIVES_STORAGE_KEY, JSON.stringify(newVal));
  } catch (e) {
    console.warn(e);
  }
}, { deep: true });

export function usePromptDock() {
  const triggerToast = (msg, sub = '') => {
    toastMessage.value = { msg, sub };
    toastTimestamp.value = Date.now();
  };

  const addItem = (item) => {
    const existingIndex = stagedItems.value.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      triggerToast('该项目已在工作台中', item.title);
      return;
    }
    stagedItems.value.push({
      ...item,
      addedAt: Date.now()
    });
    triggerToast('已盖印至 PROMPT 工作台', item.title);
  };

  const removeItem = (id) => {
    stagedItems.value = stagedItems.value.filter(i => i.id !== id);
    triggerToast('已从工作台移除', id);
  };

  const clearAll = () => {
    stagedItems.value = [];
    triggerToast('工作台已清空', '已移除所有暂存提示词与规范');
  };

  const toggleNegative = (id) => {
    if (enabledNegativeIds.value.includes(id)) {
      enabledNegativeIds.value = enabledNegativeIds.value.filter(i => i !== id);
    } else {
      enabledNegativeIds.value.push(id);
    }
  };

  const isNegativeEnabled = (id) => enabledNegativeIds.value.includes(id);

  // Grouped items
  const componentItems = computed(() => stagedItems.value.filter(i => i.type === 'component'));
  const aestheticItems = computed(() => stagedItems.value.filter(i => i.type === 'aesthetic'));
  const paletteItems = computed(() => stagedItems.value.filter(i => i.type === 'palette'));
  const motionItems = computed(() => stagedItems.value.filter(i => i.type === 'motion'));
  const iconItems = computed(() => stagedItems.value.filter(i => i.type === 'icon'));
  const textureItems = computed(() => stagedItems.value.filter(i => i.type === 'texture'));
  const fontItems = computed(() => stagedItems.value.filter(i => i.type === 'font'));

  // Compiled Prompt Generator
  const compiledFullPrompt = computed(() => {
    const sections = [];

    // Header intro
    sections.push('### Role & UI Architecture Directive:');
    sections.push('Build a state-of-the-art, high-density, tactile and accessible web interface adhering to strict non-generic aesthetics.');

    // 1. Aesthetics & Style foundation
    if (aestheticItems.value.length > 0 || textureItems.value.length > 0) {
      sections.push('\n### Aesthetic & Visual Surface Foundation:');
      aestheticItems.value.forEach(item => {
        sections.push(`- **${item.title}**: ${item.content}`);
      });
      textureItems.value.forEach(item => {
        sections.push(`- **Surface Texture (${item.title})**: ${item.content}`);
      });
    }

    // 2. Typography Rules
    if (fontItems.value.length > 0) {
      sections.push('\n### Typography & WebFont Directives:');
      fontItems.value.forEach(item => {
        sections.push(`- **${item.title}**: ${item.content}`);
      });
    }

    // 3. Color Palette & Variables
    if (paletteItems.value.length > 0) {
      sections.push('\n### Color Palette & Token Architecture:');
      paletteItems.value.forEach(item => {
        sections.push(`- **${item.title}**: ${item.content}`);
        if (item.meta?.cssVariables) {
          sections.push(`CSS Variables specification:\n\`\`\`css\n${item.meta.cssVariables}\n\`\`\``);
        }
      });
    }

    // 4. Components to build
    if (componentItems.value.length > 0) {
      sections.push('\n### Required UI Components & Semantic Behavior:');
      componentItems.value.forEach(item => {
        sections.push(`- **${item.title}** (${item.meta?.cnName || ''}):\n  ${item.content}`);
      });
    }

    // 5. Motion & Transitions
    if (motionItems.value.length > 0) {
      sections.push('\n### Motion, Physics & Micro-Interactions:');
      motionItems.value.forEach(item => {
        sections.push(`- **${item.title}**: ${item.content}`);
      });
    }

    // 6. Icons & Assets
    if (iconItems.value.length > 0) {
      sections.push('\n### Iconography:');
      const iconNames = iconItems.value.map(i => i.title).join(', ');
      sections.push(`Use standard SVG icons: ${iconNames}. Render clean vector glyphs without bloated margins.`);
    }

    // 7. Anti-AI Negative Constraints
    const activeNegatives = negativeConstraints.filter(c => enabledNegativeIds.value.includes(c.id));
    if (activeNegatives.length > 0) {
      sections.push('\n### STRICT NEGATIVE CONSTRAINTS (Anti-AI Aesthetics Filter):');
      activeNegatives.forEach(c => {
        sections.push(`- [AVOID] ${c.prompt}`);
      });
    }

    return sections.join('\n');
  });

  // Estimated tokens count approximation (1 token ≈ 4 chars)
  const tokenEstimate = computed(() => {
    return Math.ceil(compiledFullPrompt.value.length / 4);
  });

  const copyToClipboard = async (text, successTitle = '已复制到剪贴板', sub = '') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      triggerToast(successTitle, sub);
      return true;
    } catch (e) {
      console.error('复制失败:', e);
      triggerToast('复制失败', '浏览器权限不足');
      return false;
    }
  };

  return {
    stagedItems,
    enabledNegativeIds,
    activeTab,
    isDockOpen,
    searchQuery,
    isSearchModalOpen,
    toastMessage,
    toastTimestamp,
    componentItems,
    aestheticItems,
    paletteItems,
    motionItems,
    iconItems,
    textureItems,
    fontItems,
    compiledFullPrompt,
    tokenEstimate,
    addItem,
    removeItem,
    clearAll,
    toggleNegative,
    isNegativeEnabled,
    copyToClipboard,
    triggerToast
  };
}
