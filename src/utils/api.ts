import type { ApiRequest, ApiResponse } from '@/types/api'

export async function sendRequest(request: ApiRequest): Promise<ApiResponse> {
  const startTime = Date.now()
  
  try {
    // 验证URL格式
    let url: URL
    try {
      url = new URL(request.url)
    } catch {
      // 如果不是完整URL，尝试添加协议
      if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) {
        url = new URL('https://' + request.url)
      } else {
        throw new Error('Invalid URL format')
      }
    }
    
    // 添加查询参数
    Object.entries(request.params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value)
      }
    })

    // 构建请求体
    let body: string | FormData | undefined
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      if (request.bodyType === 'json') {
        body = request.body
      } else if (request.bodyType === 'form-data') {
        const formData = new FormData()
        try {
          const json = JSON.parse(request.body)
          Object.entries(json).forEach(([key, value]) => {
            formData.append(key, String(value))
          })
        } catch {
          // 如果不是JSON，尝试解析为key=value格式
          request.body.split('&').forEach((pair) => {
            const [key, value] = pair.split('=')
            if (key && value) {
              formData.append(key, decodeURIComponent(value))
            }
          })
        }
        body = formData
      } else {
        body = request.body
      }
    }

    // 发送请求
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: request.bodyType === 'form-data' ? {} : request.headers,
      body: body as BodyInit,
    })

    const endTime = Date.now()
    const time = endTime - startTime

    // 获取响应数据
    const contentType = response.headers.get('content-type') || ''
    let data: any

    try {
      if (contentType.includes('application/json')) {
        const text = await response.text()
        data = text ? JSON.parse(text) : null
      } else if (contentType.includes('text/')) {
        data = await response.text()
      } else {
        const blob = await response.blob()
        data = { type: blob.type, size: blob.size, blob: 'Binary data' }
      }
    } catch (parseError) {
      // 如果解析失败，返回原始文本
      const text = await response.text()
      data = text || 'Unable to parse response'
    }

    // 获取响应头
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })

    // 计算响应大小
    let size = 0
    try {
      size = new Blob([JSON.stringify(data)]).size
    } catch {
      size = String(data).length
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers,
      data,
      time,
      size,
    }
  } catch (error: any) {
    const endTime = Date.now()
    const time = endTime - startTime

    return {
      status: 0,
      statusText: 'Error',
      headers: {},
      data: { 
        error: error.message || 'Unknown error',
        details: error.toString()
      },
      time,
      size: 0,
    }
  }
}

export function generateApiDoc(request: ApiRequest, response?: ApiResponse): string {
  let doc = `# API 文档\n\n`
  doc += `## 请求信息\n\n`
  doc += `**方法**: \`${request.method}\`\n\n`
  doc += `**URL**: \`${request.url}\`\n\n`

  if (Object.keys(request.params).length > 0) {
    doc += `### 查询参数\n\n`
    doc += `| 参数 | 值 |\n`
    doc += `|------|-----|\n`
    Object.entries(request.params).forEach(([key, value]) => {
      doc += `| ${key} | ${value} |\n`
    })
    doc += `\n`
  }

  if (Object.keys(request.headers).length > 0) {
    doc += `### 请求头\n\n`
    doc += `| 键 | 值 |\n`
    doc += `|------|-----|\n`
    Object.entries(request.headers).forEach(([key, value]) => {
      doc += `| ${key} | ${value} |\n`
    })
    doc += `\n`
  }

  if (request.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    doc += `### 请求体\n\n`
    doc += `\`\`\`${request.bodyType}\n`
    doc += `${request.body}\n`
    doc += `\`\`\`\n\n`
  }

  if (response) {
    doc += `## 响应信息\n\n`
    doc += `**状态码**: \`${response.status} ${response.statusText}\`\n\n`
    doc += `**响应时间**: ${response.time}ms\n\n`
    doc += `**响应大小**: ${(response.size / 1024).toFixed(2)} KB\n\n`

    if (Object.keys(response.headers).length > 0) {
      doc += `### 响应头\n\n`
      doc += `| 键 | 值 |\n`
      doc += `|------|-----|\n`
      Object.entries(response.headers).forEach(([key, value]) => {
        doc += `| ${key} | ${value} |\n`
      })
      doc += `\n`
    }

    doc += `### 响应体\n\n`
    doc += `\`\`\`json\n`
    doc += `${JSON.stringify(response.data, null, 2)}\n`
    doc += `\`\`\`\n`
  }

  return doc
}

