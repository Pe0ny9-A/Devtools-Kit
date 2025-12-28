export interface RegexMatch {
  match: string
  index: number
  groups: string[]
  fullMatch: string
}

export interface RegexResult {
  matches: RegexMatch[]
  isValid: boolean
  error?: string
}

export function testRegex(pattern: string, flags: string, testString: string): RegexResult {
  try {
    const regex = new RegExp(pattern, flags)
    const matches: RegexMatch[] = []
    let match

    // 全局匹配
    if (flags.includes('g')) {
      const globalRegex = new RegExp(pattern, flags)
      while ((match = globalRegex.exec(testString)) !== null) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match[0],
        })
        // 防止无限循环
        if (match.index === globalRegex.lastIndex) {
          globalRegex.lastIndex++
        }
      }
    } else {
      // 单次匹配
      match = regex.exec(testString)
      if (match) {
        matches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match[0],
        })
      }
    }

    return {
      matches,
      isValid: true,
    }
  } catch (error: any) {
    return {
      matches: [],
      isValid: false,
      error: error.message,
    }
  }
}

export function replaceWithRegex(
  pattern: string,
  flags: string,
  testString: string,
  replacement: string
): string {
  try {
    const regex = new RegExp(pattern, flags)
    return testString.replace(regex, replacement)
  } catch (error) {
    return testString
  }
}

export function explainRegex(pattern: string): string {
  // 简单的正则表达式解释
  const explanations: Record<string, string> = {
    '^': '匹配字符串开始',
    '$': '匹配字符串结束',
    '.': '匹配任意字符（除换行符）',
    '*': '匹配前面的字符0次或多次',
    '+': '匹配前面的字符1次或多次',
    '?': '匹配前面的字符0次或1次',
    '\\d': '匹配数字',
    '\\w': '匹配字母、数字、下划线',
    '\\s': '匹配空白字符',
    '[]': '字符类，匹配方括号内的任意字符',
    '()': '捕获组',
    '|': '或运算符',
  }

  let explanation = '正则表达式说明：\n\n'
  explanation += `模式: ${pattern}\n\n`

  // 添加基本说明
  for (const [key, value] of Object.entries(explanations)) {
    if (pattern.includes(key)) {
      explanation += `- ${key}: ${value}\n`
    }
  }

  return explanation
}

