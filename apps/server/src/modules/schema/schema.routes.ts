import { Router } from 'express'
import { schemaController } from './schema.controller.js'
import { asyncHandler } from '../../shared/middleware.js'

const router = Router()

router.post('/', asyncHandler(schemaController.create.bind(schemaController)))
router.get('/', asyncHandler(schemaController.list.bind(schemaController)))
router.get('/:id', asyncHandler(schemaController.getById.bind(schemaController)))
router.put('/:id', asyncHandler(schemaController.update.bind(schemaController)))
router.delete('/:id', asyncHandler(schemaController.delete.bind(schemaController)))

export default router
