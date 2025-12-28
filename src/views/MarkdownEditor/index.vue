<template>
  <div class="markdown-editor-page">
    <AppHeader />
    <main class="editor-main">
      <div class="page-header">
        <h1 class="page-title">Markdown 编辑器</h1>
        <p class="page-description">增强版Markdown编辑器，支持Mermaid图表、数学公式、代码高亮</p>
      </div>

      <div class="editor-container">
        <div class="toolbar">
          <el-button-group>
            <el-button @click="insertMarkdown('**', '**')" size="small">
              <strong>B</strong>
            </el-button>
            <el-button @click="insertMarkdown('*', '*')" size="small">
              <em>I</em>
            </el-button>
            <el-button @click="insertMarkdown('`', '`')" size="small">
              &lt;/&gt;
            </el-button>
            <el-button @click="insertMarkdown('[', '](url)')" size="small">
              🔗
            </el-button>
            <el-button @click="insertMarkdown('# ', '')" size="small">
              H
            </el-button>
            <el-button @click="insertMarkdown('- ', '')" size="small">
              •
            </el-button>
          </el-button-group>
          <div class="toolbar-actions">
            <el-button @click="exportHtml" size="small">
              <el-icon><Download /></el-icon>
              导出HTML
            </el-button>
            <el-button @click="exportPdf" size="small" type="primary" class="btn-gradient">
              <el-icon><Document /></el-icon>
              导出PDF
            </el-button>
          </div>
        </div>

        <div class="editor-content">
          <div class="editor-pane">
            <div class="pane-header">
              <span>编辑器</span>
              <el-icon class="toggle-icon" @click="toggleSplit"><FullScreen /></el-icon>
            </div>
            <el-input
              v-model="markdownContent"
              type="textarea"
              :rows="20"
              placeholder="输入Markdown内容..."
              class="markdown-input"
            />
          </div>

          <div v-if="!fullScreen" class="divider"></div>

          <div v-if="!fullScreen" class="preview-pane">
            <div class="pane-header">
              <span>预览</span>
            </div>
            <div class="preview-content" v-html="renderedHtml"></div>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Download,
  Document,
  FullScreen,
} from '@element-plus/icons-vue'
import AppHeader from '@/components/Layout/AppHeader.vue'
import AppFooter from '@/components/Layout/AppFooter.vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import mermaid from 'mermaid'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { exportText } from '@/utils/export'

const markdownContent = ref(`# Markdown 编辑器示例

这是一个**增强版**Markdown编辑器，支持多种功能。

## 功能特性

- 实时预览
- 代码高亮
- Mermaid图表
- 数学公式
- 导出功能

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

## Mermaid 图表

\`\`\`mermaid
graph TD
    A[开始] --> B{判断}
    B -->|是| C[执行]
    B -->|否| D[结束]
    C --> D
\`\`\`

## 数学公式

行内公式: $E = mc^2$

块级公式:

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$
`)

const fullScreen = ref(false)

const renderedHtml = computed(() => {
  try {
    // 配置marked
    marked.setOptions({
      breaks: true,
      gfm: true,
    })

    let html = marked.parse(markdownContent.value) as string

    // 处理Mermaid图表
    html = html.replace(
      /```mermaid\n([\s\S]*?)```/g,
      (_match: string, content: string) => {
        const id = 'mermaid-' + Math.random().toString(36).substr(2, 9)
        return `<div class="mermaid" id="${id}">${content}</div>`
      }
    )

    // 处理数学公式
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_match: string, formula: string) => {
      try {
        return katex.renderToString(formula.trim(), { displayMode: true })
      } catch (e) {
        return _match
      }
    })

    html = html.replace(/\$([^\$]+)\$/g, (_match: string, formula: string) => {
      try {
        return katex.renderToString(formula.trim(), { displayMode: false })
      } catch (e) {
        return _match
      }
    })

    // 渲染Mermaid图表
    nextTick(() => {
      mermaid.initialize({ startOnLoad: true, theme: 'dark' })
      document.querySelectorAll('.mermaid').forEach((el) => {
        if (!(el as HTMLElement).getAttribute('data-processed')) {
          mermaid.run({ nodes: [el as HTMLElement] })
          ;(el as HTMLElement).setAttribute('data-processed', 'true')
        }
      })
    })

    return html
  } catch (error: any) {
    return `<p style="color: var(--error);">渲染错误: ${error.message}</p>`
  }
})

const insertMarkdown = (before: string, after: string) => {
  const textarea = document.querySelector('.markdown-input textarea') as HTMLTextAreaElement
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = markdownContent.value.substring(start, end)
  const newText =
    markdownContent.value.substring(0, start) +
    before +
    selectedText +
    after +
    markdownContent.value.substring(end)

  markdownContent.value = newText

  nextTick(() => {
    textarea.focus()
    textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
  })
}

const toggleSplit = () => {
  fullScreen.value = !fullScreen.value
}

const exportHtml = () => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Markdown Export</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; }
    pre code { background: none; padding: 0; }
  </style>
</head>
<body>
  ${renderedHtml.value}
</body>
</html>
  `
  exportText(html, 'markdown-export.html')
  ElMessage.success('HTML文件已导出')
}

const exportPdf = async () => {
  try {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.querySelector('.preview-content')
    if (!element) return

    const opt = {
      margin: 1,
      filename: 'markdown-export.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }

    await html2pdf().set(opt).from(element).save()
    ElMessage.success('PDF文件已导出')
  } catch (error: any) {
    ElMessage.error('PDF导出失败: ' + error.message)
  }
}

onMounted(() => {
  mermaid.initialize({ startOnLoad: true, theme: 'dark' })
})
</script>

<style scoped>
.markdown-editor-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.editor-main {
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

.editor-container {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--divider);
}

.toolbar-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.editor-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-lg);
  min-height: 600px;
}

.editor-pane {
  display: flex;
  flex-direction: column;
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-weight: 500;
}

.toggle-icon {
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.toggle-icon:hover {
  color: var(--primary);
}

.markdown-input {
  flex: 1;
}

.markdown-input :deep(textarea) {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.divider {
  width: 1px;
  background: var(--divider);
}

.preview-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-content {
  flex: 1;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow-y: auto;
  color: var(--text-primary);
  line-height: 1.8;
}

.preview-content :deep(h1),
.preview-content :deep(h2),
.preview-content :deep(h3) {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.preview-content :deep(p) {
  margin-bottom: var(--spacing-md);
}

.preview-content :deep(code) {
  background: rgba(102, 126, 234, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

.preview-content :deep(pre) {
  background: var(--bg-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin-bottom: var(--spacing-md);
}

.preview-content :deep(pre code) {
  background: none;
  padding: 0;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid var(--primary);
  padding-left: var(--spacing-md);
  margin: var(--spacing-md) 0;
  color: var(--text-secondary);
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  margin-left: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.preview-content :deep(a) {
  color: var(--primary);
  text-decoration: none;
}

.preview-content :deep(a:hover) {
  text-decoration: underline;
}

.preview-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--spacing-md);
}

.preview-content :deep(th),
.preview-content :deep(td) {
  border: 1px solid var(--border-color);
  padding: var(--spacing-sm);
}

.preview-content :deep(th) {
  background: var(--bg-hover);
}

@media (max-width: 1024px) {
  .editor-content {
    grid-template-columns: 1fr;
  }
  
  .divider {
    display: none;
  }
}
</style>

