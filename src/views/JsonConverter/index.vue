<template>
  <div class="json-converter-page">
    <AppHeader />
    <main class="converter-main">
      <div class="page-header">
        <h1 class="page-title">JSON / CSV 转换工具</h1>
        <p class="page-description">在JSON和CSV格式之间快速转换，支持数据验证和格式化</p>
      </div>

      <div class="converter-container">
        <div class="converter-toolbar">
          <el-button-group>
            <el-button :type="activeTab === 'json' ? 'primary' : 'default'" @click="activeTab = 'json'">
              JSON
            </el-button>
            <el-button :type="activeTab === 'csv' ? 'primary' : 'default'" @click="activeTab = 'csv'">
              CSV
            </el-button>
          </el-button-group>
          <div class="toolbar-actions">
            <el-button @click="formatJson" :disabled="activeTab !== 'json'">
              <el-icon><Sort /></el-icon>
              格式化
            </el-button>
            <el-button @click="validateData">
              <el-icon><CircleCheck /></el-icon>
              验证
            </el-button>
            <el-button @click="convertData" type="primary" class="btn-gradient">
              <el-icon><RefreshRight /></el-icon>
              转换
            </el-button>
            <el-button @click="exportData">
              <el-icon><Download /></el-icon>
              导出
            </el-button>
          </div>
        </div>

        <div class="converter-content">
          <div class="editor-panel">
            <div class="panel-header">
              <span class="panel-title">JSON 编辑器</span>
              <el-tag v-if="jsonError" type="danger" size="small">{{ jsonError }}</el-tag>
              <el-tag v-else-if="jsonValid" type="success" size="small">有效</el-tag>
            </div>
            <CodeEditor
              v-model="jsonData"
              language="json"
              class="editor"
            />
          </div>

          <div class="converter-arrow">
            <el-icon class="arrow-icon"><Right /></el-icon>
          </div>

          <div class="editor-panel">
            <div class="panel-header">
              <span class="panel-title">CSV 表格</span>
              <el-tag v-if="csvError" type="danger" size="small">{{ csvError }}</el-tag>
            </div>
            <div class="csv-viewer">
              <el-table
                :data="csvTableData"
                border
                stripe
                max-height="500"
                v-if="csvTableData.length > 0"
              >
                <el-table-column
                  v-for="(header, index) in csvHeaders"
                  :key="index"
                  :prop="header"
                  :label="header"
                  min-width="120"
                />
              </el-table>
              <div v-else class="empty-state">
                <el-icon :size="48"><Document /></el-icon>
                <p>暂无数据，请在上方输入JSON或CSV</p>
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
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Sort, CircleCheck, RefreshRight, Download, Right, Document } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import CodeEditor from '@/components/common/CodeEditor.vue'
import { validateJson, formatJson as formatJsonUtil } from '@/utils/json'
import { jsonToCsv, csvToJson, parseCsv } from '@/utils/csv'
import { exportJson, exportCsv } from '@/utils/export'

const activeTab = ref<'json' | 'csv'>('json')
const jsonData = ref(`{
  "name": "示例",
  "age": 25,
  "city": "北京",
  "skills": ["Vue", "TypeScript", "Node.js"]
}`)
const csvData = ref('')
const jsonError = ref('')
const csvError = ref('')
const jsonValid = ref(false)

const csvHeaders = ref<string[]>([])
const csvTableData = ref<Record<string, any>[]>([])

const validateData = () => {
  if (activeTab.value === 'json') {
    const result = validateJson(jsonData.value)
    jsonValid.value = result.valid
    jsonError.value = result.error || ''
    if (result.valid) {
      ElMessage.success('JSON格式有效')
    } else {
      ElMessage.error(`JSON格式错误: ${result.error}`)
    }
  }
}

const formatJson = () => {
  try {
    jsonData.value = formatJsonUtil(jsonData.value)
    ElMessage.success('格式化成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const convertData = () => {
  try {
    if (activeTab.value === 'json') {
      // JSON to CSV
      csvData.value = jsonToCsv(jsonData.value)
      updateCsvTable()
      ElMessage.success('转换成功：JSON → CSV')
    } else {
      // CSV to JSON
      jsonData.value = csvToJson(csvData.value)
      validateData()
      ElMessage.success('转换成功：CSV → JSON')
    }
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const updateCsvTable = () => {
  try {
    if (csvData.value) {
      const parsed = parseCsv(csvData.value)
      csvHeaders.value = parsed.headers
      csvTableData.value = parsed.rows.map(row => {
        const obj: Record<string, any> = {}
        parsed.headers.forEach((header, index) => {
          obj[header] = row[index] || ''
        })
        return obj
      })
    }
  } catch (error) {
    csvError.value = 'CSV解析失败'
  }
}

const exportData = () => {
  try {
    if (activeTab.value === 'json') {
      exportJson(jsonData.value)
      ElMessage.success('JSON文件已导出')
    } else {
      exportCsv(csvData.value || jsonToCsv(jsonData.value))
      ElMessage.success('CSV文件已导出')
    }
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

watch(jsonData, () => {
  jsonError.value = ''
  jsonValid.value = false
})

watch(csvData, () => {
  csvError.value = ''
  updateCsvTable()
})
</script>

<style scoped>
.json-converter-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.converter-main {
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

.converter-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.converter-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--divider);
}

.toolbar-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.converter-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-lg);
  align-items: start;
}

.editor-panel {
  display: flex;
  flex-direction: column;
  height: 600px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.panel-title {
  font-weight: 500;
  color: var(--text-primary);
}

.editor {
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.converter-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}

.arrow-icon {
  font-size: 32px;
  color: var(--primary);
  animation: pulse 2s ease-in-out infinite;
}

.csv-viewer {
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-secondary);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  gap: var(--spacing-md);
}

@media (max-width: 1024px) {
  .converter-content {
    grid-template-columns: 1fr;
  }
  
  .converter-arrow {
    transform: rotate(90deg);
    padding: var(--spacing-md) 0;
  }
  
  .editor-panel {
    height: 400px;
  }
}
</style>

