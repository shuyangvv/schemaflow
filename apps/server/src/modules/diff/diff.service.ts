import { versionRepository } from '../version/version.repository.js'
import { schemaRepository } from '../schema/schema.repository.js'
import { Errors } from '../../shared/errors.js'
import type { DiffRequest, DiffResponse, DiffChange } from './diff.types.js'

export class DiffService {
  async compareVersions(body: DiffRequest): Promise<DiffResponse> {
    const fromVersion = await versionRepository.findById(body.fromVersionId)
    const toVersion = await versionRepository.findById(body.toVersionId)

    if (!fromVersion) {
      throw Errors.VERSION_NOT_FOUND(body.fromVersionId)
    }
    if (!toVersion) {
      throw Errors.VERSION_NOT_FOUND(body.toVersionId)
    }

    if (fromVersion.schemaId !== toVersion.schemaId) {
      throw Errors.DIFF_VERSIONS_INCOMPATIBLE()
    }

    const fromContent = JSON.parse(fromVersion.content) as Record<string, unknown>
    const toContent = JSON.parse(toVersion.content) as Record<string, unknown>

    const changes = this.calculateDiff(fromContent, toContent)

    return {
      fromVersion: {
        id: fromVersion.id,
        versionNumber: fromVersion.versionNumber,
      },
      toVersion: {
        id: toVersion.id,
        versionNumber: toVersion.versionNumber,
      },
      hasBreakingChanges: this.detectBreakingChanges(changes),
      changes,
      summary: this.summarizeChanges(changes),
    }
  }

  async compareByNumbers(schemaId: string, from: number, to: number): Promise<DiffResponse> {
    const schema = await schemaRepository.findById(schemaId)
    if (!schema) {
      throw Errors.SCHEMA_NOT_FOUND(schemaId)
    }

    const fromVersion = await versionRepository.findBySchemaAndNumber(schemaId, from)
    const toVersion = await versionRepository.findBySchemaAndNumber(schemaId, to)

    if (!fromVersion) {
      throw Errors.INVALID_VERSION_NUMBER(schemaId, from)
    }
    if (!toVersion) {
      throw Errors.INVALID_VERSION_NUMBER(schemaId, to)
    }

    return this.compareVersions({
      fromVersionId: fromVersion.id,
      toVersionId: toVersion.id,
    })
  }

  private calculateDiff(from: unknown, to: unknown, path = ''): DiffChange[] {
    const changes: DiffChange[] = []

    if (typeof from !== typeof to) {
      changes.push({
        path: path || 'root',
        type: 'type_changed',
        oldValue: from,
        newValue: to,
      })
      return changes
    }

    if (typeof from !== 'object' || from === null || to === null) {
      if (from !== to) {
        changes.push({
          path: path || 'root',
          type: 'modified',
          oldValue: from,
          newValue: to,
        })
      }
      return changes
    }

    if (Array.isArray(from) && Array.isArray(to)) {
      const maxLen = Math.max(from.length, to.length)
      for (let i = 0; i < maxLen; i++) {
        const itemPath = `${path}[${i}]`
        if (i >= from.length) {
          changes.push({ path: itemPath, type: 'added', newValue: to[i] })
        } else if (i >= to.length) {
          changes.push({ path: itemPath, type: 'removed', oldValue: from[i] })
        } else {
          changes.push(...this.calculateDiff(from[i], to[i], itemPath))
        }
      }
      return changes
    }

    const fromObj = from as Record<string, unknown>
    const toObj = to as Record<string, unknown>
    const allKeys = new Set([...Object.keys(fromObj), ...Object.keys(toObj)])

    for (const key of allKeys) {
      const keyPath = path ? `${path}.${key}` : key
      if (!(key in fromObj)) {
        changes.push({ path: keyPath, type: 'added', newValue: toObj[key] })
      } else if (!(key in toObj)) {
        changes.push({ path: keyPath, type: 'removed', oldValue: fromObj[key] })
      } else {
        changes.push(...this.calculateDiff(fromObj[key], toObj[key], keyPath))
      }
    }

    return changes
  }

  private detectBreakingChanges(changes: DiffChange[]): boolean {
    // Breaking changes include:
    // - Removing required fields
    // - Changing field types
    // - Adding new required fields
    for (const change of changes) {
      if (change.type === 'removed') {
        // Check if it's a required field removal
        if (change.path.includes('required')) return true
      }
      if (change.type === 'type_changed') {
        return true
      }
      if (change.type === 'added' && change.path.includes('required')) {
        // Adding required fields is breaking
        const requiredValue = change.newValue
        if (Array.isArray(requiredValue) && requiredValue.length > 0) {
          return true
        }
      }
    }
    return false
  }

  private summarizeChanges(changes: DiffChange[]) {
    return {
      added: changes.filter(c => c.type === 'added').length,
      removed: changes.filter(c => c.type === 'removed').length,
      modified: changes.filter(c => c.type === 'modified' || c.type === 'type_changed').length,
    }
  }
}

export const diffService = new DiffService()
