<template>
  <div class="uuid-page">
    <AppHeader />
    <main class="uuid-main">
      <div class="page-header">
        <h1 class="page-title">UUID/GUID 生成器</h1>
        <p class="page-description">生成唯一标识符，支持多种格式</p>
      </div>

      <div class="uuid-container">
        <div class="generator-section">
          <div class="options">
            <el-radio-group v-model="uuidType">
              <el-radio value="standard">标准 UUID (带连字符)</el-radio>
              <el-radio value="no-dashes">无连字符</el-radio>
              <el-radio value="short">短 UUID</el-radio>
            </el-radio-group>
          </div>

          <div class="count-input">
            <label class="input-label">生成数量</label>
            <el-input-number v-model="count" :min="1" :max="100" />
          </div>

          <el-button @click="generateUUIDs" type="primary" class="btn-gradient" size="large">
            <el-icon><Refresh /></el-icon>
            生成 UUID
          </el-button>

          <div class="results">
            <div class="results-header">
              <span>生成结果 ({{ uuids.length }} 个)</span>
              <el-button @click="copyAll" size="small">
                <el-icon><CopyDocument /></el-icon>
                复制全部
              </el-button>
            </div>
            <div class="uuid-list">
              <div
                v-for="(uuid, index) in uuids"
                :key="index"
                class="uuid-item card"
                @click="copySingle(uuid)"
              >
                <span class="uuid-text">{{ uuid }}</span>
                <el-icon class="copy-icon"><CopyDocument /></el-icon>
              </div>
              <div v-if="uuids.length === 0" class="empty-state">
                点击"生成 UUID"按钮开始
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh, CopyDocument } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import { generateUUID, generateUUIDWithoutDashes, generateShortUUID } from '@/utils/uuid'

const uuidType = ref<'standard' | 'no-dashes' | 'short'>('standard')
const count = ref(1)
const uuids = ref<string[]>([])

const generateUUIDs = () => {
  uuids.value = []
  for (let i = 0; i < count.value; i++) {
    let uuid: string
    switch (uuidType.value) {
      case 'standard':
        uuid = generateUUID()
        break
      case 'no-dashes':
        uuid = generateUUIDWithoutDashes()
        break
      case 'short':
        uuid = generateShortUUID()
        break
      default:
        uuid = generateUUID()
    }
    uuids.value.push(uuid)
  }
  ElMessage.success(`已生成 ${count.value} 个 UUID`)
}

const copyAll = () => {
  if (uuids.value.length === 0) {
    ElMessage.warning('没有可复制的内容')
    return
  }
  navigator.clipboard.writeText(uuids.value.join('\n'))
  ElMessage.success('已复制全部 UUID')
}

const copySingle = (uuid: string) => {
  navigator.clipboard.writeText(uuid)
  ElMessage.success('已复制 UUID')
}
</script>

<style scoped>
.uuid-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.uuid-main {
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

.uuid-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.generator-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.options {
  margin-bottom: var(--spacing-md);
}

.count-input {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.input-label {
  color: var(--text-primary);
  font-weight: 500;
}

.results {
  margin-top: var(--spacing-lg);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: 500;
}

.uuid-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-height: 500px;
  overflow-y: auto;
}

.uuid-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.uuid-item:hover {
  background: var(--bg-hover);
  transform: translateX(4px);
}

.uuid-text {
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
  font-size: 14px;
  flex: 1;
  word-break: break-all;
}

.copy-icon {
  color: var(--text-secondary);
  transition: color 0.2s;
}

.uuid-item:hover .copy-icon {
  color: var(--primary);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--text-secondary);
}
</style>

