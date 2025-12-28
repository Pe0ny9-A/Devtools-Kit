<template>
  <header class="app-header glass">
    <div class="header-content">
      <div class="logo" @click="$router.push('/')">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">DevToolsKit</span>
      </div>
      <nav class="nav-menu">
        <!-- 主要工具 - 直接显示 -->
        <router-link
          v-for="tool in mainTools"
          :key="tool.id"
          :to="tool.route"
          class="nav-item"
          active-class="active"
        >
          <el-icon><component :is="tool.icon" /></el-icon>
          <span class="nav-text">{{ tool.name }}</span>
        </router-link>

        <!-- 更多工具 - 下拉菜单 -->
        <el-dropdown trigger="hover" placement="bottom-end" class="more-tools-dropdown">
          <span class="nav-item more-tools-trigger">
            <el-icon><MoreFilled /></el-icon>
            <span class="nav-text">更多工具</span>
            <el-icon class="arrow-icon"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="tools-dropdown-menu">
              <el-dropdown-item
                v-for="tool in moreTools"
                :key="tool.id"
                @click="$router.push(tool.route)"
                :class="{ 'is-active': $route.path === tool.route }"
              >
                <el-icon><component :is="tool.icon" /></el-icon>
                <span>{{ tool.name }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MoreFilled, ArrowDown } from '@element-plus/icons-vue'
import type { Tool } from '@/types/common'

// 主要工具 - 显示在顶部
const mainTools = ref<Tool[]>([
  { id: 'api', name: 'API测试', icon: 'Connection', route: '/api-tester', color: '#667eea', description: '' },
  { id: 'sql', name: 'SQL构建', icon: 'Database', route: '/sql-builder', color: '#764ba2', description: '' },
  { id: 'form', name: '表单构建', icon: 'Document', route: '/form-builder', color: '#f093fb', description: '' },
  { id: 'markdown', name: 'Markdown', icon: 'Edit', route: '/markdown-editor', color: '#4facfe', description: '' },
  { id: 'regex', name: '正则', icon: 'Search', route: '/regex-tester', color: '#00f2fe', description: '' },
  { id: 'json', name: 'JSON转换', icon: 'Files', route: '/json-converter', color: '#fee140', description: '' },
])

// 更多工具 - 放在下拉菜单
const moreTools = ref<Tool[]>([
  { id: 'encoder', name: '编码/解码', icon: 'Document', route: '/encoder', color: '#667eea', description: '' },
  { id: 'timestamp', name: '时间戳转换', icon: 'Calendar', route: '/timestamp', color: '#764ba2', description: '' },
  { id: 'uuid', name: 'UUID生成器', icon: 'CopyDocument', route: '/uuid-generator', color: '#f093fb', description: '' },
  { id: 'hash', name: '哈希生成器', icon: 'Lock', route: '/hash-generator', color: '#4facfe', description: '' },
  { id: 'color', name: '颜色转换', icon: 'Document', route: '/color-converter', color: '#00f2fe', description: '' },
  { id: 'qrcode', name: '二维码生成', icon: 'Grid', route: '/qrcode-generator', color: '#fee140', description: '' },
  { id: 'diff', name: '文本差异对比', icon: 'Document', route: '/text-diff', color: '#667eea', description: '' },
  { id: 'formatter', name: '代码格式化', icon: 'Sort', route: '/code-formatter', color: '#764ba2', description: '' },
])
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: var(--spacing-md) var(--spacing-xl);
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 24px;
  filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5));
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: var(--spacing-sm);
  flex: 1;
  justify-content: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
  white-space: nowrap;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(102, 126, 234, 0.3), 0 0 30px rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.nav-item:hover .el-icon {
  filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.6));
  color: var(--primary);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  color: var(--primary);
  border: 1px solid rgba(102, 126, 234, 0.4);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.2), inset 0 0 20px rgba(102, 126, 234, 0.1);
}

.nav-item.active .el-icon {
  filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.8));
  color: var(--primary);
}

.nav-text {
  font-size: 14px;
}

.more-tools-dropdown {
  margin-left: var(--spacing-sm);
}

.more-tools-trigger {
  cursor: pointer;
  position: relative;
}

.more-tools-trigger:hover {
  box-shadow: 0 0 15px rgba(102, 126, 234, 0.3), 0 0 30px rgba(102, 126, 234, 0.1);
}

.more-tools-trigger:hover .el-icon {
  filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.6));
  color: var(--primary);
}

.arrow-icon {
  font-size: 12px;
  margin-left: var(--spacing-xs);
  transition: transform 0.2s ease;
}

.more-tools-dropdown:hover .arrow-icon {
  transform: rotate(180deg);
}

:deep(.tools-dropdown-menu),
:deep(.el-dropdown-menu),
:deep(.el-dropdown-menu__wrap) {
  background: rgba(21, 27, 46, 0.3) !important;
  background-color: rgba(21, 27, 46, 0.3) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid var(--border-color) !important;
  box-shadow: var(--shadow-lg) !important;
}

:deep(.tools-dropdown-menu) {
  padding: var(--spacing-sm) !important;
  min-width: 200px;
}

:deep(.el-popper) {
  background: rgba(21, 27, 46, 0.3) !important;
  background-color: rgba(21, 27, 46, 0.3) !important;
  backdrop-filter: blur(20px) !important;
}

:deep(.el-popper__arrow::before) {
  background: rgba(21, 27, 46, 0.3) !important;
  border: 1px solid var(--border-color) !important;
}

:deep(.el-dropdown-menu__item) {
  color: var(--text-primary) !important;
  padding: var(--spacing-sm) var(--spacing-md) !important;
  border-radius: var(--radius-md) !important;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: all 0.2s ease;
}

:deep(.el-dropdown-menu__item:hover) {
  background: var(--bg-hover) !important;
  color: var(--primary) !important;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.2) !important;
}

:deep(.el-dropdown-menu__item:hover .el-icon) {
  filter: drop-shadow(0 0 6px rgba(102, 126, 234, 0.6)) !important;
  color: var(--primary) !important;
}

:deep(.el-dropdown-menu__item.is-active) {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%) !important;
  color: var(--primary) !important;
}

@media (max-width: 1024px) {
  .nav-text {
    display: none;
  }
  
  .nav-item {
    padding: var(--spacing-sm);
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
  
  .nav-text {
    display: none;
  }
}
</style>

