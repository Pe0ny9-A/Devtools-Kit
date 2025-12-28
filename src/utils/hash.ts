// 哈希生成器
import CryptoJS from 'crypto-js'

export function generateMD5(text: string): string {
  return CryptoJS.MD5(text).toString()
}

export function generateSHA1(text: string): string {
  return CryptoJS.SHA1(text).toString()
}

export function generateSHA256(text: string): string {
  return CryptoJS.SHA256(text).toString()
}

export function generateSHA512(text: string): string {
  return CryptoJS.SHA512(text).toString()
}

export function generateHash(text: string, algorithm: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512'): string {
  switch (algorithm) {
    case 'MD5':
      return generateMD5(text)
    case 'SHA1':
      return generateSHA1(text)
    case 'SHA256':
      return generateSHA256(text)
    case 'SHA512':
      return generateSHA512(text)
    default:
      return generateSHA256(text)
  }
}

