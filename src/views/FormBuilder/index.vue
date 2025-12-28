<template>
  <div class="form-builder-page">
    <AppHeader />
    <main class="builder-main">
      <div class="page-header">
        <h1 class="page-title">表单构建器</h1>
        <p class="page-description">拖拽式表单设计器，支持多种字段类型，实时预览，数据收集和导出</p>
      </div>

      <div class="builder-container">
        <div class="field-palette">
          <h3 class="palette-title">字段类型</h3>
          <div class="field-types">
            <div
                  v-for="type in fieldTypes"
              :key="type"
              class="field-type-item card"
              draggable="true"
              @dragstart="handleDragStart(type, $event)"
            >
              <el-icon><component :is="getFieldIcon(type)" /></el-icon>
              <span>{{ getFieldLabel(type) }}</span>
            </div>
          </div>
        </div>

        <div class="form-canvas">
          <div class="canvas-header">
            <h3>表单画布</h3>
            <div class="canvas-actions">
              <el-button @click="clearForm" size="small" type="danger" text>
                <el-icon><Delete /></el-icon>
                清空
              </el-button>
              <el-button @click="exportFormJson" size="small">
                <el-icon><Download /></el-icon>
                导出配置
              </el-button>
            </div>
          </div>
          <div
            class="canvas-content"
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
          >
            <div
              v-for="field in formStore.fields"
              :key="field.id"
              class="canvas-field card"
              :class="{ active: selectedField?.id === field.id }"
              @click="selectField(field)"
            >
              <div class="field-header">
                <span class="field-label">{{ field.label || '未命名字段' }}</span>
                <el-button
                  @click.stop="removeField(field.id)"
                  type="danger"
                  text
                  size="small"
                >
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
              <component
                :is="getFieldComponent(field.type)"
                :field="field"
                v-model="formStore.formData[field.id]"
              />
            </div>
            <div v-if="formStore.fields.length === 0" class="empty-canvas">
              <el-icon :size="64"><DocumentAdd /></el-icon>
              <p>从左侧拖拽字段类型到此处开始构建表单</p>
            </div>
          </div>
        </div>

        <div class="field-config">
          <h3 class="config-title">字段配置</h3>
          <div v-if="selectedField" class="config-content">
            <el-form label-width="80px" label-position="left">
              <el-form-item label="标签">
                <el-input v-model="selectedField.label" placeholder="字段标签" />
              </el-form-item>
              <el-form-item label="占位符">
                <el-input v-model="selectedField.placeholder" placeholder="占位符文本" />
              </el-form-item>
              <el-form-item label="必填">
                <el-switch v-model="selectedField.required" />
              </el-form-item>
              <el-form-item
                v-if="selectedField.type === 'select' || selectedField.type === 'multiselect'"
                label="选项"
              >
                <el-input
                  v-model="optionsText"
                  type="textarea"
                  :rows="4"
                  placeholder="每行一个选项"
                  @blur="updateOptions"
                />
              </el-form-item>
            </el-form>
          </div>
          <div v-else class="empty-config">
            <p>选择一个字段进行配置</p>
          </div>
        </div>
      </div>

      <div class="data-section">
        <div class="section-header">
          <h3>收集的数据</h3>
          <div class="section-actions">
            <el-button @click="exportData" size="small" type="primary" class="btn-gradient">
              <el-icon><Download /></el-icon>
              导出数据
            </el-button>
            <el-button @click="clearData" size="small">
              <el-icon><Delete /></el-icon>
              清空数据
            </el-button>
          </div>
        </div>
        <CodeEditor
          :model-value="formDataJson"
          language="json"
          :read-only="true"
          class="data-viewer"
        />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Delete,
  Download,
  DocumentAdd,
} from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import CodeEditor from '@/components/common/CodeEditor.vue'
import { useFormBuilderStore } from '@/stores/formBuilder'
import type { FormField } from '@/types/common'
import { exportJson } from '@/utils/export'

const formStore = useFormBuilderStore()

const fieldTypes: FormField['type'][] = [
  'text',
  'number',
  'email',
  'date',
  'select',
  'multiselect',
  'file',
]

const selectedField = ref<FormField | null>(null)
const optionsText = ref('')

const formDataJson = computed(() => {
  return JSON.stringify(formStore.formData, null, 2)
})

const getFieldLabel = (type: FormField['type']): string => {
  const labels: Record<FormField['type'], string> = {
    text: '文本',
    number: '数字',
    email: '邮箱',
    date: '日期',
    select: '选择',
    multiselect: '多选',
    file: '文件',
  }
  return labels[type]
}

const getFieldIcon = (type: FormField['type']) => {
  const icons: Record<FormField['type'], string> = {
    text: 'EditPen',
    number: 'Calculator',
    email: 'Message',
    date: 'Calendar',
    select: 'Select',
    multiselect: 'Grid',
    file: 'Folder',
  }
  return icons[type]
}

const getFieldComponent = (type: FormField['type']) => {
  const components: Record<FormField['type'], string> = {
    text: 'el-input',
    number: 'el-input-number',
    email: 'el-input',
    date: 'el-date-picker',
    select: 'el-select',
    multiselect: 'el-select',
    file: 'el-upload',
  }
  return components[type]
}

const handleDragStart = (type: FormField['type'], event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('fieldType', type)
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  const type = event.dataTransfer?.getData('fieldType') as FormField['type']
  if (type) {
    addField(type)
  }
}

const addField = (type: FormField['type']) => {
  const field: FormField = {
    id: Date.now().toString(),
    type,
    label: getFieldLabel(type),
    required: false,
    placeholder: `请输入${getFieldLabel(type)}`,
  }

  if (type === 'select' || type === 'multiselect') {
    field.options = ['选项1', '选项2', '选项3']
  }

  formStore.addField(field)
  selectedField.value = field
  ElMessage.success('字段已添加')
}

const selectField = (field: FormField) => {
  selectedField.value = field
  if (field.options) {
    optionsText.value = field.options.join('\n')
  } else {
    optionsText.value = ''
  }
}

const removeField = (id: string) => {
  formStore.removeField(id)
  if (selectedField.value?.id === id) {
    selectedField.value = null
  }
  ElMessage.success('字段已删除')
}

const updateOptions = () => {
  if (selectedField.value) {
    selectedField.value.options = optionsText.value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
  }
}

const clearForm = () => {
  formStore.clearForm()
  selectedField.value = null
  ElMessage.success('表单已清空')
}

const exportFormJson = () => {
  const config = {
    fields: formStore.fields,
  }
  exportJson(JSON.stringify(config, null, 2), 'form-config.json')
  ElMessage.success('表单配置已导出')
}

const exportData = () => {
  exportJson(formDataJson.value, 'form-data.json')
  ElMessage.success('表单数据已导出')
}

const clearData = () => {
  formStore.formData = {}
  ElMessage.success('数据已清空')
}

watch(
  () => selectedField.value,
  (newField) => {
    if (newField?.options) {
      optionsText.value = newField.options.join('\n')
    } else {
      optionsText.value = ''
    }
  }
)
</script>

<style scoped>
.form-builder-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.builder-main {
  flex: 1;
  max-width: 1800px;
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

.builder-container {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.field-palette {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  height: fit-content;
}

.palette-title {
  color: var(--text-primary);
  font-size: 16px;
  margin-bottom: var(--spacing-md);
}

.field-types {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.field-type-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  cursor: grab;
  transition: all 0.2s ease;
}

.field-type-item:hover {
  background: var(--bg-hover);
  transform: translateX(4px);
}

.field-type-item:active {
  cursor: grabbing;
}

.form-canvas {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
}

.canvas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--divider);
}

.canvas-header h3 {
  color: var(--text-primary);
  font-size: 18px;
}

.canvas-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.canvas-content {
  flex: 1;
  min-height: 500px;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.canvas-field {
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.canvas-field.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.field-label {
  font-weight: 500;
  color: var(--text-primary);
}

.empty-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: var(--text-secondary);
  gap: var(--spacing-md);
}

.field-config {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  height: fit-content;
}

.config-title {
  color: var(--text-primary);
  font-size: 16px;
  margin-bottom: var(--spacing-md);
}

.config-content {
  margin-top: var(--spacing-md);
}

.empty-config {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
}

.data-section {
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

.section-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.data-viewer {
  min-height: 300px;
}

@media (max-width: 1400px) {
  .builder-container {
    grid-template-columns: 1fr;
  }
  
  .field-palette,
  .field-config {
    position: sticky;
    top: 100px;
  }
}
</style>

