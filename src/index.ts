import Config from './config/Config'
import Server from './start/server'

const server = new Server(Config.getInstace())
server.init()
