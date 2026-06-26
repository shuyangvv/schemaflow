import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { schemaApi, versionApi } from '../../shared/api/client'

export default function VersionCreate() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [schemaName, setSchemaName] = useState('')
  const [form, setForm] = useState({
    content: '',
    changeSummary: '',
  })

  useEffect(() => {
    loadSchema()
  }, [id])

  const loadSchema = async () => {
    if (!id) return
    
    try {
      const response = await schemaApi.get(id)
      setSchemaName(response.data.name)
      const currentContent = response.data.currentVersion?.content
      setForm(prev => ({
        ...prev,
        content: JSON.stringify(currentContent ?? { type: 'object', properties: {} }, null, 2),
      }))
    } catch (err) {
      setError('Failed to load schema')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return
    
    setSaving(true)
    setError(null)

    try {
      let content: Record<string, unknown>
      try {
        content = JSON.parse(form.content)
      } catch {
        throw new Error('Invalid JSON in content field')
      }

      await versionApi.create(id, {
        content,
        changeSummary: form.changeSummary || undefined,
      })

      navigate(`/schemas/${id}`)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } }; message?: string }
      setError(error.response?.data?.error?.message || error.message || 'Failed to create version')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Version</h1>
      <p className="text-gray-600 mb-6">Schema: {schemaName}</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            JSON Schema Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={20}
            className="textarea"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Change Summary</label>
          <input
            type="text"
            value={form.changeSummary}
            onChange={(e) => setForm({ ...form, changeSummary: e.target.value })}
            placeholder="Brief description of changes (optional)"
            className="input"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Creating...' : 'Create Version'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/schemas/${id}`)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
