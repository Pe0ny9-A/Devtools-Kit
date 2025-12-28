export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'
  url: string
  headers: Record<string, string>
  params: Record<string, string>
  body: string
  bodyType: 'json' | 'form-data' | 'raw'
}

export interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  time: number
  size: number
}

export interface ApiHistory {
  id: string
  timestamp: number
  request: ApiRequest
  response?: ApiResponse
}

