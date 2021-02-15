import 'dotenv/config'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import compression = require('compression')
import express from 'express'
import winston = require('winston')
import { createConnection } from 'typeorm'

import Config from '../config/Config'
import * as handlers from '../middlewares/handlers'
import swagger from '../middlewares/apiDocs'

//Routes
import LinkShortenedRoutes from '../services/linkshortened/LinkShortenedRoutes'

const settings = Config.getInstace().settings

const logger = winston.createLogger(settings.log)
const app: express.Application = express()

export default class Server {
  private envConfig: any
  private databaseConfig: any

  constructor() {
    this.envConfig = settings.env
    this.databaseConfig = settings.database
  }

  public init(): any {
    this.addMiddlewares()
    this.initDatabase()
    this.initRouters()
    this.addPortErrorHander()
  }

  //Middlewares da aplicação
  private addMiddlewares() {
    app.use(cors())
    app.use(express.json())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(compression())
    app.use(swagger)
  }

  private async initDatabase() {
    createConnection({
      ...this.databaseConfig,
    })
      .then(() => {
        logger.info(`Conectado ao bando de dados`)
      })
      .catch((error) =>
        logger.error(`Erro na conexão do banco de dados. ${error}`)
      )
  }

  private addPortErrorHander() {
    app.use(handlers.errorHandlerNotFound)
    app.use(handlers.resultHandler)
    app.listen(this.envConfig.server.port, () => {
      logger.info(`App is listening on port ${this.envConfig.server.port}`)
      logger.info(`${this.envConfig.version}`)
    })
  }

  private initRouters() {
    const initialString = `/`

    app.use(initialString, LinkShortenedRoutes)
  }
}
