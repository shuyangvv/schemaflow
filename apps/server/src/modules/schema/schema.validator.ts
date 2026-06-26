import { z } from 'zod'
import { AppError } from '../../shared/errors.js'
import type { SchemaContent } from './schema.types.js'

export function validateJsonSchema(content: SchemaContent): void {
  if (typeof content !== 'object' || content === null) {
    throw new AppError('INVALID_JSON_SCHEMA', 'Schema content must be an object', 400)
  }

  if (!content.type && !content.properties && !content.$schema) {
    throw new AppError(
      'INVALID_JSON_SCHEMA',
      'Schema must have at least one of: type, properties, or $schema',
      400
    )
  }

  try {
    JSON.stringify(content)
  } catch {
    throw new AppError('INVALID_JSON_SCHEMA', 'Schema content must be serializable to JSON', 400)
  }
}

export function parseAndValidateBody<T>(schema: z.ZodSchema<T>, body: unknown): T {
  const result = schema.safeParse(body)
  if (!result.success) {
    const message = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
    throw new AppError('VALIDATION_ERROR', message, 400)
  }
  return result.data
}
