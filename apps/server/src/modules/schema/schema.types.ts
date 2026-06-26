import { z } from 'zod'

export const SchemaContentSchema = z.record(z.unknown())

export const CreateSchemaBodySchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Name must be lowercase alphanumeric with hyphens'),
  description: z.string().max(500).optional(),
  content: SchemaContentSchema,
})

export const UpdateSchemaBodySchema = z.object({
  name: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().max(500).optional(),
})

export const ListSchemasQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
})

export type CreateSchemaBody = z.infer<typeof CreateSchemaBodySchema>
export type UpdateSchemaBody = z.infer<typeof UpdateSchemaBodySchema>
export type ListSchemasQuery = z.infer<typeof ListSchemasQuerySchema>
export type SchemaContent = z.infer<typeof SchemaContentSchema>

export interface SchemaResponse {
  id: string
  name: string
  description: string | null
  isPublished: boolean
  currentVersion: {
    id: string
    versionNumber: number
    content: unknown
    hash: string
    createdAt: string
  } | null
  createdAt: string
  updatedAt: string
}

export interface SchemaListResponse {
  data: Array<{
    id: string
    name: string
    description: string | null
    isPublished: boolean
    currentVersionNumber: number | null
    versionCount: number
    createdAt: string
    updatedAt: string
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
