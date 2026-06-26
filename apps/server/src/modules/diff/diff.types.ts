export interface DiffRequest {
  fromVersionId: string
  toVersionId: string
}

export interface DiffChange {
  path: string
  type: 'added' | 'removed' | 'modified' | 'type_changed'
  oldValue?: unknown
  newValue?: unknown
}

export interface DiffSummary {
  added: number
  removed: number
  modified: number
}

export interface DiffResponse {
  fromVersion: {
    id: string
    versionNumber: number
  }
  toVersion: {
    id: string
    versionNumber: number
  }
  hasBreakingChanges: boolean
  changes: DiffChange[]
  summary: DiffSummary
}
