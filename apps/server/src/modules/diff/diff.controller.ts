import type { Request, Response } from 'express'
import { diffService } from './diff.service.js'
import { z } from 'zod'
import { AppError } from '../../shared/errors.js'

const DiffBodySchema = z.object({
  fromVersionId: z.string().uuid(),
  toVersionId: z.string().uuid(),
})

export class DiffController {
  async compare(req: Request, res: Response): Promise<void> {
    const result = DiffBodySchema.safeParse(req.body)
    if (!result.success) {
      const message = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      throw new AppError('VALIDATION_ERROR', message, 400)
    }

    const diff = await diffService.compareVersions(result.data)
    res.json(diff)
  }

  async compareByQuery(req: Request, res: Response): Promise<void> {
    const schemaId = req.params.id
    const from = parseInt(req.query.from as string, 10)
    const to = parseInt(req.query.to as string, 10)

    if (isNaN(from) || isNaN(to)) {
      throw new AppError('VALIDATION_ERROR', 'Query parameters "from" and "to" must be valid numbers', 400)
    }

    const diff = await diffService.compareByNumbers(schemaId, from, to)
    res.json(diff)
  }
}

export const diffController = new DiffController()
