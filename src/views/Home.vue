<template>
  <div class="home-container">
    <AppHeader />
    <main class="home-main">
      <section class="hero-section">
        <h1 class="hero-title">
          <span class="text-gradient">DevToolsKit</span>
        </h1>
        <p class="hero-subtitle">零代码工具平台 · 让开发更高效</p>
        <p class="hero-description">
          集合多种实用开发工具，无需编写代码即可完成API测试、SQL构建、表单设计等任务
        </p>
        <div class="hero-actions">
          <a
            href="https://github.com/Pe0ny9-A/Devtools-Kit"
            target="_blank"
            rel="noopener noreferrer"
            class="github-button"
          >
            <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
            <el-icon class="external-icon"><ArrowRight /></el-icon>
          </a>
          <a
            href="https://github.com/Pe0ny9-A/Devtools-Kit/stargazers"
            target="_blank"
            rel="noopener noreferrer"
            class="star-button"
          >
            <el-icon><Star /></el-icon>
            <span>Star</span>
          </a>
        </div>
      </section>

      <section class="tools-section">
        <h2 class="section-title">工具集合</h2>
        <div class="tools-grid">
          <ToolCard
            v-for="tool in tools"
            :key="tool.id"
            :name="tool.name"
            :description="tool.description"
            :icon="tool.icon"
            :color="tool.color"
            :route="tool.route"
          />
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Star } from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import ToolCard from '@/components/ToolCard.vue'
import type { Tool } from '@/types/common'

const tools = ref<Tool[]>([
  {
    id: 'api',
    name: 'API 测试工具',
    description: '可视化HTTP请求构建器，支持多种请求方法，自动生成API文档，保存请求历史',
    icon: 'Connection',
    route: '/api-tester',
    color: '#667eea',
  },
  {
    id: 'sql',
    name: 'SQL 查询构建器',
    description: '可视化SQL构建工具，拖拽式条件构建，支持多表JOIN，实时预览生成的SQL语句',
    icon: 'Database',
    route: '/sql-builder',
    color: '#764ba2',
  },
  {
    id: 'form',
    name: '表单构建器',
    description: '拖拽式表单设计器，支持多种字段类型，实时预览，数据收集和导出功能',
    icon: 'Document',
    route: '/form-builder',
    color: '#f093fb',
  },
  {
    id: 'markdown',
    name: 'Markdown 编辑器',
    description: '增强版Markdown编辑器，支持Mermaid图表、数学公式、代码高亮，导出PDF/HTML',
    icon: 'Edit',
    route: '/markdown-editor',
    color: '#4facfe',
  },
  {
    id: 'regex',
    name: '正则表达式工具',
    description: '正则表达式可视化工具，实时匹配测试，分组捕获显示，常用模板库',
    icon: 'Search',
    route: '/regex-tester',
    color: '#00f2fe',
  },
  {
    id: 'json',
    name: 'JSON/CSV 转换',
    description: 'JSON和CSV双向转换工具，数据验证，格式化，支持大文件处理和导出',
    icon: 'Files',
    route: '/json-converter',
    color: '#fee140',
  },
  {
    id: 'encoder',
    name: '编码/解码工具',
    description: 'Base64和URL编码/解码工具，支持双向转换，快速处理文本编码',
    icon: 'Document',
    route: '/encoder',
    color: '#667eea',
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    description: 'Unix时间戳与日期时间相互转换，支持秒和毫秒格式，实时转换',
    icon: 'Calendar',
    route: '/timestamp',
    color: '#764ba2',
  },
  {
    id: 'uuid',
    name: 'UUID 生成器',
    description: '生成唯一标识符，支持标准UUID、无连字符、短UUID等多种格式',
    icon: 'CopyDocument',
    route: '/uuid-generator',
    color: '#f093fb',
  },
  {
    id: 'hash',
    name: '哈希生成器',
    description: '生成MD5、SHA1、SHA256、SHA512哈希值，支持多种加密算法',
    icon: 'Lock',
    route: '/hash-generator',
    color: '#4facfe',
  },
  {
    id: 'color',
    name: '颜色转换工具',
    description: 'HEX、RGB、HSL颜色格式相互转换，颜色选择器，实时预览',
    icon: 'Document',
    route: '/color-converter',
    color: '#00f2fe',
  },
  {
    id: 'qrcode',
    name: '二维码生成器',
    description: '生成二维码，支持文本、URL等内容，可自定义尺寸和颜色，支持下载',
    icon: 'Grid',
    route: '/qrcode-generator',
    color: '#fee140',
  },
  {
    id: 'diff',
    name: '文本差异对比',
    description: '对比两个文本的差异，支持按行、按词、按字符三种模式，高亮显示差异',
    icon: 'Document',
    route: '/text-diff',
    color: '#667eea',
  },
  {
    id: 'formatter',
    name: '代码格式化',
    description: '格式化多种编程语言的代码，支持JSON、SQL、HTML、XML、CSS等',
    icon: 'Sort',
    route: '/code-formatter',
    color: '#764ba2',
  },
])
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-card) 100%);
}

.home-main {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-3xl) var(--spacing-xl);
  width: 100%;
}

.hero-section {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
  padding: var(--spacing-3xl) 0;
}

.hero-title {
  font-size: 64px;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 24px;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 500;
}

.hero-description {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto var(--spacing-xl);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: var(--spacing-xl);
}

.github-button,
.star-button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  cursor: pointer;
}

.github-button {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-color: rgba(102, 126, 234, 0.3);
}

.github-button:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.3), 0 0 40px rgba(102, 126, 234, 0.1);
  color: var(--primary);
}

.star-button {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%);
  border-color: rgba(255, 193, 7, 0.3);
}

.star-button:hover {
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.2) 100%);
  border-color: rgba(255, 193, 7, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.3), 0 0 40px rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.github-button .el-icon,
.star-button .el-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.github-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.github-button:hover .external-icon,
.star-button:hover .el-icon {
  transform: translateX(4px);
}

.github-button:hover .github-icon {
  transform: rotate(360deg);
}

.tools-section {
  margin-top: var(--spacing-3xl);
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: var(--spacing-xl);
  text-align: center;
  color: var(--text-primary);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .github-button,
  .star-button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .home-main {
    padding: var(--spacing-xl) var(--spacing-md);
  }
}
</style>

