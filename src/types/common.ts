export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  route: string
  color: string
}

export interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  time: number
}

export interface FormField {
  id: string
  type: 'text' | 'number' | 'email' | 'date' | 'select' | 'multiselect' | 'file'
  label: string
  required: boolean
  placeholder?: string
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export interface SqlCondition {
  field: string
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'IN'
  value: string
  logic?: 'AND' | 'OR'
}

