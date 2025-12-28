// 代码格式化工具
import { format } from 'sql-formatter'

export function formatSQL(code: string): string {
  try {
    return format(code, {
      language: 'sql',
      tabWidth: 2,
      keywordCase: 'upper',
    })
  } catch (error) {
    return code
  }
}

// formatJSON已移至json.ts，这里保留以保持兼容性
export function formatJSON(code: string): string {
  try {
    const parsed = JSON.parse(code)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    return code
  }
}

export function minifyJSON(code: string): string {
  try {
    const parsed = JSON.parse(code)
    return JSON.stringify(parsed)
  } catch (error) {
    return code
  }
}

export function formatXML(code: string): string {
  // 简单的XML格式化
  let formatted = ''
  let indent = 0
  const tab = '  '

  code.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) indent--
    formatted += tab.repeat(Math.max(0, indent)) + '<' + node + '>\r\n'
    if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith('input')) indent++
  })

  return formatted.substring(1, formatted.length - 3)
}

export function formatHTML(code: string): string {
  // 简单的HTML格式化
  return formatXML(code)
}

export function formatCSS(code: string): string {
  // 简单的CSS格式化
  return code
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/\s*;\s*/g, ';\n  ')
    .replace(/\n\s*\n/g, '\n')
}

