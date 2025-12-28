<template>
  <div class="api-tester-page">
    <AppHeader />
    <main class="tester-main">
      <div class="page-header">
        <h1 class="page-title">API 测试工具</h1>
        <p class="page-description">可视化HTTP请求构建器，支持多种请求方法，自动生成API文档</p>
      </div>

      <div class="tester-container">
        <div class="request-section">
          <div class="request-builder">
            <div class="method-url-row">
              <el-select v-model="request.method" style="width: 120px">
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="DELETE" value="DELETE" />
                <el-option label="PATCH" value="PATCH" />
                <el-option label="HEAD" value="HEAD" />
                <el-option label="OPTIONS" value="OPTIONS" />
              </el-select>
              <el-input
                v-model="request.url"
                placeholder="https://api.example.com/users"
                class="url-input"
              />
              <el-button type="primary" class="btn-gradient" @click="sendRequest" :loading="loading">
                <el-icon><Promotion /></el-icon>
                发送
              </el-button>
              <el-button @click="saveRequest">
                <el-icon><Star /></el-icon>
                保存
              </el-button>
            </div>

            <el-tabs v-model="activeTab">
              <el-tab-pane label="Params" name="params">
                <div class="key-value-editor">
                  <div
                    v-for="(value, key) in request.params"
                    :key="key"
                    class="key-value-row"
                  >
                    <el-input :model-value="key" @update:model-value="updateParamKey(key, $event)" placeholder="Key" />
                    <el-input v-model="request.params[key]" placeholder="Value" />
                    <el-button @click="removeParam(key)" type="danger" text>
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                  <el-button @click="addParam" type="primary" text>
                    <el-icon><Plus /></el-icon>
                    添加参数
                  </el-button>
                </div>
              </el-tab-pane>

              <el-tab-pane label="Headers" name="headers">
                <div class="key-value-editor">
                  <div
                    v-for="(value, key) in request.headers"
                    :key="key"
                    class="key-value-row"
                  >
                    <el-input :model-value="key" @update:model-value="updateHeaderKey(key, $event)" placeholder="Key" />
                    <el-input v-model="request.headers[key]" placeholder="Value" />
                    <el-button @click="removeHeader(key)" type="danger" text>
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                  <el-button @click="addHeader" type="primary" text>
                    <el-icon><Plus /></el-icon>
                    添加Header
                  </el-button>
                </div>
              </el-tab-pane>

              <el-tab-pane label="Body" name="body">
                <div class="body-editor">
                  <el-radio-group v-model="request.bodyType" class="body-type-selector">
                    <el-radio value="json">JSON</el-radio>
                    <el-radio value="form-data">Form Data</el-radio>
                    <el-radio value="raw">Raw</el-radio>
                  </el-radio-group>
                  <CodeEditor
                    v-model="request.body"
                    :language="request.bodyType === 'json' ? 'json' : 'text'"
                    class="body-editor-input"
                  />
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <div class="response-section">
          <div class="response-header">
            <div class="status-info">
              <el-tag
                v-if="response"
                :type="getStatusType(response.status)"
                size="large"
              >
                {{ response.status }} {{ response.statusText }}
              </el-tag>
              <span v-if="response" class="response-time">
                响应时间: {{ response.time }}ms
              </span>
              <span v-if="response" class="response-size">
                大小: {{ (response.size / 1024).toFixed(2) }} KB
              </span>
            </div>
            <div class="response-actions">
              <el-button @click="copyResponse" size="small">
                <el-icon><CopyDocument /></el-icon>
                复制
              </el-button>
              <el-button @click="generateDoc" size="small" type="primary" class="btn-gradient">
                <el-icon><Document /></el-icon>
                生成文档
              </el-button>
            </div>
          </div>

          <div class="response-content">
            <CodeEditor
              v-if="response"
              :model-value="formatResponse(response.data)"
              language="json"
              :read-only="true"
              class="response-editor"
            />
            <div v-else class="empty-response">
              <el-icon :size="64"><Promotion /></el-icon>
              <p>点击"发送"按钮测试API</p>
            </div>
          </div>
        </div>
      </div>

      <div class="history-section">
        <div class="section-header">
          <h3>请求历史</h3>
          <el-button @click="clearHistory" size="small" type="danger" text>
            <el-icon><Delete /></el-icon>
            清空
          </el-button>
        </div>
        <div class="history-list">
          <div
            v-for="item in apiStore.history"
            :key="item.id"
            class="history-item card"
            @click="loadHistoryItem(item)"
          >
            <div class="history-method">{{ item.request.method }}</div>
            <div class="history-url">{{ item.request.url }}</div>
            <div class="history-time">{{ formatTime(item.timestamp) }}</div>
          </div>
          <div v-if="apiStore.history.length === 0" class="empty-history">
            暂无历史记录
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Promotion,
  Star,
  Delete,
  Plus,
  CopyDocument,
  Document,
} from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import CodeEditor from '@/components/common/CodeEditor.vue'
import { useApiTesterStore } from '@/stores/apiTester'
import { sendRequest as sendApiRequest, generateApiDoc } from '@/utils/api'
import type { ApiRequest, ApiResponse, ApiHistory } from '@/types/api'
import { exportText } from '@/utils/export'

const apiStore = useApiTesterStore()

const request = ref<ApiRequest>({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {},
  body: '',
  bodyType: 'json',
})

const response = ref<ApiResponse>()
const loading = ref(false)
const activeTab = ref('params')

const sendRequest = async () => {
  if (!request.value.url) {
    ElMessage.warning('请输入URL')
    return
  }

  loading.value = true
  response.value = undefined // 清空之前的响应
  
  try {
    const res = await sendApiRequest(request.value)
    response.value = res

    // 保存到历史
    apiStore.addHistory({
      id: Date.now().toString(),
      timestamp: Date.now(),
      request: { ...request.value },
      response: res,
    })

    ElMessage.success('请求成功')
  } catch (error: any) {
    ElMessage.error('请求失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const saveRequest = () => {
  apiStore.addHistory({
    id: Date.now().toString(),
    timestamp: Date.now(),
    request: { ...request.value },
  })
  ElMessage.success('已保存到历史')
}

const addParam = () => {
  const key = `param_${Date.now()}`
  request.value.params[key] = ''
}

const removeParam = (key: string) => {
  delete request.value.params[key]
}

const updateParamKey = (oldKey: string, newKey: string) => {
  if (newKey && newKey !== oldKey) {
    request.value.params[newKey] = request.value.params[oldKey]
    delete request.value.params[oldKey]
  }
}

const updateHeaderKey = (oldKey: string, newKey: string) => {
  if (newKey && newKey !== oldKey) {
    request.value.headers[newKey] = request.value.headers[oldKey]
    delete request.value.headers[oldKey]
  }
}

const addHeader = () => {
  const key = `header_${Date.now()}`
  request.value.headers[key] = ''
}

const removeHeader = (key: string) => {
  delete request.value.headers[key]
}

const formatResponse = (data: any): string => {
  if (!data) return ''
  try {
    if (typeof data === 'string') {
      try {
        // 尝试解析为JSON
        return JSON.stringify(JSON.parse(data), null, 2)
      } catch {
        return data
      }
    }
    return JSON.stringify(data, null, 2)
  } catch (error) {
    return String(data)
  }
}

const getStatusType = (status: number): string => {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 300 && status < 400) return 'warning'
  if (status >= 400) return 'danger'
  return 'info'
}

const copyResponse = () => {
  if (response.value) {
    navigator.clipboard.writeText(formatResponse(response.value.data))
    ElMessage.success('已复制到剪贴板')
  }
}

const generateDoc = () => {
  if (!response.value) {
    ElMessage.warning('请先发送请求')
    return
  }
  const doc = generateApiDoc(request.value, response.value)
  exportText(doc, 'api-doc.md')
  ElMessage.success('API文档已导出')
}

const loadHistoryItem = (item: ApiHistory) => {
  request.value = { ...item.request }
  if (item.response) {
    response.value = item.response
  }
  ElMessage.success('已加载历史记录')
}

const clearHistory = () => {
  apiStore.clearHistory()
  ElMessage.success('历史记录已清空')
}

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN')
}

onMounted(() => {
  apiStore.loadHistory()
})
</script>

<style scoped>
.api-tester-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tester-main {
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

.tester-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.request-section,
.response-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.method-url-row {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.url-input {
  flex: 1;
}

.key-value-editor {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.key-value-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: var(--spacing-sm);
  align-items: center;
}

.body-editor {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.body-type-selector {
  margin-bottom: var(--spacing-sm);
}

.body-editor-input {
  min-height: 300px;
}

.response-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--divider);
}

.status-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.response-time,
.response-size {
  color: var(--text-secondary);
  font-size: 14px;
}

.response-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.response-content {
  min-height: 400px;
}

.response-editor {
  min-height: 400px;
}

.empty-response {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--text-secondary);
  gap: var(--spacing-md);
}

.history-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.section-header h3 {
  color: var(--text-primary);
  font-size: 18px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-height: 400px;
  overflow-y: auto;
}

.history-item {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.history-item:hover {
  background: var(--bg-hover);
  transform: translateX(4px);
}

.history-method {
  font-weight: 600;
  color: var(--primary);
  font-family: 'Fira Code', monospace;
}

.history-url {
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-time {
  color: var(--text-secondary);
  font-size: 12px;
}

.empty-history {
  text-align: center;
  padding: var(--spacing-3xl);
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .tester-container {
    grid-template-columns: 1fr;
  }
}
</style>

