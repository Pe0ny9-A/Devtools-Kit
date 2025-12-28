<template>
  <div class="color-page">
    <AppHeader />
    <main class="color-main">
      <div class="page-header">
        <h1 class="page-title">颜色转换工具</h1>
        <p class="page-description">HEX、RGB、HSL颜色格式相互转换</p>
      </div>

      <div class="color-container">
        <div class="color-picker-section">
          <label class="input-label">颜色选择器</label>
          <div class="color-picker-wrapper">
            <input
              v-model="hexColor"
              type="color"
              class="color-picker"
              @input="updateFromHex"
            />
            <div class="color-preview" :style="{ backgroundColor: hexColor }"></div>
            <span class="color-hex">{{ hexColor }}</span>
          </div>
        </div>

        <div class="converter-sections">
          <div class="converter-section">
            <label class="input-label">HEX</label>
            <el-input
              v-model="hexColor"
              placeholder="#000000"
              @input="updateFromHex"
            >
              <template #prepend>#</template>
            </el-input>
          </div>

          <div class="converter-section">
            <label class="input-label">RGB</label>
            <div class="rgb-inputs">
              <el-input-number v-model="rgbColor.r" :min="0" :max="255" @change="updateFromRgb" />
              <el-input-number v-model="rgbColor.g" :min="0" :max="255" @change="updateFromRgb" />
              <el-input-number v-model="rgbColor.b" :min="0" :max="255" @change="updateFromRgb" />
            </div>
          </div>

          <div class="converter-section">
            <label class="input-label">HSL</label>
            <div class="hsl-inputs">
              <el-input-number v-model="hslColor.h" :min="0" :max="360" @change="updateFromHsl" />
              <el-input-number v-model="hslColor.s" :min="0" :max="100" @change="updateFromHsl" />
              <el-input-number v-model="hslColor.l" :min="0" :max="100" @change="updateFromHsl" />
            </div>
          </div>
        </div>

        <div class="color-display">
          <div class="display-item">
            <span class="display-label">HEX:</span>
            <span class="display-value">{{ hexColor }}</span>
            <el-button @click="copyColor(hexColor)" size="small" text>
              <el-icon><CopyDocument /></el-icon>
            </el-button>
          </div>
          <div class="display-item">
            <span class="display-label">RGB:</span>
            <span class="display-value">rgb({{ rgbColor.r }}, {{ rgbColor.g }}, {{ rgbColor.b }})</span>
            <el-button @click="copyColor(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`)" size="small" text>
              <el-icon><CopyDocument /></el-icon>
            </el-button>
          </div>
          <div class="display-item">
            <span class="display-label">HSL:</span>
            <span class="display-value">hsl({{ hslColor.h }}, {{ hslColor.s }}%, {{ hslColor.l }}%)</span>
            <el-button @click="copyColor(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`)" size="small" text>
              <el-icon><CopyDocument /></el-icon>
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
import { CopyDocument } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hslToHex,
  hexToHsl,
  type RGB,
  type HSL,
} from '@/utils/color'

const hexColor = ref('#667eea')
const rgbColor = ref<RGB>({ r: 102, g: 126, b: 234 })
const hslColor = ref<HSL>({ h: 230, s: 78, l: 66 })

const updateFromHex = () => {
  try {
    const hex = hexColor.value.startsWith('#') ? hexColor.value : '#' + hexColor.value
    const rgb = hexToRgb(hex)
    if (rgb) {
      rgbColor.value = rgb
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
      hslColor.value = hsl
    }
  } catch (error) {
    // ignore
  }
}

const updateFromRgb = () => {
  try {
    const hex = rgbToHex(rgbColor.value.r, rgbColor.value.g, rgbColor.value.b)
    hexColor.value = hex
    const hsl = rgbToHsl(rgbColor.value.r, rgbColor.value.g, rgbColor.value.b)
    hslColor.value = hsl
  } catch (error) {
    // ignore
  }
}

const updateFromHsl = () => {
  try {
    const rgb = hslToRgb(hslColor.value.h, hslColor.value.s, hslColor.value.l)
    rgbColor.value = rgb
    const hex = hslToHex(hslColor.value.h, hslColor.value.s, hslColor.value.l)
    hexColor.value = hex
  } catch (error) {
    // ignore
  }
}

const copyColor = (color: string) => {
  navigator.clipboard.writeText(color)
  ElMessage.success('颜色值已复制')
}

// 初始化
updateFromHex()
</script>

<style scoped>
.color-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.color-main {
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

.color-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.color-picker-section {
  margin-bottom: var(--spacing-xl);
}

.input-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.color-picker {
  width: 80px;
  height: 80px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.color-preview {
  width: 100px;
  height: 100px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.color-hex {
  font-family: 'Fira Code', monospace;
  font-size: 18px;
  color: var(--text-primary);
  font-weight: 600;
}

.converter-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.rgb-inputs,
.hsl-inputs {
  display: flex;
  gap: var(--spacing-sm);
}

.color-display {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.display-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.display-item:last-child {
  margin-bottom: 0;
}

.display-label {
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 60px;
}

.display-value {
  flex: 1;
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
}
</style>

