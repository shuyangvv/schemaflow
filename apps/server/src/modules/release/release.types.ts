import { z } from 'zod'

export const CreateReleaseBodySchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-z0-9-._]+$/, 'Name must be lowercase alphanumeric with hyphens, dots, or underscores'),
  description: z.string().max(500).optional(),
})

export const UpdateReleaseBodySchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-z0-9-._]+$/).optional(),
  description: z.string().max(500).optional(),
  isActive: z.boolean().optional(),
})

export type CreateReleaseBody = z.infer<typeof CreateReleaseBodySchema>
export type UpdateReleaseBody = z.infer<typeof UpdateReleaseBodySchema>

export interface ReleaseResponse {
  id: string
  versionId: string
  name: string
  description: string | null
  isActive: boolean
  releasedAt: string
}

export interface ReleaseListResponse {
  data: Array<{
    id: string
    name: string
    description: string | null
    isActive: boolean
    releasedAt: string
    version: {
      id: string
      versionNumber: number
      schema: {
        id: string
        name: string
      }
    }
  }>
}
