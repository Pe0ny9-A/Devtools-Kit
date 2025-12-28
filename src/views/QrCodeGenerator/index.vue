<template>
  <div class="qrcode-page">
    <AppHeader />
    <main class="qrcode-main">
      <div class="page-header">
        <h1 class="page-title">二维码生成器</h1>
        <p class="page-description">生成二维码，支持文本、URL等</p>
      </div>

      <div class="qrcode-container">
        <div class="input-section">
          <label class="input-label">输入内容</label>
          <el-input
            v-model="qrText"
            type="textarea"
            :rows="4"
            placeholder="输入要生成二维码的文本或URL..."
            @input="generateQRCode"
          />
        </div>

        <div class="options-section">
          <div class="option-item">
            <label class="input-label">尺寸</label>
            <el-slider v-model="size" :min="100" :max="500" :step="50" @change="generateQRCode" />
            <span class="option-value">{{ size }}px</span>
          </div>
        </div>

        <div class="qrcode-display">
          <div v-if="qrCodeUrl" class="qrcode-wrapper">
            <img :src="qrCodeUrl" alt="QR Code" class="qrcode-image" />
            <div class="qrcode-actions">
              <el-button @click="downloadQRCode" type="primary" class="btn-gradient">
                <el-icon><Download /></el-icon>
                下载二维码
              </el-button>
            </div>
          </div>
          <div v-else class="empty-state">
            <el-icon :size="64"><Grid /></el-icon>
            <p>输入内容后，二维码将自动生成</p>
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
import { Download, Grid } from '@element-plus/icons-vue'
import QRCode from 'qrcode'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'

const qrText = ref('')
const size = ref(200)
const qrCodeUrl = ref('')

const generateQRCode = async () => {
  if (!qrText.value.trim()) {
    qrCodeUrl.value = ''
    return
  }

  try {
    const url = await QRCode.toDataURL(qrText.value, {
      width: size.value,
      margin: 2,
      color: {
        dark: '#667eea',
        light: '#ffffff',
      },
    })
    qrCodeUrl.value = url
  } catch (error: any) {
    ElMessage.error('生成二维码失败: ' + error.message)
  }
}

const downloadQRCode = () => {
  if (!qrCodeUrl.value) {
    ElMessage.warning('请先生成二维码')
    return
  }

  const link = document.createElement('a')
  link.download = 'qrcode.png'
  link.href = qrCodeUrl.value
  link.click()
  ElMessage.success('二维码已下载')
}

watch([qrText, size], () => {
  generateQRCode()
})
</script>

<style scoped>
.qrcode-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.qrcode-main {
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

.qrcode-container {
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

.options-section {
  margin-bottom: var(--spacing-xl);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.option-value {
  color: var(--text-primary);
  font-weight: 500;
  min-width: 60px;
}

.qrcode-display {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.qrcode-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.qrcode-image {
  background: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  gap: var(--spacing-md);
}
</style>

