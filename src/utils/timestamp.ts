// 时间戳转换工具

export function timestampToDate(timestamp: number | string, format: 'seconds' | 'milliseconds' = 'seconds'): Date {
  const ts = typeof timestamp === 'string' ? parseFloat(timestamp) : timestamp
  if (format === 'seconds') {
    return new Date(ts * 1000)
  }
  return new Date(ts)
}

export function dateToTimestamp(date: Date, format: 'seconds' | 'milliseconds' = 'seconds'): number {
  if (format === 'seconds') {
    return Math.floor(date.getTime() / 1000)
  }
  return date.getTime()
}

export function formatDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export function getCurrentTimestamp(format: 'seconds' | 'milliseconds' = 'seconds'): number {
  if (format === 'seconds') {
    return Math.floor(Date.now() / 1000)
  }
  return Date.now()
}

