export const validateSchema = (input: any, schema: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!input) reject('Invalid input')
    else {
      const { error, value } = schema.validate(input)
      if (error) {
        const errorResult = new Error()
        errorResult.message = error.message
        reject({ ...errorResult, status: 400 })
      } else {
        resolve(value)
      }
    }
  })
}
