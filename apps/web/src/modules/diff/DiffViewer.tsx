import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { diffApi, versionApi } from '../../shared/api/client'
import type { DiffResult, Version } from '../../shared/api/client'

export default function DiffViewer() {
  const { id } = useParams<{ id: string }>()
  const [versions, setVersions] = useState<Version[]>([])
  const [fromVersion, setFromVersion] = useState('')
  const [toVersion, setToVersion] = useState('')
  const [diff, setDiff] = useState<DiffResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadVersions()
  }, [id])

  const loadVersions = async () => {
    if (!id) return
    
    try {
      const response = await versionApi.list(id)
      const vers = response.data.data
      setVersions(vers)
      
      if (vers.length >= 2) {
        setFromVersion(String(vers[1]?.versionNumber ?? ''))
        setToVersion(String(vers[0]?.versionNumber ?? ''))
      }
    } catch (err) {
      setError('Failed to load versions')
    }
  }

  const handleCompare = async () => {
    if (!id || !fromVersion || !toVersion) return
    
    setLoading(true)
    setError(null)

    try {
      const response = await diffApi.compareByNumbers(
        id,
        parseInt(fromVersion, 10),
        parseInt(toVersion, 10)
      )
      setDiff(response.data)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } }
      setError(error.response?.data?.error?.message || 'Failed to compare versions')
    } finally {
      setLoading(false)
    }
  }

  const getChangeTypeStyle = (type: string) => {
    switch (type) {
      case 'added': return 'text-green-600 bg-green-50'
      case 'removed': return 'text-red-600 bg-red-50'
      case 'modified': return 'text-amber-600 bg-amber-50'
      case 'type_changed': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Compare Versions</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="card flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From Version</label>
          <select
            value={fromVersion}
            onChange={(e) => setFromVersion(e.target.value)}
            className="input"
          >
            <option value="">Select...</option>
            {versions.map((v) => (
              <option key={v.id} value={v.versionNumber}>
                v{v.versionNumber} - {v.changeSummary || 'No description'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To Version</label>
          <select
            value={toVersion}
            onChange={(e) => setToVersion(e.target.value)}
            className="input"
          >
            <option value="">Select...</option>
            {versions.map((v) => (
              <option key={v.id} value={v.versionNumber}>
                v{v.versionNumber} - {v.changeSummary || 'No description'}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCompare}
          disabled={loading || !fromVersion || !toVersion}
          className="btn-primary"
        >
          {loading ? 'Comparing...' : 'Compare'}
        </button>
      </div>

      {diff && (
        <div className="card space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Diff: v{diff.fromVersion.versionNumber} → v{diff.toVersion.versionNumber}
            </h2>
            {diff.hasBreakingChanges && (
              <span className="badge bg-red-100 text-red-800">⚠️ Breaking Changes</span>
            )}
          </div>

          <div className="flex gap-4 text-sm">
            <span className="text-green-600">Added: {diff.summary.added}</span>
            <span className="text-red-600">Removed: {diff.summary.removed}</span>
            <span className="text-amber-600">Modified: {diff.summary.modified}</span>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Path</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Old Value</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">New Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {diff.changes.map((change, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm font-mono text-gray-900">{change.path}</td>
                    <td className="px-4 py-2">
                      <span className={`badge ${getChangeTypeStyle(change.type)}`}>
                        {change.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {change.oldValue !== undefined ? (
                        <pre className="text-xs bg-gray-50 p-1 rounded">
                          {JSON.stringify(change.oldValue, null, 2).slice(0, 100)}
                        </pre>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {change.newValue !== undefined ? (
                        <pre className="text-xs bg-gray-50 p-1 rounded">
                          {JSON.stringify(change.newValue, null, 2).slice(0, 100)}
                        </pre>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
