import Papa from 'papaparse'

export interface CsvData {
  headers: string[]
  rows: string[][]
}

export function jsonToCsv(json: string): string {
  try {
    const data = JSON.parse(json)
    const array = Array.isArray(data) ? data : [data]
    
    // 处理嵌套对象和数组，将其转换为字符串
    const flattened = array.map((item: any) => {
      const flat: any = {}
      Object.keys(item).forEach((key) => {
        const value = item[key]
        if (value === null || value === undefined) {
          flat[key] = ''
        } else if (typeof value === 'object') {
          flat[key] = JSON.stringify(value)
        } else {
          flat[key] = value
        }
      })
      return flat
    })
    
    // 使用Papa.unparse
    // PapaParse可能以不同方式导出，尝试多种方式
    const unparse = (Papa as any).unparse || (Papa as any).default?.unparse || Papa.unparse
    if (typeof unparse === 'function') {
      return unparse(flattened)
    } else {
      // 手动实现简单的CSV转换（备用方案）
      return manualCsvConvert(flattened)
    }
  } catch (error: any) {
    throw new Error(`Failed to convert JSON to CSV: ${error.message}`)
  }
}

export function csvToJson(csv: string): string {
  try {
    const result = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    })
    return JSON.stringify(result.data, null, 2)
  } catch (error) {
    throw new Error('Failed to convert CSV to JSON')
  }
}

export function parseCsv(csv: string): CsvData {
  try {
    const result = Papa.parse(csv, {
      header: false,
      skipEmptyLines: true,
    })
    const rows = result.data as string[][]
    const headers = rows[0] || []
    return {
      headers,
      rows: rows.slice(1),
    }
  } catch (error) {
    throw new Error('Failed to parse CSV')
  }
}

// 手动实现CSV转换（备用方案）
function manualCsvConvert(data: any[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const rows = [headers.join(',')]
  
  data.forEach((item) => {
    const values = headers.map((header) => {
      const value = item[header] ?? ''
      // 处理包含逗号、引号或换行符的值
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return String(value)
    })
    rows.push(values.join(','))
  })
  
  return rows.join('\n')
}

