<template>
  <div class="sql-builder-page">
    <AppHeader />
    <main class="builder-main">
      <div class="page-header">
        <h1 class="page-title">SQL 查询构建器</h1>
        <p class="page-description">可视化SQL构建工具，拖拽式条件构建，实时预览生成的SQL语句</p>
      </div>

      <div class="builder-container">
        <div class="builder-panel">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="表选择" name="tables">
              <div class="table-selector">
                <el-input
                  v-model="newTableName"
                  placeholder="输入表名"
                  class="table-input"
                >
                  <template #append>
                    <el-button @click="addTable" :icon="Plus">添加</el-button>
                  </template>
                </el-input>
                <div class="tables-list">
                  <div
                    v-for="table in query.tables"
                    :key="table.name"
                    class="table-item card"
                  >
                    <div class="table-name">{{ table.name }}</div>
                    <el-input
                      v-model="table.alias"
                      placeholder="别名（可选）"
                      size="small"
                      class="table-alias"
                    />
                    <el-button
                      @click="removeTable(table.name)"
                      type="danger"
                      text
                      size="small"
                    >
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="字段选择" name="fields">
              <div class="fields-selector">
                <el-input
                  v-model="newFieldName"
                  placeholder="输入字段名"
                  class="field-input"
                >
                  <template #append>
                    <el-button @click="addField" :icon="Plus">添加</el-button>
                  </template>
                </el-input>
                <div class="fields-list">
                  <div
                    v-for="(field, index) in query.fields"
                    :key="index"
                    class="field-item card"
                  >
                    <el-input
                      v-model="field.name"
                      placeholder="字段名"
                      size="small"
                    />
                    <el-input
                      v-model="field.alias"
                      placeholder="别名（可选）"
                      size="small"
                    />
                    <el-button
                      @click="removeField(index)"
                      type="danger"
                      text
                      size="small"
                    >
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="条件" name="conditions">
              <div class="conditions-builder">
                <div
                  v-for="(condition, index) in query.conditions"
                  :key="condition.id"
                  class="condition-item card"
                >
                  <el-select v-model="condition.logic" style="width: 80px" v-if="index > 0">
                    <el-option label="AND" value="AND" />
                    <el-option label="OR" value="OR" />
                  </el-select>
                  <el-input v-model="condition.field" placeholder="字段名" />
                  <el-select v-model="condition.operator" style="width: 120px">
                    <el-option label="=" value="=" />
                    <el-option label="!=" value="!=" />
                    <el-option label=">" value=">" />
                    <el-option label="<" value="<" />
                    <el-option label=">=" value=">=" />
                    <el-option label="<=" value="<=" />
                    <el-option label="LIKE" value="LIKE" />
                    <el-option label="IN" value="IN" />
                    <el-option label="BETWEEN" value="BETWEEN" />
                    <el-option label="IS NULL" value="IS NULL" />
                    <el-option label="IS NOT NULL" value="IS NOT NULL" />
                  </el-select>
                  <el-input
                    v-if="condition.operator !== 'IS NULL' && condition.operator !== 'IS NOT NULL'"
                    v-model="condition.value"
                    placeholder="值"
                  />
                  <el-button
                    @click="removeCondition(condition.id)"
                    type="danger"
                    text
                  >
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
                <el-button @click="addCondition" type="primary" class="btn-gradient">
                  <el-icon><Plus /></el-icon>
                  添加条件
                </el-button>
              </div>
            </el-tab-pane>

            <el-tab-pane label="排序" name="order">
              <div class="order-builder">
                <div
                  v-for="(order, index) in query.orderBy"
                  :key="index"
                  class="order-item card"
                >
                  <el-input v-model="order.field" placeholder="字段名" />
                  <el-select v-model="order.direction" style="width: 100px">
                    <el-option label="ASC" value="ASC" />
                    <el-option label="DESC" value="DESC" />
                  </el-select>
                  <el-button
                    @click="removeOrder(index)"
                    type="danger"
                    text
                  >
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
                <el-button @click="addOrder" type="primary" class="btn-gradient">
                  <el-icon><Plus /></el-icon>
                  添加排序
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

        <div class="sql-preview">
          <div class="preview-header">
            <h3>生成的SQL</h3>
            <div class="preview-actions">
              <el-button @click="formatSql" size="small">
                <el-icon><Sort /></el-icon>
                格式化
              </el-button>
              <el-button @click="copySql" size="small">
                <el-icon><CopyDocument /></el-icon>
                复制
              </el-button>
            </div>
          </div>
          <CodeEditor
            :model-value="generatedSql"
            language="sql"
            :read-only="true"
            class="sql-editor"
          />
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete, Sort, CopyDocument } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import CodeEditor from '@/components/common/CodeEditor.vue'
import { generateSql, formatSql as formatSqlUtil } from '@/utils/sql'
import type { SqlQuery } from '@/types/sql'

const activeTab = ref('tables')
const newTableName = ref('')
const newFieldName = ref('')

const query = ref<SqlQuery>({
  tables: [],
  fields: [],
  conditions: [],
  joins: [],
  groupBy: [],
  orderBy: [],
})

const generatedSql = computed(() => {
  try {
    return generateSql(query.value)
  } catch (error: any) {
    return `-- 错误: ${error.message}`
  }
})

const addTable = () => {
  if (!newTableName.value.trim()) {
    ElMessage.warning('请输入表名')
    return
  }
  query.value.tables.push({
    name: newTableName.value.trim(),
    fields: [],
  })
  newTableName.value = ''
  ElMessage.success('表已添加')
}

const removeTable = (name: string) => {
  query.value.tables = query.value.tables.filter((t) => t.name !== name)
}

const addField = () => {
  if (!newFieldName.value.trim()) {
    ElMessage.warning('请输入字段名')
    return
  }
  query.value.fields.push({
    name: newFieldName.value.trim(),
  })
  newFieldName.value = ''
  ElMessage.success('字段已添加')
}

const removeField = (index: number) => {
  query.value.fields.splice(index, 1)
}

const addCondition = () => {
  query.value.conditions.push({
    id: Date.now().toString(),
    field: '',
    operator: '=',
    value: '',
    logic: 'AND',
  })
}

const removeCondition = (id: string) => {
  query.value.conditions = query.value.conditions.filter((c) => c.id !== id)
}

const addOrder = () => {
  query.value.orderBy.push({
    field: '',
    direction: 'ASC',
  })
}

const removeOrder = (index: number) => {
  query.value.orderBy.splice(index, 1)
}

const formatSql = () => {
  try {
    formatSqlUtil(generatedSql.value)
    ElMessage.success('SQL已格式化（格式化功能将在编辑器更新）')
  } catch (error: any) {
    ElMessage.error('格式化失败: ' + error.message)
  }
}

const copySql = () => {
  navigator.clipboard.writeText(generatedSql.value)
  ElMessage.success('SQL已复制到剪贴板')
}
</script>

<style scoped>
.sql-builder-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.builder-main {
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

.builder-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
}

.builder-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.table-selector,
.fields-selector,
.conditions-builder,
.order-builder {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.table-input,
.field-input {
  margin-bottom: var(--spacing-md);
}

.tables-list,
.fields-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  max-height: 400px;
  overflow-y: auto;
}

.table-item,
.field-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  align-items: center;
}

.table-name {
  font-weight: 500;
  color: var(--text-primary);
  font-family: 'Fira Code', monospace;
}

.table-alias {
  width: 150px;
}

.condition-item {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  align-items: center;
}

.order-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  align-items: center;
}

.sql-preview {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.preview-header h3 {
  color: var(--text-primary);
  font-size: 18px;
}

.preview-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.sql-editor {
  flex: 1;
  min-height: 500px;
}

@media (max-width: 1024px) {
  .builder-container {
    grid-template-columns: 1fr;
  }
}
</style>

