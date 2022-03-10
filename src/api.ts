import {CircleSnapshot} from './types'
import axios from 'axios'

const instance = axios.create({
  headers: {
    Authorization: process.env.COORDINAPE_AUTH_TOKEN!,
    'Content-Type': 'application/json',
  },
})

interface ManifestResponse {
  circle: {
    users: {
      address: string
      name: string
    }[]
  }
}

type UsersResponse = {
  address: string
  name: string
}[]

type GiftsResponse = {
  recipient_address: string
  sender_address: string
  tokens: number
}[]

const fetchGifts = async (): Promise<GiftsResponse> => {
  const response = await instance.get<GiftsResponse>(
    'https://api.coordinape.com/api/v2/pending-token-gifts?circle_id=1573&epoch_id=2538',
  )
  return response.data
}

const fetchManifestUsers = async (): Promise<UsersResponse> => {
  const response = await instance.get<ManifestResponse>(
    'https://api.coordinape.com/api/v2/manifest?circle_id=1573',
  )
  return response.data.circle.users.map(({address, name}) => ({address, name}))
}

export const fetchCircleSnapshot = async (): Promise<CircleSnapshot> => {
  const [usersResponse, giftsResponse] = await Promise.all([
    fetchManifestUsers(),
    fetchGifts(),
  ])

  const users = usersResponse.map(({address, name}) => ({
    address,
    name,
    gifts: giftsResponse
      .filter((gift) => gift.recipient_address === address)
      .map((gift) => ({
        senderAddress: gift.sender_address,
        tokens: gift.tokens,
      })),
  }))

  const totalGive = giftsResponse.reduce(
    (total, gift) => total + gift.tokens,
    0,
  )

  return {
    users,
    totalGive,
  }
}
