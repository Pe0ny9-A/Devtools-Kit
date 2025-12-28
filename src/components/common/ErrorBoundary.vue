<template>
  <div v-if="hasError" class="error-boundary">
    <div class="error-content">
      <el-icon :size="64" color="var(--error)"><WarningFilled /></el-icon>
      <h3>出现了一些问题</h3>
      <p>{{ errorMessage }}</p>
      <el-button @click="resetError" type="primary" class="btn-gradient">
        重试
      </el-button>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { WarningFilled } from '@element-plus/icons-vue'

const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((error: Error) => {
  hasError.value = true
  errorMessage.value = error.message || '未知错误'
  console.error('Error caught by boundary:', error)
  return false
})

const resetError = () => {
  hasError.value = false
  errorMessage.value = ''
}
</script>

<style scoped>
.error-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: var(--spacing-xl);
}

.error-content {
  text-align: center;
  color: var(--text-primary);
}

.error-content h3 {
  margin: var(--spacing-md) 0;
  color: var(--error);
}

.error-content p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}
</style>

