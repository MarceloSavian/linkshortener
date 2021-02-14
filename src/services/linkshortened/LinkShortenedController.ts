import { getConnection } from 'typeorm'
import * as express from 'express'

import { LinkShortened } from "../../entity/LinkShortened";
import { validURL } from '../../utils/validateUrl'
import { addDays } from '../../utils/addDays'
import uuid from '../../utils/generate-uuid'
import Config from '../../config/Config'

const baseURL = Config.getInstace().settings.env.endpoints.baseURL

export default class PropostaController {

  public save(url: any): Promise<any> {
    return new Promise(async (resolve, reject) => {

      //Validação da URL
      if(!validURL(url)) {
        const errorResult = new Error()
        errorResult.message = 'URL invalida!'

        return reject({ ...errorResult, status: 405 })
      }

      const token = uuid()

      const expireAt = addDays(100)

      try {
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into(LinkShortened)
        .values([
            { link: url, token, expireAt, createAt: new Date() },
         ])
        .execute()
      } catch (e) {
        const errorResult = new Error()
        errorResult.message = 'Erro ao inserir URL!'

        return reject({ ...errorResult, status: 405 })
      }

      resolve({
        newURL: `${baseURL}${token}`
      })
    })
  }

  public async redirectURL(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const token = req.params.id

    const newURL = await getConnection()
        .createQueryBuilder(LinkShortened, "link_shortened")
        .where("link_shortened.token = :token", { token })
        .andWhere("link_shortened.expireAt > now()")
        .getOne()

    if (!newURL){
      const errorResult = new Error()
      errorResult.message = 'URL inexistente!'

      return res.status(404).send(errorResult)
    }

    res.redirect(newURL.link);
  }

}
