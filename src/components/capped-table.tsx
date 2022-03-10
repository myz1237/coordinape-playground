import {Table, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/react'
import {CircleSnapshot} from '../types'
import {
  codeReceivedFromGive,
  decimalToPercent,
  giveReceived,
  numberFormatter,
} from '../utils'

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
          <Th isNumeric>% of GIVE</Th>
          <Th isNumeric>CODE Distribution</Th>
        </Tr>
      </Thead>
      <Tbody>
        {adjustedUsers.map((user) => {
          const giveReceived = user.gifts.reduce(
            (acc, gift) => acc + gift.tokens,
            0,
          )
          const percentGive = decimalToPercent(giveReceived / totalGive)
          const codeReceived = codeReceivedFromGive(giveReceived, totalGive)

          return (
            <Tr key={user.address}>
              <Td>{user.name}</Td>
              <Td isNumeric>{numberFormatter.format(giveReceived)}</Td>
              <Td isNumeric>{percentGive}</Td>
              <Td isNumeric>{numberFormatter.format(codeReceived)}</Td>
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td>Totals</Td>
          <Td isNumeric>{totalGive}</Td>
          <Td />
          <Td isNumeric>{numberFormatter.format(1_000_000)}</Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
