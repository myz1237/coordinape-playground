import {Table, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/react'
import {CircleSnapshot} from '../types'
import {
  codeReceivedFromGive,
  decimalToPercent,
  giveReceived,
  numberFormatter,
} from '../utils'

export type UnadjustedTableProps = Pick<CircleSnapshot, 'users' | 'totalGive'>

export const UnadjustedTable = ({users, totalGive}: UnadjustedTableProps) => {
  const sortedUsers = [...users].sort(
    (a, b) => giveReceived(b) - giveReceived(a),
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
        {sortedUsers.map((user) => {
          const giveReceived = user.gifts.received.reduce(
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
          <Td isNumeric>{numberFormatter.format(totalGive)}</Td>
          <Td />
          <Td isNumeric>{numberFormatter.format(1000000)}</Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
