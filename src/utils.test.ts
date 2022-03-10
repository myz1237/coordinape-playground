import {User} from './types'
import {findPairs} from './utils'

test('findPairs', () => {
  const users: User[] = [
    {address: '0x01', name: 'Alice', gifts: []},
    {
      address: '0x02',
      name: 'Bob',
      gifts: [{tokens: 20, senderAddress: '0x03'}],
    },
    {
      address: '0x03',
      name: 'Jess',
      gifts: [{tokens: 50, senderAddress: '0x02'}],
    },
    {address: '0x04', name: 'David', gifts: []},
  ]

  expect(findPairs(users)).toEqual([
    [users[1], users[2]],
    [users[2], users[1]],
  ])
})
