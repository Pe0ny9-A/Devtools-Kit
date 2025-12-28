// 文本差异对比工具
import { diffLines, diffWords, diffChars, Change } from 'diff'

export interface DiffResult {
  value: string
  added?: boolean
  removed?: boolean
}

export function diffText(
  oldText: string,
  newText: string,
  mode: 'lines' | 'words' | 'chars' = 'lines'
): DiffResult[] {
  let diff: Change[]
  
  switch (mode) {
    case 'lines':
      diff = diffLines(oldText, newText)
      break
    case 'words':
      diff = diffWords(oldText, newText)
      break
    case 'chars':
      diff = diffChars(oldText, newText)
      break
    default:
      diff = diffLines(oldText, newText)
  }

  return diff.map((part) => ({
    value: part.value,
    added: part.added || false,
    removed: part.removed || false,
  }))
}

