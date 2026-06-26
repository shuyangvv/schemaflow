import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { releaseApi, type Release } from '../../shared/api/client'

interface ReleaseWithVersion extends Release {
  version: {
    id: string
    versionNumber: number
    schema: {
      id: string
      name: string
    }
  }
}

export default function ReleaseList() {
  const [releases, setReleases] = useState<ReleaseWithVersion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadReleases()
  }, [])

  const loadReleases = async () => {
    try {
      const response = await releaseApi.list()
      setReleases(response.data.data)
    } catch (err) {
      setError('Failed to load releases')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (release: ReleaseWithVersion) => {
    try {
      await releaseApi.update(release.id, { isActive: !release.isActive })
      loadReleases()
    } catch (err) {
      setError('Failed to update release')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this release?')) return
    
    try {
      await releaseApi.delete(id)
      setReleases(releases.filter(r => r.id !== id))
    } catch (err) {
      setError('Failed to delete release')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Releases</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schema</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Released At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {releases.map((release) => (
              <tr key={release.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{release.name}</span>
                  {release.description && (
                    <p className="text-sm text-gray-500 mt-1">{release.description}</p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/schemas/${release.version.schema.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {release.version.schema.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="badge-blue">v{release.version.versionNumber}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {release.isActive ? (
                    <span className="badge-green">Active</span>
                  ) : (
                    <span className="badge-gray">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(release.releasedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleToggleActive(release)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    {release.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(release.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {releases.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No releases yet. Create one from a schema version.
          </div>
        )}
      </div>
    </div>
  )
}
