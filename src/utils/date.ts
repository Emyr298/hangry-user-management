export const validateDateString = (dateString: string) => {
  if (!dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return false;
  }
  const splittedDate = dateString.split('-');
  const year = Number(splittedDate[0]);
  const month = Number(splittedDate[1]);
  const date = Number(splittedDate[2]);
  
  const checkDate = new Date(dateString);
  return checkDate.getFullYear() === year && checkDate.getMonth() + 1 === month && checkDate.getDate() === date;
};
