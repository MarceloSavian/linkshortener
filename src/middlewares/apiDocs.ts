import * as express from 'express'

const router = express.Router()

import swaggerUi from 'swagger-ui-express'
import Config from '../config/Config'

router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(Config.getInstace().settings.swagger)
)

export default router
