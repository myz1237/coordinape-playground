import {Table, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/react'
import {CircleSnapshot} from '../types'
import {decimalToPercent, giveReceived} from '../utils'

export interface UnadjustedTableProps extends CircleSnapshot {}

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
        </Tr>
      </Thead>
      <Tbody>
        {sortedUsers.map((user) => {
          const giveReceived = user.gifts.reduce(
            (acc, gift) => acc + gift.tokens,
            0,
          )
          const percentGive = decimalToPercent(giveReceived / totalGive)

          return (
            <Tr key={user.address}>
              <Td>{user.name}</Td>
              <Td isNumeric>{giveReceived}</Td>
              <Td isNumeric>{percentGive}</Td>
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Td>Total</Td>
          <Td />
          <Td isNumeric>{totalGive}</Td>
        </Tr>
      </Tfoot>
    </Table>
  )
}
