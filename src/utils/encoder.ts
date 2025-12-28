// Base64 编码/解码
export function encodeBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)))
  } catch (error) {
    throw new Error('Base64编码失败')
  }
}

export function decodeBase64(base64: string): string {
  try {
    return decodeURIComponent(escape(atob(base64)))
  } catch (error) {
    throw new Error('Base64解码失败：无效的Base64字符串')
  }
}

// URL 编码/解码
export function encodeURL(text: string): string {
  return encodeURIComponent(text)
}

export function decodeURL(encoded: string): string {
  try {
    return decodeURIComponent(encoded)
  } catch (error) {
    throw new Error('URL解码失败：无效的URL编码字符串')
  }
}

