import { Router } from 'express'
import { versionController } from './version.controller.js'
import { asyncHandler } from '../../shared/middleware.js'

const router = Router()

// Nested under schemas
router.post('/schemas/:schemaId/versions', asyncHandler(versionController.create.bind(versionController)))
router.get('/schemas/:schemaId/versions', asyncHandler(versionController.listBySchema.bind(versionController)))
router.post('/schemas/:schemaId/rollback', asyncHandler(versionController.rollback.bind(versionController)))

// Direct access
router.get('/versions/:id', asyncHandler(versionController.getById.bind(versionController)))

export default router
