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

export type DropGt10TableProps = Pick<CircleSnapshot, 'users'>

const dropApplicableUserReceivedGifts = (user: User) => ({
  ...user,
  gifts: {
    ...user.gifts,
    received: user.gifts.received.filter((gift) => gift.tokens <= 10),
  },
})

export const DropGt10Table = ({users}: DropGt10TableProps) => {
  const adjustedUsers = users
    .map(dropApplicableUserReceivedGifts)
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
            Allocations from our Coordinape circle with gifts &gt; 10 GIVE
            dropped entirely.
          </Text>
          <Text>
            For example, if user A sent 20 GIVE to user B, the amount received
            by user B is 0 GIVE. If user C also sent 10 GIVE to user B, the
            amount received by user B is 10 GIVE (0 from A, 10 from C).
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
