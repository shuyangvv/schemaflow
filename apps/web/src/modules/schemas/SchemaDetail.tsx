import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { schemaApi, versionApi, type Schema, type Version } from '../../shared/api/client'

export default function SchemaDetail() {
  const { id } = useParams<{ id: string }>()
  const [schema, setSchema] = useState<Schema | null>(null)
  const [versions, setVersions] = useState<Version[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      const [schemaRes, versionsRes] = await Promise.all([
        schemaApi.get(id),
        versionApi.list(id),
      ])
      setSchema(schemaRes.data)
      setVersions(versionsRes.data.data)
    } catch (err) {
      setError('Failed to load schema')
    } finally {
      setLoading(false)
    }
  }

  const handleRollback = async (versionId: string) => {
    if (!id || !confirm('Are you sure you want to rollback to this version?')) return
    
    try {
      const reason = prompt('Enter rollback reason (optional):') || undefined
      await versionApi.rollback(id, { targetVersionId: versionId, reason })
      loadData()
    } catch (err) {
      setError('Failed to rollback')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!schema) {
    return <div className="text-center py-8 text-red-600">Schema not found</div>
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{schema.name}</h1>
          {schema.description && (
            <p className="text-gray-600 mt-1">{schema.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>ID: {schema.id}</span>
            <span>Created: {new Date(schema.createdAt).toLocaleDateString()}</span>
            {schema.isPublished && <span className="badge-green">Published</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/schemas/${id}/edit`} className="btn-secondary">
            Edit
          </Link>
          <Link to={`/schemas/${id}/versions/new`} className="btn-primary">
            + New Version
          </Link>
        </div>
      </div>

      {/* Current Version */}
      {schema.currentVersion && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Current Version (v{schema.currentVersion.versionNumber})
          </h2>
          <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-sm">
            {JSON.stringify(schema.currentVersion.content, null, 2)}
          </pre>
          <div className="mt-4 flex gap-4 text-sm text-gray-500">
            <span>Hash: {schema.currentVersion.hash}</span>
            <span>Created: {new Date(schema.currentVersion.createdAt).toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Version History */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Version History</h2>
          <Link to={`/schemas/${id}/diff`} className="text-sm text-blue-600 hover:underline">
            Compare Versions
          </Link>
        </div>

        <div className="space-y-4">
          {versions.map((version) => (
            <div
              key={version.id}
              className={`border rounded-lg p-4 ${
                version.id === schema.currentVersion?.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      Version {version.versionNumber}
                    </span>
                    {version.id === schema.currentVersion?.id && (
                      <span className="badge-blue">Current</span>
                    )}
                  </div>
                  {version.changeSummary && (
                    <p className="text-sm text-gray-600 mt-1">{version.changeSummary}</p>
                  )}
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Hash: {version.hash}</span>
                    <span>{new Date(version.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {version.id !== schema.currentVersion?.id && (
                    <button
                      onClick={() => handleRollback(version.id)}
                      className="text-sm text-amber-600 hover:text-amber-800"
                    >
                      Rollback
                    </button>
                  )}
                  <Link
                    to={`/versions/${version.id}/releases/new`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Release
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {versions.length === 0 && (
          <p className="text-gray-500 text-center py-4">No versions yet</p>
        )}
      </div>
    </div>
  )
}
