<template>
  <div class="formatter-page">
    <AppHeader />
    <main class="formatter-main">
      <div class="page-header">
        <h1 class="page-title">代码格式化工具</h1>
        <p class="page-description">格式化多种编程语言的代码</p>
      </div>

      <div class="formatter-container">
        <div class="language-selector">
          <label class="input-label">语言类型</label>
          <el-select v-model="language" placeholder="选择语言">
            <el-option label="JSON" value="json" />
            <el-option label="SQL" value="sql" />
            <el-option label="HTML" value="html" />
            <el-option label="XML" value="xml" />
            <el-option label="CSS" value="css" />
          </el-select>
        </div>

        <div class="editor-section">
          <div class="editor-header">
            <span>代码编辑器</span>
            <div class="editor-actions">
              <el-button @click="formatCode" type="primary" class="btn-gradient">
                <el-icon><Sort /></el-icon>
                格式化
              </el-button>
              <el-button @click="minifyCode" v-if="language === 'json'">
                <el-icon><Minus /></el-icon>
                压缩
              </el-button>
              <el-button @click="copyCode">
                <el-icon><CopyDocument /></el-icon>
                复制
              </el-button>
              <el-button @click="clearCode">
                <el-icon><Delete /></el-icon>
                清空
              </el-button>
            </div>
          </div>
          <CodeEditor
            v-model="code"
            :language="language"
            class="code-editor"
          />
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Sort, Minus, CopyDocument, Delete } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import CodeEditor from '@/components/common/CodeEditor.vue'
import {
  minifyJSON,
  formatSQL,
  formatHTML,
  formatXML,
  formatCSS,
} from '@/utils/formatter'
import { formatJson as formatJsonUtil } from '@/utils/json'

const language = ref('json')
const code = ref(`{
  "name": "示例",
  "age": 25,
  "city": "北京"
}`)

const formatCode = () => {
  try {
    switch (language.value) {
      case 'json':
        code.value = formatJsonUtil(code.value)
        ElMessage.success('JSON格式化成功')
        break
      case 'sql':
        code.value = formatSQL(code.value)
        ElMessage.success('SQL格式化成功')
        break
      case 'html':
        code.value = formatHTML(code.value)
        ElMessage.success('HTML格式化成功')
        break
      case 'xml':
        code.value = formatXML(code.value)
        ElMessage.success('XML格式化成功')
        break
      case 'css':
        code.value = formatCSS(code.value)
        ElMessage.success('CSS格式化成功')
        break
      default:
        ElMessage.warning('不支持的语言类型')
    }
  } catch (error: any) {
    ElMessage.error('格式化失败: ' + error.message)
  }
}

const minifyCode = () => {
  if (language.value === 'json') {
    try {
      code.value = minifyJSON(code.value)
      ElMessage.success('JSON压缩成功')
    } catch (error: any) {
      ElMessage.error('压缩失败: ' + error.message)
    }
  }
}

const copyCode = () => {
  navigator.clipboard.writeText(code.value)
  ElMessage.success('代码已复制')
}

const clearCode = () => {
  code.value = ''
}
</script>

<style scoped>
.formatter-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.formatter-main {
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

.formatter-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.language-selector {
  margin-bottom: var(--spacing-lg);
}

.input-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.editor-section {
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: 500;
}

.editor-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.code-editor {
  min-height: 500px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}
</style>

