import express from 'express'
import cors from 'cors'
import { errorHandler } from './shared/middleware.js'
import schemaRoutes from './modules/schema/schema.routes.js'
import versionRoutes from './modules/version/version.routes.js'
import diffRoutes from './modules/diff/diff.routes.js'
import releaseRoutes from './modules/release/release.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

// API Routes
app.use('/api', schemaRoutes)
app.use('/api', versionRoutes)
app.use('/api', diffRoutes)
app.use('/api', releaseRoutes)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling
app.use(errorHandler)

export default app
