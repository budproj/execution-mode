export const getDateFromUTCDate = (utcDate: Date) => {
  return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate())
}
