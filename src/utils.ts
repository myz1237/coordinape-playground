import {Gift, User} from './types'

export const numberFormatter = new Intl.NumberFormat()

export const giveReceived = (user: User) =>
  user.gifts.received.reduce((total, gift) => total + gift.tokens, 0)

export const decimalToPercent = (decimal: number) => {
  const percent = decimal * 100
  return `${percent.toFixed(2)}%`
}

const codeDistribution = 1_000_000

export const codeReceivedFromGive = (give: number, totalGive: number) => {
  const percent = give / totalGive
  const code = percent * codeDistribution
  return Math.round(code)
}

export const isGiftFromUser = (gift: Gift, user: User) =>
  gift.senderAddress === user.address

export const userReceivedGive = (user: User) => giveReceived(user) > 0
