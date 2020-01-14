export function getMonthStr(d) {
  return d.toString().split(" ")[1]
}

export function getStartDateOfWeek(d, startAt) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + startAt)
}

export function getNextDate(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
}