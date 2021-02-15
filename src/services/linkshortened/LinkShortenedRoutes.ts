import * as express from 'express'
const router = express.Router()
import LinkShortenedController from './LinkShortenedController'
import { validateModel } from './LinkShortenedValidator'

router.post(
  '/encurtador',
  function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return validateModel(req.body)
      .then((result) => new LinkShortenedController().save(result.url))
      .catch((err) => next(err))
      .then((result) => next(result))
  }
)

router.get('/:id', new LinkShortenedController().redirectURL)

export default router
