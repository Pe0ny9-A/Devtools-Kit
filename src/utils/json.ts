export function formatJson(json: string): string {
  try {
    const parsed = JSON.parse(json)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    throw new Error('Invalid JSON format')
  }
}

export function validateJson(json: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(json)
    return { valid: true }
  } catch (error: any) {
    return { valid: false, error: error.message }
  }
}

export function minifyJson(json: string): string {
  try {
    const parsed = JSON.parse(json)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error('Invalid JSON format')
  }
}

