import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types matching server responses
export interface Schema {
  id: string
  name: string
  description: string | null
  isPublished: boolean
  currentVersion: Version | null
  createdAt: string
  updatedAt: string
}

export interface SchemaListItem {
  id: string
  name: string
  description: string | null
  isPublished: boolean
  currentVersionNumber: number | null
  versionCount: number
  createdAt: string
  updatedAt: string
}

export interface Version {
  id: string
  schemaId: string
  versionNumber: number
  content: Record<string, unknown>
  hash: string
  changeSummary: string | null
  createdAt: string
}

export interface Release {
  id: string
  versionId: string
  name: string
  description: string | null
  isActive: boolean
  releasedAt: string
}

export interface DiffResult {
  fromVersion: { id: string; versionNumber: number }
  toVersion: { id: string; versionNumber: number }
  hasBreakingChanges: boolean
  changes: Array<{
    path: string
    type: 'added' | 'removed' | 'modified' | 'type_changed'
    oldValue?: unknown
    newValue?: unknown
  }>
  summary: { added: number; removed: number; modified: number }
}

// Schema API
export const schemaApi = {
  list: (params?: { search?: string; page?: number; limit?: number }) =>
    api.get<{ data: SchemaListItem[]; pagination: { page: number; limit: number; total: number; totalPages: number } }>('/schemas', { params }),
  
  get: (id: string) => api.get<Schema>(`/schemas/${id}`),
  
  create: (data: { name: string; description?: string; content: Record<string, unknown> }) =>
    api.post<Schema>('/schemas', data),
  
  update: (id: string, data: { name?: string; description?: string }) =>
    api.put<Schema>(`/schemas/${id}`, data),
  
  delete: (id: string) => api.delete(`/schemas/${id}`),
}

// Version API
export const versionApi = {
  list: (schemaId: string) =>
    api.get<{ data: Version[]; schema: { id: string; name: string } }>(`/schemas/${schemaId}/versions`),
  
  get: (id: string) => api.get<Version>(`/versions/${id}`),
  
  create: (schemaId: string, data: { content: Record<string, unknown>; changeSummary?: string }) =>
    api.post<Version>(`/schemas/${schemaId}/versions`, data),
  
  rollback: (schemaId: string, data: { targetVersionId: string; reason?: string }) =>
    api.post<Version>(`/schemas/${schemaId}/rollback`, data),
}

// Diff API
export const diffApi = {
  compare: (fromVersionId: string, toVersionId: string) =>
    api.post<DiffResult>('/diff', { fromVersionId, toVersionId }),
  
  compareByNumbers: (schemaId: string, from: number, to: number) =>
    api.get<DiffResult>(`/schemas/${schemaId}/diff`, { params: { from, to } }),
}

// Release API
export const releaseApi = {
  list: () => api.get<{ data: Array<Release & { version: { id: string; versionNumber: number; schema: { id: string; name: string } } }> }>('/releases'),
  
  get: (id: string) => api.get<Release>(`/releases/${id}`),
  
  create: (versionId: string, data: { name: string; description?: string }) =>
    api.post<Release>(`/versions/${versionId}/releases`, data),
  
  update: (id: string, data: { name?: string; description?: string; isActive?: boolean }) =>
    api.put<Release>(`/releases/${id}`, data),
  
  delete: (id: string) => api.delete(`/releases/${id}`),
}
