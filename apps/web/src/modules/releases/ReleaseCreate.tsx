import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { versionApi, releaseApi } from '../../shared/api/client'

interface VersionInfo {
  versionNumber: number
  schema: { id: string; name: string }
}

export default function ReleaseCreate() {
  const { versionId } = useParams<{ versionId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null)
  const [form, setForm] = useState({
    name: '',
    description: '',
  })

  useEffect(() => {
    loadVersion()
  }, [versionId])

  const loadVersion = async () => {
    if (!versionId) return
    
    try {
      const response = await versionApi.get(versionId)
      const version = response.data
      setVersionInfo({
        versionNumber: version.versionNumber,
        schema: { id: version.schemaId, name: '' }, // Schema name loaded separately
      })
    } catch (err) {
      setError('Failed to load version')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!versionId) return
    
    setSaving(true)
    setError(null)

    try {
      await releaseApi.create(versionId, {
        name: form.name,
        description: form.description || undefined,
      })

      navigate('/releases')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } }
      setError(error.response?.data?.error?.message || 'Failed to create release')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Release</h1>
      <p className="text-gray-600 mb-6">
        Schema: {versionInfo?.schema.name} | Version: v{versionInfo?.versionNumber}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Release Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="v1.0, production, stable, etc."
            className="input"
            required
            pattern="[a-z0-9-._]+"
            title="Lowercase letters, numbers, hyphens, dots, or underscores"
          />
          <p className="text-sm text-gray-500 mt-1">
            Use lowercase letters, numbers, hyphens, dots, or underscores
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description of this release (optional)"
            className="input"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Creating...' : 'Create Release'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
