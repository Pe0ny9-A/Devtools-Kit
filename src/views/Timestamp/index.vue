<template>
  <div class="timestamp-page">
    <AppHeader />
    <main class="timestamp-main">
      <div class="page-header">
        <h1 class="page-title">时间戳转换工具</h1>
        <p class="page-description">Unix时间戳与日期时间相互转换</p>
      </div>

      <div class="timestamp-container">
        <div class="converter-section">
          <div class="input-group">
            <label class="input-label">时间戳格式</label>
            <el-radio-group v-model="timestampFormat">
              <el-radio value="seconds">秒 (10位)</el-radio>
              <el-radio value="milliseconds">毫秒 (13位)</el-radio>
            </el-radio-group>
          </div>

          <div class="converter-row">
            <div class="converter-item">
              <label class="input-label">Unix 时间戳</label>
              <el-input
                v-model="timestampInput"
                placeholder="输入时间戳..."
                @input="timestampToDate"
              >
                <template #append>
                  <el-button @click="setCurrentTimestamp">当前时间</el-button>
                </template>
              </el-input>
            </div>

            <div class="converter-arrow">
              <el-icon class="arrow-icon"><Right /></el-icon>
            </div>

            <div class="converter-item">
              <label class="input-label">日期时间</label>
              <el-date-picker
                v-model="dateInput"
                type="datetime"
                placeholder="选择日期时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                @change="dateToTimestamp"
                style="width: 100%"
              />
            </div>
          </div>

          <div class="result-section">
            <div class="result-item">
              <span class="result-label">格式化结果：</span>
              <span class="result-value">{{ formattedDate }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">时间戳：</span>
              <span class="result-value">{{ currentTimestamp }}</span>
            </div>
          </div>

          <div class="actions">
            <el-button @click="copyTimestamp">
              <el-icon><CopyDocument /></el-icon>
              复制时间戳
            </el-button>
            <el-button @click="copyDate">
              <el-icon><CopyDocument /></el-icon>
              复制日期
            </el-button>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Right, CopyDocument } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import {
  timestampToDate as convertTimestampToDate,
  dateToTimestamp as convertDateToTimestamp,
  formatDate,
  getCurrentTimestamp,
} from '@/utils/timestamp'

const timestampFormat = ref<'seconds' | 'milliseconds'>('seconds')
const timestampInput = ref('')
const dateInput = ref('')
const formattedDate = ref('')
const currentTimestamp = ref('')

const timestampToDate = () => {
  if (!timestampInput.value) {
    formattedDate.value = ''
    dateInput.value = ''
    return
  }

  try {
    const timestamp = parseFloat(timestampInput.value)
    if (isNaN(timestamp)) {
      formattedDate.value = '无效的时间戳'
      return
    }

    const date = convertTimestampToDate(timestamp, timestampFormat.value)
    formattedDate.value = formatDate(date)
    dateInput.value = formatDate(date, 'YYYY-MM-DD HH:mm:ss')
    currentTimestamp.value = timestampInput.value
  } catch (error: any) {
    formattedDate.value = '转换失败: ' + error.message
  }
}

const dateToTimestamp = () => {
  if (!dateInput.value) {
    timestampInput.value = ''
    currentTimestamp.value = ''
    formattedDate.value = ''
    return
  }

  try {
    const date = new Date(dateInput.value)
    const timestamp = convertDateToTimestamp(date, timestampFormat.value)
    timestampInput.value = String(timestamp)
    currentTimestamp.value = String(timestamp)
    formattedDate.value = formatDate(date)
  } catch (error: any) {
    ElMessage.error('转换失败: ' + error.message)
  }
}

const setCurrentTimestamp = () => {
  const timestamp = getCurrentTimestamp(timestampFormat.value)
  timestampInput.value = String(timestamp)
  timestampToDate()
}

const copyTimestamp = () => {
  navigator.clipboard.writeText(currentTimestamp.value)
  ElMessage.success('时间戳已复制')
}

const copyDate = () => {
  navigator.clipboard.writeText(formattedDate.value)
  ElMessage.success('日期已复制')
}

watch(timestampFormat, () => {
  if (timestampInput.value) {
    timestampToDate()
  }
})
</script>

<style scoped>
.timestamp-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.timestamp-main {
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

.timestamp-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
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

.converter-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-lg);
  align-items: end;
  margin-bottom: var(--spacing-xl);
}

.converter-item {
  flex: 1;
}

.converter-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 32px;
}

.arrow-icon {
  font-size: 32px;
  color: var(--primary);
}

.result-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.result-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-label {
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 120px;
}

.result-value {
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  font-size: 16px;
}

.actions {
  display: flex;
  gap: var(--spacing-sm);
}

@media (max-width: 768px) {
  .converter-row {
    grid-template-columns: 1fr;
  }
  
  .converter-arrow {
    transform: rotate(90deg);
    padding: var(--spacing-md) 0;
  }
}
</style>

