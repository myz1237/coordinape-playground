import {
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {CircleSnapshot, User} from '../types'
import {
  codeReceivedFromGive,
  decimalToPercent,
  giveReceived,
  numberFormatter,
} from '../utils'
import {TableDescription} from './components'

export type CappedTableProps = Pick<CircleSnapshot, 'users'>

const capUserReceivedGive = (user: User) => ({
  ...user,
  gifts: {
    ...user.gifts,
    received: user.gifts.received.map((gift) => ({
      ...gift,
      tokens: gift.tokens > 10 ? 10 : gift.tokens,
    })),
  },
})

export const CappedTable = ({users}: CappedTableProps) => {
  const adjustedUsers = users
    .map(capUserReceivedGive)
    .sort((a, b) => giveReceived(b) - giveReceived(a))

  const totalGive = adjustedUsers.reduce(
    (total, user) => total + giveReceived(user),
    0,
  )
  const codePerGive = codeReceivedFromGive(1, totalGive)

  return (
    <Stack>
      <TableDescription>
        <Stack spacing={1}>
          <Text>
            Allocations from our Coordinape circle with GIVE capped at 10
            received from each sender.
          </Text>
          <Text>
            For example, if user A sent 20 GIVE to user B, the amount received
            by user B is 10 GIVE. If user C also sent 20 GIVE to user B, the
            amount received by user B is 20 GIVE (10 from each user).
          </Text>
        </Stack>
      </TableDescription>
      <Table>
        <TableCaption>CODE per GIVE = {codePerGive}</TableCaption>
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
            <Td isNumeric>{numberFormatter.format(1_000_000)}</Td>
          </Tr>
        </Tfoot>
      </Table>
    </Stack>
  )
}
