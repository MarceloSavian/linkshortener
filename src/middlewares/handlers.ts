// eslint-disable-next-line no-unused-vars
import * as express from 'express'
import winston = require('winston')

import Config from '../config/Config'
const logger = winston.createLogger(Config.getInstace().settings.log)
/**
 *  Handle de Erros
 */

// eslint-disable-next-line no-unused-vars
export const resultHandler = (
  result: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (result.status) {
    if (result.status === 500 || result.status === 503) {
      res.status(result.status).json({
        message: 'Sistema indisponível',
      })
    } else {
      res.status(result.status).json({
        message: result.message || '',
      })
    }
  } else if (result.errors) {
    const message = result.message || result
    res.status(401).json({
      message,
    })
  } else {
    res.status(200).json(result)
  }
}

// eslint-disable-next-line no-unused-vars
export const errorHandlerNotFound = (
  req: express.Request,
  res: express.Response,
  _: express.NextFunction
) => {
  res.json({
    message: 'O recurso {' + req.url + '} não existe ou foi removido.',
  })
}

// eslint-disable-next-line no-unused-vars
export const requestHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.info(req.url)
  next()
}
