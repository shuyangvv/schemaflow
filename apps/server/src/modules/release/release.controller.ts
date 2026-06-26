import type { Request, Response } from 'express'
import { releaseService } from './release.service.js'
import { parseAndValidateBody } from '../schema/schema.validator.js'
import { CreateReleaseBodySchema, UpdateReleaseBodySchema } from './release.types.js'

export class ReleaseController {
  async create(req: Request, res: Response): Promise<void> {
    const body = parseAndValidateBody(CreateReleaseBodySchema, req.body)
    const release = await releaseService.createRelease(req.params.versionId, body)
    res.status(201).json(release)
  }

  async getById(req: Request, res: Response): Promise<void> {
    const release = await releaseService.getRelease(req.params.id)
    res.json(release)
  }

  async list(req: Request, res: Response): Promise<void> {
    const releases = await releaseService.listReleases()
    res.json(releases)
  }

  async update(req: Request, res: Response): Promise<void> {
    const body = parseAndValidateBody(UpdateReleaseBodySchema, req.body)
    const release = await releaseService.updateRelease(req.params.id, body)
    res.json(release)
  }

  async delete(req: Request, res: Response): Promise<void> {
    await releaseService.deleteRelease(req.params.id)
    res.status(204).send()
  }
}

export const releaseController = new ReleaseController()
