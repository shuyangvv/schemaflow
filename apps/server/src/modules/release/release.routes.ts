import { Router } from 'express'
import { releaseController } from './release.controller.js'
import { asyncHandler } from '../../shared/middleware.js'

const router = Router()

// Nested under versions
router.post('/versions/:versionId/releases', asyncHandler(releaseController.create.bind(releaseController)))

// Direct access
router.get('/releases', asyncHandler(releaseController.list.bind(releaseController)))
router.get('/releases/:id', asyncHandler(releaseController.getById.bind(releaseController)))
router.put('/releases/:id', asyncHandler(releaseController.update.bind(releaseController)))
router.delete('/releases/:id', asyncHandler(releaseController.delete.bind(releaseController)))

export default router
