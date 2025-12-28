<template>
  <div class="regex-tester-page">
    <AppHeader />
    <main class="tester-main">
      <div class="page-header">
        <h1 class="page-title">正则表达式工具</h1>
        <p class="page-description">可视化正则表达式测试，实时匹配高亮，分组捕获显示</p>
      </div>

      <div class="tester-container">
        <div class="regex-input-section">
          <div class="input-group">
            <label class="input-label">正则表达式</label>
            <div class="regex-input-wrapper">
              <el-input
                v-model="regexPattern"
                placeholder="输入正则表达式，如: \d+"
                class="regex-input"
              >
                <template #prepend>/</template>
                <template #append>/{{ regexFlags }}</template>
              </el-input>
            </div>
          </div>

          <div class="flags-group">
            <label class="input-label">标志</label>
            <el-checkbox-group v-model="flagArray">
              <el-checkbox value="g">全局匹配 (g)</el-checkbox>
              <el-checkbox value="i">忽略大小写 (i)</el-checkbox>
              <el-checkbox value="m">多行模式 (m)</el-checkbox>
              <el-checkbox value="s">点号匹配换行 (s)</el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="template-section">
            <label class="input-label">常用模板</label>
            <el-select v-model="selectedTemplate" placeholder="选择模板" @change="applyTemplate">
              <el-option
                v-for="template in templates"
                :key="template.name"
                :label="template.name"
                :value="template.pattern"
              >
                <span>{{ template.name }}</span>
                <span style="color: var(--text-secondary); margin-left: 8px">{{ template.pattern }}</span>
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="test-section">
          <div class="input-group">
            <label class="input-label">测试字符串</label>
            <el-input
              v-model="testString"
              type="textarea"
              :rows="6"
              placeholder="输入要测试的字符串"
              class="test-input"
            />
          </div>

          <div class="match-highlight">
            <div class="highlight-label">匹配结果高亮</div>
            <div class="highlight-content" v-html="highlightedText"></div>
          </div>
        </div>

        <div class="results-section">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="匹配结果" name="matches">
              <div class="matches-list">
                <div v-if="regexResult.matches.length === 0" class="empty-state">
                  <el-icon :size="48"><Search /></el-icon>
                  <p>暂无匹配结果</p>
                </div>
                <div
                  v-for="(match, index) in regexResult.matches"
                  :key="index"
                  class="match-item card"
                >
                  <div class="match-header">
                    <span class="match-index">#{{ index + 1 }}</span>
                    <span class="match-text">{{ match.match }}</span>
                    <span class="match-position">位置: {{ match.index }}</span>
                  </div>
                  <div v-if="match.groups.length > 0" class="match-groups">
                    <div
                      v-for="(group, gIndex) in match.groups"
                      :key="gIndex"
                      class="group-item"
                    >
                      组 {{ gIndex + 1 }}: {{ group }}
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="替换预览" name="replace">
              <div class="replace-section">
                <el-input
                  v-model="replacement"
                  placeholder="输入替换字符串，使用 $1, $2 等引用捕获组"
                  class="replace-input"
                />
                <div class="replace-result">
                  <label>替换结果：</label>
                  <div class="result-text">{{ replaceResult }}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="说明" name="explanation">
              <div class="explanation-content">
                <pre>{{ explanation }}</pre>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div v-if="!regexResult.isValid && regexResult.error" class="error-message">
          <el-alert
            :title="regexResult.error"
            type="error"
            :closable="false"
          />
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import { testRegex, replaceWithRegex, explainRegex } from '@/utils/regex'

const regexPattern = ref('\\d+')
const flagArray = ref<string[]>(['g'])
const testString = ref('我有3个苹果和5个橙子，总共8个水果。')
const replacement = ref('[$&]')
const selectedTemplate = ref('')
const activeTab = ref('matches')

const regexFlags = computed(() => flagArray.value.join(''))

const regexResult = computed(() => {
  if (!regexPattern.value) {
    return { matches: [], isValid: true }
  }
  return testRegex(regexPattern.value, regexFlags.value, testString.value)
})

const highlightedText = computed(() => {
  if (!testString.value || !regexPattern.value || !regexResult.value.isValid) {
    return escapeHtml(testString.value)
  }

  try {
    const regex = new RegExp(regexPattern.value, regexFlags.value)
    let result = escapeHtml(testString.value)
    const matches = [...testString.value.matchAll(regex)]

    // 从后往前替换，避免索引变化
    for (let i = matches.length - 1; i >= 0; i--) {
      const match = matches[i]
      const start = match.index!
      const end = start + match[0].length
      const before = result.substring(0, start)
      const matched = result.substring(start, end)
      const after = result.substring(end)
      result = `${before}<mark class="match-highlight">${matched}</mark>${after}`
    }

    return result
  } catch {
    return escapeHtml(testString.value)
  }
})

const replaceResult = computed(() => {
  if (!regexPattern.value || !regexResult.value.isValid) {
    return testString.value
  }
  return replaceWithRegex(regexPattern.value, regexFlags.value, testString.value, replacement.value)
})

const explanation = computed(() => {
  if (!regexPattern.value) return '请输入正则表达式'
  return explainRegex(regexPattern.value)
})

const templates = [
  { name: '邮箱地址', pattern: '[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}' },
  { name: '手机号码', pattern: '1[3-9]\\d{9}' },
  { name: 'URL', pattern: 'https?://[\\w.-]+(?:/[\\w.-]*)*' },
  { name: 'IP地址', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}' },
  { name: '中文字符', pattern: '[\\u4e00-\\u9fa5]+' },
  { name: '数字', pattern: '\\d+' },
  { name: '字母', pattern: '[a-zA-Z]+' },
  { name: '日期 (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
]

const applyTemplate = (pattern: string) => {
  regexPattern.value = pattern
  selectedTemplate.value = ''
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

watch([regexPattern, flagArray, testString], () => {
  // 实时更新结果
})
</script>

<style scoped>
.regex-tester-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tester-main {
  flex: 1;
  max-width: 1400px;
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

.tester-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.regex-input-section {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--divider);
}

.input-group {
  margin-bottom: var(--spacing-lg);
}

.input-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.regex-input-wrapper {
  display: flex;
  align-items: center;
}

.regex-input {
  flex: 1;
}

.flags-group {
  margin-bottom: var(--spacing-lg);
}

.template-section {
  margin-top: var(--spacing-lg);
}

.test-section {
  margin-bottom: var(--spacing-xl);
}

.test-input {
  margin-bottom: var(--spacing-lg);
}

.match-highlight {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  min-height: 100px;
}

.highlight-label {
  color: var(--text-secondary);
  font-size: 12px;
  margin-bottom: var(--spacing-sm);
}

.highlight-content {
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-all;
}

:deep(.match-highlight) {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  padding: 2px 4px;
  border-radius: 4px;
  color: var(--primary);
  font-weight: 500;
}

.results-section {
  margin-top: var(--spacing-xl);
}

.matches-list {
  max-height: 500px;
  overflow-y: auto;
}

.match-item {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.match-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.match-index {
  color: var(--primary);
  font-weight: 600;
  min-width: 40px;
}

.match-text {
  flex: 1;
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.match-position {
  color: var(--text-secondary);
  font-size: 12px;
}

.match-groups {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--divider);
}

.group-item {
  color: var(--text-secondary);
  font-size: 14px;
  margin-top: var(--spacing-xs);
  font-family: 'Fira Code', monospace;
}

.replace-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.replace-result {
  margin-top: var(--spacing-md);
}

.result-text {
  margin-top: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
  min-height: 100px;
  white-space: pre-wrap;
  word-break: break-all;
}

.explanation-content {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.explanation-content pre {
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  line-height: 1.8;
  white-space: pre-wrap;
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl);
  color: var(--text-secondary);
  gap: var(--spacing-md);
}

.error-message {
  margin-top: var(--spacing-lg);
}
</style>

