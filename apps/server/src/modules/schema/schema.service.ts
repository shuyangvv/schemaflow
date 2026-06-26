import { schemaRepository } from './schema.repository.js'
import { Errors } from '../../shared/errors.js'
import { validateJsonSchema } from './schema.validator.js'
import { computeHash } from '../../shared/hash.js'
import { prisma } from '../../shared/database.js'
import type { CreateSchemaBody, UpdateSchemaBody, SchemaResponse, SchemaListResponse } from './schema.types.js'

export class SchemaService {
  async createSchema(body: CreateSchemaBody): Promise<SchemaResponse> {
    const existing = await schemaRepository.findByName(body.name)
    if (existing) {
      throw Errors.DUPLICATE_SCHEMA_NAME(body.name)
    }

    validateJsonSchema(body.content)

    const contentStr = JSON.stringify(body.content)
    const hash = computeHash(contentStr)

    const result = await prisma.$transaction(async (tx) => {
      const schema = await tx.schema.create({
        data: {
          name: body.name,
          description: body.description,
        },
      })

      const version = await tx.version.create({
        data: {
          schemaId: schema.id,
          versionNumber: 1,
          content: contentStr,
          hash,
          changeSummary: 'Initial version',
        },
      })

      await tx.schema.update({
        where: { id: schema.id },
        data: { currentVersionId: version.id },
      })

      return { schema, version }
    })

    return this.toSchemaResponse(result.schema, result.version)
  }

  async getSchema(id: string): Promise<SchemaResponse> {
    const schema = await schemaRepository.findById(id)
    if (!schema) {
      throw Errors.SCHEMA_NOT_FOUND(id)
    }

    return this.toSchemaResponse(schema, schema.currentVersion)
  }

  async listSchemas(search: string | undefined, page: number, limit: number): Promise<SchemaListResponse> {
    const skip = (page - 1) * limit
    const { schemas, total } = await schemaRepository.findMany({ search, skip, take: limit })

    return {
      data: schemas.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description,
        isPublished: s.isPublished,
        currentVersionNumber: s.currentVersion?.versionNumber ?? null,
        versionCount: s._count.versions,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async updateSchema(id: string, body: UpdateSchemaBody): Promise<SchemaResponse> {
    const schema = await schemaRepository.findById(id)
    if (!schema) {
      throw Errors.SCHEMA_NOT_FOUND(id)
    }

    if (body.name && body.name !== schema.name) {
      const existing = await schemaRepository.findByName(body.name)
      if (existing) {
        throw Errors.DUPLICATE_SCHEMA_NAME(body.name)
      }
    }

    const updated = await schemaRepository.update(id, {
      name: body.name,
      description: body.description,
    })

    return this.toSchemaResponse(updated, schema.currentVersion)
  }

  async deleteSchema(id: string): Promise<void> {
    const schema = await schemaRepository.findById(id)
    if (!schema) {
      throw Errors.SCHEMA_NOT_FOUND(id)
    }

    await schemaRepository.delete(id)
  }

  private toSchemaResponse(schema: { id: string; name: string; description: string | null; isPublished: boolean; createdAt: Date; updatedAt: Date }, version: { id: string; versionNumber: number; content: string; hash: string; createdAt: Date } | null): SchemaResponse {
    return {
      id: schema.id,
      name: schema.name,
      description: schema.description,
      isPublished: schema.isPublished,
      currentVersion: version ? {
        id: version.id,
        versionNumber: version.versionNumber,
        content: JSON.parse(version.content),
        hash: version.hash,
        createdAt: version.createdAt.toISOString(),
      } : null,
      createdAt: schema.createdAt.toISOString(),
      updatedAt: schema.updatedAt.toISOString(),
    }
  }
}

export const schemaService = new SchemaService()
