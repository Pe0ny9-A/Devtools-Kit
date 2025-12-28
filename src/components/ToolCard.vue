<template>
  <div class="tool-card card animate-slide-in" @click="handleClick">
    <div class="card-header">
      <div class="icon-wrapper" :style="{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }">
        <el-icon :size="32" :style="{ color }">
          <component :is="icon" />
        </el-icon>
      </div>
      <h3 class="card-title">{{ name }}</h3>
    </div>
    <p class="card-description">{{ description }}</p>
    <div class="card-footer">
      <span class="card-badge">免费使用</span>
      <el-icon class="arrow-icon"><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

interface Props {
  name: string
  description: string
  icon: string
  color: string
  route: string
}

const props = defineProps<Props>()
const router = useRouter()

const handleClick = () => {
  router.push(props.route)
}
</script>

<style scoped>
.tool-card {
  padding: var(--spacing-xl);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, v-bind(color), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tool-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease;
}

.tool-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.card-description {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
  min-height: 48px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  font-size: 12px;
  color: var(--primary);
}

.arrow-icon {
  color: var(--text-secondary);
  transition: transform 0.3s ease;
}

.tool-card:hover .arrow-icon {
  transform: translateX(4px);
  color: var(--primary);
}
</style>

