import { Router } from 'express'
import { diffController } from './diff.controller.js'
import { asyncHandler } from '../../shared/middleware.js'

const router = Router()

router.post('/diff', asyncHandler(diffController.compare.bind(diffController)))
router.get('/schemas/:id/diff', asyncHandler(diffController.compareByQuery.bind(diffController)))

export default router
