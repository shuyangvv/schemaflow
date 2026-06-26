import { z } from 'zod'

export const CreateVersionBodySchema = z.object({
  content: z.record(z.unknown()),
  changeSummary: z.string().max(500).optional(),
})

export const RollbackBodySchema = z.object({
  targetVersionId: z.string().uuid(),
  reason: z.string().max(500).optional(),
})

export type CreateVersionBody = z.infer<typeof CreateVersionBodySchema>
export type RollbackBody = z.infer<typeof RollbackBodySchema>

export interface VersionResponse {
  id: string
  schemaId: string
  versionNumber: number
  content: unknown
  hash: string
  changeSummary: string | null
  createdAt: string
}

export interface VersionListResponse {
  data: VersionResponse[]
  schema: {
    id: string
    name: string
  }
}
