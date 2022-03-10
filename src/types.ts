export interface Gift {
  senderAddress: string
  tokens: number
}

export interface User {
  address: string
  name: string
  gifts: Gift[]
}

export interface CircleSnapshot {
  users: User[]
  totalGive: number
}
