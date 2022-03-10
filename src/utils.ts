import {User} from './types'

export const giveReceived = (user: User) =>
  user.gifts.reduce((total, gift) => total + gift.tokens, 0)
