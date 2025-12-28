<template>
  <div class="diff-page">
    <AppHeader />
    <main class="diff-main">
      <div class="page-header">
        <h1 class="page-title">文本差异对比</h1>
        <p class="page-description">对比两个文本的差异，支持行、词、字符级别</p>
      </div>

      <div class="diff-container">
        <div class="mode-selector">
          <label class="input-label">对比模式</label>
          <el-radio-group v-model="diffMode">
            <el-radio value="lines">按行</el-radio>
            <el-radio value="words">按词</el-radio>
            <el-radio value="chars">按字符</el-radio>
          </el-radio-group>
        </div>

        <div class="diff-content">
          <div class="text-section">
            <div class="section-header">
              <span>原始文本</span>
              <el-button @click="clearOld" size="small" text>清空</el-button>
            </div>
            <el-input
              v-model="oldText"
              type="textarea"
              :rows="12"
              placeholder="输入原始文本..."
              @input="compareTexts"
            />
          </div>

          <div class="text-section">
            <div class="section-header">
              <span>新文本</span>
              <el-button @click="clearNew" size="small" text>清空</el-button>
            </div>
            <el-input
              v-model="newText"
              type="textarea"
              :rows="12"
              placeholder="输入新文本..."
              @input="compareTexts"
            />
          </div>
        </div>

        <div class="diff-result">
          <div class="result-header">
            <span>差异结果</span>
            <el-button @click="swapTexts" size="small">
              <el-icon><Switch /></el-icon>
              交换文本
            </el-button>
          </div>
          <div class="result-content">
            <div
              v-for="(part, index) in diffResult"
              :key="index"
              :class="[
                'diff-part',
                {
                  'diff-added': part.added,
                  'diff-removed': part.removed,
                },
              ]"
            >
              {{ part.value }}
            </div>
            <div v-if="diffResult.length === 0" class="empty-state">
              输入文本后，差异将自动显示
            </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Switch } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import { diffText } from '@/utils/diff'

const diffMode = ref<'lines' | 'words' | 'chars'>('lines')
const oldText = ref('')
const newText = ref('')
const diffResult = ref<Array<{ value: string; added?: boolean; removed?: boolean }>>([])

const compareTexts = () => {
  if (!oldText.value && !newText.value) {
    diffResult.value = []
    return
  }

  try {
    diffResult.value = diffText(oldText.value, newText.value, diffMode.value)
  } catch (error: any) {
    console.error('对比失败:', error)
  }
}

const clearOld = () => {
  oldText.value = ''
  compareTexts()
}

const clearNew = () => {
  newText.value = ''
  compareTexts()
}

const swapTexts = () => {
  const temp = oldText.value
  oldText.value = newText.value
  newText.value = temp
  compareTexts()
}

watch(diffMode, () => {
  compareTexts()
})
</script>

<style scoped>
.diff-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.diff-main {
  flex: 1;
  max-width: 1600px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  width: 100%;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  color: var(--text-secondary);
  font-size: 16px;
}

.diff-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.mode-selector {
  margin-bottom: var(--spacing-lg);
}

.input-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.diff-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.text-section {
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.diff-result {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: 500;
}

.result-content {
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
}

.diff-part {
  display: inline;
}

.diff-added {
  background: rgba(0, 242, 254, 0.2);
  color: var(--success);
  padding: 2px 4px;
  border-radius: 3px;
}

.diff-removed {
  background: rgba(245, 87, 108, 0.2);
  color: var(--error);
  padding: 2px 4px;
  border-radius: 3px;
  text-decoration: line-through;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .diff-content {
    grid-template-columns: 1fr;
  }
}
</style>

