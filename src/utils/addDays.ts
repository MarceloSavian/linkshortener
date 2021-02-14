export const addDays = (days: number) => { //Adiciona dias para a data atual
  var date = new Date();

  date.setDate(date.getDate() + days);

  return date;
}
