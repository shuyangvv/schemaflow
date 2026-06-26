import type { Request, Response } from 'express'
import { schemaService } from './schema.service.js'
import { parseAndValidateBody } from './schema.validator.js'
import { CreateSchemaBodySchema, UpdateSchemaBodySchema, ListSchemasQuerySchema } from './schema.types.js'

export class SchemaController {
  async create(req: Request, res: Response): Promise<void> {
    const body = parseAndValidateBody(CreateSchemaBodySchema, req.body)
    const schema = await schemaService.createSchema(body)
    res.status(201).json(schema)
  }

  async getById(req: Request, res: Response): Promise<void> {
    const schema = await schemaService.getSchema(req.params.id)
    res.json(schema)
  }

  async list(req: Request, res: Response): Promise<void> {
    const query = ListSchemasQuerySchema.parse(req.query)
    const result = await schemaService.listSchemas(query.search, query.page, query.limit)
    res.json(result)
  }

  async update(req: Request, res: Response): Promise<void> {
    const body = parseAndValidateBody(UpdateSchemaBodySchema, req.body)
    const schema = await schemaService.updateSchema(req.params.id, body)
    res.json(schema)
  }

  async delete(req: Request, res: Response): Promise<void> {
    await schemaService.deleteSchema(req.params.id)
    res.status(204).send()
  }
}

export const schemaController = new SchemaController()
