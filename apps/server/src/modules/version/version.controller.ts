import type { Request, Response } from 'express'
import { versionService } from './version.service.js'
import { parseAndValidateBody } from '../schema/schema.validator.js'
import { CreateVersionBodySchema, RollbackBodySchema } from './version.types.js'

export class VersionController {
  async create(req: Request, res: Response): Promise<void> {
    const body = parseAndValidateBody(CreateVersionBodySchema, req.body)
    const version = await versionService.createVersion(req.params.schemaId, body)
    res.status(201).json(version)
  }

  async listBySchema(req: Request, res: Response): Promise<void> {
    const result = await versionService.getVersionsBySchema(req.params.schemaId)
    res.json(result)
  }

  async getById(req: Request, res: Response): Promise<void> {
    const version = await versionService.getVersion(req.params.id)
    res.json(version)
  }

  async rollback(req: Request, res: Response): Promise<void> {
    const body = parseAndValidateBody(RollbackBodySchema, req.body)
    const version = await versionService.rollback(req.params.schemaId, body)
    res.status(201).json(version)
  }
}

export const versionController = new VersionController()
