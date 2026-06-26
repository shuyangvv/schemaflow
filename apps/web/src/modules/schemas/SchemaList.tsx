import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { schemaApi, type SchemaListItem } from '../../shared/api/client'

export default function SchemaList() {
  const [schemas, setSchemas] = useState<SchemaListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    loadSchemas()
  }, [search])

  const loadSchemas = async () => {
    try {
      setLoading(true)
      const response = await schemaApi.list({ search: search || undefined })
      setSchemas(response.data.data)
    } catch (err) {
      setError('Failed to load schemas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this schema?')) return
    
    try {
      await schemaApi.delete(id)
      setSchemas(schemas.filter(s => s.id !== id))
    } catch (err) {
      setError('Failed to delete schema')
    }
  }

  if (loading && schemas.length === 0) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schemas</h1>
        <Link to="/schemas/new" className="btn-primary">
          + New Schema
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search schemas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input max-w-md"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Versions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schemas.map((schema) => (
              <tr key={schema.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/schemas/${schema.id}`} className="text-blue-600 hover:text-blue-900 font-medium">
                    {schema.name}
                  </Link>
                  {schema.description && (
                    <p className="text-sm text-gray-500 mt-1">{schema.description}</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {schema.currentVersionNumber ? (
                    <span className="badge-blue">v{schema.currentVersionNumber}</span>
                  ) : (
                    <span className="badge-gray">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {schema.versionCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {schema.isPublished ? (
                    <span className="badge-green">Published</span>
                  ) : (
                    <span className="badge-gray">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link to={`/schemas/${schema.id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(schema.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {schemas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No schemas found. <Link to="/schemas/new" className="text-blue-600 hover:underline">Create one</Link>
          </div>
        )}
      </div>
    </div>
  )
}
