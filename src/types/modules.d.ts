declare module 'file-saver' {
  export function saveAs(blob: Blob, filename: string): void
}

declare module 'papaparse' {
  export interface ParseResult<T> {
    data: T[]
    errors: any[]
    meta: any
  }

  export function parse<T = any>(input: string, config?: any): ParseResult<T>
  export function unparse(data: any[], config?: any): string
}

declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[]
    filename?: string
    image?: { type: string; quality: number }
    html2canvas?: { scale: number }
    jsPDF?: { unit: string; format: string; orientation: string }
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf
    from(element: HTMLElement): Html2Pdf
    save(): Promise<void>
  }

  function html2pdf(): Html2Pdf
  export default html2pdf
}

declare module 'qrcode' {
  interface QRCodeOptions {
    width?: number
    margin?: number
    color?: {
      dark?: string
      light?: string
    }
  }

  function toDataURL(text: string, options?: QRCodeOptions): Promise<string>
  const QRCode: {
    toDataURL: typeof toDataURL
  }
  export default QRCode
}

declare module 'diff' {
  export interface Change {
    value: string
    added?: boolean
    removed?: boolean
  }

  export function diffLines(oldStr: string, newStr: string): Change[]
  export function diffWords(oldStr: string, newStr: string): Change[]
  export function diffChars(oldStr: string, newStr: string): Change[]
}

declare module 'crypto-js' {
  export interface WordArray {
    toString(): string
  }

  export function MD5(text: string): WordArray
  export function SHA1(text: string): WordArray
  export function SHA256(text: string): WordArray
  export function SHA512(text: string): WordArray
}

