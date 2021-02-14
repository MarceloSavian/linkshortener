import 'dotenv/config'
import cors from 'cors'
import helmet = require('helmet')
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

const logger = winston.createLogger(Config.getInstace().settings.log)
const app: express.Application = express()

export default class Server {
  private envConfig: any
  private databaseConfig: any

  constructor(config: Config) {
    this.envConfig = config.settings.env
    this.databaseConfig = config.settings.database
  }

  public init(): any {
    this.addMiddlewares()
    this.initDatabase()
    this.initRouters()
    this.addPortErrorHander()
  }

  //Middlewares da aplicação
  private addMiddlewares() {
    app.use(helmet())
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
