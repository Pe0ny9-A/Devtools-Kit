<template>
  <div class="encoder-page">
    <AppHeader />
    <main class="encoder-main">
      <div class="page-header">
        <h1 class="page-title">编码/解码工具</h1>
        <p class="page-description">Base64和URL编码/解码工具，支持双向转换</p>
      </div>

      <div class="encoder-container">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Base64" name="base64">
            <div class="encoder-section">
              <div class="input-section">
                <div class="section-header">
                  <span>原始文本</span>
                  <el-button @click="clearBase64" size="small" text>清空</el-button>
                </div>
                <el-input
                  v-model="base64Input"
                  type="textarea"
                  :rows="8"
                  placeholder="输入要编码的文本..."
                  class="encoder-input"
                />
                <div class="actions">
                  <el-button @click="encodeBase64Handler" type="primary" class="btn-gradient">
                    <el-icon><ArrowDown /></el-icon>
                    编码
                  </el-button>
                  <el-button @click="decodeBase64Handler">
                    <el-icon><ArrowUp /></el-icon>
                    解码
                  </el-button>
                  <el-button @click="copyBase64">
                    <el-icon><CopyDocument /></el-icon>
                    复制
                  </el-button>
                </div>
              </div>
              <div class="output-section">
                <div class="section-header">
                  <span>编码结果</span>
                </div>
                <el-input
                  v-model="base64Output"
                  type="textarea"
                  :rows="8"
                  placeholder="编码结果将显示在这里..."
                  readonly
                  class="encoder-output"
                />
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="URL" name="url">
            <div class="encoder-section">
              <div class="input-section">
                <div class="section-header">
                  <span>原始文本</span>
                  <el-button @click="clearURL" size="small" text>清空</el-button>
                </div>
                <el-input
                  v-model="urlInput"
                  type="textarea"
                  :rows="8"
                  placeholder="输入要编码的文本..."
                  class="encoder-input"
                />
                <div class="actions">
                  <el-button @click="encodeURLHandler" type="primary" class="btn-gradient">
                    <el-icon><ArrowDown /></el-icon>
                    编码
                  </el-button>
                  <el-button @click="decodeURLHandler">
                    <el-icon><ArrowUp /></el-icon>
                    解码
                  </el-button>
                  <el-button @click="copyURL">
                    <el-icon><CopyDocument /></el-icon>
                    复制
                  </el-button>
                </div>
              </div>
              <div class="output-section">
                <div class="section-header">
                  <span>编码结果</span>
                </div>
                <el-input
                  v-model="urlOutput"
                  type="textarea"
                  :rows="8"
                  placeholder="编码结果将显示在这里..."
                  readonly
                  class="encoder-output"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown, ArrowUp, CopyDocument } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import { encodeBase64, decodeBase64, encodeURL, decodeURL } from '@/utils/encoder'

const activeTab = ref('base64')
const base64Input = ref('')
const base64Output = ref('')
const urlInput = ref('')
const urlOutput = ref('')

const encodeBase64Handler = () => {
  try {
    base64Output.value = encodeBase64(base64Input.value)
    ElMessage.success('Base64编码成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const decodeBase64Handler = () => {
  try {
    base64Input.value = decodeBase64(base64Output.value)
    ElMessage.success('Base64解码成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const encodeURLHandler = () => {
  try {
    urlOutput.value = encodeURL(urlInput.value)
    ElMessage.success('URL编码成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const decodeURLHandler = () => {
  try {
    urlInput.value = decodeURL(urlOutput.value)
    ElMessage.success('URL解码成功')
  } catch (error: any) {
    ElMessage.error(error.message)
  }
}

const copyBase64 = () => {
  navigator.clipboard.writeText(base64Output.value)
  ElMessage.success('已复制到剪贴板')
}

const copyURL = () => {
  navigator.clipboard.writeText(urlOutput.value)
  ElMessage.success('已复制到剪贴板')
}

const clearBase64 = () => {
  base64Input.value = ''
  base64Output.value = ''
}

const clearURL = () => {
  urlInput.value = ''
  urlOutput.value = ''
}
</script>

<style scoped>
.encoder-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.encoder-main {
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

.encoder-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.encoder-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-lg);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: 500;
}

.encoder-input,
.encoder-output {
  margin-bottom: var(--spacing-md);
}

.actions {
  display: flex;
  gap: var(--spacing-sm);
}

@media (max-width: 1024px) {
  .encoder-section {
    grid-template-columns: 1fr;
  }
}
</style>

