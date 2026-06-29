export interface BackendResponse<T> {
  code: number
  isSuccess: boolean
  data: T
  customMessage: string | null
  errors: any
  traceId: string | null
  message: string
}

export class ApiError extends Error {
  readonly code: number
  readonly errors: any
  readonly traceId: string | null

  constructor(response: BackendResponse<unknown>) {
    super(response.customMessage || response.message || 'API request failed')
    this.name = 'ApiError'
    this.code = response.code
    this.errors = response.errors
    this.traceId = response.traceId
  }
}
