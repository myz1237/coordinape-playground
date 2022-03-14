import {Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import {CircleSnapshot, Gift, User} from '../types'
import {numberFormatter} from '../utils'

export type PairsTableProps = Pick<CircleSnapshot, 'gifts' | 'users'>

interface Pair {
  user1: {
    tokensSent: number
    user: User
  }
  user2: {
    tokensSent: number
    user: User
  }
  totalGiveExchanged: number
}

export const giftsToPairs = (gifts: Gift[], users: User[]): Pair[] => {
  const pairs: Pair[] = []
  const handledIds: number[] = []

  for (const gift of gifts) {
    if (handledIds.includes(gift.id)) {
      continue
    }

    const {recipientAddress, senderAddress} = gift
    const correspondingGift = gifts.find(
      (gift) =>
        gift.recipientAddress === senderAddress &&
        gift.senderAddress === recipientAddress,
    )

    if (!correspondingGift) {
      continue
    }

    const user1 = users.find((user) => user.address === recipientAddress)!
    const user2 = users.find((user) => user.address === senderAddress)!

    pairs.push({
      user1: {
        tokensSent: correspondingGift.tokens,
        user: user1,
      },
      user2: {
        tokensSent: gift.tokens,
        user: user2,
      },
      totalGiveExchanged: gift.tokens + correspondingGift.tokens,
    })
    handledIds.push(gift.id, correspondingGift.id)
  }

  return pairs
}

export const PairsTable = ({gifts, users}: PairsTableProps) => {
  const pairs = giftsToPairs(gifts, users).sort(
    (a, b) => b.totalGiveExchanged - a.totalGiveExchanged,
  )

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>User 1</Th>
          <Th isNumeric>User 1 GIVE Sent</Th>
          <Th isNumeric>Total</Th>
          <Th isNumeric>User 2 GIVE Sent</Th>
          <Th>User 2</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pairs.map(({user1, user2, totalGiveExchanged}) => (
          <Tr key={`${user1.user.address}->${user2.user.address}`}>
            <Td>{user1.user.name}</Td>
            <Td isNumeric>{numberFormatter.format(user1.tokensSent)}</Td>
            <Td isNumeric>{numberFormatter.format(totalGiveExchanged)}</Td>
            <Td isNumeric>{numberFormatter.format(user2.tokensSent)}</Td>
            <Td>{user2.user.name}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
