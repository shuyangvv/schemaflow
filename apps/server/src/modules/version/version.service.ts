import { versionRepository } from './version.repository.js'
import { schemaRepository } from '../schema/schema.repository.js'
import { Errors } from '../../shared/errors.js'
import { validateJsonSchema } from '../schema/schema.validator.js'
import { computeHash } from '../../shared/hash.js'
import { prisma } from '../../shared/database.js'
import type { CreateVersionBody, VersionResponse, VersionListResponse, RollbackBody } from './version.types.js'

export class VersionService {
  async createVersion(schemaId: string, body: CreateVersionBody): Promise<VersionResponse> {
    const schema = await schemaRepository.findById(schemaId)
    if (!schema) {
      throw Errors.SCHEMA_NOT_FOUND(schemaId)
    }

    validateJsonSchema(body.content)

    const contentStr = JSON.stringify(body.content)
    const hash = computeHash(contentStr)

    const versionNumber = await versionRepository.getNextVersionNumber(schemaId)

    const version = await prisma.$transaction(async (tx) => {
      const v = await tx.version.create({
        data: {
          schemaId,
          versionNumber,
          content: contentStr,
          hash,
          changeSummary: body.changeSummary ?? `Version ${versionNumber}`,
        },
      })

      await tx.schema.update({
        where: { id: schemaId },
        data: { currentVersionId: v.id },
      })

      return v
    })

    return this.toVersionResponse(version)
  }

  async getVersionsBySchema(schemaId: string): Promise<VersionListResponse> {
    const schema = await schemaRepository.findById(schemaId)
    if (!schema) {
      throw Errors.SCHEMA_NOT_FOUND(schemaId)
    }

    const versions = await versionRepository.findBySchemaId(schemaId)

    return {
      data: versions.map(v => this.toVersionResponse(v)),
      schema: {
        id: schema.id,
        name: schema.name,
      },
    }
  }

  async getVersion(id: string): Promise<VersionResponse> {
    const version = await versionRepository.findById(id)
    if (!version) {
      throw Errors.VERSION_NOT_FOUND(id)
    }

    return this.toVersionResponse(version)
  }

  async rollback(schemaId: string, body: RollbackBody): Promise<VersionResponse> {
    const schema = await schemaRepository.findById(schemaId)
    if (!schema) {
      throw Errors.SCHEMA_NOT_FOUND(schemaId)
    }

    const targetVersion = await versionRepository.findById(body.targetVersionId)
    if (!targetVersion || targetVersion.schemaId !== schemaId) {
      throw Errors.VERSION_NOT_FOUND(body.targetVersionId)
    }

    const contentStr = targetVersion.content
    const hash = targetVersion.hash
    const versionNumber = await versionRepository.getNextVersionNumber(schemaId)

    const changeSummary = body.reason 
      ? `Rollback: ${body.reason}`
      : `Rollback to version ${targetVersion.versionNumber}`

    const version = await prisma.$transaction(async (tx) => {
      const v = await tx.version.create({
        data: {
          schemaId,
          versionNumber,
          content: contentStr,
          hash,
          changeSummary,
        },
      })

      await tx.schema.update({
        where: { id: schemaId },
        data: { currentVersionId: v.id },
      })

      return v
    })

    return this.toVersionResponse(version)
  }

  private toVersionResponse(version: { id: string; schemaId: string; versionNumber: number; content: string; hash: string; changeSummary: string | null; createdAt: Date }): VersionResponse {
    return {
      id: version.id,
      schemaId: version.schemaId,
      versionNumber: version.versionNumber,
      content: JSON.parse(version.content),
      hash: version.hash,
      changeSummary: version.changeSummary,
      createdAt: version.createdAt.toISOString(),
    }
  }
}

export const versionService = new VersionService()
