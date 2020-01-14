import { getNextDate } from '../utils/DateUtils.js';

export function getOpenSlotsByDate(d) {
  return ["11:00-12:00", "13:00-14:00"]
}

export function getOpenSlotsByWeek(d) {
  let result = {}
  let currentDate = d
  for (let i = 0; i < 7; i++) {
    result[currentDate] = getOpenSlotsByDate(currentDate)
    currentDate = getNextDate(currentDate)
  }
  return result
}
