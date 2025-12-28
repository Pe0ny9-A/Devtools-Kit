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
  margin: 0 auto;
  line-height: 1.6;
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
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .home-main {
    padding: var(--spacing-xl) var(--spacing-md);
  }
}
</style>

