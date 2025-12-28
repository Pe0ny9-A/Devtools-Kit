<template>
  <div class="hash-page">
    <AppHeader />
    <main class="hash-main">
      <div class="page-header">
        <h1 class="page-title">哈希生成器</h1>
        <p class="page-description">生成MD5、SHA1、SHA256、SHA512哈希值</p>
      </div>

      <div class="hash-container">
        <div class="input-section">
          <label class="input-label">输入文本</label>
          <el-input
            v-model="inputText"
            type="textarea"
            :rows="6"
            placeholder="输入要生成哈希的文本..."
            @input="generateHashes"
          />
        </div>

        <div class="algorithms">
          <el-checkbox-group v-model="selectedAlgorithms">
            <el-checkbox value="MD5">MD5</el-checkbox>
            <el-checkbox value="SHA1">SHA1</el-checkbox>
            <el-checkbox value="SHA256">SHA256</el-checkbox>
            <el-checkbox value="SHA512">SHA512</el-checkbox>
          </el-checkbox-group>
        </div>

        <div class="results-section">
          <div
            v-for="(hash, algorithm) in hashResults"
            :key="algorithm"
            class="hash-item card"
            v-show="selectedAlgorithms.includes(algorithm)"
          >
            <div class="hash-header">
              <span class="hash-algorithm">{{ algorithm }}</span>
              <el-button @click="copyHash(hash)" size="small" text>
                <el-icon><CopyDocument /></el-icon>
              </el-button>
            </div>
            <div class="hash-value" @click="copyHash(hash)">
              {{ hash }}
            </div>
          </div>
          <div v-if="Object.keys(hashResults).length === 0" class="empty-state">
            输入文本后，哈希值将自动生成
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import { generateHash } from '@/utils/hash'

const inputText = ref('')
const selectedAlgorithms = ref<string[]>(['MD5', 'SHA256'])
const hashResults = ref<Record<string, string>>({})

const generateHashes = () => {
  if (!inputText.value.trim()) {
    hashResults.value = {}
    return
  }

  const results: Record<string, string> = {}
  selectedAlgorithms.value.forEach((alg) => {
    results[alg] = generateHash(inputText.value, alg as 'MD5' | 'SHA1' | 'SHA256' | 'SHA512')
  })
  hashResults.value = results
}

const copyHash = (hash: string) => {
  navigator.clipboard.writeText(hash)
  ElMessage.success('哈希值已复制')
}

watch(selectedAlgorithms, () => {
  if (inputText.value) {
    generateHashes()
  }
})
</script>

<style scoped>
.hash-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hash-main {
  flex: 1;
  max-width: 1200px;
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

.hash-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.input-section {
  margin-bottom: var(--spacing-lg);
}

.input-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.algorithms {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.results-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.hash-item {
  padding: var(--spacing-md);
}

.hash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.hash-algorithm {
  color: var(--primary);
  font-weight: 600;
  font-size: 16px;
}

.hash-value {
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
  font-size: 14px;
  word-break: break-all;
  cursor: pointer;
  padding: var(--spacing-sm);
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  transition: background 0.2s;
}

.hash-value:hover {
  background: var(--bg-hover);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--text-secondary);
}
</style>

