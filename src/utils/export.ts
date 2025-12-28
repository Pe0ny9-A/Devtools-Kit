import { saveAs } from 'file-saver'

export function exportToFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  saveAs(blob, filename)
}

export function exportJson(json: string, filename = 'data.json') {
  exportToFile(json, filename, 'application/json')
}

export function exportCsv(csv: string, filename = 'data.csv') {
  exportToFile(csv, filename, 'text/csv')
}

export function exportText(text: string, filename: string) {
  exportToFile(text, filename, 'text/plain')
}

