export const addDays = (days: number) => {
  //Adiciona dias para a data atual
  const date = new Date()

  date.setDate(date.getDate() + days)

  return date
}
