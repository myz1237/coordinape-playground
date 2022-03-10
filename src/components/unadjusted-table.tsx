import {Table, Tbody, Td, Tfoot, Th, Thead, Tr} from '@chakra-ui/react'
import {CircleSnapshot, User} from '../types'

export interface UnadjustedTableProps extends CircleSnapshot {}

const giveReceived = (user: User) =>
  user.gifts.reduce((total, gift) => total + gift.tokens, 0)

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
        </Tr>
      </Thead>
      <Tbody>
        {sortedUsers.map((user) => {
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
