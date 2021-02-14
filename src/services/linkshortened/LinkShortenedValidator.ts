import BaseJoi from '@hapi/joi'
import { validateSchema } from '../../utils/validateSchema'
const Joi = BaseJoi

const schemaModel = Joi.object().keys({
  url: Joi.string().required(),
})

export const validateModel = (input: any): Promise<any> => {
  return validateSchema(input, schemaModel)
}
