import {User} from './types'

export const giveReceived = (user: User) =>
  user.gifts.reduce((total, gift) => total + gift.tokens, 0)

export const decimalToPercent = (decimal: number) => {
  const percent = decimal * 100
  return `${percent.toFixed(2)}%`
}
