import {Table, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/react'
import {CircleSnapshot} from '../types'
import {giveReceived} from '../utils'

export type CappedTableProps = Pick<CircleSnapshot, 'users'>

export const CappedTable = ({users}: CappedTableProps) => {
  const adjustedUsers = users
    .map((user) => ({
      ...user,
      gifts: user.gifts.map((gift) => ({
        ...gift,
        tokens: gift.tokens > 10 ? 10 : gift.tokens,
      })),
    }))
    .sort((a, b) => giveReceived(b) - giveReceived(a))

  const totalGive = adjustedUsers.reduce(
    (total, user) => total + giveReceived(user),
    0,
  )

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>GIVE Received</Th>
        </Tr>
      </Thead>
      <Tbody>
        {adjustedUsers.map((user) => {
          const giveReceived = user.gifts.reduce(
            (acc, gift) => acc + gift.tokens,
            0,
          )

          return (
            <Tr key={user.address}>
              <Td>{user.name}</Td>
              <Td isNumeric>{giveReceived}</Td>
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td>Total</Td>
          <Td isNumeric>{totalGive}</Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
